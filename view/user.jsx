import React, {
    Component,
    PropTypes,
} from 'react';

import Layout from './layout';
import User from '../common/container/user';


export default class Index extends Component {

    render() {

        return (
            <Layout title={this.props.title}>
                <User {...this.props }/>
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
