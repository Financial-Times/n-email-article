import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import Api from './api'
import Actions from './actions'
import reducer from './state'

export default class {

	constructor () {
		this.api = new Api()	
		this.actions = new Actions(this.api)
		this.store = createStore(reducer, applyMiddleware(thunk))
		this.dispatch = action => this.store.dispatch(action)
	}

}
