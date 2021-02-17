import * as joint from 'rappid';

import ToolFactory from '@flowchart/helpers/ToolFactory';
import {flowchartStore, appStore, scriptStore, variableStore} from '@stores/implementation';
import PaperAutoTransition from '@flowchart/models/PaperAutoTransition';
import PortHover from '@flowchart/models/PortHover';
import {Markup} from '@flowchart/helpers/Markup';
import {Type} from '@constants/PortConstants';
import {portsStyle} from '@constants/StyleConstants';
import {message} from 'antd';

import {debounce} from 'lodash';

export enum LayoutId {
	APP = 'app',
	STENCIL = 'stencil',
	PAPER = 'paper',
	NAVIGATOR = 'navigator'
}

class FlowchartModel {
	tools: ToolFactory;
	paperAutoTransitionController: PaperAutoTransition;
	portHoverController: PortHover;
	addHoverCategory: (element: any) => void;
	removeHoverCategory: () => void;
	isMouseButtonDown: boolean = false;
	isHovered: boolean = false;
	startCount: number = 0;
	isMoving: boolean = false;
	clickOnMove: boolean = false;
	
	constructor() {
		this.tools = new ToolFactory();
		this.paperAutoTransitionController = new PaperAutoTransition();
		this.portHoverController = new PortHover();
		
		this.addHoverCategory = debounce((element: any) => {
			const categoryName: string = element.model.get('category');
			const menuName: string = element.model.get('menuTitle');
			if (this.isHovered) {
				appStore.menu.accordion.setHover(categoryName, menuName);
			}
		}, 100);
		
		this.removeHoverCategory = debounce(() => {
			appStore.menu.accordion.removeHover();
		}, 0);
	}
	
	addMultiLineCharacter(items: Object): Object {
		let copy = {};
		Object.keys(items).forEach(key => {
			let el = items[key];
			el.text = el.text.split(' ').join('\n');
			copy[key] = el;
		});
		return copy;
	}
	
	draw(items: any) {
		const {paperScrollerController, stencilControllers, navigatorController} = flowchartStore;
		this.renderPlugin(`#${LayoutId.PAPER}`, paperScrollerController);
		stencilControllers.forEach((stencil, index) => {
			
			this.renderPlugin(`#${LayoutId.STENCIL}-${index}`, stencil);
			let menuItem = [items[index]];
			this.addMultiLineCharacter(menuItem);
			stencil.load(menuItem);
			
			
		});
		paperScrollerController.render().center();
		this.renderPlugin(`#${LayoutId.NAVIGATOR}`, navigatorController);
		this.removeSelectionControls();
		this.registerEvents();
	}
	
	removeSelectionControls() {
		const {selectionController} = flowchartStore;
		selectionController.removeHandle('rotate');
		selectionController.removeHandle('resize');
	}
	
	channelUpdate(cell: joint.dia.Cell) {
		for (let key in cell.attributes.channel) {
			if (!cell.attributes.channel[key]) {
				cell.attr(`.shape-footer-service-${key}/fill`, '#ccc', {silent: false});
			}
		}
	}
	
	registerEvents() {
		const {paperController, selectionController, graphController} = flowchartStore;
		
		graphController.on('add', (cell) => {
			
			appStore.setStatus({status: 'changed'});
			
			let view = paperController.findViewByModel(cell);
			if (view.model.attributes.name === 'start' && this.startCount >= 1) {
				message.config({
					duration: 2,
					maxCount: 1,
					rtl: false,
				});
				message.warning('Может быть только один блок Старт');
				setTimeout(() => message.destroy(), 2100);
				graphController.removeCells(cell);
			}
			
			this.channelUpdate(cell);
			scriptStore.writeStep(view, cell);
			
			if (view.model.attributes.name === 'start') {
				this.startCount += 1;
			}
		});
		
		graphController.on('remove', (cell) => {
			
			appStore.setStatus({status: 'changed'});
			
			let view = paperController.findViewByModel(cell);
			if (view.model.attributes.name === 'start') {
				this.startCount = 0;
				variableStore.deleteAllVaribles();
			}
			scriptStore.deleteStep(cell);
		});
		
		paperController.on({
			'element:mouseenter': this.handlerElementMouseEnter,
			'element:mouseover': this.handlerElementMouseOver,
			'element:mouseleave': this.handlerElementMouseLeave,
			'element:pointerclick': this.handlerElementPointerClick,
			'element:pointerup': this.handlerElementPointerUp,
			'element:pointermove': this.handlerElementPointerMove,
			'link:mouseenter': this.handlerLinkMouseEnter,
			'link:connect': this.handlerLinkConnect,
			'link:mouseleave': this.handlerLinkMouseLeave,
			'link:pointerclick': this.handlerLinkPointerClick,
			'link:pointermove': this.handlerLinkPointerMove,
			'blank:pointerclick': this.handlerBlankPointerClick,
			'blank:pointerdown': this.handlerBlankPointerDown,
		});
		selectionController.collection.on('reset add remove', this.onSelectionChange);
	}
	
