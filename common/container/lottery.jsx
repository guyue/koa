/* eslint-disable no-unused-vars */
import React, {
    Component,
    PropTypes,
} from 'react';
/* eslint-enable no-unused-vars */

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

    random(skipIsRaffled, willDisplayUsers) {
        const users = this.props.users;
        const index = Math.floor(Math.random() * users.length);
        const target = {};

        if (skipIsRaffled) {
            target.prize = this.props.selectedPrize.key;
        }

        if (skipIsRaffled && users[index].prize) {
            return this.random(skipIsRaffled, willDisplayUsers);
        }

        if (willDisplayUsers.find((user) => (user.index === index))) {
            return this.random(skipIsRaffled, willDisplayUsers);
        }

        return {
            index,
            user: Object.assign(target, users[index]),
        };
    }

    componentWillMount() {
        this.props.dispatch(initUsers());
    }

    glance() {
        const INTERVAL = 120;

        this.timer = setInterval(() => {
            const parallel = this.props.parallel;
            const payload = [];

            for (let i = 0; i < parallel; i += 1) {
                payload.push(this.random(false, payload));
            }

            this.props.dispatch(glance(payload));
        }, INTERVAL);
    }

    raffle() {
        clearInterval(this.timer);
        const parallel = this.props.parallel;
        const payload = [];

        for (let i = 0; i < parallel; i += 1) {
            payload.push(this.random(true, payload));
        }
        this.props.dispatch(raffle(payload));
    }

    componentDidMount() {

        this.lock = true;
        this.timer = null;

        $(document).on('keydown.lottery', (e) => {
            const SPACE_KEY_CODE = 32;
            const ARROW_UP_KEY_CODE = 38;
            const ARROW_DOWN_KEY_CODE = 40;
            const NO_EXIST = -1;
            const KEY_CODES = [
                SPACE_KEY_CODE,
                ARROW_UP_KEY_CODE,
                ARROW_DOWN_KEY_CODE,
            ];

            if (KEY_CODES.indexOf(e.keyCode) === NO_EXIST) {
                return;
            }

            e.preventDefault();
            const parallel = this.props.parallel;

            if (parallel === 0) {
                return;
            }

            if (this.lock) {
                this.glance();
            } else {
                this.raffle();
            }

            this.lock = !this.lock;
        });

        /*
         *CTRL + 反单引号(1左侧) 重置
         */
        $(document).on('keydown.lottery', (e) => {
            const BACK_TICK_KEY_CODE = 192;
            const ENTER_KEY_CODE = 13;

            if (e.ctrlKey) {
                switch (e.keyCode) {
                    case BACK_TICK_KEY_CODE:
                        this.props.dispatch(clearAll());
                        break;
                    case ENTER_KEY_CODE:
                        document.body.webkitRequestFullScreen();
                        break;
                    default:
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
                <Flicker users={this.props.displayUsers} />
            </div>
        );

    }

}

Lottery.propTypes = {
    displayUsers: PropTypes.arrayOf(PropTypes.shape({
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

    users.forEach((user) => {
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

function displayUsersSelector(users, index, parallel) {

    const INIT_CODE = -1;

    parallel = parallel || 1;

    if (index.length === 1 && index[0] === INIT_CODE) {
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

    return index.map((i) => (Object.assign({}, users[i])));
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
        displayUsers: displayUsersSelector(state.users, state.displayUserIndexes, parallel),
    }, state);
}

export default connect(select)(Lottery);
