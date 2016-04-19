import React from 'react';

function subNote (isGift) {
	if (!isGift) return (
			<div className="email-address__sub-note">
				This recipient may need to be a subscriber to read this content
			</div>
	)
}

function giftNote (items, isGift, credit) {
	if (isGift) return (
			<div className="email-address__gift-note">
				You will have <span className="email-address__gift-count">{credit - items.length} gift articles</span> remaining
				this month
			</div>
	)
}

function inputs (items, onItemChange, onAdd, onRemove, isGift, credit) {
	return items.map((address, index) => {
		const maxItems = isGift ? credit : 10
		const action = index + 1 === items.length && index + 1 < maxItems ? 'add' : 'remove'
		// TODO remove button's div container
		return (
				<div key={index} className="email-address__item">
					<input type="text" className="o-forms-text email-address__input" value={address}
								 onChange={event => onItemChange(index, event.target.value)}></input>
					<div className="email-address__button">
						<button type="button" className="o-buttons o-buttons--big"
										onClick={() => action === 'add' ? onAdd() : onRemove(index)}>
							<i className={`email-address__button--${action}`}>{action}</i>
						</button>
					</div>
				</div>
		)
	})
}

export default ({ items, onItemChange, onAdd, onRemove, isGift, credit }) => (
		<div className="email-address">
			<div className="email-address__label">
				Enter recipient’s email address
			</div>
			{subNote(isGift)}
			<div className="email-address__list">
				{inputs(items, onItemChange, onAdd, onRemove, isGift, credit)}
			</div>
			{giftNote(items, isGift, credit)}
		</div>
)
