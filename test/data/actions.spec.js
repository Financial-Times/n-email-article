import { expect } from 'chai'
import sinon from 'sinon'

import Actions from '../../data/actions'

const actions = new Actions({})

describe('data actions', () => {

	it('valid and invalid email addresses', () => {
		const dispatch = sinon.stub()

		const action = actions.validateThenSend()
		action(dispatch, () => ({ emailAddresses: ['b@b.com', 'ben@b.fletch', 'b@b', '@b.com', 'b@'] }))

		const result = dispatch.getCall(0).args.pop()
		expect(result).to.deep.equal({ type: 'VALIDATION_RESULTS', results: [false, false, true, true, true] })
	})

})
