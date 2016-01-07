import {
    ActionConstants,
} from './AppConstants';

export function glance(message) {
    return Object.assign({
        type: ActionConstants.GLANCE,
    }, message);
}

export function raffle(message) {
    return Object.assign({
        type: ActionConstants.RAFFLE,
    }, message);
}

