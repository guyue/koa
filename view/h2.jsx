import React, {
    Component,
    PropTypes,
} from 'react';

import Layout from './layout';


export default class User extends Component {

    render() {

        return (
            <Layout title={this.props.title}>
                <dl>
                    <dt>isSpdy</dt>
                    <dd>{String(this.props.isSpdy)}</dd>
                    <dt>spdyVersion</dt>
                    <dd>{String(this.props.spdyVersion)}</dd>
                </dl>
            </Layout>
        );

    }

}

User.propTypes = {
    title: PropTypes.string.isRequired,
};
