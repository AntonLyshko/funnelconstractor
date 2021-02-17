import axios from './axios'
import {appStore} from '@stores/implementation'

async function getMenu() {
	let resData: any
	resData = await axios.get('/api/v1/funnel/get-menu').catch(err => {
		if (err.response.status === 404) {
			appStore.set404()
		}
	})
	return resData.data.data
	
}

async function isLogged() {
	let resData: any
	resData = await axios.get('/api/v1/user/is-logged', {withCredentials: true}).catch(err => {
		if (err.response.status === 404) {
			appStore.set404()
		}
	})
	return resData
}

async function setSession(sessionId: any) {
	let resData: any
	const formData = new FormData()
	formData.append('encrypted_session_data', sessionId)
	resData = await axios.post(`/api/v1/user/set-session`, formData, {withCredentials: true}).catch(err => {
		if (err.response.status === 404) {
			appStore.set404()
		}
	})
	return resData
}

async function sendData(data: any) {
	let resData: any
	resData = await axios.post('/api/v1/funnel/save', JSON.stringify(data)).catch(err => {
		if (err.response.status === 404) {
			appStore.set404()
		}
	})
	return resData
}

async function updateData(id: string, data: any) {
	let resData: any
	resData = await axios.post(`/api/v1/funnel/update?id=${id}`, JSON.stringify(data)).catch(err => {
		if (err.response.status === 404) {
			appStore.set404()
		}
	})
	return resData
}

async function getFunnel(id: any) {
	let resData: any
	await axios.get(`/api/v1/funnel/get?id=${id}`).then(response => {
		console.log('Getting data', response.data)
		resData = {
			script: response.data.data.script,
			graph: response.data.data.graph,
			variables: response.data.data.variables
		}
	}).catch(err => {
		if (err.response.status === 404) {
			appStore.set404()
		}
	})
	return resData
}

export {
	setSession,
	isLogged,
	getMenu,
	sendData,
	getFunnel,
	updateData
}
