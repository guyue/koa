import React, {
    Component,
    PropTypes,
} from 'react';

export default class Flicker extends Component {

    componentDidMount() {

        this.lock = true;
        this.boot = Lucky();

        $(document).on('keydown.flicker', (e) => {
            //空格，回车，上方向键，下方向键
            if ([32, 13, 38, 40].indexOf(e.keyCode) > 0) {
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
                <div className="flicker">
                    <img src="img/logo.png" width="256"/>
                </div>
                <div className="name-container">
                    <span className="name"></span>
                </div>
            </div>
        );

    }

}
