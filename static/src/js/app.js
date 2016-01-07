import React from 'react';
import ReactDOM from 'react-dom';
import {
    createStore,
} from 'redux';
import {
    Provider,
} from 'react-redux';

import Lottery from '../../../common/container/lottery.jsx';
import reducers from '../../../common/Reducers';


const state = {
    users: window.users,
    prize: window.prize,
    rank: window.prize[0],
}


const store = createStore(reducers, state);

ReactDOM.render(<Provider store={store}>
    <Lottery />
</Provider>, document.querySelector('#app'));
