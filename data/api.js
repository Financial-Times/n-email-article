function post (url, emailAddresses, articleId, customMessage) {
	return fetch(url, {
		credentials: 'same-origin',
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			contentUUID: articleId,
			recipients: emailAddresses,
			customMessage: customMessage
		})
	})
}

export default class {

	creditInfo () {
		return fetch('/article-email/credits', { credentials: 'same-origin' })
	}

	gift (emailAddresses, articleId) {
		return post('/article-email/gift', emailAddresses, articleId, customMessage)
	}

	nonGift (emailAddresses, articleId) {
		return post('/article-email/send', emailAddresses, articleId, customMessage)
	}

}
