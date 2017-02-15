import React from 'react';

import GiftOrNotSelection from './gift-or-not-selection';
import EmailAddressList from './email-address-list';
import Footnote from './footnote';
import CustomMessage from './custom-message';

export default ({ isReady, isOpen, isGift, onIsGiftChange, credit, monthlyAllowance,
		emailAddresses, emailAddressErrors, onEmailAddressChange, onAddEmailAddress, onRemoveEmailAddress,
		customMessage, messageText, onMessageTyping, messageLength, onSend, isSending, onClose }) => (
	<div className={`email-article email-article--${isReady && isOpen ? 'open' : 'closed'}`}>
		<div className="email-article__border">
			<button onClick={onClose} type="button" className="o-buttons o-buttons--medium email-article__close"><i>Close</i></button>
			<form noValidate onSubmit={(e) => { e.preventDefault(); onSend() }} className="email-article__container">
				<h1 className="email-article__title">Email this subscriber-only article</h1>
				<GiftOrNotSelection
						isGift={isGift}
						onIsGiftChange={onIsGiftChange}
						credit={credit}
						monthlyAllowance={monthlyAllowance}
				/>
				<div className="email-article__section-break"></div>
				<EmailAddressList
						items={emailAddresses}
						errors={emailAddressErrors}
						onItemChange={onEmailAddressChange}
						onAdd={onAddEmailAddress}
						onRemove={onRemoveEmailAddress}
						isGift={isGift}
						credit={credit}
						showMaySub={true}
				/>
				<CustomMessage
						customMessage={customMessage}
						messageText={messageText}
						onMessageTyping={onMessageTyping}
						messageLength={messageLength}
				/>
				<button type="submit" disabled={isSending} className="email-article__submit o-buttons o-buttons--standout o-buttons--big">Send article</button>
				<Footnote />
			</form>
		</div>
	</div>
);
