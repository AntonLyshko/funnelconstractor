import React, {Fragment} from 'react';
import {Scrollbars} from '@ui';


type TProps = {
	errorData: any
}
const ErrorPopover = (props: TProps) => {
	const {errorData} = props;
	
	
	return (
		<div className='error-popover'>
			<Scrollbars autoHide className='left-sidebar-layout scrollbars menu-variable-scroll'>
				{
					Array.isArray(errorData) ? (<Fragment>
						{
							errorData.map((item: any) => {
								return (
									<div className="error-item">
										{item}
									</div>
								);
							})
						}
					</Fragment>) : (<Fragment>
						<div className="error-item">
							{errorData}
						</div>
					</Fragment>)
				}
			</Scrollbars>
		</div>
	);
};


export default ErrorPopover;
