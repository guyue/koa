/* eslint-disable no-unused-vars */
import React, {
    Component,
    PropTypes,
} from 'react';
/* eslint-enable no-unused-vars */

import Item from './item.jsx';

export default class List extends Component {

    render() {
        const prize = this.props.prize;
        const raffled = this.props.raffled;

        return (
            <div>
                <ul className="list">
                    {raffled.map((user) => (
                        <Item
                            key={user.image}
                            user={user}
                            removeRaffled={this.props.removeRaffled}
                        />
                    ))}
                </ul>
                <code>{raffled.length} / {prize.total}</code>
            </div>
        );
    }

}

List.propTypes = {
    prize: PropTypes.shape({
        key: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        total: PropTypes.number.isRequired,
        parallel: PropTypes.number,
    }).isRequired,
    raffled: PropTypes.arrayOf(PropTypes.shape({
        department: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        phone: PropTypes.string.isRequired,
        image: PropTypes.string.isRequired,
        prize: PropTypes.string.isRequired,
    })),
};
