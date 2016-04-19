import React from 'react';
import ReactDOM from 'react-dom';

import '../main.scss';

import Demos from './demos';
import './demos.scss';

const container = document.getElementById('root');

ReactDOM.render(<Demos />, container);
