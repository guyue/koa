/* eslint-disable no-unused-vars */
import React from 'react';
/* eslint-enable no-unused-vars */
import ReactDOM from 'react-dom';
import {
    createStore,
} from 'redux';
import {
    Provider,
} from 'react-redux';

import Lottery from '../../../common/container/lottery.jsx';
import reducers from '../../../common/reducers';

/* eslint-disable no-underscore-dangle */
const store = createStore(reducers, window.__INITIAL_STATE__);
/* eslint-enable no-underscore-dangle */

ReactDOM.render(<Provider store={store}>
    <Lottery />
</Provider>, document.querySelector('#app'));
