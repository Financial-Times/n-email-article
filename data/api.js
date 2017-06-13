function post (url, emailAddresses, articleId, customMessage, imageUrl) {
	return fetch(url, {
		credentials: 'same-origin',
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			contentUUID: articleId,
			recipients: emailAddresses,
			customMessage: customMessage,
			imageUrl: imageUrl
		})
	})
}

export default class {

	creditInfo () {
		return fetch('/article-email/credits', { credentials: 'same-origin' })
	}

	gift (emailAddresses, articleId, customMessage, imageUrl) {
		return post('/article-email/gift', emailAddresses, articleId, customMessage, imageUrl)
	}

	nonGift (emailAddresses, articleId, customMessage, imageUrl) {
		return post('/article-email/send', emailAddresses, articleId, customMessage, imageUrl)
	}

}
