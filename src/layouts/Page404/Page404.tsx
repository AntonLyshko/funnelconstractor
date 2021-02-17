import * as React from 'react'
import './Page404.scss'
import {Button} from 'antd'
import {Icon} from '@ui'


type IProps = {
	goBack?: boolean,
}

const Page404 = (props: IProps) => {
	
	const {goBack} = props
	
	return (
		<div className="page404">
			<Icon name='solid_page-404' className="page404-icon"/>
			{
				goBack ? (
					<a href={location.origin}>
						<Button type="primary" className={`save-upload-btn`}>
							<Icon name='solid_arrow-left' className="white"/> Назад
						</Button>
					</a>
				) : (<></>)
			}
		</div>
	)
}

export default Page404
