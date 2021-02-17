import React, { useState } from 'react';
import { useClassName } from '@hooks';
import { Button, Modal } from 'antd';
// @ts-ignore
import SyntaxHighlighter from 'react-syntax-highlighter';
import { inject, observer } from 'mobx-react';
import IStores, { IFlowchartStore, IScriptStore, IVariableStore } from '@stores/interface';

type IProps = {
    flowchartStore?: IFlowchartStore,
    scriptStore?: IScriptStore,
    variableStore?: IVariableStore
}

const GraphGenerator = inject((allStores: IStores) => ({
    flowchartStore: allStores.flowchartStore,
    scriptStore: allStores.scriptStore,
    variableStore: allStores.variableStore
}))(observer((props: IProps) => {
    const { flowchartStore } = props;
    const { cn } = useClassName('graph-generator');
    const [visible, setVisible] = useState(false);

    const logGraph = () => {
        setVisible(true)
    }

    return (
        <div className={cn()}>
            <Button className='graph-generator-btn' onClick={() => logGraph()}>
                Показать граф
            </Button>

            <Modal
                style={{ top: 10 }}
                title="Граф"
                visible={visible}
                onOk={() => setVisible(false)}
                onCancel={() => setVisible(false)}
            >
                <SyntaxHighlighter language="json">
                    {
                        JSON.stringify(flowchartStore.graphController.toJSON(), undefined, 2)
                    }
                </SyntaxHighlighter>
            </Modal>
        </div>
    );
}));

export default GraphGenerator;