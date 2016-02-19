
/* eslint-disable no-unused-vars */
import React, {
    Component,
} from 'react';
/* eslint-enable no-unused-vars */
import {
    Route,
} from 'react-router';

import Lottery from './container/lottery.jsx';
import User from './container/user.jsx';

export default [
    <Route path="/" component={Lottery} key="lottery" />,
    <Route path="/user" component={User} key="user" />,
];
