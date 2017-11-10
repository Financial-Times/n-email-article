import React from 'preact-compat';

export default class extends React.Component {

	constructor (props) {
		super(props);
		this.setState({invokeFocus: true});
	}

	componentWillReceiveProps (nextProps) {
		if (nextProps.items.length > this.props.items.length) {
			this.setState({invokeFocus: true});
		} else {
			this.setState({invokeFocus: false});
		}
	}

	componentDidMount () {
		this.lastInput.focus();
	}

	componentDidUpdate () {
		if (this.state.invokeFocus) {
			this.lastInput.focus();
		}
	}

	subNote () {
		if (!this.props.isGift && this.props.showMaySub) return (
			<div className="email-address__note">
				This recipient may need to be a subscriber to read this content
			</div>
		);
	}

	giftNote () {
		if (this.props.isGift) {
			const remainder = this.props.credit - this.props.items.length;
			return (
				<div className="email-address__note">
					You will have <span className="email-address__gift-count">{remainder} gift article{remainder !== 1 ? 's' : ''}</span> remaining
					this month
				</div>
			);
		}
	}

	inputs () {
		const maxItems = this.props.isGift ? this.props.credit : 10;
		return this.props.items.map((address, index) => {
			const error = !this.props.errors[index] ? null : (
				<div className="o-forms__errortext">Please enter a valid email</div>
			);
			const lastInput = index + 1 === this.props.items.length;
			const action = (maxItems === 1 || lastInput && index + 1 < maxItems) ? 'add' : 'remove';
			const button = (
					<div className="email-address__suffix o-forms__suffix">
						<button type="button" className={`email-address__button email-address__button--${action}`}
								onClick={() => action === 'add' ? this.props.onAdd() : this.props.onRemove(index)}
								disabled={maxItems === 1}>
							<i>{action}</i>
						</button>
					</div>
			);
			return (
					<div key={index} className={`email-address__item o-forms--wide ${error ? 'o-forms--error' : ''}`}>
						<div className="email-address__input-button o-forms__affix-wrapper">
							<input type="email" className="o-forms__text"
									ref={(input) => { lastInput ? this.lastInput = input : null; }}
									value={address}
									onChange={event => this.props.onItemChange(index, event.target.value)}></input>
							{button}
						</div>
						{error}
					</div>
			);
		});
	}

	render () {
		return (
			<div className="email-address">
				<label className="email-address__label">
					Enter recipient’s email address
				</label>
				<div className="email-address__list">
					{this.inputs()}
				</div>
				{this.subNote()}
				{this.giftNote()}
			</div>
		);
	}

}
