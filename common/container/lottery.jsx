import React, {
    Component,
    PropTypes,
} from 'react';

import {
    connect,
} from 'react-redux';

import Background from '../component/background.jsx';
import Copyleft from '../component/copyleft.jsx';
import Board from '../component/board.jsx';
import Flicker from '../component/flicker.jsx';
import {
    glance,
    raffle,
    changeRank,
    clearAll,
} from '../Actions';


class Lottery extends Component {

    random(skipIsRaffled) {
        const users = this.props.users;
        const index = Math.random() * users.length >>> 0;
        const target = {};

        if (skipIsRaffled) {
            target.rank = this.props.rank.key;
        }

        if (skipIsRaffled && users[index].rank) {
            return random(skipIsRaffled);
        }

        return {
            index,
            user: Object.assign(target, users[index]),
        };
    }

    componentDidMount() {

        this.lock = true;
        this.boot = Lucky();
        this.timer = null;

        $(document).on('keydown.lottery', (e) => {
            //空格，回车，上方向键，下方向键
            if ([32, 38, 40].indexOf(e.keyCode) >= 0) {
                e.preventDefault();
                if (this.lock) {
                    this.timer = setInterval(() => {
                        this.props.dispatch(glance(this.random()));
                    }, 100);
                } else {
                    clearInterval(this.timer);
                    this.props.dispatch(raffle(this.random(true)));
                }
                this.lock = !this.lock;
            }
        });

        /*
         *CTRL + 反单引号(1左侧) 重置
         */
        $(document).on('keydown.lottery', (e) => {
            if (e.ctrlKey && e.keyCode == 192) {
                // 192 = 反单引号(1左侧)
                this.props.dispatch(clearAll());
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
                    prize={this.props.prize}
                    rank={this.props.rank}
                    raffled={this.props.raffled}
                    changeRank={(rank) => {
                        this.props.dispatch(changeRank(rank));
                    }}
                />
                <Flicker user={this.props.user} />
            </div>
        );

    }

}

Lottery.propTypes = {
    user: PropTypes.shape({
        department: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        phone: PropTypes.string.isRequired,
        image: PropTypes.string.isRequired,
    }).isRequired,
};

function raffled(users, rank) {
    const result = [];

    users.forEach(function (user) {
        if (user.rank === rank.key) {
            result.push(user);
        }
    });

    return result;
}


function select(state) {
    return Object.assign({
        raffled: raffled(state.users, state.rank),
    }, state);
}

export default connect(select)(Lottery);
