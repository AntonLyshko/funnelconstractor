import * as joint from 'rappid';
import {dia} from 'rappid';
import _ from 'lodash';
import {flowchartStore} from '@stores/implementation/FlowchartStore';
import {Markup} from '@flowchart/helpers/Markup';
import ElementView = dia.ElementView;

export default class PortHover {
    prevHoveredPortId: string | null = null;
    prevTapPortId: string | null = null;
    prevTapModel: any | null = null;

    reset() {
        this.prevHoveredPortId = null;
    }

    clearHover = (view: any, evt: any) => {
        const {paperController} = flowchartStore;
        paperController.setInteractivity({elementMove: true});
        this.applyHoverStyles(null, view);
    }

    private applyHoverStyles = (port: any, view: any) => {
        const {graphController} = flowchartStore;
        const links = graphController.getConnectedLinks(view.model, {outbound: true, inbound: true});
        const id = view.model.get('id');
        const portLink = links.filter((o) => {
            return o.get('source').port === port && o.get('source').id === id
                || o.get('target').port === port && o.get('target').id === id;
        });
        const prevPortLink = links.filter((o: any) => {
            return o.get('source').port === this.prevHoveredPortId
                || o.get('target').port === this.prevHoveredPortId;
        });

        if (!_.isEmpty(portLink)) {
            portLink.forEach(portItem => {
                if (!flowchartStore.isActive(portItem)) {
                    Markup.addHover(portItem);
                }
            });
        }
        if (!_.isEmpty(prevPortLink)) {
            prevPortLink.forEach(portItem => {
                if (!flowchartStore.isActive(portItem)) {
                    Markup.removeHover(portItem);
                }
            });
        }
        this.reset();
    }

    watchHover = (view: any, evt: any) => {
        const {paperController} = flowchartStore;
        const port = view.findAttribute('port', evt.target);
        if (port !== this.prevHoveredPortId) {
            if (port) {
                paperController.setInteractivity({elementMove: false});
            } else {
                paperController.setInteractivity({elementMove: true});
            }
            this.applyHoverStyles(port, view);
        }
        this.prevHoveredPortId = port;
    };


    portToggle = (view: ElementView, event: any) => {
        const {graphController} = flowchartStore;
        const port = view.findAttribute('port', event.target);
        const links = graphController.getConnectedLinks(view.model, {outbound: true, inbound: true});
        const allLinks = graphController.getLinks();
        const id = view.model.get('id');
        const portLink = links.filter((o) => {
            return o.get('source').port === port && o.get('source').id === id
                || o.get('target').port === port && o.get('target').id === id;
        });


        let prevPortLink: joint.dia.Link[] = [];

        if (port !== this.prevTapPortId) {
            prevPortLink = allLinks.filter((o: any) => {
                return o.get('source').port === this.prevTapPortId
                    || o.get('target').port === this.prevTapPortId;
            });
        }

        if (!_.isEmpty(portLink)) {
            portLink.forEach(portItem => {
                if (!flowchartStore.isActive(portItem)) {
                    const nextValue = !view.model.portProp(port, 'attrs/circle/hovered');
                    view.model.portProp(port, 'attrs/circle/hovered', nextValue);
                    if (!this.prevTapModel) {
                        this.prevTapModel = view.model;
                    }
                    Markup.toggleHover(portItem);
                }
            });
        }

        if (!_.isEmpty(prevPortLink)) {
            prevPortLink.forEach(portItem => {
                if (!flowchartStore.isActive(portItem)) {
                    Markup.removeHover(portItem);
                }
            });
            this.prevTapPortId = null;
        }

        this.prevTapPortId = port;
    }

    restoreTapPort = () => {
        if (!this.prevTapPortId) {
            return;
        }
        if (this.prevTapModel) {
            this.prevTapModel.portProp(this.prevTapPortId, 'attrs/circle/hovered', false);
            this.prevTapModel = null
        }
        const {graphController} = flowchartStore;
        const allLinks = graphController.getLinks();
        const prevPortLink = allLinks.filter((o: any) => {
            return o.get('source').port === this.prevTapPortId
                || o.get('target').port === this.prevTapPortId;
        });
        if (!_.isEmpty(prevPortLink)) {
            prevPortLink.forEach(portItem => {
                if (!flowchartStore.isActive(portItem)) {
                    Markup.removeHover(portItem);
                }
            });
            this.prevTapPortId = null;
        }

    }

}