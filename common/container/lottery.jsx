import React, {
    Component,
    PropTypes,
} from 'react';

import {
    connect,
} from 'react-redux';

import $ from 'jquery';

import Background from '../component/background.jsx';
import Copyleft from '../component/copyleft.jsx';
import Board from '../component/board.jsx';
import Flicker from '../component/flicker.jsx';
import {
    glance,
    raffle,
    changePrize,
    clearAll,
    removeRaffled,
    initUsers,
} from '../actions';


class Lottery extends Component {

    random(skipIsRaffled) {
        const users = this.props.users;
        const index = Math.random() * users.length >>> 0;
        const target = {};

        if (skipIsRaffled) {
            target.prize = this.props.selectedPrize.key;
        }

        if (skipIsRaffled && users[index].prize) {
            return this.random(skipIsRaffled);
        }

        return {
            index,
            user: Object.assign(target, users[index]),
        };
    }

    componentWillMount() {
        this.props.dispatch(initUsers());
    }

    componentDidMount() {

        this.lock = true;
        this.timer = null;

        $(document).on('keydown.lottery', (e) => {
            //空格，上方向键，下方向键
            if ([32, 38, 40].indexOf(e.keyCode) >= 0) {
                e.preventDefault();
                const prize = this.props.selectedPrize;
                const parallel = Math.min(
                    prize.total - this.props.raffled.length,
                    prize.parallel || 1
                );
                if (parallel === 0) {
                    return;
                }
                if (this.lock) {
                    this.timer = setInterval(() => {
                        const payload = [];
                        for (let i = 0; i < parallel; i += 1) {
                            payload.push(this.random());
                        }
                        this.props.dispatch(glance(payload));
                    }, 100);
                } else {
                    clearInterval(this.timer);
                    const payload = [];
                    for (let i = 0; i < parallel; i += 1) {
                        payload.push(this.random(true));
                    }
                    this.props.dispatch(raffle(payload));
                }
                this.lock = !this.lock;
            }
        });

        /*
         *CTRL + 反单引号(1左侧) 重置
         */
        $(document).on('keydown.lottery', (e) => {
            if (e.ctrlKey) {
                switch(e.keyCode) {
                    case 192:
                        this.props.dispatch(clearAll());
                        break;
                    case 13:
                        document.body.webkitRequestFullScreen();
                        break;
                }
            }
        });

    }

    componentWillUnmount() {

        $(document).off('keydown.lottery');
        if (this.timer) {
            clearInterval(this.timer);
        }

    }

    render() {

        return (
            <div>
                <link rel="stylesheet" href="less/lottery.css" />
                <Background />
                <Copyleft />
                <Board
                    prizes={this.props.prizes}
                    prize={this.props.selectedPrize}
                    raffled={this.props.raffled}
                    changePrize={(index) => {
                        this.props.dispatch(changePrize(index));
                    }}
                    removeRaffled={(user) => {
                        this.props.dispatch(removeRaffled(user));
                    }}
                />
                <Flicker user={this.props.displayUser} />
            </div>
        );

    }

}

Lottery.propTypes = {
    displayUser: PropTypes.arrayOf(PropTypes.shape({
        department: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        phone: PropTypes.string.isRequired,
        image: PropTypes.string.isRequired,
    }).isRequired).isRequired,
    selectedPrize: PropTypes.shape({
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

function raffledSelector(users, prize) {
    const result = [];

    users.forEach(function (user) {
        if (user.prize === prize.key) {
            result.push(user);
        }
    });

    return result;
}

function parallelSelector(prize, raffled) {
    return Math.min(
        prize.total - raffled.length,
        prize.parallel || 1
    );
}

function displayUserSelector(users, index, parallel) {

    parallel = parallel || 1;

    if (index.length === 1 && index[0] === -1) {
        const result = [];
        for (let i = 0; i < parallel; i += 1) {
            result.push({
                department: '宝宝树',
                name: '宝宝树',
                phone: '12345678901',
                image: 'img/logo.png',
            });
        }
        return result;
    }

    return index.map((i) => {
        return Object.assign({}, users[i]);
    });
}

function selectedPrizeSelector(prizes, index) {
    return Object.assign({}, prizes[index]);
}


function select(state) {
    const selectedPrize = selectedPrizeSelector(state.prizes, state.selectedPrizeIndex);
    const raffled = raffledSelector(state.users, selectedPrize);
    const parallel = parallelSelector(selectedPrize, raffled);
    return Object.assign({
        selectedPrize,
        raffled,
        parallel,
        displayUser: displayUserSelector(state.users, state.displayUserIndex, parallel),
    }, state);
}

export default connect(select)(Lottery);
