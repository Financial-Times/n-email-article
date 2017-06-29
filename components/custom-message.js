import React from 'react';

const LABEL_TEXT = 'Add an optional message';
const MAXIMUM_CHARACTERS = 300;

function characters (maximum, current) {
	const remaining = maximum - current;
	const limitedClass = remaining <= 10 ? ' email-article__message-characters--limited' : '';
	const remainingClasses = `email-article__message-characters${limitedClass}`
	return (
		<span className={remainingClasses}>
			{remaining} character{remaining !== 1 ? 's' : ''} remaining
		</span>
	)
}

function img (image) {
	return image ? (<img className="email-article__message-image" src={image} />) : null;
}

export default ({customMessage, messageText, image, onMessageTyping, messageLength}) => {
	if (customMessage) {
		return (
			<div className="email-article__message o-forms--wide">
			<label className="email-article__message--label o-forms__label">{LABEL_TEXT}
			{characters(MAXIMUM_CHARACTERS, messageLength)}
			</label>
			{img(image)}
			<textarea
			className="o-forms__textarea email-article__message--textarea"
			type="text"
			inputMode="latin-prose"
			maxLength={MAXIMUM_CHARACTERS}
			placeholder="Enter your message"
			rows="7"
			value={messageText}
			onChange={event => onMessageTyping(event.target.value)}></textarea>
			</div>
		)
	}
}
