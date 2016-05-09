import React from 'react'
import ReactDOM from 'react-dom'

import { EmailArticleData, EmailArticleView } from '..'

import DemosConfig from './demos-config'

const randomContent = (
		<div>
			<p>Hint: Click on the email icon above</p>
			<p>Lorem ipsum dolor sit amet, ea nonumy lucilius nam, pri ei tale soluta. Et nibh minimum duo, mea ad omnis feugait argumentum, doming deseruisse est at. Duo volumus detracto ne. Nam consul albucius sapientem id, decore prodesset consequuntur est ne. Ex dicit eirmod vituperata vel.</p>
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

	reset () {
		// get rid of old stuff and do it all over again
		Array.from(document.querySelectorAll('[data-n-article-email-container]')).forEach(view => view.innerHTML = null)
		this.init()
	}

	onDemosConfigChange (mode, apiResponses) {
		this.reset()
		this.mode = mode
		// mock the API calls
		Object.keys(apiResponses).map(api => this.data.api[api] = apiResponses[api])
	}

	onToggleOpen (id) {
		// non-React `next-article` will lazily load this React component and so we're doing similar here
		const isTop = id === 'top'
		// lazily load the view
		if (!this.views[id]) {
			const props = {
				mode: this.mode,
				isTop: isTop,
				store: this.data.store,
				actions: this.data.actions,
				dispatch: this.data.dispatch
			}
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
				<div className="article" data-content-id="737195aa-1347-11e6-839f-292294709880">
					<div className="demos__config">
						<DemosConfig
							onChange={(mode, apiResponses) => this.onDemosConfigChange(mode, apiResponses)}
						/>
					</div>
					<div className="demos__article">
						<h1 className="demos__article-title">Article title</h1>
						<h2>Top toolbar</h2>
						<button onClick={() => this.onToggleOpen('top')} type="button"
										className="o-buttons o-buttons--medium demos__email"><i>Email</i></button>
						<div data-n-article-email-container data-n-article-email-top-container></div>
						{randomContent}
						<h2>Bottom toolbar</h2>
						<button onClick={() => this.onToggleOpen('bottom')} type="button"
										className="o-buttons o-buttons--medium demos__email"><i>Email</i></button>
						<div data-n-article-email-container data-n-article-email-bottom-container></div>
						{randomContent}
					</div>
				</div>
		)
	}

}
