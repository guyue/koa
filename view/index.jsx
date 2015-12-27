const React = require('react');
const Layout = require('./layout');


const Index = React.createClass({
    propTypes: {
        title: React.PropTypes.string,
    },

    render: function () {
        return (
            <Layout title={this.props.title}>
                <h1>{this.props.title}</h1>
            </Layout>
        );
    },
});


module.exports = Index;
