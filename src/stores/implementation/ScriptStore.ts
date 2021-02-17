import IStep from '@stores/interface/app/IStep';
import * as joint from 'rappid';
import {action, computed, observable, reaction} from 'mobx';
import {IScriptStore} from '@stores/interface';
import {appStore, flowchartStore} from '@stores/implementation';

export class ScriptStore implements IScriptStore {
	@observable script: IStep[] = [];
	
	
	constructor() {
		reaction(() => {
			return this.script;
		}, () => {
		});
	}
	
	@computed
	get getScript() {
		return this.script;
	}
	
	@computed
	get activeStep() {
		let activeElement = flowchartStore.activeElement;
		return this.script.find(step => step.source === activeElement.model.attributes.id);
	}
	
	getShape(attr: any) {
		return {
			body: attr.body,
			type: attr.type,
			class: attr.class,
			dimension: attr.dimension,
			menu_item_id: attr.menu_item_id,
			channel: attr.channel,
			menuTitle: attr.body.content,
			ports: {
				in: attr.ports.in,
				out: attr.ports.out,
				control: attr.ports.control,
			},
			icon: attr.icon,
			header: attr.header,
			options: attr.options,
			footer: attr.footer,
		};
	}
	
	@action
	getStep(step_id: string): IStep {
		let stepIndex = this.script.findIndex(step => step.step_id === step_id);
		return this.script[stepIndex];
	}
	
	@action
	writeStep(view: joint.dia.LinkView | joint.dia.ElementView, cell: joint.dia.Cell): void {
		
		if (!cell.isLink()) {
			
			
			let shape = this.getShape(view.model.attributes);
			
			let id = 0;
			if (this.script) id = this.script.length;
			const step: IStep = {
				source: cell.id,
				target: [],
				type: cell.attributes.name,
				view_name: view.model.attributes.menuTitle,
				class: cell.attributes.class,
				menu_item_id: shape.menu_item_id,
				payload: {
					switch: true,
				},
				shape: shape,
				prev_step_id: [],
				step_id: `step_${id}`,
				next_step_id: [],
				// Common methods
				setViewName(value) {
					this.view_name = value;
					appStore.setStatus({status: 'changed'});
				},
				setTarget(target) {
					this.target.push(target);
					appStore.setStatus({status: 'changed'});
				},
				addNextStep(next_step_id) {
					this.next_step_id = [...this.next_step_id, next_step_id];
					appStore.setStatus({status: 'changed'});
					
				},
				setNextStep(next_step_ids) {
					this.next_step_id = next_step_ids;
					appStore.setStatus({status: 'changed'});
					
				},
				setPrevStep(prev_step_id) {
					this.prev_step_id = prev_step_id;
					appStore.setStatus({status: 'changed'});
					
				},
				addPrevStep(prev_step_id) {
					this.prev_step_id = [...this.prev_step_id, prev_step_id];
					appStore.setStatus({status: 'changed'});
				},
				// Payload methods
				addPayloadItemAdvanced(key, index, key2, value) {
					if (!this.payload[key][index][key2]) this.payload[key][index][key2] = [];
					this.payload[key][index][key2].push(value);
					appStore.setStatus({status: 'changed'});
					
				},
				changePayloadItemAdvanced(key, index1, key2, index2, key3, value) {
					this.payload[key][index1][key2][index2][key3] = value;
					appStore.setStatus({status: 'changed'});
					
				},
				removePayloadItemAdvanced(key, index1, key2, index2) {
					this.payload[key][index1][key2].splice(index2, 1);
					appStore.setStatus({status: 'changed'});
					
				},
				setPayload(key, value) {
					this.payload[key] = value;
					appStore.setStatus({status: 'changed'});
					
				},
				addPayload(key, value) {
					if (!this.payload[key]) this.payload[key] = [];
					this.payload[key].push(value);
					appStore.setStatus({status: 'changed'});
					
				},
				addPayloadItem(key, index, value) {
					if (!this.payload[key]) this.payload[key] = [];
					this.payload[key][index].push(value);
					appStore.setStatus({status: 'changed'});
					
				},
				setPayloadItem(key, index, value) {
					if (!this.payload[key]) this.payload[key] = {};
					this.payload[key][index] = value;
					appStore.setStatus({status: 'changed'});
					
				},
				changePayload(key1, index, key2, value) {
					this.payload[key1][index][key2] = value;
					appStore.setStatus({status: 'changed'});
					
				},
				changePayloadItem(key1, index1, index2, key2, value) {
					this.payload[key1][index1][index2][key2] = value;
					appStore.setStatus({status: 'changed'});
					
				},
				movePayloadItem(key: string, from: number, to: number) {
					[this.payload[key][from], this.payload[key][to]] = [this.payload[key][to], this.payload[key][from]];
					appStore.setStatus({status: 'changed'});
					
				},
				removePayload(key, index) {
					this.payload[key].splice(index, 1);
					appStore.setStatus({status: 'changed'});
					
				},
				removePayloadItem(key, index1, index2) {
					this.payload[key][index1].splice(index2, 1);
					appStore.setStatus({status: 'changed'});
					
				},
				insertPayload(key, index, value) {
					if (!this.payload[key]) this.payload[key] = [];
					this.payload[key].splice(index + 1, 0, value);
					appStore.setStatus({status: 'changed'});
					
				},
				
				// Options methods
				removeAllOptions() {
					this.shape.options.items = [];
					appStore.setStatus({status: 'changed'});
					
				},
				moveOption(from: number, to: number) {
					[this.shape.options.items[from], this.shape.options.items[to]] = [this.shape.options.items[to], this.shape.options.items[from]];
					appStore.setStatus({status: 'changed'});
					
				},
				setPortOption(index, key, value) {
					this.shape.options.items[index].ports[key] = value;
					appStore.setStatus({status: 'changed'});
					
				},
				setOption(index, value) {
					let item = {
						content: value,
						port: {positive: true, negative: false},
						size: {
							stretch: NaN,
							height: 1.5,
						},
					};
					
					if (!this.shape.options.items[index]) {
						this.shape.options.items.push(item);
					} else {
						this.shape.options.items[index].content = value;
					}
					appStore.setStatus({status: 'changed'});
					
					
				},
				addOption(value, port) {
					let item = {
						content: value,
						port: port,
						size: {
							stretch: NaN,
							height: 1.5,
						},
					};
					if (!this.shape.options.items) this.shape.options.items = [];
					this.shape.options.items.push(item);
					appStore.setStatus({status: 'changed'});
					
				},
				removeOption(index) {
					this.shape.options.items.splice(index, 1);
					appStore.setStatus({status: 'changed'});
					
				},
				// Channels methods
				toggleChannel(name) {
					this.shape.channel[name] = !this.shape.channel[name];
					appStore.setStatus({status: 'changed'});
					
				},
			};
			this.script.push(step);
		}
	}
	
