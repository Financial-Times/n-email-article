import React from 'react';
import { modes } from '../data/constants';
import EmailSubOrGiftArticle from './email-sub-or-gift-article';
import EmailSubOnlyArticle from './email-sub-only-article';
import EmailFreeArticle from './email-free-article';

export default class extends React.Component {

	constructor (props) {
		super(props)
	}

	componentWillMount () {
		this.setState(this.props.store.getState())
		this.storeUnsubscribe = this.props.store.subscribe(() => this.setState(this.props.store.getState()))
	}

	componentWillUnmount () {
		this.storeUnsubscribe()
	}

	render () {
		const actions = this.props.actions
		const dispatch = this.props.dispatch
		if (this.state.mode === modes.GIFT_OR_SUB) {
			return (
					<EmailSubOrGiftArticle
							isReady={this.state.isReady}
							isOpen={this.props.isTop ? this.state.isOpenTop : this.state.isOpenBottom}
							isGift={this.state.isGift}
							onIsGiftChange={isGift => dispatch(actions.isGiftChange(isGift))}
							credit={this.state.credit}
							monthlyAllowance={this.state.monthlyAllowance}
							emailAddresses={this.state.emailAddresses}
							emailAddressErrors={this.state.emailAddressErrors}
							onEmailAddressChange={(index, value) => dispatch(actions.emailAddressChange(index, value))}
							onAddEmailAddress={() => dispatch(actions.addEmailAddress())}
							onRemoveEmailAddress={index => dispatch(actions.removeEmailAddress(index))}
							onMessageTyping={(value) => dispatch(actions.messageTextChange(value))}
							messageLength={this.state.messageLength}
							onSend={() => dispatch(actions.validateThenSend())}
							isSending={this.state.isSending}
							onClose={() => dispatch(this.props.isTop ? actions.closeTop() : actions.closeBottom())}
					/>
			)
		} else if (this.state.mode === modes.SUB_ONLY) {
			return (
					<EmailSubOnlyArticle
							isReady={this.state.isReady}
							isOpen={this.props.isTop ? this.state.isOpenTop : this.state.isOpenBottom}
							emailAddresses={this.state.emailAddresses}
							emailAddressErrors={this.state.emailAddressErrors}
							onEmailAddressChange={(index, value) => dispatch(actions.emailAddressChange(index, value))}
							onAddEmailAddress={() => dispatch(actions.addEmailAddress())}
							onRemoveEmailAddress={index => dispatch(actions.removeEmailAddress(index))}
							onMessageTyping={(value) => dispatch(actions.messageTextChange(value))}
							messageLength={this.state.messageLength}
							onSend={() => dispatch(actions.validateThenSend())}
							isSending={this.state.isSending}
							onClose={() => dispatch(this.props.isTop ? actions.closeTop() : actions.closeBottom())}
					/>
			)
		} else if (this.state.mode === modes.FREE) {
			return (
					<EmailFreeArticle
							isReady={this.state.isReady}
							isOpen={this.props.isTop ? this.state.isOpenTop : this.state.isOpenBottom}
							emailAddresses={this.state.emailAddresses}
							emailAddressErrors={this.state.emailAddressErrors}
							onEmailAddressChange={(index, value) => dispatch(actions.emailAddressChange(index, value))}
							onAddEmailAddress={() => dispatch(actions.addEmailAddress())}
							onRemoveEmailAddress={index => dispatch(actions.removeEmailAddress(index))}
							onMessageTyping={(value) => dispatch(actions.messageTextChange(value))}
							messageLength={this.state.messageLength}
							onSend={() => dispatch(actions.validateThenSend())}
							isSending={this.state.isSending}
							onClose={() => dispatch(this.props.isTop ? actions.closeTop() : actions.closeBottom())}
					/>
			)
		}
	}
}
