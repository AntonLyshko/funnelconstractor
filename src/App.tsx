import React, {useEffect, Fragment} from 'react'
import {inject, observer} from 'mobx-react'
import {Layout} from 'antd'
import {ContentLayout, HeaderLayout, SidebarLeftLayout, SidebarRightLayout} from '@layouts'
import FlowchartModel, {LayoutId} from '@flowchart/FlowchartModel'
import IStores, {IAppStore} from '@stores/interface'
import {isLogged} from '@actions'
import {Route, Switch} from 'react-router'
import Page404 from '@layouts/Page404/Page404'

// @ts-ignore
import Cookie from 'js-cookie'


type IProps = {
	appStore?: IAppStore
}


const App = inject((stores: IStores) => ({appStore: stores.appStore}))(
	observer((props: IProps) => {
		
		const {appStore} = props
		
		useEffect(() => {
			async function init() {
				try {
					//for safari browser
					setTimeout(function () {
						// Hide the address bar!
						window.scrollTo(0, 1)
					}, 0)
					await appStore.initialization()
					const flowchart = new FlowchartModel()
					flowchart.draw(appStore.menu.items)
					
				} catch (e) {
					throw new Error(e)
				}
			}
			
			init()
		}, [])
		
		
		// Check auth when changing browser tabs
		document.addEventListener('visibilitychange', async () => {
			let paramsString = document.location.search
			let searchParams = new URLSearchParams(paramsString)
			let encrypted_session_data = searchParams.get('encrypted_session_data') || Cookie.get('encrypted_session_data')
			let logged_res = await isLogged()
			
			console.log('Login', logged_res['data'].data.success)
			
			if (!logged_res['data'].data.success) {
				Cookie.remove('encrypted_session_data')
			}
			
			if (!logged_res['data'].data.success && !encrypted_session_data) {
				window.location.href = `https://account.dev.prodamus.ru/?redirect_url=${window.location.href}`
			}
		})
		
		
		return (
			<Layout id={LayoutId.APP} style={{minHeight: '100vh'}}>
				{
					appStore.page404 ? (<Fragment>
						<Page404 goBack={false}/>
					</Fragment>) : (<Fragment>
						<Switch>
							< Route exact path='/'>
								<SidebarLeftLayout/>
								<Layout className='site-layout'>
									<HeaderLayout/>
									<ContentLayout/>
									{/* <FooterLayout /> */}
								</Layout>
								<SidebarRightLayout/>
							</Route>
							<Route exact strict>
								<Page404 goBack={true}/>
							</Route>
						</Switch>
					</Fragment>)
				}
			</Layout>
		)
	}))


export default App
