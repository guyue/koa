import React, {
    Component,
    PropTypes,
} from 'react';

export default class Item extends Component {

    render() {
        const user = this.props.user;
        return (
            <li>
                <div className="avatar"><img width="34" src={user.image} /></div>
                <div className="name">{user.name}</div>
                <button
                    className="icon icon-delete"
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
