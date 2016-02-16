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
    browserHistory,
    Router,
    Route,
} from 'react-router';
import {
    syncHistory,
    routeReducer,
} from 'react-router-redux';

import Lottery from '../../../common/container/lottery.jsx';
import reducers from '../../../common/reducers';

const reducer = combineReducers(Object.assign({}, reducers, {
    routing: routeReducer,
}));
const reduxRouterMiddleware = syncHistory(browserHistory);
const createStoreWithMiddleware = applyMiddleware(reduxRouterMiddleware)(createStore);

/* eslint-disable no-underscore-dangle */
const store = createStoreWithMiddleware(reducer, window.__INITIAL_STATE__);
/* eslint-enable no-underscore-dangle */

reduxRouterMiddleware.listenForReplays(store);

ReactDOM.render(<Provider store={store}>
    <Router history={browserHistory}>
        <Route path="/" component={Lottery} />
    </Router>
</Provider>, document.querySelector('#app'));
