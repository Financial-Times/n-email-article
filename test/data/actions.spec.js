import { expect } from 'chai'
import sinon from 'sinon';
import Actions from '../../data/actions'

const actions = new Actions({})


describe('data actions', () => {

	it('um', () => {
		const action = actions.validateThenSend()
		const dispatch = sinon.stub()

		action(dispatch, () => ({ emailAddresses: ['b@b.com', 'b@b'] }))

		const result = dispatch.getCall(0).args.pop()
		expect(result.results).to.deep.equal([false, true])
	});

});
/*
	validateThenSend () {
		const actions = this
		return (dispatch, getState) => {
			const state = getState()
			const results = state.emailAddresses.map(validateEmail)
			// if all email addresses are blank, then the first one has to be an error
			if (state.emailAddresses.every(email => email === '')) results[0] = true
			dispatch({ type: constants.VALIDATION_RESULTS, results: results })
			if (results.indexOf(true) === -1) {
				dispatch(actions.send())
			}
		}
	}
	*/
