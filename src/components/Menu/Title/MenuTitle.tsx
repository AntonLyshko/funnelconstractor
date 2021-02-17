import React from 'react';
import {useClassName} from '@hooks';
import {Icon} from '@ui';

import './MenuTitle.scss';

type TProps = {
    icon: string;
    text: string;
    isActive?: boolean;
    isHover?: boolean;
    isOpen: boolean;
}

const MenuTitle = (props: TProps & React.HTMLAttributes<HTMLDivElement>) => {
    const {cn} = useClassName('menu-title');
    const {icon, text, isActive, isHover, isOpen, ...restProps} = props;
    return (
        <div className={cn({'is-active': isActive, 'is-hover': isHover, 'collapsed': !isOpen})} {...restProps}>
            <Icon className={cn('icon')} name={icon}/>
            <span className={cn('label')}>{text}</span>
            <Icon className={cn('chevron')} name={isActive ? 'solid_chevron-up' : 'solid_chevron-down'}/>
        </div>
    );
}

export default MenuTitle;