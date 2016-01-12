import {
    combineReducers,
} from 'redux';

import {
    ActionConstants,
} from './constants';

import storage from '../static/src/js/storage.js';

function selectedPrizeIndex(state = 0, action) {
    if (action.type === ActionConstants.CHANGE_PRIZE) {
        return action.index;
    }
    return state;
}

const INIT_USER_INDEX = -1;
const INIT_USER_STATE = [
    INIT_USER_INDEX,
];

function displayUserIndexes(state = INIT_USER_STATE, action) {

    if (action.type === ActionConstants.GLANCE ||
            action.type === ActionConstants.RAFFLE) {

        return action.payload.map((message) => (message.index));

    }

    if (action.type === ActionConstants.CHANGE_PRIZE) {
        return INIT_USER_STATE;
    }

    return state;

}

function query(stateUsers, user) {

    return stateUsers.findIndex((value) => {
        if (user.department === value.department &&
                user.name === value.name &&
                user.phone === value.phone) {
            return true;
        }
        return false;
    });

}

function initUsers(stateUsers) {
    if (typeof window !== 'object') {
        return stateUsers;
    }

    return stateUsers.map((user) => (Object.assign({}, storage.get(user), user)));
}


function users(state = [], action) {
    if (action.type === ActionConstants.INIT_USERS) {
        return initUsers(state);
    }

    if (action.type === ActionConstants.RAFFLE) {
        const result = [
            ...state,
        ];

        action.payload.forEach((message) => {
            const index = message.index;

            result[index] = Object.assign({}, message.user);
        });
        return result;
    }

    if (action.type === ActionConstants.CLEAR_ALL) {
        /* eslint-disable no-underscore-dangle */
        return window.__INITIAL_STATE__.users;
        /* eslint-enable no-underscore-dangle */
    }

    if (action.type === ActionConstants.REMOVE_RAFFLED) {
        const index = query(state, action.user);

        return [
            ...state.slice(0, index),
            Object.assign({}, action.user),
            ...state.slice(index + 1),
        ];
    }
    return state;
}

function prizes(state = []) {
    return state;
}

const reducers = combineReducers({
    prizes,
    selectedPrizeIndex,
    users,
    displayUserIndexes,
});

export default reducers;
