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
                <div className="trigger" onClick={() => this.toggle()}>
                    <i className="icon-filter"></i>
                </div>
                <div className="board">
                    <h1 className={classnames({
                        crown: this.props.prize.key === 'first',
                    })}>
                        {this.props.prize.name}
                    </h1>
                    <fieldset>
                        {this.props.prizes.map((p, index) => {
                            return (
                                <button
                                    key={p.key}
                                    className={p.key}
                                    title={p.name}
                                    onClick={() => {
                                        this.props.changePrize(index);
                                    }}
                                />
                            );
                        })}
                    </fieldset>
                    <List
                        prize={this.props.prize}
                        removeRaffled={this.props.removeRaffled}
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
    prizes: PropTypes.arrayOf(PropTypes.shape({
        key: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        total: PropTypes.number.isRequired,
    }).isRequired).isRequired,
    changePrize: PropTypes.func.isRequired,
};
