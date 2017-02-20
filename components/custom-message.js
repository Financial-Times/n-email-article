import React from 'react';

const LABEL_TEXT = 'Add an optional message';
const MAXIMUM_CHARACTERS = 300;

export default class extends React.Component {

	constructor (props) {
		super (props);
	}

	//HACK to fix IE11 bug https://github.com/developit/preact/issues/326
	shouldComponentUpdate({ messageText }) {
		return messageText !== this.props.messageText && messageText !== this.base.messageText;
	}

	characters (maximum, current) {
		const remaining = maximum - current;
		const limitedClass = remaining <= 10 ? ' email-article__message--characters-limited' : '';
		const remainingClasses = `email-article__message--characters${limitedClass}`
		return (
			<span className={remainingClasses}>
			{remaining} character{remaining !== 1 ? 's' : ''} remaining
			</span>
		)
	}

	render () {
		if (this.props.customMessage) {
			return (
				<div className="email-article__message">
				<label className="email-article__message--label">{LABEL_TEXT}
				{this.characters(MAXIMUM_CHARACTERS, this.props.messageLength)}
				</label>
				<textarea
				className="o-forms-textarea email-article__message--textarea"
				type="text"
				inputMode="latin-prose"
				maxLength={MAXIMUM_CHARACTERS}
				placeholder="Enter your message"
				rows="7"
				value={this.props.messageText}
				onChange={event => this.props.onMessageTyping(event.target.value)}></textarea>
				</div>
			)
		}
	}
}
