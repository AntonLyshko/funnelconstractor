import {action, observable, runInAction} from 'mobx'
import {IAppStore, IMenu, ISettings, IUser, IVariableStore} from '@stores/interface'
import CUser from '@stores/implementation/app/CUser'
import CMenu from '@stores/implementation/app/CMenu'
import {flowchartStore, scriptStore, variableStore} from '@stores/implementation'
import CSettings from '@stores/implementation/app/CSettings'
import CServerAction from '@stores/implementation/helper/CServerAction'
import {app} from '@flowchart/shapes/AppShapes'
import IGraphToServer from '@stores/interface/helper/IGraphToServer'
import ElementProducer from '@flowchart/shapes/ElementProducer'
import $ from 'jquery'
import {getFunnel, getMenu, isLogged, sendData, updateData, setSession} from '@actions'
// @ts-ignore
import Cookie from 'js-cookie'


export class AppStore extends CServerAction implements IAppStore {
	@observable funnelId: any
	@observable uploadStatus: any = {status: 'saved'}
	@observable page404: boolean = false
	variableStore: IVariableStore
	menu: IMenu = new CMenu(false)
	settings: ISettings = new CSettings(false)
	user: IUser = new CUser()
	
	@action
	setStatus(value: any) {
		this.uploadStatus = value
	}
	
	formData() {
		let graph = flowchartStore.graphController.toJSON()
		let script = scriptStore.getScript
		let variablesData = variableStore.activeVariables
		
		const graphData: any[any] = []
		const scriptData: any[any] = []
		
		// getting coords and links
		for (let i = 0; i < graph.cells.length; i++) {
			let el = graph.cells[i]
			
			if (el.type === 'app.Link') {
				let link: IGraphToServer = {
					type: el.type,
					source: el.source,
					target: el.target,
					id: el.id
				}
				graphData.push(link)
			} else {
				let step = script.find(step => step.source === el.id)
				let data: IGraphToServer = {
					position: el.position,
					class: el.class,
					id: el.id,
					ports: {
						items: el.ports.items
					}
				}
				let body = {
					id: step.step_id,
					data: data
				}
				graphData.push(body)
			}
		}
		
		
		//script
		for (let i = 0; i < script.length; i++) {
			
			let links = graphData.filter((graph: any) => graph.type === 'app.Link')
			let next_links = links.filter((link: any) => link.source.id === script[i].source)
			let prev_links = links.filter((link: any) => link.target.id === script[i].source)
			let next_ids: any = []
			let prev_ids: any = []
			
			if (next_links.length) {
				let prevSteps: any
				next_links.forEach((link: any) => {
					let targetStep = script.find((step: any) => step.source === link.target.id)
					let targetElement = flowchartStore.graphController.getCell(link.target.id)
					let target_port = targetElement.attributes.ports.items.find((item: any) => item.id === link.target.port)
					let target_port_type: string = 'in'
					if (target_port) target_port_type = target_port.group
					let optionIndex = link.source.port.split('-')
					let port_type = optionIndex[0]
					let linkElement = flowchartStore.graphController.getCell(link.id)
					let linkView = linkElement.findView(flowchartStore.paperController)
					let linkType: any
					if (linkView.sourceMagnet) linkType = linkView.sourceMagnet.attributes[3].value
					if (linkType === 'negative-footer') port_type = linkType
					let sourceElement: any = linkElement.getSourceElement()
					if (port_type !== 'negative' && port_type !== 'positive' && port_type !== 'negative-footer') port_type = 'out'
					if (sourceElement.attributes.name === 'control') {
						let positiveGroup = sourceElement.attributes.ports.items.filter((item: any) => item.group === 'positive-control')
						let negativeGroup = sourceElement.attributes.ports.items.filter((item: any) => item.group === 'negative-control')
						let positiveMatch = positiveGroup.find((item: any) => item.id === link.source.port)
						let negativeMatch = negativeGroup.find((item: any) => item.id === link.source.port)
						
						if (positiveMatch) port_type = positiveMatch.group
						if (negativeMatch) port_type = negativeMatch.group
					}
					optionIndex = optionIndex[optionIndex.length - 1]
					let port_value = ''
					if (optionIndex.length < 1) port_value = script[i].shape.options.items[optionIndex].content
					let sourceStep = script.find((step: any) => step.source === link.source.id)
					sourceStep.prev_step_id.forEach((prev_id: any) => {
						prevSteps = script.filter((step: any) => step.step_id === prev_id)
					})
					let next = {
						from_port: link.source.port,
						port_value: port_value,
						port_type: port_type,
						from_step: sourceStep.step_id,
						target: {
							id: link.target.id,
							port: link.target.port,
							port_type: target_port_type,
							step_id: targetStep.step_id
						}
					}
					next_ids.push(next)
				})
				
				if (prevSteps) {
					prevSteps.forEach((prev_step: any) => {
						let prev = {
							from_step: prev_step.step_id
						}
						prev_ids.push(prev)
					})
				}
			} else {
				if (prev_links.length) {
					
					let prevSteps: any = []
					let sourceStep = script.find((step: any) => step.source === prev_links[0].target.id)
					sourceStep.prev_step_id.forEach((prev_id: any) => {
						if (prev_id.from_step) {
							let prevStep = script.find((step: any) => step.step_id === prev_id.from_step)
							prevSteps.push(prevStep)
						} else {
							let prevStep = script.find((step: any) => step.step_id === prev_id)
							prevSteps.push(prevStep)
						}
					})
					
					prevSteps.forEach((prev_step: any) => {
						if (prev_step) {
							let prev = {
								from_step: prev_step.step_id
							}
							prev_ids.push(prev)
						} else {
							let prev = {
								from_step: false
							}
							prev_ids.push(prev)
						}
						
					})
				}
			}
			
			let item: any = {
				source: script[i].source,
				target: script[i].target,
				type: script[i].type,
				class: script[i].class,
				payload: script[i].payload,
				menu_item_id: script[i].menu_item_id,
				view_name: script[i].view_name,
				shape: script[i].shape,
				prev_step_id: prev_ids,
				step_id: script[i].step_id,
				next_step_id: next_ids
			}
			
			scriptData.push(item)
		}
		
		// console.log('Готовый Graph ', JSON.stringify(graphData))
		// console.log('Готовый Скрипт ', JSON.stringify(scriptData))
		// console.log('Готовые переменные ', JSON.stringify(variablesData))
		
		const body = {
			'script': scriptData,
			'graph': graphData,
			'variables': variablesData
		}
		
		return body
	}
	
