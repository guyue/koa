/* eslint-disable no-unused-vars */
import React, {
    Component,
    PropTypes,
} from 'react';
/* eslint-enable no-unused-vars */

export default class Item extends Component {

    render() {
        const user = this.props.user;

        return (
            <li>
                <div className="avatar" style={{
                    backgroundImage: `url(${user.image})`,
                }}></div>
                <div className="name">{user.name} ({user.department}-{user.phone})</div>
                <button
                    className="icon-delete"
                    title="删除"
                    onClick={() => {
                        const action = Object.assign({}, user);

                        Reflect.deleteProperty(action, 'prize');
                        this.props.removeRaffled(action);
                    }}
                >删除</button>
            </li>
        );
    }

}

Item.propTypes = {
    user: PropTypes.shape({
        department: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        phone: PropTypes.string.isRequired,
        image: PropTypes.string.isRequired,
    }).isRequired,
    removeRaffled: PropTypes.func.isRequired,
};
