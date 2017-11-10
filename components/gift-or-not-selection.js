import React from 'preact-compat';

function giftLabelText (credit, monthlyAllowance) {
	if (credit > 0) return (
			<div className="gift-or-not__option-text">
				<div>Send as a gift article that can be read by anyone</div>
				<div className="gift-or-not__gift-note">
					You can send <span className="gift-or-not__gift-count">{credit} gift article{credit !== 1 ? 's' : ''}</span> this month
				</div>
			</div>
	);
	else return (
			<div className="gift-or-not__option-text">
				<div className="gift-or-not__gift-note">
					You can send <span className="gift-or-not__gift-count">0 gift articles</span> this month.
					You will be able to send {monthlyAllowance} more next month
				</div>
			</div>
	);
}

export default ({ isGift, onIsGiftChange, credit, monthlyAllowance }) => (
	<div className="gift-or-not">
		<div className="gift-or-not__option">
			<input type="radio" onChange={() => onIsGiftChange(true)} checked={isGift} disabled={credit === 0}
						id="gift-or-not__option--gift" className="o-forms__radio" />
			<label htmlFor="gift-or-not__option--gift" className="gift-or-not__label o-forms__label">
				<div className="gift-or-not__option-icon gift-or-not__option-icon--gift"></div>
				{giftLabelText(credit, monthlyAllowance)}
			</label>
		</div>
		<div className="gift-or-not__option">
			<input type="radio" onChange={() => onIsGiftChange(false)} checked={!isGift}
						id="gift-or-not__option--non-gift" className="o-forms__radio" />
			<label htmlFor="gift-or-not__option--non-gift" className="gift-or-not__label o-forms__label">
				<div className="gift-or-not__option-icon gift-or-not__option-icon--non-gift"></div>
				<div className="gift-or-not__option-text">
					Send as a non-gift article that can be read by subscribers only
				</div>
			</label>
		</div>
	</div>
);
