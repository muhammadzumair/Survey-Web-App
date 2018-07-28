import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Navbar from './Component/Navbar'
import registerServiceWorker from './registerServiceWorker';
import { store } from './store/index';
import { Provider } from 'react-redux';

ReactDOM.render(
    <Provider store={store}>
        <Navbar />
    </Provider>
    , document.getElementById('root'));
registerServiceWorker();
