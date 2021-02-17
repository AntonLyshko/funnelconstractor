import React from 'react';
import { Icon } from '@ui';


type TProps = {
    onActive?: (name: string) => void,
    active?: boolean,
    title?: string,
    icon?: string,
    name?: string
}

const SettingsTab = (props: TProps) => {

    const { active, title, icon, name, onActive} = props

    return (
        <div onClick={() => onActive(name)} className={`tab-item ${active ? 'active' : ''}`} >
            {
                icon &&
                <Icon name={icon} />
            }
            {
                title &&
                <span className='tab-title'>{title}</span>
            }
        </div>
    );
};

export default SettingsTab;