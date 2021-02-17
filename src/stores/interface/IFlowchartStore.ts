import * as joint from 'rappid';

export default interface IFlowchartStore {
	activeElement: joint.dia.LinkView | joint.dia.ElementView | null;
	paperController: joint.dia.Paper;
	graphController: joint.dia.Graph;
	paperScrollerController: joint.ui.PaperScroller;
	clipboardController: joint.ui.Clipboard;
	selectionController: joint.ui.Selection;
	stencilControllers: joint.ui.Stencil[];
	keyboardController: joint.ui.Keyboard;
	isActive: (view: joint.dia.ElementView | joint.dia.LinkView | joint.dia.Element | joint.dia.Link) => boolean;
	setActive: (element: joint.dia.ElementView | joint.dia.LinkView | null, event?: any) => void;
	deleteActive: () => void;
	toggleChannel: (channel: string) => void;
	addOption: (value: string, port: any[any]) => void;
	changeOption: (index: number, value: string) => void;
	portToggleOption: (index: number, value: string) => void;
	changeTitle: (value: string) => void;
	changeContent: (value: any) => void;
	moveOption: (to: number, from: number) => void;
	removeOption: (index: number) => void;
	readonly activeLink: joint.dia.LinkView | null;
	readonly activeShape: joint.dia.ElementView | null;
	initStencils: (itemsByCategories: object) => void;
	switchToggle: () => void;
	changePort: (key: string, value: number) => void;
	updateFlowchart: () => void;
	changePreviewText: (key: string, value: string) => void;
	removeAllOption: () => void;
	initCells: () => void;
}
