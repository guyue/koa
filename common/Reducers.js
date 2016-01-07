import {
    combineReducers,
} from 'redux';

import {
    ActionConstants,
} from './AppConstants';

function user(state = {
            department: '宝宝树',
            name: '宝宝树',
            phone: '12345678901',
            image: 'img/logo.png',
        }, action) {

    if (action.type === ActionConstants.GLANCE ||
            action.type === ActionConstants.RAFFLE) {

        return Object.assign({}, action.user);

    }

    return state;

}

function users(state = [], action) {
    return state;
}

const reducers = combineReducers({
    user,
    users,
});

export default reducers;
