import React from 'react';

function subNote (isGift, showMaySub) {
	if (!isGift && showMaySub) return (
		<div className="email-address__note">
			This recipient may need to be a subscriber to read this content
		</div>
	)
}

function giftNote (items, isGift, credit) {
	if (isGift) {
		const remainder = credit - items.length
		return (
			<div className="email-address__note">
				You will have <span className="email-address__gift-count">{remainder} gift article{remainder !== 1 ? 's' : ''}</span> remaining
				this month
			</div>
		)
	}
}

function inputs (items, errors, onItemChange, onAdd, onRemove, isGift, credit) {
	const maxItems = isGift ? credit : 10
	return items.map((address, index) => {
		const error = !errors[index] ? null : (
			<div className="email-address__error o-forms__errortext">Please enter a valid email</div>
		)
		const action = (maxItems === 1 || index + 1 === items.length && index + 1 < maxItems) ? 'add' : 'remove'
		const button = (
				<div className="email-address__button">
					<button type="button" className="o-buttons o-buttons--big"
									onClick={() => action === 'add' ? onAdd() : onRemove(index)}
									disabled={maxItems === 1}>
						<i className={`email-address__button--${action}`}>{action}</i>
					</button>
				</div>
		)
		return (
				<div key={index} className={`email-address__item o-forms ${error ? 'o-forms--error' : ''}`}>
					<div className="email-address__input-button">
						<input type="email" className="o-forms__text email-address__input"
								autoFocus={true}
								value={address}
								onChange={event => onItemChange(index, event.target.value)}></input>
						{button}
					</div>
					{error}
				</div>
		)
	})
}

export default ({ items, errors, onItemChange, onAdd, onRemove, isGift, credit, showMaySub }) => (
		<div className="email-address">
			<div className="email-address__label">
				Enter recipient’s email address
			</div>
			<div className="email-address__list">
				{inputs(items, errors, onItemChange, onAdd, onRemove, isGift, credit)}
			</div>
			{subNote(isGift, showMaySub)}
			{giftNote(items, isGift, credit)}
		</div>
)
