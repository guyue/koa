import React, {
    Component,
    PropTypes,
} from 'react';

import Item from './item.jsx';

export default class List extends Component {

    render() {
        return (
            <div className="list">
                <ul className="win">
                    <Item />
                </ul>
                <code>0/data.total</code>
            </div>
        );
    }

}
