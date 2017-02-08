import React from 'react';

import EmailAddressList from './email-address-list';
import Footnote from './footnote';

export default ({ isReady, isOpen,
		emailAddresses, emailAddressErrors, onEmailAddressChange, onAddEmailAddress, onRemoveEmailAddress,
		onMessageTyping, messageLength, onSend, isSending, onClose }) => (
	<div className={`email-article email-article--${isReady && isOpen ? 'open' : 'closed'}`}>
		<div className="email-article__border">
			<button onClick={onClose} type="button" className="o-buttons o-buttons--medium email-article__close"><i>Close</i></button>
			<form noValidate onSubmit={(e) => { e.preventDefault(); onSend() }} className="email-article__container">
				<h1 className="email-article__title">Email this free article</h1>
				<EmailAddressList
						items={emailAddresses}
						errors={emailAddressErrors}
						onItemChange={onEmailAddressChange}
						onAdd={onAddEmailAddress}
						onRemove={onRemoveEmailAddress}
				/>
				<CustomMessage
						onMessageTyping={onMessageTyping}
						messageLength={messageLength}
				/>
				<button type="submit" disabled={isSending} className="email-article__submit o-buttons o-buttons--standout o-buttons--big">Send article</button>
				<Footnote />
			</form>
		</div>
	</div>
);
