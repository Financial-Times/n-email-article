import React from 'react';

import EmailAddressList from './email-address-list';
import Footnote from './footnote';
import CustomMessage from './custom-message';

export default ({ isReady, isOpen,
		emailAddresses, emailAddressErrors, onEmailAddressChange, onAddEmailAddress, onRemoveEmailAddress,
		customMessage, messageText, image, onMessageTyping, messageLength, onSend, isSending, onClose }) => (
	<div className={`email-article email-article--${isReady && isOpen ? 'open' : 'closed'}`}>
		<div className="email-article__border">
			<button onClick={onClose} type="button" className="o-buttons o-buttons--mono email-article__close"><i>Close</i></button>
			<form noValidate onSubmit={(e) => { e.preventDefault(); onSend() }} className="email-article__container">
				<h1 className="email-article__title">{`${image ? 'Email this graphic and a link to this article' :  'Email this subscriber-only article'}`}</h1>
				<EmailAddressList
						items={emailAddresses}
						errors={emailAddressErrors}
						onItemChange={onEmailAddressChange}
						onAdd={onAddEmailAddress}
						onRemove={onRemoveEmailAddress}
						showMaySub={true}
				/>
				<CustomMessage
						customMessage={customMessage}
						messageText={messageText}
						image={image}
						onMessageTyping={onMessageTyping}
						messageLength={messageLength}
				/>
				<button type="submit" disabled={isSending} className="email-article__submit o-buttons o-buttons--big o-buttons--primary">Send article</button>
				<Footnote />
			</form>
		</div>
	</div>
);
