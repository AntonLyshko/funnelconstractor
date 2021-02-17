import React, { useState } from 'react';
import { inject, observer } from 'mobx-react';
import { default as IStores } from '@stores/interface'
import SetIncome from '../../components/SetIncome';
import General from '../General'
import Channel from '../../components/Channel'
import Keywords from '../../components/Listen/Keywords'
import RepeatControl from '../../components/RepeatControl'
import ComparisonType from '../../components/ComparisonType'


type TProps = {

}


const IncomeMsg = inject((stores: IStores) => ({

}))(
    observer((props: TProps) => {

        const [activePanel, setActivePanel] = useState('')

        return (
            <div className="props-item">
                <General />
                <Keywords />
                <ComparisonType activePanel={activePanel} setActivePanel={setActivePanel} />
                <RepeatControl activePanel={activePanel} setActivePanel={setActivePanel} />
                <SetIncome activePanel={activePanel} setActivePanel={setActivePanel} />
                <Channel activePanel={activePanel} setActivePanel={setActivePanel} />
            </div>

        );
    })
)

export default IncomeMsg;