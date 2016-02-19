import React, {
    Component,
    PropTypes,
} from 'react';

import Layout from './layout';


export default class Index extends Component {

    render() {

        const html = this.props.html;

        return (
            <Layout title={this.props.title}>
                <div id="app" dangerouslySetInnerHTML={{__html: html}} />
                <script dangerouslySetInnerHTML={{__html: `window.__INITIAL_STATE__=${JSON.stringify(this.props.state)}`}}></script>
                <script src="vendors.js"></script>
                <script src="app.js"></script>
            </Layout>
        );

    }

}

Index.propTypes = {
    title: PropTypes.string.isRequired,
    state: PropTypes.object.isRequired,
};
