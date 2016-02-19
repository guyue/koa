import React, {
    Component,
    PropTypes,
} from 'react';

import {
    createStore,
    combineReducers,
} from 'redux';
import {
    Provider,
} from 'react-redux';

import Layout from './layout';
import User from '../common/container/user';
import reducers from '../common/reducers';


export default class Index extends Component {

    render() {

        const state = {
            users: this.props.users,
            prizes: this.props.prizes,
        };

        const store = createStore(combineReducers(reducers), state);

        return (
            <Layout title={this.props.title}>
                <Provider store={store}>
                    <User />
                </Provider>
                <script src="/lib/jquery.js"></script>
                <script src="/lib/bootstrap.js"></script>
                <script src="/js/user.js"></script>
            </Layout>
        );

    }

}

Index.propTypes = {
    title: PropTypes.string.isRequired,
    users: PropTypes.arrayOf(PropTypes.shape({
        department: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        phone: PropTypes.string.isRequired,
        image: PropTypes.string.isRequired,
    }).isRequired).isRequired,
};
