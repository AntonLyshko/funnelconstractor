import {action, computed, observable, reaction} from 'mobx'
import * as joint from 'rappid'
import {dia, ui} from 'rappid'
import * as appShapes from '@flowchart/shapes/AppShapes'
import {PaperSettings} from '@constants/FlowchartConstants'
import ElementProducer from '@flowchart/shapes/ElementProducer'
import {Markup} from '@flowchart/helpers/Markup'
import {IFlowchartStore} from '@stores/interface'
import {appStore} from '@stores/implementation/app/AppStore'
import {scriptStore} from '@stores/implementation'

export class FlowchartStore implements IFlowchartStore {
	@observable activeElement: joint.dia.LinkView | joint.dia.ElementView | null = null
	@observable paperController: joint.dia.Paper
	@observable graphController: joint.dia.Graph
	@observable paperScrollerController: joint.ui.PaperScroller
	@observable clipboardController: joint.ui.Clipboard
	@observable selectionController: joint.ui.Selection
	@observable stencilControllers: joint.ui.Stencil[] = []
	@observable keyboardController: joint.ui.Keyboard
	@observable navigatorController: joint.ui.Navigator
	
	
	constructor() {
		this.initGraph()
		this.initPaper()
		this.initPaperScroller()
		this.initNavigator()
		this.initClipboard()
		this.initSelection()
		this.initKeyboard()
		
		
		// открываем настройки, когда активируем фигуру
		reaction(() => {
			return this.activeShape
		}, () => {
			if (this.activeShape) {
				appStore.menu.accordion.setActive(this.activeShape.model.get('category'))
			} else {
				appStore.menu.accordion.removeActive()
			}
			if (this.activeShape && !appStore.settings.isOpen) {
				appStore.settings.openSettings()
			} else if (this.activeElement === null && appStore.settings.isOpen) {
				//appStore.settings.close();
			}
		})
	}
	
	@computed
	get activeLink() {
		if (this.activeElement instanceof joint.dia.LinkView) {
			return this.activeElement
		}
		return null
	}
	
	@computed
	get activeShape() {
		if (this.activeElement instanceof joint.dia.ElementView) {
			return this.activeElement
		}
		return null
	}
	
	isActive(view: joint.dia.ElementView | joint.dia.LinkView | joint.dia.Element | joint.dia.Link) {
		if (!this.activeElement) {
			return false
		}
		
		if (view instanceof joint.dia.Link || view instanceof joint.dia.Element) {
			return this.activeElement.model === view
		}
		return this.activeElement === view
	}
	
	@action
	setActive = async (element: joint.dia.ElementView | joint.dia.LinkView | null, event?: any) => {
		
		if (this.activeElement !== element) {
			if (element) {
				Markup.addActive(element, event)
			}
			if (this.activeElement) {
				Markup.removeActive(this.activeElement)
			}
			this.activeElement = element
		} else if (element) {
			Markup.removeActive(element)
			this.activeElement = null
		}
	}
	
	@action
	deleteActive() {
		if (this.activeElement) {
			if (this.activeShape) {
				appStore.menu.accordion.removeHover()
				appStore.menu.accordion.removeActive()
			}
			this.activeElement.model.remove()
			this.activeElement = null
			appStore.settings.closeSettings()
		}
	}
	
	@action
	toggleChannel(channel: string) {
		let cell = this.graphController.getCell(this.activeElement.model.id)
		cell.attributes.channel[channel] = !cell.attributes.channel[channel]
		if (cell.attributes.channel[channel]) {
			cell.attr(`.shape-footer-service-${channel}/fill`, '#333', {silent: false})
		} else {
			cell.attr(`.shape-footer-service-${channel}/fill`, '#ccc', {silent: false})
		}
		this.updateFlowchart()
	}
	
	@action
	addOption(value: string, port: any[any], cellArg?: any) {
		let cell = this.graphController.getCell(this.activeElement.model.id)
		let item = {
			content: value,
			port: port,
			size: {
				stretch: NaN,
				height: 1.5
			}
		}
		if (!cell.attributes.options.items) cell.attributes.options.items = []
		cell.attributes.options.items.push(item)
		
		this.updateFlowchart()
		this.activeElement.renderMarkup()
	}
	
	@action
	removeAllOption() {
		let cell = this.graphController.getCell(this.activeElement.model.id)
		cell.attributes.options.items = []
		this.updateFlowchart()
		this.activeElement.renderMarkup()
	}
	
