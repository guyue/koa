import {
    ActionConstants,
} from './AppConstants';

export function glance(user) {
    return {
        type: ActionConstants.GLANCE,
        user,
    };
}

export function raffle(user) {
    return {
        type: ActionConstants.RAFFLE,
        user,
    };
}

