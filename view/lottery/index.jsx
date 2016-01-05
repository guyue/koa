import React, {
    Component,
    PropTypes,
} from 'react';

import ReactDOMServer from 'react-dom/server';

import Layout from '../layout';
import Lottery from './lottery';


export default class Index extends Component {

    render() {

        return (
            <Layout title={this.props.title}>
                <div id="app" dangerouslySetInnerHTML={{__html: ReactDOMServer.renderToString(<Lottery />)}} />
                <script src="js/jquery-2.0.3.min.js"></script>
                <script src="js/name.js"></script>
                <script src="js/config.js"></script>
                <script src="js/lucky.js"></script>
                <script src="js/app.js"></script>
                <script src="vendors.js"></script>
                <script src="lottery.js"></script>
            </Layout>
        );

    }

}

Index.propTypes = {
    title: PropTypes.string.isRequired,
};
