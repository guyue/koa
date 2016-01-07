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
                    <h1>{this.props.rank.name}</h1>
                    <fieldset>
                        {this.props.prize.map((p) => {
                            return (
                                <button
                                    key={p.key}
                                    className={p.key}
                                    title={p.name}
                                    onClick={() => {
                                        this.props.changeRank(p);
                                    }}
                                />
                            );
                        })}
                    </fieldset>
                    <List
                        rank={this.props.rank}
                        raffled={this.props.raffled}
                    />
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
    prize: PropTypes.arrayOf(PropTypes.shape({
        key: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        total: PropTypes.number.isRequired,
    }).isRequired).isRequired,
    changeRank: PropTypes.func.isRequired,
};
