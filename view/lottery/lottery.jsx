import React, {
    Component,
} from 'react';

import Background from './background.jsx';
import Copyleft from './copyleft.jsx';
import Board from './board.jsx';
import Flicker from './Flicker.jsx';


export default class Lottery extends Component {

    constructor(props) {
        super(props);

        this.state = {
            user: {
                department: '宝宝树',
                name: '宝宝树',
                phone: '12345678901',
                image: 'img/logo.png',
            }
        };
    }

    componentDidMount() {

        config.init();

        this.lock = true;
        this.boot = Lucky();

        $(document).on('keydown.lottery', (e) => {
            //空格，回车，上方向键，下方向键
            if ([32, 13, 38, 40].indexOf(e.keyCode) >= 0) {
                e.preventDefault();
                if (this.lock) {
                    this.lock = this.boot.start();
                } else {
                    this.lock = this.boot.lottery();
                }
            }
        });

        /*
         *更换壁纸、设置全局抽奖奖项
         *键盘操作[1: 一等奖, 2: 二等奖, 3: 三等奖, 4: 感恩奖，0: 全显]
         *CTRL + DEL 重置
         */
        $(document).on('keydown.lottery', function( e ) {
            var k = config.keycode[e.keyCode];
            if(!!k) {
                e.preventDefault();
                config.awards = k.class;
    
                $('.' + config.awards).addClass('active').siblings().removeClass('active')
    
                //background
    
            } else if (e.keyCode == 48){
                e.preventDefault();
                config.awards = 'grateful';
    
                $('.board > div').addClass('active');
            } else if (e.ctrlKey && e.keyCode == 192) {
                // 192 = 反单引号(1左侧)
    
                config.clear();
    
                window.location.reload()
            }
        })

    }

    componentWillUnmount() {

        $(document).off('keydown.lottery');

    }

    render() {

        return (
            <div>
                <link rel="stylesheet" href="less/lottery.css" />
                <Background />
                <Copyleft />
                <Board />
                <Flicker user={this.state.user} />
            </div>
        );

    }

}
