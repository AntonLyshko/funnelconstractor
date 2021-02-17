import React from 'react';
import { useClassName } from '@hooks';

import { LayoutId } from '@flowchart/FlowchartModel';
import './MenuStencil.scss';

type TProps = {
    isActive: boolean;
    index: number;
    isOpen: boolean;
}

const MenuStencil = (props: TProps & React.HTMLAttributes<HTMLDivElement>) => {
    const { cn } = useClassName('menu-stencil');
    const { index, isActive, isOpen, ...restProps } = props;
    return (
        <div className={cn('is-active')} id={`${LayoutId.STENCIL}-${index}`} {...restProps} />
    );
}

export default MenuStencil;