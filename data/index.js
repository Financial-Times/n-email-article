import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import Api from './api'
import Actions from './actions'
import reducer from './state'

export default class {

	constructor (mode) {
		this.api = new Api()	
		this.actions = new Actions(this.api)
		this.store = createStore(reducer, applyMiddleware(thunk))
		this.dispatch = this.store.dispatch
		this.dispatch(this.actions.modeChange(mode))
	}

}
