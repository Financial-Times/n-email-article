import React from 'react'

import { modes as modeConstants } from '../data/constants'

export const modeToLabels = {
	GIFT_OR_SUB: 'Gift or subcribers',
	SUB_ONLY: 'Subscribers only',
	FREE: 'Free'
}

const apiConstants = {
	CREDIT_INFO: 'Credit info',
	GIFT: 'Gift',
	NON_GIFT: 'Non-gift'
}

const apiConstantToFunctionNames = {
	CREDIT_INFO: 'creditInfo',
	GIFT: 'gift',
	NON_GIFT: 'nonGift'
}

const responseConstants = {
	GOOD_RESPONSE: 'Good response',
	UNEXPECTED_RESPONSE: 'Unexpected response',
	ERROR: 'Error'
}

export default class extends React.Component {

	constructor (props) {
		super(props)
		const state = {}
		// set defaults
		state.mode = Object.keys(modeConstants)[0]
		state.credit = 10
		state.responseTime = 0
		Object.keys(apiConstants).forEach(api => {
			state[api] = Object.keys(responseConstants)[0]
		})
		this.state = state

		this.update()
	}

	getResponse (api, responseType, credit, responseTime) {
		let json
		switch (responseConstants[responseType]) {
			case responseConstants.GOOD_RESPONSE:
					if (apiConstants[api] === apiConstants.CREDIT_INFO)
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
			apiResponses[apiConstantToFunctionNames[api]] = this.getResponse(api, this.state[api], this.state.credit, this.state.responseTime)
		})
		return apiResponses
	}

	onApiResponseChange (api, response) {
		const partialState = {}
		partialState[api] = response
		this.setState(partialState, () => {
			this.update()
		})
	}

	onCreditChange (credit) {
		this.setState({credit: credit}, () => {
			this.update()
		})
	}

	onResponseTimeChange (time) {
		this.setState({responseTime: time}, () => {
			// update the mock functions
			this.update()
		})
	}

	onModeChange (mode) {
		this.setState({mode: mode}, () => {
			this.update()
		})
	}

	update () {
		this.props.onConfigChange(this.state.mode, this.createMockApis())
	}

	render () {

		const modeOptions = Object.keys(modeConstants).map(mode => {
			const id = `demos__mode--${mode}`
			return (
					<div key={mode} className="o-forms-group">
						<input type="radio" className="o-forms-radio" id={id}
									 checked={this.state.mode === mode}
									 onChange={() => this.onModeChange(mode)}/>
						<label className="o-forms-label" htmlFor={id}>
							{modeToLabels[mode]}
						</label>
					</div>
			)
		})

		const modes = (
			<div>
				<h3>Mode</h3>
				{modeOptions}
			</div>
		)

		const apiResponses = Object.keys(apiConstants).map(api => {
			const responses = Object.keys(responseConstants).map(response => {
				const id = `demos__${api}--${response}`
				return (
						<div key={id} className="o-forms-group">
							<input type="radio" className="o-forms-radio" id={id}
										 checked={this.state[api] === response}
										 onChange={() => this.onApiResponseChange(api, response)}/>
							<label className="o-forms-label" htmlFor={id}>
								{responseConstants[response]}
							</label>
						</div>
				)
			})
			return (
					<div key={api}>
						<h3>{apiConstants[api]}</h3>
						{responses}
					</div>
			)
		})

		const credit = (
				<div className="o-forms-group">
					<label htmlFor="demos__credit" className="o-forms-label">Gift credit</label>
					<input type="number" className="o-forms-text" id="demos__credit"
								 value={this.state.credit} onChange={(event) => this.onCreditChange(parseInt(event.target.value, 10))}></input>
				</div>
		)

		const responseTime = (
				<div className="o-forms-group">
					<label htmlFor="demos__response-time" className="o-forms-label">Response time (ms)</label>
					<input type="number" className="o-forms-text" id="demos__response-time"
								 value={this.state.responseTime} onChange={(event) => this.onResponseTimeChange(parseInt(event.target.value, 10))}></input>
				</div>
		)

		return (
				<div>
					<h2 className="demos__config-title">Configure demo</h2>
					{modes}
 					{apiResponses}
					{credit}
					{responseTime}
				</div>
		)

	}

}
