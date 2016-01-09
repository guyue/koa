import {
    ActionConstants,
} from './constants';

import storage from '../static/src/js/storage.js';

export function glance(payload) {
    return {
        type: ActionConstants.GLANCE,
        payload,
    };
}

export function raffle(payload) {
    payload.forEach((message) => {
        storage.append(message.user);
    });
    return {
        type: ActionConstants.RAFFLE,
        payload,
    };
}

export function changePrize(index) {
    return {
        type: ActionConstants.CHANGE_PRIZE,
        index,
    };
}

export function removeRaffled(user) {
    storage.remove(user);
    return {
        type: ActionConstants.REMOVE_RAFFLED,
        user: user,
    };
}

export function clearAll() {
    storage.clear();
    return {
        type: ActionConstants.CLEAR_ALL,
    };
}

export function initUsers() {
    return {
        type: ActionConstants.INIT_USERS,
    };
}

