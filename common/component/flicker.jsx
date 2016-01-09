import React, {
    Component,
    PropTypes,
} from 'react';

export default class Flicker extends Component {

    render() {

        const user = this.props.user;

        return (
            <div className="flicker-container">
                <div className="flicker-item">
                    <div className="flicker-image">
                        <img src={user.image} />
                    </div>
                    <div className="flicker-name">
                        {user.name}
                    </div>
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
