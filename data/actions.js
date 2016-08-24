import { actions as constants } from './constants'

import notification from '@financial-times/n-notification'

function hideKeyboard () {
	document.activeElement.blur()
}

function validateEmail (email) {
	// return true if invalid
	return email !== '' && !email.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)
}

export default class {

	constructor (api) {
		this.api = api
	}

	notifySuccess (title, content) {
		return () => {
			hideKeyboard()
			notification.show({ title: title, content: content, type: 'success' })
		}
	}

	notifyError (title, content) {
		return () => {
			hideKeyboard()
			notification.show({ title: title, content: content, type: 'error' })
		}
	}

	modeChange (mode) {
		return { type: constants.MODE_SET, mode: mode }
	}

	toggleOpenTop () {
		const actions = this
		return (dispatch, getState) => {
			// small delay to render initial CSS to transition from
			const open = () => setTimeout(() => dispatch({ type: constants.TOGGLE_OPEN_TOP }), 100)
			if (getState().isReady) {
				open()
			} else {
				dispatch(actions.getCreditInfo(open))
			}
		}
	}

	toggleOpenBottom () {
		const actions = this
		return (dispatch, getState) => {
			// small delay to render initial CSS to transition from
			const open = () => setTimeout(() => dispatch({ type: constants.TOGGLE_OPEN_BOTTOM }), 100)
			if (getState().isReady) {
				open()
			} else {
				dispatch(actions.getCreditInfo(open))
			}
		}
	}

	getCreditInfo (postAction) {
		const actions = this
		return dispatch => {
			dispatch({ type: constants.GET_CREDIT_INFO })
			return actions.api.creditInfo()
					.then(response => response.json())
					.then(json => dispatch(actions.handleCreditInfoResponse(json)))
					.then(() => { if (postAction) postAction() })
					.catch(() => dispatch(actions.notifyError('Oops.', 'We\'re unable to get gift article credit information. Please try again')))
		}
	}

	handleCreditInfoResponse (json) {
		return { type: constants.GET_CREDIT_INFO_SUCCESS, monthlyAllowance: json.credits.allowance, credit: json.credits.remainingCredits }
	}

	isGiftChange (isGift) {
		return { type: constants.IS_GIFT_CHANGE, isGift: isGift }
	}

	emailAddressChange (index, value) {
		return {type: constants.EMAIL_ADDRESS_CHANGE, index: index, value: value}
	}

	addEmailAddress () {
		return { type: constants.ADD_EMAIL_ADDRESS }
	}

	removeEmailAddress (index) {
		return { type: constants.REMOVE_EMAIL_ADDRESS, index: index }
	}

	validateThenSend () {
		const actions = this
		return (dispatch, getState) => {
			const state = getState()
			const results = state.emailAddresses.map(validateEmail)
			// if all email addresses are blank, then the first one has to be an error
			if (state.emailAddresses.every(email => email === '')) results[0] = true
			dispatch({ type: constants.VALIDATION_RESULTS, results: results })
			if (results.indexOf(true) === -1) {
				dispatch(actions.send())
			}
		}
	}

	send () {
		const actions = this
		return (dispatch, getState) => {
			const state = getState()
			dispatch({ type: constants.SEND })
			const articleId = document.querySelector('.article').getAttribute('data-content-id')
			const fetch = state.isGift ? actions.api.gift : actions.api.nonGift
			const nonBlankEmailAddresses = state.emailAddresses.filter(a => a !== '')
			return fetch(nonBlankEmailAddresses, articleId)
					.then(response => response.json())
					.then(json => {
						dispatch(actions.handleSendResponse(json))
						return json
					})
					.then(json => {
						const count = json.results.filter(r => r.success).length
						let message = `This article has been sent to ${count} recipient${count !== 1 ? 's' : ''}`
						if (state.isGift) {
							const remainder = state.credit - count
							message += `. You can send ${remainder} more gift article${remainder !== 1 ? 's' : ''} this month`
						}
						dispatch(actions.notifySuccess('Sent.', message))
					})
					.then(() => dispatch(actions.getCreditInfo()))
					.catch(() => {
						dispatch(actions.handleSendError())
						dispatch(actions.notifyError('Oops.', 'We\'re unable to send this article right now. Please try again'))
					})
		}
	}

	handleSendResponse () {
		return { type: constants.SEND_SUCCESS }
	}

	handleSendError () {
		return { type: constants.SEND_FAILURE }
	}

	closeTop () {
		return { type: constants.CLOSE_TOP }
	}

	closeBottom () {
		return { type: constants.CLOSE_BOTTOM }
	}

}
