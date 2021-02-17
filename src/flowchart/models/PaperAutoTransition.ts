import * as joint from 'rappid';
import _ from 'lodash';
import GeometryUtils from '@utils/GeometryUtils';
import {PaperSettings} from '@constants/FlowchartConstants';
import {flowchartStore} from '@stores/implementation/FlowchartStore';
import {appStore} from '@stores/implementation';

export default class PaperAutoTransition {
	/**
	 * Начальная точка курсора при перемещения страницы.
	 * Записывается в момент зажатия левой кнопки мыши, очищается при отжатии
	 */
	startMovingPoint: joint.g.Point | null;
	isMoving: boolean;
	
	
	debouncedTransition = _.throttle((center) => {
		flowchartStore.paperScrollerController.transitionToPoint(center.x, center.y, {duration: '500ms'});
		this.startMovingPoint = null;
	}, 500, {trailing: false});
	
	
	reset() {
		this.startMovingPoint = null;
	}
	
	checkMoving() {
		return this.isMoving;
	}
	
	saveMovement() {
		setTimeout(() => {
			if (appStore.uploadStatus.status !== 'changed') {
				appStore.setStatus({status: 'changed'});
			}
		}, 300);
	}
	
	checkTransition(cellView: any, evt: any, x: any, y: any) {
		const currentCursorPoint = new joint.g.Point(x, y);
		if (!this.startMovingPoint) {
			this.startMovingPoint = currentCursorPoint;
		}
		
		const zeroPoint = new joint.g.Point(
			currentCursorPoint.x - this.startMovingPoint.x,
			currentCursorPoint.y - this.startMovingPoint.y,
		);
		
		this.isMoving = false;
		
		switch (GeometryUtils.pointInQuarter(zeroPoint)) {
			case 1:
				currentCursorPoint.translate(PaperSettings.GRID_SIZE, -PaperSettings.GRID_SIZE);
				this.saveMovement();
				this.isMoving = true;
				break;
			case 2:
				currentCursorPoint.translate(PaperSettings.GRID_SIZE, PaperSettings.GRID_SIZE);
				this.saveMovement();
				this.isMoving = true;
				break;
			case 3:
				currentCursorPoint.translate(-PaperSettings.GRID_SIZE, PaperSettings.GRID_SIZE);
				this.saveMovement();
				this.isMoving = true;
				break;
			case 4:
				currentCursorPoint.translate(-PaperSettings.GRID_SIZE, -PaperSettings.GRID_SIZE);
				this.saveMovement();
				this.isMoving = true;
				break;
			case 34:
			case 12:
				currentCursorPoint.translate(0, PaperSettings.GRID_SIZE);
				this.saveMovement();
				this.isMoving = true;
				break;
			case 14:
			case 23:
				currentCursorPoint.translate(PaperSettings.GRID_SIZE, 0);
				this.saveMovement();
				this.isMoving = true;
				break;
		}
		
		
		if (!flowchartStore.paperScrollerController.isPointVisible(currentCursorPoint)) {
			this.debouncedTransition(currentCursorPoint);
		}
	}
}
