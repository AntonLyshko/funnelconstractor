import * as React from 'react'
import * as ReactDOM from 'react-dom'
import App from './App'
import 'mobx-react/batchingForReactDom'
import '@images/icons/index'
import './styles/index.scss'
import './styles/ant/index.scss'
import './vendor/rappid.min.css'
import * as stores from '@stores/implementation'
import {Provider} from 'mobx-react'

// @ts-ignore
import {BrowserRouter} from 'react-router-dom'


ReactDOM.render(
	<Provider {...stores}>
		<BrowserRouter>
			<App/>
		</BrowserRouter>
	</Provider>, document.getElementById('root'),
)
