const React = require('react');
const Layout = require('./layout');
const List = require('../static/js/view/list');


const Index = React.createClass({
    propTypes: {
        title: React.PropTypes.string,
        list: React.PropTypes.array,
    },

    render: function () {
        return (
            <Layout title={this.props.title}>
                <h1>{this.props.title}</h1>
                <List list={this.props.list} />
                <script dangerouslySetInnerHTML={{__html: `window.list=${JSON.stringify(this.props.list)}`}}></script>
            </Layout>
        );
    },
});


module.exports = Index;
