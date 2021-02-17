import ToolFactory from '@flowchart/helpers/ToolFactory'
import {MarkupUtils, StyleStates} from '@flowchart/utils/MarkupUtils'
import * as joint from 'rappid'
import {shapeStyle} from '@constants/StyleConstants'
import {SomeElement, SomeModel, SomeView} from '@interfaces/Markup.interface'
import {flowchartStore} from '@stores/implementation/FlowchartStore'
import * as Shape from '@constants/ShapeConstants'

export class Markup {
	
	static addActive(element: SomeElement, event?: any): void {
		let model = MarkupUtils.getModel(element), view
		if (MarkupUtils.isModel(element)) {
			view = model && flowchartStore.paperController.findViewByModel(model)
		} else if (MarkupUtils.isView(element)) {
			view = element! as SomeView
		}
		if (!model || !view) {
			return
		}
		// if (!model || !view || MarkupUtils.hasState(element, StyleStates.ACTIVE)) {
		//     return;
		// }
		MarkupUtils.addState(element, StyleStates.ACTIVE)
		Markup.addActiveAttrs(model)
		if (MarkupUtils.isLine(element)) {
			if (event) {
				const bb = event.target.getBoundingClientRect()
				const position = {
					x: event.clientX - bb.left,
					y: event.clientY - bb.top
				}
				view.addTools(new ToolFactory().makeShapeTools(position, view))
			}
		} else if (MarkupUtils.isShape(element)) {
			view.addTools(new ToolFactory().makeShapeTools())
		}
	}
	
	
	static removeActive(element: joint.dia.ElementView | joint.dia.LinkView): void {
		let model = MarkupUtils.getModel(element), view
		if (MarkupUtils.isModel(element)) {
			view = model && flowchartStore.paperController.findViewByModel(model)
		} else if (MarkupUtils.isView(element)) {
			view = element! as SomeView
		}
		
		if (!model || !view || !MarkupUtils.hasState(element, StyleStates.ACTIVE)) {
			return
		}
		MarkupUtils.addState(element, StyleStates.DEFAULT)
		view.removeTools()
		Markup.restoreAtts(model)
	}
	
	static addHover(element: SomeElement): void {
		const model = MarkupUtils.getModel(element)
		/** Ховер можно добавить только тогда, когда стили стандартные */
		if (!model || !MarkupUtils.hasState(element, StyleStates.DEFAULT)) {
			return
		}
		MarkupUtils.addState(element, StyleStates.HOVER)
		Markup.addHoverAttrs(model)
	}
	
	static toggleHover(element: SomeElement): void {
		const model = MarkupUtils.getModel(element)
		if (!model) {
			return
		}
		if (MarkupUtils.hasState(element, StyleStates.HOVER)) {
			MarkupUtils.removeState(element)
			Markup.restoreAtts(model)
		} else if (!MarkupUtils.hasState(element, StyleStates.ACTIVE)) {
			MarkupUtils.addState(element, StyleStates.HOVER)
			Markup.addHoverAttrs(model)
		}
		
	}
	
	static removeHover(element: SomeElement): void {
		const model = MarkupUtils.getModel(element)
		/** Ховер можно удалить только тогда, когда они есть */
		if (!model || !MarkupUtils.hasState(element, StyleStates.HOVER)) {
			return
		}
		MarkupUtils.addState(element, StyleStates.DEFAULT)
		Markup.restoreAtts(model)
	}
	
	static updateAtts(element: joint.dia.ElementView | joint.dia.LinkView): void {
		let model = MarkupUtils.getModel(element), view
		if (MarkupUtils.isModel(element)) {
			view = model && flowchartStore.paperController.findViewByModel(model)
		} else if (MarkupUtils.isView(element)) {
			view = element! as SomeView
		}
		if (!model || !view || !MarkupUtils.hasState(element, StyleStates.ACTIVE)) {
			return
		}
		// Весь прикол тут. БЛОК обновляется когда меняем свойства. Меняю незначительное свойство, чтобы блок обновился
		for (let i = 0; i < 3; i++) {
			model.attr(`${Shape.Selector.root}/filter`, `#ff${i}`)
		}
		
	}
	
	private static addHoverAttrs(model: SomeModel): void {
		if (MarkupUtils.isLine(model)) {
			model.attr('line/data-animation', true)
		} else if (MarkupUtils.isShape(model)) {
			model.attr(`${Shape.Selector.root}/filter`, shapeStyle.SHADOW)
		}
	}
	
	private static addActiveAttrs(model: SomeModel): void {
		Markup.addHoverAttrs(model)
		if (MarkupUtils.isLine(model)) {
			model.attr('wrapper/stroke-opacity', 0.7)
		} else if (MarkupUtils.isShape(model)) {
			model.attr(`${Shape.Selector.optionBackground}/fill`, shapeStyle.ACTIVE_BACKGROUND)
			model.attr(`${Shape.Selector.bodyBackground}/fill`, shapeStyle.ACTIVE_BACKGROUND)
			model.attr(`${Shape.Selector.bodyCircleBackground}/fill`, shapeStyle.ACTIVE_BACKGROUND)
		}
	}
	
	private static restoreAtts(model: SomeModel) {
		if (MarkupUtils.isLine(model)) {
			model.attr('line/data-animation', false)
			model.attr('wrapper/stroke-opacity', 0)
		} else if (MarkupUtils.isShape(model)) {
			model.attr(`${Shape.Selector.root}/filter`, 'none')
			model.attr(`${Shape.Selector.optionBackground}/fill`, shapeStyle.BACKGROUND)
			model.attr(`${Shape.Selector.bodyBackground}/fill`, shapeStyle.BACKGROUND)
			model.attr(`${Shape.Selector.bodyCircleBackground}/fill`, shapeStyle.BACKGROUND)
		}
	}
}
