/* eslint-disable no-unused-vars */
import React, {
    Component,
} from 'react';
/* eslint-enable no-unused-vars */

export default class Background extends Component {

    render() {
        return (
			<video
                className="background"
                autoPlay
                loop
                src="http://7xqkdt.com1.z0.glb.clouddn.com/cloud.mp4" />
        );
    }

}
