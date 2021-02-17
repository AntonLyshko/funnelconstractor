import * as joint from 'rappid';
import {flowchartStore} from '@stores/implementation/FlowchartStore';

// TODO: разобраться и оптимизировать
let precision = 100;

function getLengthForPoint(pathLength: any, p: any, thePath: any, division: any, debug?: boolean) {
	let theRecord = pathLength;
	let theSegment;
	for (let i = 0; i < precision; i++) {
		let _p = thePath.getPointAtLength(i * division);
		let theDistance = dist(_p, p);
		
		if (theDistance < theRecord) {
			theRecord = theDistance;
			theSegment = i;
		}
	}
	return (theSegment * division);
}

function dist(p1: any, p2: any) {
	let dx = p2.x - p1.x;
	let dy = p2.y - p1.y;
	return Math.sqrt(dx * dx + dy * dy);
}


export default class ToolFactory {
	
	getMarkup() {
		return [{
			tagName: 'circle',
			selector: 'button',
			attributes: {
				'r': 11,
				'fill': '#e74c3c',
				'cursor': 'pointer',
			},
		}, {
			tagName: 'path',
			selector: 'icon',
			attributes: {
				'd': 'M -5 -5 5 5 M -5 5 5 -5',
				'stroke': '#fff',
				'stroke-width': 2,
				'cursor': 'pointer',
			},
		}];
	}
	
	
	makeShapeTools(point?: any, element?: joint.dia.LinkView | joint.dia.ElementView) {
		const tools = [];
		if (element instanceof joint.dia.LinkView) {
			// TODO: jQuery отдает HTMLElement
			// @ts-ignore
			const path = element.$el.children()[0]! as SVGPathElement;
			const pathLength = path.getTotalLength();
			let division = pathLength / precision;
			const begin = path.getPointAtLength(0);
			const end = path.getPointAtLength(pathLength);
			
			/** Особенность в том, что надо определить ближайшую точку левой верхней точке. Так как линия может быть перенесена зеркально относительно начала */
			const pointClick = {
				x: end.x - begin.x > 0 ? begin.x + point.x : end.x + point.x,
				y: end.y - begin.y > 0 ? begin.y + point.y : end.y + point.y,
			};
			let theDistanceBetween2PointsOnThePath = getLengthForPoint(pathLength, pointClick, path, division);
			let distance = Math.abs(theDistanceBetween2PointsOnThePath) > 60 ?
				Math.abs(theDistanceBetween2PointsOnThePath) - 20 : 40;
			
			
			tools.push(
				new joint.linkTools.Remove({
					distance: distance,
					offset: 0,
					markup: this.getMarkup(),
					action: function (_evt, view) {
						flowchartStore.deleteActive();
					},
				}),
			);
		} else {
			tools.push(
				new joint.elementTools.Remove({
					x: '100%',
					markup: this.getMarkup(),
					useModelGeometry: true,
					action: function (_evt, view) {
						flowchartStore.deleteActive();
					},
				}),
			);
		}
		return new joint.dia.ToolsView({
			tools,
		});
	}
}
