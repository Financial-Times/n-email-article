import React from 'react'
import ReactDOM from 'react-dom'

import { EmailArticleData, EmailArticleView } from '..'

import DemosConfig from './demos-config'

const randomContent = (
		<div>
			<p>Hint: Click on the email icon above</p>
			<p>
				Lorem ipsum dolor sit amet, ea nonumy lucilius nam, pri ei tale soluta. Et nibh minimum duo, mea ad omnis feugait argumentum, doming deseruisse est at. Duo volumus detracto ne. Nam consul albucius sapientem id, decore prodesset consequuntur est ne. Ex dicit eirmod vituperata vel.
				Debitis nostrum quaerendum id nam. Et porro ipsum timeam est, cu assum affert inermis vix, sit an posse luptatum. Dolore facilisis ex his, at aperiam sanctus qui. Ius vocent adipiscing liberavisse id. Mazim laboramus et vix, et cum paulo nostrum mandamus, an numquam sapientem nec.
				Vide dolore est ex, nemore antiopam cu mei, ne sea error volutpat. Euripidis adipiscing comprehensam ut est, ea est elitr vocibus. Officiis erroribus repudiare sea in, vim at enim agam disputationi, vix wisi malorum adversarium ex. Ex vis dico veri molestiae, ne saepe tollit quo, ei vis homero laoreet. Est ei augue aliquid referrentur, id vel agam utroque suscipit, ferri homero pro in.
				Nam omnium accusam cu, nam ut zril prompta. Vis putent possit viderer ea, et nec alia reque libris. Meis congue tibique et vim, eos vide mucius id. Tale dicant epicurei eos at, laudem diceret vis no. Nam epicuri lucilius ut.
				Iusto evertitur adversarium cum ne. Cum an blandit lucilius atomorum, at vim scripta intellegam concludaturque. Eros sensibus pertinacia eu sed, mei in appetere assentior. Mel perpetua voluptaria id. Pro eius repudiare expetendis at, vim cu novum clita, dicam noster delectus pri ex. Aperiri scriptorem ad eum, duis convenire imperdiet eum at. Nam ad nibh eros.
			</p>
		</div>
)

export default class extends React.Component {

	constructor () {
		super()
	}

	init () {
		// non-React `next-article` will lazily load this React component and so we're doing similar here
		this.views = {}
		this.data = new EmailArticleData()
	}

	onDemosConfigChange (apiResponses) {
		// get rid of old stuff and do it all over again
		Array.from(document.querySelectorAll('[data-n-article-email-container]')).forEach(view => view.innerHTML = null)
		this.init()
		// mock the API calls
		Object.keys(apiResponses).map(api => this.data.api[api] = apiResponses[api])
		this.forceUpdate()
	}

	onToggleOpen (id) {
		// non-React `next-article` will lazily load this React component and so we're doing similar here
		const isTop = id === 'top'
		// lazily load the view
		if (!this.views[id]) {
			const props = { isTop: isTop, store: this.data.store, actions: this.data.actions, dispatch: this.data.dispatch }
			this.views[id] = React.createElement(EmailArticleView, props)
			const container = document.querySelector(`[data-n-article-email-${id}-container]`)
			ReactDOM.render(this.views[id], container)
		}
		// toggle showing/hiding of the view
		if (isTop) this.data.dispatch(this.data.actions.toggleOpenTop())
		else this.data.dispatch(this.data.actions.toggleOpenBottom())
	}

	render () {
		// please note that we're not using React ways of doing things here
		// as `next-article` doesn't use React
		return (
				<div>
					<DemosConfig onChange={(apiResponses) => this.onDemosConfigChange(apiResponses)} />
					<h1>Article title</h1>
					<button onClick={() => this.onToggleOpen('top')} type="button"
									className="o-buttons o-buttons--medium demos__email"><i>Email</i></button>
					<div data-n-article-email-container data-n-article-email-top-container></div>
					{randomContent}
					<button onClick={() => this.onToggleOpen('bottom')} type="button"
									className="o-buttons o-buttons--medium demos__email"><i>Email</i></button>
					<div data-n-article-email-container data-n-article-email-bottom-container></div>
					{randomContent}
				</div>
		)
	}

}
