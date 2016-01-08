import React from 'react';
import ReactDOM from 'react-dom';
import {
    createStore,
} from 'redux';
import {
    Provider,
} from 'react-redux';

import Lottery from '../../../common/container/lottery.jsx';
import reducers from '../../../common/reducers';
import storage from './storage.js';

function initUsers() {
    return window.users.map((user) => {
        return [storage.get(user), user].reduce(Object.assign, {});
    });
}

const state = {
    users: initUsers(),
    prize: window.prize,
    rank: window.prize[0],
}


const store = createStore(reducers, state);

ReactDOM.render(<Provider store={store}>
    <Lottery />
</Provider>, document.querySelector('#app'));