	onSelectionChange = () => {
		const {selectionController, activeElement} = flowchartStore;
		const selection = selectionController;
		const {collection} = selection;
		if (activeElement && collection.has(activeElement.model)) {
			flowchartStore.setActive(null);
		}
		if (collection.length === 1) {
			const primaryCell: joint.dia.Cell = collection.first();
			selection.destroySelectionBox(primaryCell);
		} else if (collection.length === 2) {
			collection.each(function (cell) {
				selection.createSelectionBox(cell);
			});
		}
	};
	
	handlerLinkConnect = (
		link: joint.dia.Link,
		event: joint.dia.Event,
	) => {
		scriptStore.setLink(link);
	};
	
	handlerElementMouseEnter = (
		element: joint.dia.ElementView,
		event: joint.dia.Event,
	) => {
		this.isHovered = true;
		Markup.addHover(element);
		this.addHoverCategory(element);
	};
	
	handlerElementMouseLeave = (
		element: joint.dia.ElementView,
		event: joint.dia.Event,
	) => {
		this.isHovered = false;
		Markup.removeHover(element);
		this.removeHoverCategory();
		this.portHoverController.clearHover(element, event);
		
	};
	
	handlerElementMouseOver = (
		element: joint.dia.ElementView,
		event: joint.dia.Event,
	) => {
		
		this.portHoverController.watchHover(element, event);
	};
	
	handlerElementPointerClick = (
		element: joint.dia.ElementView,
		event: joint.dia.Event,
	) => {
		if (event.type.indexOf('touch') !== -1) {
			const port = element.findAttribute('port', event.target);
			if (port) {
				this.portHoverController.portToggle(element, event);
			} else {
				if (!this.isMoving && !this.clickOnMove) {
					if (flowchartStore.isActive(element)) {
						flowchartStore.setActive(null);
						appStore.settings.closeSettings();
					} else {
						flowchartStore.setActive(element);
						appStore.settings.openSettings();
					}
				}
				
			}
		} else {
			if (!this.isMoving && !this.clickOnMove) {
				if (flowchartStore.isActive(element)) {
					flowchartStore.setActive(null);
					appStore.settings.closeSettings();
				} else {
					flowchartStore.setActive(element);
					appStore.settings.openSettings();
				}
			}
			
		}
		this.clickOnMove = false;
		
	};
	
	handlerElementPointerUp = (
		element: joint.dia.ElementView,
		event: joint.dia.Event,
	) => {
		
		if (!this.isMoving) {
			if (flowchartStore.isActive(element)) {
				flowchartStore.setActive(null);
				appStore.settings.closeSettings();
				this.clickOnMove = true;
			} else {
				
				flowchartStore.setActive(element);
				appStore.settings.openSettings();
				
				this.clickOnMove = true;
			}
		}
		this.isMoving = false;
		this.isMouseButtonDown = false;
		this.paperAutoTransitionController.reset();
	};
	
	
	// Handle click with little movement
	handlerElementPointerMove = (element: joint.dia.ElementView, evt: any, x: any, y: any) => {
		this.paperAutoTransitionController.checkTransition(element, evt, x, y);
		this.isMoving = this.paperAutoTransitionController.checkMoving();
	};
	
	
	handlerLinkMouseEnter = (
		link: joint.dia.LinkView,
		event: joint.dia.Event,
	) => {
		Markup.addHover(link);
	};
	
	handlerLinkMouseLeave = (
		link: joint.dia.LinkView,
		event: joint.dia.Event,
	) => {
		Markup.removeHover(link);
	};
	
	handlerLinkPointerClick = (
		link: joint.dia.LinkView,
		event: joint.dia.Event,
	) => {
		
		flowchartStore.setActive(link, event);
	};
	
	handlerLinkPointerMove = (
		view: joint.dia.LinkView,
		event: joint.dia.Event,
		x: number,
		y: number,
	) => {
		/** Устанавливаем z-index линии */
		if (view.model.get('z')) {
			const port = view.model.source();
			const portData = view.model.getSourceElement().getPort(port.port);
			if (portData.group === Type.PositiveControl) {
				view.model.attr('line/stroke', portsStyle.POSITIVE_STROKE);
			} else if (portData.group === Type.NegativeControl) {
				view.model.attr('line/stroke', portsStyle.NEGATIVE_STROKE);
			}
			view.model.set({
				z: 0,
			});
		}
		this.paperAutoTransitionController.checkTransition(view, event, x, y);
	};
	
	handlerBlankPointerClick = (
		event: joint.dia.Event, x: number, y: number,
	) => {
		this.portHoverController.restoreTapPort();
		flowchartStore.setActive(null);
		appStore.menu.accordion.removeActive();
		appStore.settings.closeSettings();
		appStore.settings.closeMobileMenu();
		appStore.menu.close();
	};
	
	handlerBlankPointerDown = (
		event: joint.dia.Event, x: number, y: number,
	) => {
		const {keyboardController, selectionController, paperScrollerController} = flowchartStore;
		this.paperAutoTransitionController.reset();
		if (keyboardController.isActive('shift', event)) {
			selectionController.startSelecting(event);
		} else {
			selectionController.collection.reset([]);
			paperScrollerController.startPanning(event);
			//paperController.removeTools();
		}
	};
	
	renderPlugin(selector: string, plugin: any): void {
		document.getElementById(LayoutId.APP).querySelector(selector).appendChild(plugin.el);
		plugin.render();
	}
}

export default FlowchartModel;
