import React, {
    Component,
    PropTypes,
} from 'react';

import classnames from 'classnames';

export default class Board extends Component {

    constructor(props) {

        super(props);

        this.state = {
            expand: false,
        };

    }

    render() {

        return (
            <aside className={classnames('zone-container', {
                active: this.state.expand,
            })}>
                <div className="trigger" onClick={(e) => this.toggle(e)}>
                    <i className="icon icon-filter"></i>
                </div>
                <div className="board">
                </div>
            </aside>
        );

    }

    toggle() {
        this.setState({
            expand: !this.state.expand,
        });
    }

}
