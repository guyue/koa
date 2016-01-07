import React, {
    Component,
    PropTypes,
} from 'react';

export default class Item extends Component {

    render() {
        return (
            <li>
                <div className="avatar"><img width="34" src="img"/></div>
                <div className="name">name</div>
                <button className="icon icon-delete" title="删除">删除</button>
            </li>
        );
    }

}