	@action
	removeOption(index: number) {
		let cell = this.graphController.getCell(this.activeElement.model.id)
		cell.attributes.options.items.splice(index, 1)
		this.updateFlowchart()
		this.activeElement.renderMarkup()
	}
	
	
	@action
	portToggleOption(index: number, value: string, cellArg?: any) {
		let cell = cellArg ? cellArg : this.graphController.getCell(this.activeElement.model.id)
		cell.attributes.options.items[index].port[value] = !cell.attributes.options.items[index].port[value]
		this.updateFlowchart(cellArg)
	}
	
	@action
	changeTitle(value: string, cellArg?: any) {
		let cell = cellArg ? cellArg : this.graphController.getCell(this.activeElement.model.id)
		if (cell.attributes.header.visible) {
			if (value) {
				cell.attributes.header.content = value
			} else {
				cell.attributes.header.content = cell.attributes.menuTitle
			}
		} else {
			if (value) {
				cell.attributes.body.content = value
			} else {
				cell.attributes.body.content = cell.attributes.menuTitle
			}
		}
		
		this.updateFlowchart(cellArg)
	}
	
	changePreviewText(key: string, value: string, cellArg?: any) {
		let cell = cellArg ? cellArg : this.graphController.getCell(this.activeElement.model.id)
		cell.attributes.body.preview.text[key] = value
		this.updateFlowchart(cellArg)
	}
	
	@action
	moveOption(from: number, to: number, cellArg?: any) {
		let cell = cellArg ? cellArg : this.graphController.getCell(this.activeElement.model.id)
		let options = cell.attributes.options
		options.items[from] = options.items.splice(to, 1, options.items[from])[0]
		this.activeElement.renderMarkup()
		this.updateFlowchart(cellArg)
	}
	
	@action
	changeOption(index: number, value: string, cellArg?: any) {
		let cell = cellArg ? cellArg : this.graphController.getCell(this.activeElement.model.id)
		
		if (!cell.attributes.options.items[index]) {
			this.addOption(value, {positive: true, negative: false})
		} else {
			cell.attributes.options.items[index].content = value
		}
		this.updateFlowchart(cellArg)
	}
	
	@action
	changeContent(value: any, cellArg?: any): void {
		let cell = cellArg ? cellArg : this.graphController.getCell(this.activeElement.model.id)
		
		if (!value) {
			cell.attributes.preview = null
			this.changeTitle(cell.attributes.menuTitle)
			return null
		}
		
		if (value.type === 'text') {
			if (value.text) {
				this.changeTitle(value.text, cellArg)
			} else {
				this.changeTitle(cell.attributes.menuTitle, cellArg)
			}
			cell.attributes.preview = null
		}
		if (value.type === 'img') {
			this.changeTitle(value.fileName, cellArg)
			cell.attributes.preview = value
		}
		if (value.type === 'file') {
			this.changeTitle(value.fileName, cellArg)
			cell.attributes.preview = null
		}
		if (value.type === 'audio') {
			this.changeTitle(value.fileName, cellArg)
			cell.attributes.preview = null
		}
		if (value.type === 'video') {
			this.changeTitle('Video', cellArg)
			cell.attributes.preview = null
		}
		this.updateFlowchart(cellArg)
	}
	
	@action
	switchToggle() {
		let cell = this.graphController.getCell(this.activeElement.model.id)
		if (cell.attributes.switch == undefined) {
			cell.attributes.switch = true
		} else {
			cell.attributes.switch = !cell.attributes.switch
		}
		this.updateFlowchart()
	}
	
	@action
	changePort(key: string, value: number) {
		let cell = this.graphController.getCell(this.activeElement.model.id)
		cell.attributes.body.controlPort[key] = value
		this.updateFlowchart()
	}
	
	shorter(name: string, max: number) {
		if (name.length > max) return name.slice(0, max) + '...'
		return name
	};
	
	@action
	updateFlowchart(cellArg?: any) {
		let cell = cellArg ? cellArg : this.graphController.getCell(this.activeElement.model.id)
		cell.autoresize()
		Markup.updateAtts(this.activeElement)
		appStore.setStatus({status: 'changed'})
	}
	
	initCells() {
		let script = scriptStore.script
		for (let i = 0; i < script.length; i++) {
			let step = script[i]
			let cell = this.graphController.getCell(step.source)
			switch (step.type) {
				case 'send_msg':
					console.log('payload', step.payload['msg'])
					flowchartStore.changeContent(step.payload['msg'][0], cell)
					break
				case 'variable_setting':
					flowchartStore.changeTitle(step.view_name, cell)
					break
				case 'income_msg':
					flowchartStore.changeTitle(step.payload['keywords'].join(','), cell)
					break
				case 'condition':
					let title: string
					for (let i = 0; i < step.payload.condition.length; i++) {
						const el = step.payload.condition[i]
						if (title && title.length) {
							title += `& {${this.shorter(el.variable.name, 15)}} ${el.sign} ${el.check}`
						} else {
							title = `{${this.shorter(el.variable.name, 15)}} ${el.sign} ${el.check}`
						}
					}
					flowchartStore.changeTitle(title, cell)
					break
				default:
					
					break
			}
		}
	}
	
