export default class {

	creditInfo () {
		return fetch('/rtcl-email/actions/credits')
	}

	gift () {
		return fetch('/rtcl-email/actions/gift')
	}

	nonGift () {
		return fetch('/rtcl-email/actions/send')
	}

}
