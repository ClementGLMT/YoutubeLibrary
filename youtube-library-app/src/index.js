import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import Routes from './routes';
import { store } from './store';

const render = () => ReactDOM.render(<Routes />, document.getElementById('root'));
render();
store.subscribe(render);
serviceWorker.unregister();