import React from 'react';
import { inject, observer } from 'mobx-react';
import { default as IStores } from '@stores/interface'
import { Icon } from '@ui';
import MenuMsg from './MenuMsg'


type TProps = {
    index?: number,
    removeMsg?: (index: number) => void,
    handleMove?: (index: number, dir: boolean) => void,
    addMsg?: (type: string, index: number) => void,
}
const ControlMsg = inject((stores: IStores) => ({

}))(
    observer((props: TProps) => {
        const { index, handleMove, removeMsg, addMsg } = props

        return (
            <div className="msg-item-control">
                <div className='condition-item-arrow'>
                    <div onClick={() => handleMove(index, true)} className='arrow-condition up'>
                        <Icon name='solid_angle-up' />
                    </div>
                    <div onClick={() => handleMove(index, false)} className='arrow-condition down'>
                        <Icon name='solid_angle-down' />
                    </div>
                </div>
                <MenuMsg index={index} addMsg={addMsg} />
                <div onClick={() => removeMsg(index)} className="msg-item-delete-trigger">
                    <Icon name='solid_trash' />
                </div>
            </div>


        )

    })
)

export default ControlMsg;