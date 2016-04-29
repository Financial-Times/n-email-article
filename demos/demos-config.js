import React from 'react'

const apiConstants = {
	CREDIT_INFO: 'CREDIT_INFO',
	GIFT: 'GIFT',
	NON_GIFT: 'NON_GIFT'
}

const apiConstantToNames = {
	CREDIT_INFO: 'creditInfo',
	GIFT: 'gift',
	NON_GIFT: 'nonGift'
}

const responseConstants = {
	GOOD_RESPONSE: 'GOOD_RESPONSE',
	UNEXPECTED_RESPONSE: 'UNEXPECTED_RESPONSE',
	ERROR: 'ERROR'
}

export default class extends React.Component {

	constructor (props) {
		super(props)
		const state = {}
		// set defaults
		state.credit = 10
		state.responseTime = 0
		Object.keys(apiConstants).forEach(api => {
			state[api] = Object.keys(responseConstants)[0]
		})
		this.state = state
		// update the mock functions
		this.update()
	}

	getResponse (api, responseType, credit, responseTime) {
		let json
		switch (responseType) {
			case responseConstants.GOOD_RESPONSE:
					if (api === apiConstants.CREDIT_INFO)
							json = { credits: { remainingCredits: credit }}
					else
							json = {results: [{recipient: 'test-forward@ftqa.org', success: true, message: 'ok'}]}
					return () => new Promise((resolve) => setTimeout(() => resolve({json: () => json}), responseTime))

			case responseConstants.UNEXPECTED_RESPONSE:
					json = {error: 'oops'}
					return () => new Promise((resolve) => setTimeout(() => resolve({json: () => json}), responseTime))

			case responseConstants.ERROR:
					return () => new Promise((resolve, reject) => setTimeout(() => reject(), responseTime))

		}
	}

	createMockApis () {
		const apiResponses = {}
		Object.keys(apiConstants).forEach(api => {
			apiResponses[apiConstantToNames[api]] = this.getResponse(api, this.state[api], this.state.credit, this.state.responseTime)
		})
		return apiResponses
	}

	onApiResponseChange (api, response) {
		const partialState = {}
		partialState[api] = response
		this.setState(partialState, () => {
			// update the mock functions
			this.update()
		})
	}

	onCreditChange (credit) {
		this.setState({credit: credit}, () => {
			// update the mock functions
			this.update()
		})
	}

	onResponseTimeChange (time) {
		this.setState({responseTime: time}, () => {
			// update the mock functions
			this.update()
		})
	}

	update () {
		// update the mock functions
		this.props.onChange(this.createMockApis())
	}

	render () {

		const apiResponses = Object.keys(apiConstants).map(api => {
			const responses = Object.keys(responseConstants).map(response => {
				const id = `demos__${api}--${response}`
				return (
						<div>
							<input type="radio" className="o-forms-radio" id={id}
										 checked={this.state[api] === response}
										 onChange={() => this.onApiResponseChange(api, response)}/>
							<label className="o-forms-label" htmlFor={id}>
								{response}
							</label>
						</div>
				)
			})
			return (
					<div>
						<h3>{api}</h3>
						{responses}
					</div>
			)
		})

		const credit = (
				<div>
					<label htmlFor="demos__credit" className="o-forms-label">Gift credit</label>
					<input type="number" className="o-forms-number" id="demos__credit"
								 value={this.state.credit} onChange={(event) => this.onCreditChange(parseInt(event.target.value, 10))}></input>
				</div>
		)

		const responseTime = (
				<div>
					<label htmlFor="demos__response-time" className="o-forms-label">Response time (ms)</label>
					<input type="number" className="o-forms-number" id="demos__response-time"
								 value={this.state.responseTime} onChange={(event) => this.onResponseTimeChange(parseInt(event.target.value, 10))}></input>
				</div>
		)

		return (
				<div>
					{apiResponses}
					{credit}
					{responseTime}
				</div>
		)

	}

}
