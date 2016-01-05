import React, {
    Component,
    PropTypes,
}from 'react';
import Layout from '../layout';

import Background from './background';
import Copyleft from './copyleft';
import Board from './board';
import Flicker from './Flicker';


export default class Index extends Component {

    render() {

        return (
            <Layout title={this.props.title}>
                <link rel="stylesheet" href="css/screen.css" />
                <Background />
                <Copyleft />
                <Board />
                <Flicker />
                <script src="js/jquery-2.0.3.min.js"></script>
                <script src="js/name.js"></script>
                <script src="js/config.js"></script>
                <script src="js/lucky.js"></script>
                <script src="js/app.js"></script>
            </Layout>
        );

    }

}

Index.propTypes = {
    title: PropTypes.string.isRequired,
};
