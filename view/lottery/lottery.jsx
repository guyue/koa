import React, {
    Component,
} from 'react';

import Background from './background.jsx';
import Copyleft from './copyleft.jsx';
import Board from './board.jsx';
import Flicker from './Flicker.jsx';


export default class Lottery extends Component {

    render() {

        return (
            <div>
                <link rel="stylesheet" href="css/screen.css" />
                <Background />
                <Copyleft />
                <Board />
                <Flicker />
            </div>
        );

    }

}
