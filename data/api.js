export default class {

	creditInfo () {
		return fetch('/rtcl-email/actions/credits', { credentials: 'same-origin' })
	}

	gift () {
		return fetch('/rtcl-email/actions/gift', { credentials: 'same-origin' })
	}

	nonGift () {
		return fetch('/rtcl-email/actions/send', { credentials: 'same-origin' })
	}

}
