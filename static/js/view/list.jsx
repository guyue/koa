const React = require('react');


const List = React.createClass({
    propTypes: {
        list: React.PropTypes.array,
    },

    render: function () {
        const list = this.props.list.map(function (item, index) {
            return (
                <li key={index}>{item}</li>
            );
        });
        return (
            <ul>
                {list}
            </ul>
        );
    },
});


module.exports = List;
