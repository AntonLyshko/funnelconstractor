

import React, { useState, Fragment } from 'react';
import { inject, observer } from 'mobx-react';
import { default as IStores, IVariableStore, IScriptStore, IFlowchartStore } from '@stores/interface'
import ControlMsg from './ControlMsg'
import YouTube from 'react-youtube';
import { Icon } from '@ui'
import { Input, Button } from 'antd'

type TProps = {
    index?: number,
    addMsg?: (type: string, index: number) => void,
    scriptStore?: IScriptStore,
    variableStore?: IVariableStore,
    flowchartStore?: IFlowchartStore,
}
const VideoMsg = inject((stores: IStores) => ({
    scriptStore: stores.scriptStore,
    flowchartStore: stores.flowchartStore,
    variableStore: stores.variableStore,
}))(
    observer((props: TProps) => {
        const { scriptStore, flowchartStore, index, addMsg } = props;
        const step = scriptStore.activeStep
        const [reRender, activeReRender] = useState(false);


        const opts: any = {
            height: '175',
            width: '290',
            playerVars: {
                autoplay: 0,
            },
        };


        const handleMove = (index: number, dir: boolean) => {
            if (dir) {
                if (index !== 0) {
                    step.movePayloadItem('msg', index, index - 1)
                    flowchartStore.changeContent(step.payload['msg'][0])
                }
            } else {
                if (index !== step.payload['msg'].length - 1) {
                    step.movePayloadItem('msg', index, index + 1)
                    flowchartStore.changeContent(step.payload['msg'][0])
                }
            }

            //just for re-render
            activeReRender(!reRender)
        }

        const removeMsg = (index: number) => {
            step.removePayload('msg', index)
            flowchartStore.changeContent(step.payload['msg'][0])
            //just for re-render
            activeReRender(!reRender)
        }

        const onChange = (value: string) => {
            step.changePayload('msg', index, 'url', value)
        }

        const onSave = () => {
            let videoId = step.payload.msg[index].url.split('=')[1]
            step.changePayload('msg', index, 'video_id', videoId)
        }

        return (
            <div className="msg-item">
                <div className="msg-item-content">
                    <Input className='variable-input' type="text" placeholder='Ссылка на ютуб видео...' value={step.payload.msg[index].url} onChange={(e) => onChange(e.target.value)} />
                    <Button className='not-full' onClick={onSave} type="primary">
                        <Icon className='fill-white' name={'solid_save'} />
                    </Button>
                    {/* <div className="msg-file-content">
                        <div className="content-icon">
                            <Icon name={'solid_video'} />
                        </div>
                        <div className="content-name">
                            {step.payload.msg[index].url}
                        </div>
                    </div> */}
                </div>
                <div className="msg-video-container">
                    {
                        step.payload.msg[index].video_id ? (
                            <Fragment>
                                <YouTube className='youtube-video' videoId={step.payload.msg[index].video_id} opts={opts} />
                            </Fragment>
                        ) : (<Fragment></Fragment>)
                    }
                </div>

                <ControlMsg index={index} handleMove={handleMove} removeMsg={removeMsg} addMsg={addMsg} />
            </div>

        )

    })
)

export default VideoMsg;