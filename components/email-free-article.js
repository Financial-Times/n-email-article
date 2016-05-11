import React from 'react';

import EmailAddressList from './email-address-list';

export default ({ isReady, isOpen,
		emailAddresses, emailAddressErrors, onEmailAddressChange, onAddEmailAddress, onRemoveEmailAddress,
		onSend, isSending, onClose }) => (
	<div className={`email-article email-article--${isReady && isOpen ? 'open' : 'closed'}`}>
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
			<button onClick={onSend} disabled={isSending} className="email-article__submit o-buttons o-buttons--standout o-buttons--big">Send article</button>
			<div className="email-article__footnote">
				This email will show up in their inbox from the Financial Times
			</div>
		</form>
	</div>
);
