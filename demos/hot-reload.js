// in the examples, we use hot reloading for rapid development
import { AppContainer } from 'react-hot-loader';

import React from 'preact-compat';
import ReactDOM from 'preact-compat';

import '../main.scss';

import Demos from './demos';
import './demos.scss';
import './index.html'; // TODO: use alias to demos.html instead?

const container = document.getElementById('root');

ReactDOM.render(
		<AppContainer component={Demos} />,
		container
);

if (module.hot) {
	module.hot.accept('./demos', () => {
		ReactDOM.render(
				<AppContainer component={require('./demos').default} />,
				container
		);
	});
	module.hot.accept('./demos.scss', () => {
		require('./demos.scss');
	});
	module.hot.accept('../main.scss', () => {
		require('../main.scss');
	});
	module.hot.accept('./index.html', () => {
		require('./index.html');
	});
}
