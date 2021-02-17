import * as React from 'react';
import {LayoutId} from '@flowchart/FlowchartModel';
import {Layout} from 'antd';

const {Content} = Layout;

import './ContentLayout.scss';
import {useClassName} from '@hooks';


const ContentLayout = () => {
    const {cn} = useClassName('content-layout')
    return (
        <Content style={{position: 'relative'}} className={cn()}>
            <div id={LayoutId.NAVIGATOR}/>
            <div id={LayoutId.PAPER}/>
        </Content>
    );
}

export default ContentLayout;
