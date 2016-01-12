/* eslint-disable no-unused-vars */
import React, {
    Component,
    PropTypes,
} from 'react';
/* eslint-enable no-unused-vars */

export default class Flicker extends Component {

    render() {

        const users = this.props.users;

        return (
            <div className="flicker-container">
                {users.map((user, index) => (
                    <div key={index} className="flicker-item">
                        <div className="flicker-image" style={{
                            backgroundImage: `url(${user.image})`,
                        }}>
                        </div>
                        <div className="flicker-name">
                            {user.name}
                        </div>
                    </div>
                ))}
            </div>
        );

    }

}

Flicker.propTypes = {
    users: PropTypes.arrayOf(PropTypes.shape({
        department: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        phone: PropTypes.string.isRequired,
        image: PropTypes.string.isRequired,
    }).isRequired).isRequired,
};