	@action
	setStep(serverStep: any): void {
		// поменять view_name на type
		const step: IStep = {
			source: serverStep.source,
			target: [serverStep.target],
			class: serverStep.class,
			view_name: serverStep.view_name,
			type: serverStep.type,
			menu_item_id: serverStep.menu_item_id,
			payload: serverStep.payload,
			shape: serverStep.shape,
			prev_step_id: serverStep.prev_step_id,
			step_id: serverStep.step_id,
			next_step_id: serverStep.next_step_id,
			// Common methods
			setViewName(value) {
				this.view_name = value;
				appStore.setStatus({status: 'changed'});
				
			},
			setTarget(target) {
				this.target.push(target);
				appStore.setStatus({status: 'changed'});
				
			},
			addNextStep(next_step_id) {
				this.next_step_id = [...this.next_step_id, next_step_id];
				appStore.setStatus({status: 'changed'});
				
			},
			setNextStep(next_step_ids) {
				this.next_step_id = next_step_ids;
				appStore.setStatus({status: 'changed'});
				
			},
			setPrevStep(prev_step_id) {
				this.prev_step_id = prev_step_id;
				appStore.setStatus({status: 'changed'});
				
			},
			addPrevStep(prev_step_id) {
				this.prev_step_id = [...this.prev_step_id, prev_step_id];
				appStore.setStatus({status: 'changed'});
				
			},
			// Payload methods
			
			addPayloadItemAdvanced(key, index, key2, value) {
				if (!this.payload[key][index][key2]) this.payload[key][index][key2] = [];
				this.payload[key][index][key2].push(value);
				appStore.setStatus({status: 'changed'});
				
			},
			changePayloadItemAdvanced(key, index1, key2, index2, key3, value) {
				this.payload[key][index1][key2][index2][key3] = value;
				appStore.setStatus({status: 'changed'});
				
			},
			removePayloadItemAdvanced(key, index1, key2, index2) {
				this.payload[key][index1][key2].splice(index2, 1);
				appStore.setStatus({status: 'changed'});
				
			},
			setPayload(key, value) {
				this.payload[key] = value;
				appStore.setStatus({status: 'changed'});
				
			},
			addPayload(key, value) {
				if (!this.payload[key]) this.payload[key] = [];
				appStore.setStatus({status: 'changed'});
				
				this.payload[key].push(value);
			},
			addPayloadItem(key, index, value) {
				if (!this.payload[key]) this.payload[key] = [];
				appStore.setStatus({status: 'changed'});
				
				this.payload[key][index].push(value);
			},
			setPayloadItem(key, index, value) {
				if (!this.payload[key]) this.payload[key] = [];
				appStore.setStatus({status: 'changed'});
				
				this.payload[key][index] = value;
			},
			changePayload(key1, index, key2, value) {
				this.payload[key1][index][key2] = value;
				appStore.setStatus({status: 'changed'});
				
			},
			changePayloadItem(key1, index1, index2, key2, value) {
				this.payload[key1][index1][index2][key2] = value;
				appStore.setStatus({status: 'changed'});
				
			},
			movePayloadItem(key: string, from: number, to: number) {
				[this.payload[key][from], this.payload[key][to]] = [this.payload[key][to], this.payload[key][from]];
				appStore.setStatus({status: 'changed'});
				
			},
			removePayload(key, index) {
				this.payload[key].splice(index, 1);
				appStore.setStatus({status: 'changed'});
				
			},
			removePayloadItem(key, index1, index2) {
				this.payload[key][index1].splice(index2, 1);
				appStore.setStatus({status: 'changed'});
				
			},
			insertPayload(key, index, value) {
				if (!this.payload[key]) this.payload[key] = [];
				this.payload[key].splice(index + 1, 0, value);
				appStore.setStatus({status: 'changed'});
				
			},
			
			// Options methods
			removeAllOptions() {
				this.shape.options.items = [];
				appStore.setStatus({status: 'changed'});
				
			},
			moveOption(from: number, to: number) {
				[this.shape.options.items[from], this.shape.options.items[to]] = [this.shape.options.items[to], this.shape.options.items[from]];
				appStore.setStatus({status: 'changed'});
				
			},
			setPortOption(index, key, value) {
				this.shape.options.items[index].ports[key] = value;
				appStore.setStatus({status: 'changed'});
				
			},
			setOption(index, value) {
				let item = {
					content: value,
					port: {positive: true, negative: false},
					size: {
						stretch: NaN,
						height: 1.5,
					},
				};
				
				if (!this.shape.options.items[index]) {
					this.shape.options.items.push(item);
				} else {
					this.shape.options.items[index].content = value;
				}
				appStore.setStatus({status: 'changed'});
				
				
			},
			addOption(value, port) {
				let item = {
					content: value,
					port: port,
					size: {
						stretch: NaN,
						height: 1.5,
					},
				};
				if (!this.shape.options.items) this.shape.options.items = [];
				this.shape.options.items.push(item);
				appStore.setStatus({status: 'changed'});
				
			},
			removeOption(index) {
				this.shape.options.items.splice(index, 1);
				appStore.setStatus({status: 'changed'});
				
			},
			// Channels methods
			toggleChannel(name) {
				this.shape.channel[name] = !this.shape.channel[name];
				appStore.setStatus({status: 'changed'});
				
			},
		};
		this.script.push(step);
	}
	
