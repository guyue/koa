import React, {
    Component,
    PropTypes,
} from 'react';

export default class Background extends Component {

    render() {
        return (
			<video
                className="background"
                autoPlay
                loop
                src="video/cloud.mp4" />
        );
    }

}
