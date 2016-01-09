import React, {
    Component,
    PropTypes,
} from 'react';

export default class Flicker extends Component {

    render() {

        const users = this.props.user;

        return (
            <div className="flicker-container">
                {users.map((user, index) => {
                    return (
                        <div key={index} className="flicker-item">
                            <div className="flicker-image">
                                <img src={user.image} />
                            </div>
                            <div className="flicker-name">
                                {user.name}
                            </div>
                        </div>
                    );
                })}
            </div>
        );

    }

}

Flicker.propTypes = {
    user: PropTypes.arrayOf(PropTypes.shape({
        department: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        phone: PropTypes.string.isRequired,
        image: PropTypes.string.isRequired,
    }).isRequired).isRequired,
};