	set404() {
		this.page404 = true
	}
	
	@action.bound
	async saveAndUpload() {
		try {
			let data = await this.formData()
			
			
			if (this.funnelId) {
				let res = await updateData(this.funnelId, data)
				if (res.data.error > 0) {
					console.log('error', res.data.data)
					this.setStatus({status: 'error', data: res.data.data})
				} else {
					this.setStatus({status: 'saved'})
					this.funnelId = res.data.data.id
					console.log('updated funnel', this.funnelId)
				}
			} else {
				let res = await sendData(data)
				if (res.data.error > 0) {
					console.log('error', res.data.data)
					this.setStatus({status: 'error', data: res.data.data})
				} else {
					this.setStatus({status: 'saved'})
					this.funnelId = res.data.data.id
					console.log('created funnel', this.funnelId)
				}
			}
			
		} catch (e) {
			console.error(e)
			this.error()
		}
	};
	
	putCoords(id: string, graph: any, cell: any) {
		let graph_item = graph.find((item: any) => item.id === id)
		if (graph_item !== 'app.Link') {
			cell.attributes.position = graph_item.data.position
			cell.id = graph_item.data.id
			cell.attributes.id = graph_item.data.id
			if (!cell.ports.items && graph_item.data.ports.items) {
				cell.attributes.ports['items'] = graph_item.data.ports.items
			}
		}
		return cell
	}
	
