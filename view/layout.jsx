const React = require('React');


const Layout = React.createClass({
    propTypes: {
        title: React.PropTypes.string,
    },

    render: function () {
        return (
            <html>
                <head>
                    <meta charSet="utf-8" />
                    <title>{this.props.title}</title>
                </head>
                <body>
                    {this.props.children}
                </body>
            </html>
        );
    },
});


module.exports = Layout;