	@action
	setLink(link: any): void {
		let sourceStep = this.script.find(step => step.source === link.sourceView.model.id);
		let targetStep = this.script.find(step => step.source === link.targetView.model.id);
		let linkType = link.sourceMagnet.attributes[3].value;
		
		
		if (sourceStep.shape.options && linkType !== 'out' && linkType !== 'negative-footer') {
			if (sourceStep.shape.options.items) {
				let optionIndex = link.model.attributes.source.port.split('-');
				let port = optionIndex[0];
				optionIndex = optionIndex[optionIndex.length - 1];
				sourceStep.shape.options.items[optionIndex].port[port] = targetStep.step_id;
			}
		}
		
		targetStep.addPrevStep(sourceStep.step_id);
		sourceStep.setTarget(targetStep.source);
		sourceStep.addNextStep(targetStep.step_id);
		appStore.setStatus({status: 'changed'});
		
	}
	
	@action
	deleteStep(cell: joint.dia.Cell): void {
		let targetIndex = this.script.findIndex(step => step.source === cell.id);
		let target = this.script[targetIndex];
		
		if (target) {
			let prevSteps = this.script.filter(step => {
				step.prev_step_id.forEach((prev_step_id: any) => {
					return prev_step_id === target.step_id;
				});
			});
			let nextSteps = this.script.filter(step => {
				step.next_step_id.forEach(next_step_id => {
					return next_step_id === target.step_id;
				});
			});
			if (prevSteps.length > 0) {
				prevSteps.forEach(prevStep => {
					prevStep.setTarget('');
					let new_next_steps = prevStep.next_step_id.filter(next_step_id => next_step_id === cell.id);
					prevStep.setNextStep(new_next_steps);
				});
			}
			if (nextSteps.length > 0) {
				nextSteps.forEach(nextStep => {
					nextStep.setTarget('');
					let new_next_steps = nextStep.next_step_id.filter(next_step_id => next_step_id === cell.id);
					nextStep.setNextStep(new_next_steps);
				});
			}
			// //удаление цели
			this.script = this.script.filter(step => step.source !== cell.id);
		}
	}
	
	
}

export const scriptStore = new ScriptStore();
