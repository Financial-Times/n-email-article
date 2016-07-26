function post (url, emailAddresses, articleId) {
	return fetch(url, {
		credentials: 'same-origin',
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			contentUUID: articleId,
			recipients: emailAddresses
		})
	})
}

export default class {

	creditInfo () {
		return fetch('/article-email/credits', { credentials: 'same-origin' })
	}

	gift (emailAddresses, articleId) {
		return post('/article-email/gift', emailAddresses, articleId)
	}

	nonGift (emailAddresses, articleId) {
		return post('/article-email/send', emailAddresses, articleId)
	}

}
