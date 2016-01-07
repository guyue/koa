import {
    combineReducers,
} from 'redux';

import {
    ActionConstants,
} from './AppConstants';

function rank(state = {}, action) {
    if (action.type === ActionConstants.CHANGE_RANK) {
        return action.rank;
    }
    return state;
}

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
    if (action.type === ActionConstants.RAFFLE) {
        return [
            ...state.slice(0, action.index),
            Object.assign({}, action.user),
            ...state.slice(action.index + 1)
        ];
    }
    return state;
}

function prize(state = [], action) {
    return state;
}

const reducers = combineReducers({
    rank,
    prize,
    user,
    users,
});

export default reducers;
