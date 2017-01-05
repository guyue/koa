/* eslint-disable no-unused-vars */
import React, {
    Component,
    PropTypes,
} from 'react';
/* eslint-enable no-unused-vars */

import {
    Link,
} from 'react-router';

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
                <div className="trigger" onClick={() => this.toggle()}>
                    <i className="icon-filter"></i>
                </div>
                <div className="board">
                    <h1 className={classnames({
                        crown: this.props.prize.key === 'super',
                    })}>
                        {this.props.prize.name}
                    </h1>
                    <fieldset>
                        {this.props.prizes.map((prize, index) => (
                            <button
                                key={prize.key}
                                className={prize.key}
                                title={prize.name}
                                onClick={() => {
                                    this.props.changePrize(index);
                                }}
                            />
                        ))}
                    </fieldset>
                    <List
                        prize={this.props.prize}
                        removeRaffled={this.props.removeRaffled}
                        raffled={this.props.raffled}
                    />
                    <Link to="/user" className="link">User</Link>
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

Board.propTypes = {
    prizes: PropTypes.arrayOf(PropTypes.shape({
        key: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        total: PropTypes.number.isRequired,
    }).isRequired).isRequired,
    changePrize: PropTypes.func.isRequired,
};
