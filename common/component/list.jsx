import React, {
    Component,
    PropTypes,
} from 'react';

import Item from './item.jsx';

export default class List extends Component {

    render() {
        const rank = this.props.rank;
        const raffled = this.props.raffled;
        return (
            <div className="list">
                <ul className="win">
                    {raffled.map((user) => {
                        return (
                            <Item
                                key={user.image}
                                user={user}
                                removeRaffled={this.props.removeRaffled}
                            />
                        );
                    })}
                </ul>
                <code>{raffled.length}/{rank.total}</code>
            </div>
        );
    }

}
