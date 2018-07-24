import React from 'react';
import ReactDOM from 'react-dom';

import { createStore,applyMiddleware, compose, } from 'redux';
import { Provider } from 'react-redux';
import App from './App';

import './index.css';
import registerServiceWorker from './registerServiceWorker';
import reducer from './store/reducer';
import thunk from 'redux-thunk';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducer,composeEnhancers(
    applyMiddleware(thunk)
));

const app = (
<Provider store={store}>
        <App />
</Provider>    
);

ReactDOM.render(app, document.getElementById('root'));
registerServiceWorker();
