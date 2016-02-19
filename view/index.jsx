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
import Lottery from '../common/container/lottery';
import reducers from '../common/reducers';


export default class Index extends Component {

    renderLottery(state) {

        const store = createStore(combineReducers(reducers), state);

        return ReactDOMServer.renderToString(
            <Provider store={store}>
                <Lottery />
            </Provider>
        );
    }

    render() {

        const state = {
            users: this.props.users,
            prizes: this.props.prizes,
        };

        const html = this.renderLottery(state, this.props.url);

        return (
            <Layout title={this.props.title}>
                <div id="app" dangerouslySetInnerHTML={{__html: html}} />
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
    prizes: PropTypes.arrayOf(PropTypes.shape({
        key: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        total: PropTypes.number.isRequired,
        parallel: PropTypes.number,
    }).isRequired).isRequired,
};
