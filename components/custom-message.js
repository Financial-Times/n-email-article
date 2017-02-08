import React from 'react';

const LABEL_TEXT = 'Add an optional message';
const MAXIMUM_CHARACTERS = 300;

function characters (maximum, current) {
	const remaining = maximum - current;
	const limitedClass = remaining <= 10 ? ' email-article__message--characters-limited' : '';
	const remainingClasses = `email-article__message--characters${limitedClass}`
	return (
		<span className={remainingClasses}>
			{remaining} character{remaining !== 1 ? 's' : ''} remaining
		</span>
	)
}

export default ({onMessageTyping, messageLength}) => (
	<div className="email-article__message">
		<div className="email-article__message--label">{LABEL_TEXT}
			{characters(MAXIMUM_CHARACTERS, messageLength)}
		</div>
		<textarea
			className="o-forms-textarea email-article__message--textarea"
			type="text"
			inputMode="latin-prose"
			maxLength={MAXIMUM_CHARACTERS}
			placeholder="Enter your message"
			rows="7"
			onChange={event => onMessageTyping(event.target.value)}></textarea>
	</div>
)