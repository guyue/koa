/* eslint-disable no-unused-vars */
import React from 'react';
/* eslint-enable no-unused-vars */
import ReactDOM from 'react-dom';
import {
    createStore,
    combineReducers,
    applyMiddleware,
} from 'redux';
import {
    Provider,
} from 'react-redux';
import {
    Router,
    browserHistory,
} from 'react-router';
import {
	syncHistoryWithStore,
    routerReducer,
} from 'react-router-redux';

import reducers from '../../../common/reducers.jsx';
import routes from '../../../common/routes.jsx';

const reducer = combineReducers(Object.assign({}, reducers, {
    routing: routerReducer,
}));
/* eslint-disable no-underscore-dangle */
const store = createStore(reducer, window.__INITIAL_STATE__);
/* eslint-enable no-underscore-dangle */
const history = syncHistoryWithStore(browserHistory, store);

ReactDOM.render(<Provider store={store}>
    <Router history={history}>
        {routes}
    </Router>
</Provider>, document.querySelector('#app'));