	initStencils(items: any) {
		
		for (let i = 0; i < items.length; i++) {
			let heigthWidth = 70
			const stencil = new ui.Stencil({
				paper: this.paperScrollerController,
				width: heigthWidth,
				height: heigthWidth,
				paperOptions: function () {
					return {
						model: new dia.Graph({}, {
							cellNamespace: appShapes
						}),
						cellViewNamespace: appShapes
					}
				},
				dropAnimation: true,
				layout: {
					dx: 0,
					dy: 0,
					columnGap: 13,
					rowGap: 1,
					columnWidth: heigthWidth,
					columns: 13,
					rowHeight: heigthWidth,
					siblingGap: 13
				},
				dragStartClone: cell => {
					
					if (appStore.menu.canDrag) {
						return cell.clone().attr({
							'.stencil-menu-body': {
								stroke: '#a9b2b6',
								opacity: 0.1,
								strokeWidth: 1,
								strokeDasharray: 3
							},
							'.stencil-menu-icon': {
								opacity: 0.1
							},
							'.stencil-menu-': {
								opacity: 0.1
							}
						})
					} else {
						return null
					}
				},
				dragEndClone: cell => {
					return ElementProducer.produceCell(cell)
				}
			})
			
			stencil.startListening()
			this.stencilControllers.push(stencil)
			
		}
	}
	
	private initNavigator() {
		this.navigatorController = new joint.ui.Navigator({
			width: 240,
			height: 100,
			paperScroller: this.paperScrollerController,
			zoom: false,
			paperOptions: {
				async: true,
				elementView: appShapes.NavigatorElementView,
				linkView: appShapes.NavigatorLinkView,
				cellViewNamespace: appShapes
			}
		})
	}
	
	private initGraph() {
		this.graphController = new joint.dia.Graph({}, {
			cellNamespace: appShapes
		})
	}
	
	private initPaper() {
		this.paperController = new joint.dia.Paper({
			width: PaperSettings.WIDTH,
			height: PaperSettings.HEIGHT,
			gridSize: PaperSettings.GRID_SIZE,
			linkPinning: false,
			drawGrid: {
				color: '#fff',
				thickness: 1,
				name: 'mesh'
			},
			background: {
				color: '#eceff1',
				opacity: 1
			},
			restrictTranslate: true,
			model: this.graphController,
			cellViewNamespace: appShapes,
			elementView: appShapes.ElementView,
			defaultLink: new appShapes.app.Link(),
			defaultConnectionPoint: appShapes.app.Link.connectionPoint,
			interactive: {linkMove: false},
			async: true,
			snapLinks: {radius: PaperSettings.SNAP_LINK_RADIUS},
			sorting: joint.dia.Paper.sorting.APPROX,
			validateMagnet: (cellView, magnet) => {
				const port = magnet.getAttribute('port')
				
				const links = this.graphController.getConnectedLinks(cellView.model, {outbound: true})
				const portLinks = links.filter(function (o) {
					return o.get('source').port == port
				})
				if (portLinks.length > 0) return false
				return magnet.getAttribute('magnet') !== 'passive'
			},
			validateConnection: (cellViewS, magnetS, cellViewT, magnetT, _end, _linkView) => {
				// Prevent linking from input ports.
				if (magnetS && magnetS.getAttribute('port-group') === 'in') return false
				
				// Prevent linking from output ports to input ports within one element.
				if (cellViewS === cellViewT) return false
				
				if (['positive-control', 'negative-control'].includes(magnetS.getAttribute('port-group'))) {
					return magnetT && magnetT.getAttribute('port-group') === 'control'
				}
				
				// Prevent linking to input ports.
				return magnetT && magnetT.getAttribute('port-group') === 'in'
			}
		})
	}
	
	private initPaperScroller() {
		this.paperScrollerController = new joint.ui.PaperScroller({
			paper: this.paperController,
			autoResizePaper: true,
			cursor: 'grab',
			padding: 0
		})
	}
	
	private initClipboard() {
		this.clipboardController = new joint.ui.Clipboard()
	}
	
	private initSelection() {
		
		this.selectionController = new joint.ui.Selection({paper: this.paperController, useModelGeometry: true})
	}
	
	private initKeyboard() {
		this.keyboardController = new joint.ui.Keyboard()
	}
}

export const flowchartStore = new FlowchartStore()
