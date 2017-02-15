import { actions, modes } from './constants'

const defaultState = {
	isReady: false,
	isOpenTop: false,
	isOpenBottom: false,
	credit: 0,
	monthlyAllowance: 0,
	isGift: false,
	emailAddresses: [''],
	emailAddressErrors: [false],
	messageText: '',
	messageLength: 0,
	isSending: false
}

const doNotTrackActions = [
	actions.EMAIL_ADDRESS_CHANGE,
	actions.MESSAGE_TEXT_CHANGE
];

function track (state, action) {
	// track some actions
	if (action.type.indexOf('redux') === -1 && !doNotTrackActions.includes(action.type)) {
		// remove email addresses
		const anonymousEmails = state.emailAddresses.map(email => email === '' ? '<blank>' : '<populated>');
		const anonymousState = Object.assign({}, state, { emailAddresses: anonymousEmails });
		delete anonymousState.messageText;
		document.body.dispatchEvent(new CustomEvent('oTracking.event', {
			detail: {
				category: 'email-article',
				action: action.type,
				fullAction: action,
				state: anonymousState
			},
			bubbles: true
		}));
	}
}

export default function reducer (state = defaultState, action) {
	track(state, action)
	switch (action.type) {
		case actions.MODE_SET:
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
				return Object.assign({}, state, { credit: action.credit, monthlyAllowance: action.monthlyAllowance, isGift: action.credit > 0, emailAddresses: [''], isReady: true })

		case actions.IS_GIFT_CHANGE:
					if (action.isGift && state.emailAddresses.length > state.credit)
						return Object.assign({}, state, {
							isGift: action.isGift,
							emailAddresses: state.emailAddresses.slice(0, state.credit)
						})
					else return Object.assign({}, state, { isGift: action.isGift })

		case actions.EMAIL_ADDRESS_CHANGE:
					// some users comma-separate addresses in a single field
					// so we split them up into separate fields
					// and ignore anything over the maximum number allowed
					const maxItems = state.isGift ? state.credit : 10;
					const changed = action.value.split(',')
						// up to the maximum number of email addresses
						.slice(0, maxItems - state.emailAddresses.length + 1);
					const all = state.emailAddresses.slice(0, action.index)
						.concat(changed)
						.concat(state.emailAddresses.slice(action.index + 1));
					return Object.assign({}, state, { emailAddresses: all });

		case actions.ADD_EMAIL_ADDRESS:
					return Object.assign({}, state, {
						emailAddresses: state.emailAddresses.concat('')
					})

		case actions.REMOVE_EMAIL_ADDRESS:
					return Object.assign({}, state, {
						emailAddresses: state.emailAddresses.filter((x, i) => i !== action.index)
					})

		case actions.MESSAGE_TEXT_CHANGE:
					return Object.assign({}, state, {
						messageText: action.value,
						messageLength: action.value.length
					})

		case actions.VALIDATION_RESULTS:
				return Object.assign({}, state, {
						emailAddressErrors: action.results
				})

		case actions.SEND:
					return Object.assign({}, state, { isSending: true })

		case actions.SEND_SUCCESS:
					return Object.assign({}, state, { isSending: false, isOpenTop: false, isOpenBottom: false, isReady: false, messageText: '' })

		case actions.SEND_FAILURE:
			return Object.assign({}, state, { isSending: false })

		default:
					return state

	}
}
