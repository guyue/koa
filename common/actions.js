import {
    ActionConstants,
} from './constants';

import storage from '../static/src/js/storage.js';

export function glance(message) {
    return Object.assign({
        type: ActionConstants.GLANCE,
    }, message);
}

export function raffle(message) {
    storage.append(message.user);
    return Object.assign({
        type: ActionConstants.RAFFLE,
    }, message);
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

