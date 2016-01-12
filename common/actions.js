import {
    ActionConstants,
} from './constants';

import storage from '../static/src/js/storage.js';

/**
 * 生成glance action
 * @param {Array} payload 当前摇奖器要显示的用户信息
 * @return {Object} glance action
 * @example
 * glance([{
 *     index: 1,
 *     user: {},
 * },])
 */
export function glance(payload) {
    return {
        type: ActionConstants.GLANCE,
        payload,
    };
}

/**
 * 生成raffle action
 * @param {Array} payload 当前摇奖器要显示的中奖用户信息
 * @return {Object} raffle action
 * @example
 * raffle([{
 *     index: 1,
 *     user: {
 *         prize: 'prize.key',
 *     }
 * }])
 */
export function raffle(payload) {
    payload.forEach((message) => {
        storage.append(message.user);
    });
    return {
        type: ActionConstants.RAFFLE,
        payload,
    };
}

/**
 * 生成changePrize action
 * @param {Number} index 更改奖项索引
 * @return {Object} changePrize action
 */
export function changePrize(index) {
    return {
        type: ActionConstants.CHANGE_PRIZE,
        index,
    };
}

/**
 * 生成removeRaffled action
 * @param {user} user 要删除的用户信息
 * @return {Object} removeRaffled action
 */
export function removeRaffled(user) {
    storage.remove(user);
    return {
        type: ActionConstants.REMOVE_RAFFLED,
        user,
    };
}

/**
 * 生成clearAll action
 * @return {Object} clearAll action
 */
export function clearAll() {
    storage.clear();
    return {
        type: ActionConstants.CLEAR_ALL,
    };
}

/**
 * 生成initUsers action
 * @return {Object} initUsers action
 */
export function initUsers() {
    return {
        type: ActionConstants.INIT_USERS,
    };
}

