import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Authorization from './App/Authorization';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<Authorization />, document.getElementById('root'));
registerServiceWorker();
