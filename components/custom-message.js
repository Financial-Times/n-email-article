import React from 'react';

const LABEL_TEXT = 'Add an optional message';
const MAXIMUM_CHARACTERS = 300;

function characters (maximum, current) {
  const remaining = maximum - current;
  return (
    <span className="email-article__message--characters">
      {remaining} character{remaining !== 1 ? 's' : ''} remaining
    </span>
  )
}

export default ({onMessageTyping, messageLength}) => (
  <div className="email-article__message">
    <div className="email-article__message--label">{LABEL_TEXT}
      {characters(MAXIMUM_CHARACTERS, messageLength)}
    </div>
    <input
      type="text"
      inputMode="latin-prose"
      maxLength={MAXIMUM_CHARACTERS}
      placeholder="Enter your message"
      size={MAXIMUM_CHARACTERS + 10}
      onChange={event => onMessageTyping(event.target.value)}></imput>
  </div>
)
