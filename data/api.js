export default class {

	creditInfo () {
		return fetch('/rtcl-email/actions/credits', { credentials: 'same-origin' })
	}

	gift (emailAddresses) {
		return fetch('/rtcl-email/actions/gift', {
			credentials: 'same-origin',
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				recipients: emailAddresses
			})
		})
	}

	nonGift (emailAddresses) {
		return fetch('/rtcl-email/actions/send', {
			credentials: 'same-origin',
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				recipients: emailAddresses
			})
		})
	}

}
