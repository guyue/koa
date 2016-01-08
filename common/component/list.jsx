import React, {
    Component,
    PropTypes,
} from 'react';

import Item from './item.jsx';

export default class List extends Component {

    render() {
        const prize = this.props.prize;
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
                <code>{raffled.length}/{prize.total}</code>
            </div>
        );
    }

}
