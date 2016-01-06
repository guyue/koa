import React, {
    Component,
} from 'react';

import Background from './background.jsx';
import Copyleft from './copyleft.jsx';
import Board from './board.jsx';
import Flicker from './Flicker.jsx';


export default class Lottery extends Component {

    componentDidMount() {

        this.lock = true;
        this.boot = Lucky();

        $(document).on('keydown.flicker', (e) => {
            //空格，回车，上方向键，下方向键
            if ([32, 13, 38, 40].indexOf(e.keyCode) >= 0) {
                if (this.lock) {
                    this.lock = this.boot.start();
                } else {
                    this.lock = this.boot.lottery();
                }
            }
        });

    }

    componentWillUnmount() {

        $(document).off('keydown.flicker');

    }

    render() {

        return (
            <div>
                <link rel="stylesheet" href="less/lottery.css" />
                <Background />
                <Copyleft />
                <Board />
                <Flicker />
            </div>
        );

    }

}
