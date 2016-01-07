import {
    ActionConstants,
} from './AppConstants';

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

