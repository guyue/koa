import React, {
    Component,
    PropTypes,
} from 'react';

import classnames from 'classnames';

import List from './list.jsx';

export default class Board extends Component {

    constructor(props) {

        super(props);

        this.state = {
            expand: false,
        };

    }

    render() {

        return (
            <aside className={classnames('board-container', {
                active: this.state.expand,
            })}>
                <div className="trigger" onClick={(e) => this.toggle(e)}>
                    <i className="icon icon-filter"></i>
                </div>
                <div className="board">
                    <h1>一等奖</h1>
                    <fieldset>
                        <button className="first"></button>
                        <button className="second"></button>
                        <button className="third"></button>
                        <button className="fourth"></button>
                        <button className="fifth"></button>
                        <button className="grateful"></button>
                    </fieldset>
                    <List />
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
