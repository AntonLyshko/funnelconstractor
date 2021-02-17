import React from 'react';
import {inject, observer} from 'mobx-react';
import {default as IStores} from '@stores/interface';
import {Select} from 'antd';


type IProps = {}

const ModeSelect = inject((stores: IStores) => ({}))(
	observer((props: IProps) => {
			
			const {Option} = Select;
			
			const data = [
				{
					id: 'mode_1',
					name: 'Менеджер',
					link: `#`,
				},
				{
					id: 'mode_2',
					name: 'Обучающий бот',
					link: `#`,
				},
			];
			
			const onChange = (value: any) => {
			};
			
			return (
				<div className='mode-select'>
					<Select className='mode full' defaultValue={data[0].id} style={{fontSize: 12, borderRadius: 3}}
					        onChange={(value) => onChange(value)} bordered={true}>
						{
							data.map((item: any) => {
								return (
									<Option value={item.id}>
										<a href={item.link}>{item.name}</a>
									</Option>
								);
							})
						}
					</Select>
				</div>
			);
		},
	),
);

export default ModeSelect;
