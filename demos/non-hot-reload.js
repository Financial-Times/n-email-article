import React from 'preact-compat';
import ReactDOM from 'preact-compat';

import '../main.scss';

import Demos from './demos';
import './demos.scss';

const container = document.getElementById('root');

ReactDOM.render(<Demos />, container);
