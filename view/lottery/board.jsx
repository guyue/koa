import React, {
    Component,
    PropTypes,
} from 'react';

export default class Board extends Component {

    render() {

        return (
            <aside className="zone-container">
                <div className="trigger">
                    <i className="icon icon-filter"></i>
                </div>
                <div className="board">
                </div>
            </aside>
        );

    }

}
