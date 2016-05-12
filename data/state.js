import { actions, modes } from './constants'

const defaultState = {
	isReady: false,
	isOpenTop: false,
	isOpenBottom: false,
	credit: 0,
	isGift: false,
	emailAddresses: [''],
	emailAddressErrors: [false],
	isSending: false
}

export default function reducer (state = defaultState, action) {
	// TODO: probably should not track certain actions such as EMAIL_ADDRESS_CHANGE
	// and the actual email addresses... to be discussed
	document.body.dispatchEvent(new CustomEvent('oTracking.event', {
		detail: { action: action, state: state },
		bubbles: true
	}))
	switch (action.type) {
		case actions.MODE_CHANGE:
				return Object.assign({}, state, {
					mode: action.mode,
					isReady: action.mode !== modes.GIFT_OR_SUB, // need to get credit info
					isGift: action.mode === modes.GIFT_OR_SUB
				})

		case actions.TOGGLE_OPEN_TOP:
				return Object.assign({}, state, { isOpenTop: !state.isOpenTop })

		case actions.TOGGLE_OPEN_BOTTOM:
				return Object.assign({}, state, { isOpenBottom: !state.isOpenBottom })

		case actions.CLOSE_TOP:
				return Object.assign({}, state, { isOpenTop: false })

		case actions.CLOSE_BOTTOM:
				return Object.assign({}, state, { isOpenBottom: false })

		case actions.GET_CREDIT_INFO:
				return state

		case actions.GET_CREDIT_INFO_SUCCESS:
				return Object.assign({}, state, { credit: action.credit, isGift: action.credit > 0, emailAddresses: [''], isReady: true })

		case actions.IS_GIFT_CHANGE:
					if (action.isGift && state.emailAddresses.length > state.credit)
						return Object.assign({}, state, {
							isGift: action.isGift,
							emailAddresses: state.emailAddresses.slice(0, state.credit)
						})
					else return Object.assign({}, state, { isGift: action.isGift })

		case actions.EMAIL_ADDRESS_CHANGE:
					return Object.assign({}, state, {
						emailAddresses: state.emailAddresses.map((x, i) => i === action.index ? action.value : x)
					})

		case actions.ADD_EMAIL_ADDRESS:
					return Object.assign({}, state, {
						emailAddresses: state.emailAddresses.concat('')
					})

		case actions.REMOVE_EMAIL_ADDRESS:
					return Object.assign({}, state, {
						emailAddresses: state.emailAddresses.filter((x, i) => i !== action.index)
					})

		case actions.VALIDATION_RESULTS:
				return Object.assign({}, state, {
						emailAddressErrors: action.results
				})

		case actions.SEND:
					return Object.assign({}, state, { isSending: true })

		case actions.SEND_SUCCESS:
					return Object.assign({}, state, { isSending: false, isOpenTop: false, isOpenBottom: false, isReady: false })

		case actions.SEND_FAILURE:
			return Object.assign({}, state, { isSending: false })

		default:
					return state

	}
}
