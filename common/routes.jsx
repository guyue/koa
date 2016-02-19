
/* eslint-disable no-unused-vars */
import React, {
    Component,
} from 'react';
/* eslint-enable no-unused-vars */
import {
    Router,
    Route,
} from 'react-router';

import Lottery from './container/lottery.jsx';
import User from './container/user.jsx';

export default class Routes extends Component {

    render() {
        return (
            <Router history={this.props.history}>
                <Route path="/" component={Lottery} />
                <Route path="/user" component={User} />
            </Router>
        );
    }

}
