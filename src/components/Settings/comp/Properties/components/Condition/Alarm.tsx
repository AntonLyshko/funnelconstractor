import React, { useEffect, useState } from 'react';
import { inject, observer } from 'mobx-react';
import { default as IStores, IScriptStore, IFlowchartStore } from '@stores/interface'
import { InputNumber, DatePicker, Space } from 'antd';
import moment from 'moment';



type TProps = {
    scriptStore?: IScriptStore,
    flowchartStore?: IFlowchartStore,

}

const AlarmComponent = inject((stores: IStores) => ({
    scriptStore: stores.scriptStore,

    flowchartStore: stores.flowchartStore
}))(
    observer((props: TProps) => {
        const { scriptStore, flowchartStore } = props;
        const step = scriptStore.activeStep
        const [warning, setWarning] = useState('')
        moment.locale('ru')

        useEffect(() => {
            if (!step.payload['minutes'] || !step.payload['hours'] || !step.payload['date']) {
                step.setPayload('date', moment());
                flowchartStore.changePreviewText('top', moment(step.payload['date']).format("D MMM"))
                step.setPayload('hours', moment().format('H'));
                step.setPayload('minutes', moment().format('m'));
                let time = `${moment().format('H')}ч ${moment().format('m')}м`
                flowchartStore.changePreviewText('bottom', time)
            }
        }, [])

        const onChangeHours = (hours: number) => {
            let time = `${hours}ч ${step.payload.minutes ? step.payload.minutes : '00'}м`
            step.setPayload('hours', hours);
            flowchartStore.changePreviewText('bottom', time)
            timeTravelCheck()
        }

        const timeTravelCheck = () => {
            let now = moment()
            let set = moment(`${step.payload.hours}:${step.payload.minutes} ${moment(step.payload.date).format('YYYY-MM-DD')}`, "h:m YYYY-MM-DD");
            let timing = now.diff(set, 'minutes');

            if (timing > 0) {
                setWarning('Путешествия во времени опыстны для вашего здоровья')
            } else {
                setWarning('')
            }
        }

        const onChangeMinutes = (minutes: number) => {
            let time = `${step.payload.hours ? step.payload.hours : '0'}ч ${minutes}м`
            step.setPayload('minutes', minutes);
            flowchartStore.changePreviewText('bottom', time)
            timeTravelCheck()
        }

        const onChangeDate = (date: any, dateString: string) => {
            step.setPayload('date', date);
            flowchartStore.changePreviewText('top', moment(date).format("D MMM"))
            timeTravelCheck()
        }

        function disabledDate(current: any) {
            let customDate = moment().subtract(1, "days");
            return current && current < moment(customDate, "YYYY-MM-DD");
        }

        return (
            <div className='props-component'>
                <Space direction="vertical">
                    <div className="alarm-container">
                        <div className="date-container">
                            <div className="date-input">
                                <DatePicker placeholder='Выберите дату' disabledDate={disabledDate} onChange={onChangeDate} defaultValue={step.payload['date'] ? step.payload['date'] : moment()} />
                            </div>
                        </div>
                        <div className="timer-container">
                            <div className="timer-input">
                                <InputNumber className='height-fix' min={0} max={23} onChange={onChangeHours} defaultValue={step.payload['hours'] ? step.payload['hours'] : moment().format('H')} /> Ч
                        </div>
                            <div className="timer-input">
                                <InputNumber className='height-fix' min={0} max={59} onChange={onChangeMinutes} defaultValue={step.payload['minutes'] ? step.payload['minutes'] : moment().format('m')} /> М
                        </div>
                        </div>
                        <div className="announcement">
                            {warning}
                        </div>
                    </div>
                </Space>
            </div>
        )
    })
)

export default AlarmComponent;