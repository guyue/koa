import {
    ActionConstants,
} from './constants.jsx';

import storage from '../static/src/js/storage.jsx';

/**
 * 现抽奖奖项索引
 * @param {Number} state 前抽奖奖项索引
 * @param {Object} action
 * @return {Number} 现抽奖奖项索引
 */
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

/**
 * 现摇奖界面显示用户索引列表
 * @param {Array} state 前摇奖界面显示用户索引列表
 * @param {Object} action
 * @return {Array} 现摇奖界面显示用户索引列表
 */
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

/**
 * 指定用户在stateUsers中的索引值
 * @param {Array} stateUsers state中用户列表
 * @param {Object} user
 * @return {Number} 指定用户在stateUsers中的索引值
 */
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

/**
 * stateUsers初始化
 * @param {Array} stateUsers state中用户列表
 * @return {Array} 用本地数据对stateUsers进行初始化
 */
function initUsers(stateUsers) {
    if (typeof window !== 'object') {
        return stateUsers;
    }

    return stateUsers.map((user) => (Object.assign({}, storage.get(user), user)));
}


/**
 * 现用户列表
 * @param {Array} state 前用户列表
 * @param {Object} action
 * @return {Array} 现用户列表
 */
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

/**
 * 现奖项列表
 * @param {Array} state 前奖项列表
 * @return {Array} 现奖项列表
 */
function prizes(state = []) {
    return state;
}

const reducers = {
    prizes,
    selectedPrizeIndex,
    users,
    displayUserIndexes,
};

export default reducers;
