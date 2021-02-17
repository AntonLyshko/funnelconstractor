import {action, observable} from 'mobx'
import {IMenu, IMenuAccordion} from '@stores/interface'
import CSidebar from '@stores/implementation/app/CSidebar'
import CMenuAccordion from '@stores/implementation/app/CMenuAccordion'
import {flowchartStore} from '@stores/implementation/FlowchartStore'
import {MenuShapeConfig, TMenuCategory, TMenuResponse} from '@interfaces/ShapeConfig.interface'
import _ from 'lodash'

export default class CMenu extends CSidebar implements IMenu {
	accordion: IMenuAccordion = new CMenuAccordion()
	@observable.shallow items: MenuShapeConfig[] = []
	@observable.shallow categories: TMenuCategory[] = []
	@observable canDrag: boolean = true
	
	getIndexes(categoryName: string, itemName: string) {
		
		const categoryIndex = this.categories.findIndex(category => categoryName === category.text)
		const itemIndex = this.categories[categoryIndex].items.findIndex(item => item.text === itemName)
		return [categoryIndex, itemIndex]
	}
	
	active() {
		this.canDrag = true
	}
	
	disable() {
		this.canDrag = false
	}
	
	@action.bound
	save(menu: TMenuResponse) {
		// может будет форматирование?
		
		let allMenuItems = []
		
		for (let i = 0; i < menu.length; i++) {
			const category = menu[i]
			for (let i = 0; i < category.items.length; i++) {
				let item = category.items[i]
				item['category'] = category.text
				item = {
					...item,
					shape: {
						...item.shape,
						menuTitle: item.text,
						name: item.name
					}
				}
				allMenuItems.push(item)
			}
		}
		
		this.items = allMenuItems
		
		return this
	};
	
	@action.bound
	init() {
		flowchartStore.initStencils(this.items)
	}
	
	@action.bound
	closeAndClear() {
		// this.close();
		// this.accordion.removeActive();
	}
}
