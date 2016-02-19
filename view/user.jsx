import React, {
    Component,
    PropTypes,
} from 'react';
import ReactDOMServer from 'react-dom/server';

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

    renderUser(state) {

        const store = createStore(combineReducers(reducers), state);

        return {
            __html: ReactDOMServer.renderToString(
                <Provider store={store}>
                    <User />
                </Provider>
            ),
        };
    }

    render() {

        const state = {
            users: this.props.users,
            prizes: this.props.prizes,
        };

        const store = createStore(combineReducers(reducers), state);

        return (
            <Layout title={this.props.title}>
                <div id="app" dangerouslySetInnerHTML={this.renderUser(state)} />
                <script dangerouslySetInnerHTML={{__html: `window.__INITIAL_STATE__=${JSON.stringify(state)}`}}></script>
                <script src="vendors.js"></script>
                <script src="app.js"></script>
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