	@action.bound
	async dataInit(data: any) {
		data.script = JSON.parse(data.script)
		let graph = JSON.parse(data.graph)
		let variables = JSON.parse(data.variables)
		variableStore.saveVariable(variables)
		
		try {
			let cells: any = []
			//Generate Views
			for (let i = 0; i < data.script.length; i++) {
				const el = data.script[i]
				scriptStore.setStep(el)
				let cell = ElementProducer.reCreateCell(el.shape)
				cell = this.putCoords(el.step_id, graph, cell)
				
				cells.push(cell)
			}
			
			flowchartStore.graphController.resetCells(cells)
			flowchartStore.initCells()
			
			//Generate Links
			
			setTimeout(() => {
				let portsOfCell = []
				
				for (let i = 0; i < cells.length; i++) {
					const cell = cells[i]
					const elementView: joint.dia.ElementView = flowchartStore.paperController.findViewByModel(cell)
					let portKeys = Object.getOwnPropertyNames(elementView._portElementsCache)
					let portData: any = []
					for (let i = 0; i < portKeys.length; i++) {
						const port_id = portKeys[i]
						const port_el = elementView._portElementsCache[port_id].portContentElement.node
						
						let port_type = port_id.split('-')[0]
						
						if (port_type === 'positive' || port_type === 'negative') {
							portData[port_id] = port_id
						} else {
							portData[$(port_el).attr('port-group')] = port_id
						}
					}
					
					portsOfCell[cell.id] = portData
				}
				
				for (let i = 0; i < cells.length; i++) {
					let cell = cells[i]
					const port_cell = portsOfCell[cell.id]
					for (const key in port_cell) {
						const port = port_cell[key]
						let cell_port = cell.attributes.ports.items.find((port_item: any) => {
							if (port_item.group !== 'positive' || port_item.group !== 'negative') {
								return port_item.group === key
							} else {
								return null
							}
						})
						if (cell_port) cell_port['id'] = port
					}
				}
				
				
				cells = []
				
				for (let i = 0; i < graph.length; i++) {
					const graph_item = graph[i]
					if (graph_item.type === 'app.Link') {
						let port_type_target = graph_item.target.port.split('-')[0] === 'positive' || graph_item.target.port.split('-')[0] === 'negative' || graph_item.target.port.split('-')[0] === 'control' ? graph_item.target.port : 'in'
						let port_type_source = graph_item.source.port.split('-')[0] === 'positive' || graph_item.source.port.split('-')[0] === 'negative' || graph_item.source.port.split('-')[0] === 'control' ? graph_item.source.port : 'out'
						
						let link = new app.Link({
							source: {
								id: graph_item.source.id,
								port: portsOfCell[graph_item.source.id][port_type_source]
							}, target: {
								id: graph_item.target.id,
								port: portsOfCell[graph_item.target.id][port_type_target]
							}
						})
						
						link.id = graph_item.id
						link.attributes['data-state'] = 'default'
						link.attributes.id = graph_item.id
						cells.push(link)
					}
				}
				
				flowchartStore.graphController.addCells(cells)
			}, graph.length * 20)
			
		} catch (e) {
			console.error(e)
			this.error()
		}
	};
	
	
	@action.bound
	async initialization() {
		try {
			let paramsString = document.location.search
			let searchParams = new URLSearchParams(paramsString)
			
			let encrypted_session_data = searchParams.get('encrypted_session_data') || Cookie.get('encrypted_session_data')
			
			if (encrypted_session_data) {
				await setSession(encrypted_session_data)
				Cookie.set('encrypted_session_data', encrypted_session_data)
			}
			
			let logged_res = await isLogged()
			
			console.log('Login', logged_res.data.data.success)
			
			if (!logged_res.data.data.success) {
				Cookie.remove('encrypted_session_data')
			}
			
			if (!logged_res.data.data.success && !encrypted_session_data) {
				window.location.href = `https://account.dev.prodamus.ru/?redirect_url=${window.location.href}`
			}
			
			runInAction(() => {
				this.pending()
			})
			// Делаем запрос, получаем инфу о юзере и доп. информации по меню и т.д.
			runInAction(() => {
				this.done()
			})
			
			const constantData = [
				
				{
					id: 'cat_1',
					name: 'user',
					title: 'Пользователь',
					items: [
						{
							parent_id: 'cat_1',
							id: 'var_1',
							type: 'string',
							name: 'ИмяПользователя',
							value: 'User_1337'
						},
						{
							parent_id: 'cat_1',
							id: 'var_2',
							type: 'number',
							name: 'ВозрастПользователя',
							value: '21'
						},
						{
							parent_id: 'cat_1',
							id: 'var_3',
							type: 'stringArray',
							name: 'ДоступныеКурсы',
							value: 'SMM, Игра на гитаре'
						}
					]
				},
				{
					id: 'cat_2',
					name: 'school',
					title: 'Школа',
					items: [
						{
							parent_id: 'cat_2',
							id: 'var_4',
							type: 'string',
							name: 'НазваниеШколы',
							value: 'User_1337'
						},
						{
							parent_id: 'cat_2',
							id: 'var_5',
							type: 'string',
							name: 'ЧислоУчеников',
							value: '47'
						},
						{
							parent_id: 'cat_2',
							id: 'var_6',
							type: 'stringArray',
							name: 'Курсы',
							value: 'SMM, Инвестиции, Игра на гитаре'
						}
					]
				},
				{
					id: 'cat_3',
					name: 'other',
					title: 'Разное',
					items: [
						{
							parent_id: 'cat_3',
							id: 'var_7',
							type: 'string',
							name: 'Дата',
							value: '01.02.20'
						},
						{
							parent_id: 'cat_3',
							id: 'var_8',
							type: 'string',
							name: 'Время',
							value: '16:51'
						}
					]
				}
			]
			const res = await getMenu()
			this.funnelId = searchParams.get('v')
			if (parseInt(this.funnelId, 10) && this.funnelId > 0 && this.funnelId) {
				const funnel = await getFunnel(this.funnelId)
				if (funnel) {
					await this.dataInit(funnel)
					if (funnel.variables) await variableStore.saveVariable(JSON.parse(funnel.variables))
				}
			}
			this.menu.save(res).init()
			variableStore.saveConstant(constantData)
		} catch (e) {
			console.error(e)
			this.error()
		}
	};
	
	
}

export const appStore = new AppStore()
