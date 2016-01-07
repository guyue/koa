import React, {
    Component,
    PropTypes,
} from 'react';

import ReactDOMServer from 'react-dom/server';

import Layout from '../layout';
import Lottery from '../container/lottery';


export default class Index extends Component {

    renderLottery() {
        return {
            __html: ReactDOMServer.renderToString(<Lottery />),
        };
    }

    render() {

        return (
            <Layout title={this.props.title}>
                <div id="app" />
                <script dangerouslySetInnerHTML={{__html: `window.users=${JSON.stringify(this.props.users)}`}}></script>
                <script dangerouslySetInnerHTML={{__html: `window.prize=${JSON.stringify(this.props.prize)}`}}></script>
                <script src="js/jquery-2.0.3.min.js"></script>
                <script src="js/config.js"></script>
                <script src="js/lucky.js"></script>
                <script src="vendors.js"></script>
                <script src="lottery.js"></script>
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
    prize: PropTypes.objectOf(PropTypes.shape({
        'class': PropTypes.string.isRequired,
        'name': PropTypes.string.isRequired,
        'total': PropTypes.number.isRequired,
    })),
};
