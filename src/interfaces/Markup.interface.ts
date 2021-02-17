import * as joint from 'rappid';

export type SomeView = joint.dia.ElementView | joint.dia.LinkView;
export type SomeModel = joint.dia.Element | joint.dia.Link;
export type SomeElement = SomeView | SomeModel;