import React from 'preact-compat';

const MAXIMUM_CHARACTERS = 300;

function characters (maximum, current) {
	const remaining = maximum - current;
	const limitedClass = remaining <= 10 ? ' email-article__message-characters--limited' : '';
	const remainingClasses = `email-article__message-characters${limitedClass}`;
	return (
		<span className={remainingClasses}>
			{remaining} character{remaining !== 1 ? 's' : ''} remaining
		</span>
	);
}

function img (image) {
	return image ? (<div className="email-article__message-image"><img src={image} /></div>) : null;
}

function labelText (image) {
	return image ? 'Add an optional message to this chart' : 'Add an optional message';
}

export default ({messageText, image, onMessageTyping, messageLength}) => (
	<div className="email-article__message o-forms--wide">
		<label className="email-article__message--label o-forms__label">{labelText(image)}
			{characters(MAXIMUM_CHARACTERS, messageLength)}
		</label>
		{img(image)}
		<textarea
			className="o-forms__textarea email-article__message-textarea"
			type="text"
			inputMode="latin-prose"
			maxLength={MAXIMUM_CHARACTERS}
			placeholder="Enter your message"
			rows="7"
			value={messageText}
			onChange={event => onMessageTyping(event.target.value)}
		/>
	</div>
);
