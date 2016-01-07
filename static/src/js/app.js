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


const store = createStore(reducers, {
    users: window.users || [],
});

ReactDOM.render(<Provider store={store}>
    <Lottery />
</Provider>, document.querySelector('#app'));
