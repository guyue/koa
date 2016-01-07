import React, {
    Component,
    PropTypes,
} from 'react';

export default class Flicker extends Component {

    render() {

        const user = this.props.user;

        return (
            <div>
                <div className="flicker">
                    <img src={user.image} width="256"/>
                </div>
                <div className="name-container">
                    <span className="name">{user.name}</span>
                </div>
            </div>
        );

    }

}

Flicker.propTypes = {
    user: PropTypes.shape({
        department: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        phone: PropTypes.string.isRequired,
        image: PropTypes.string.isRequired,
    }).isRequired,
};
