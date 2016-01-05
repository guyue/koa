import React, {
    Component,
    PropTypes,
} from 'react';

export default class Flicker extends Component {

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
