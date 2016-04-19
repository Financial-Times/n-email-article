import React from 'react';
import EmailArticleForm from './email-article-form';

export default class extends React.Component {

	constructor (props) {
		super(props)
		this.state = props.store.getState()
	}

	componentDidMount () {
		this.storeUnsubscribe = this.props.store.subscribe(() => this.setState(this.props.store.getState()))
	}

	componentWillUnmount () {
		this.storeUnsubscribe()
	}

	render () {
		const actions = this.props.actions
		const dispatch = this.props.dispatch
		return (
				<EmailArticleForm
						isReady={this.state.isReady}
						isOpen={this.props.isTop ? this.state.isOpenTop : this.state.isOpenBottom}
						isGift={this.state.isGift}
						onIsGiftChange={isGift => dispatch(actions.isGiftChange(isGift))}
						credit={this.state.credit}
						emailAddresses={this.state.emailAddresses}
						onEmailAddressChange={(index, value) => dispatch(actions.emailAddressChange(index, value))}
						onAddEmailAddress={() => dispatch(actions.addEmailAddress())}
						onRemoveEmailAddress={index => dispatch(actions.removeEmailAddress(index))}
						onSend={() => dispatch(actions.send())}
						isSending={this.state.isSending}
						onClose={() => dispatch(this.props.isTop ? actions.closeTop() : actions.closeBottom())}
				/>
		)
	}
}
