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
import Flicker from '../component/Flicker.jsx';
import {
    glance,
    raffle,
} from '../Actions';


class Lottery extends Component {

    random(skipIsRaffled) {
        const users = this.props.users;
        const index = Math.random() * users.length >>> 0;
        const target = {};

        if (skipIsRaffled) {
            target.rank = this.props.rank;
        }

        if (skipIsRaffled && users[index].isRaffled) {
            return random(skipIsRaffled);
        }

        return {
            index,
            user: Object.assign(target, users[index]),
        };
    }

    componentDidMount() {

        config.init();

        this.lock = true;
        this.boot = Lucky();
        this.timer = null;

        $(document).on('keydown.lottery', (e) => {
            //空格，回车，上方向键，下方向键
            if ([32, 13, 38, 40].indexOf(e.keyCode) >= 0) {
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
         *更换壁纸、设置全局抽奖奖项
         *键盘操作[1: 一等奖, 2: 二等奖, 3: 三等奖, 4: 感恩奖]
         *CTRL + DEL 重置
         */
        $(document).on('keydown.lottery', function( e ) {
            var k = config.keycode[e.keyCode];
            if(!!k) {
                e.preventDefault();
                config.awards = k.class;
    
                $('.' + config.awards).addClass('active').siblings().removeClass('active')
    
                //background
    
            } else if (e.ctrlKey && e.keyCode == 192) {
                // 192 = 反单引号(1左侧)
    
                config.clear();
    
                window.location.reload()
            }
        })

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
                <Board />
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

function select(state) {
    return state;
}

export default connect(select)(Lottery);
