const STORAGE_KEY = 'lottery';

/**
 * 获取已经中奖用户信息数组
 * @return {Array} localStorage中存储的已经中奖用户信息数组
 */
function getItem() {
    return JSON.parse(window.localStorage.getItem(STORAGE_KEY) || '[]');
}

/**
 * 设置已经中奖用户信息数组
 * $param {Array} val 已经中奖用户信息数组
 */
function setItem(val) {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(val));
}

/**
 * 清除本地中奖用户信息数组
 */
function clear() {
    window.localStorage.removeItem(STORAGE_KEY);
}

const storage = {

    get(user) {

        const users = getItem();

        return users.find((value) => {
            if (user.department === value.department &&
                    user.name === value.name &&
                    user.phone === value.phone) {
                return true;
            }
            return false;
        });

    },

    query(user) {

        const users = getItem();

        return users.findIndex((value) => {
            if (user.department === value.department &&
                    user.name === value.name &&
                    user.phone === value.phone) {
                return true;
            }
            return false;
        });

    },

    append(user) {

        const index = this.query(user);
        const NO_EXIST = -1;

        if (index === NO_EXIST) {
            const users = getItem();

            users.push(user);
            setItem(users);
        }

    },

    remove(user) {

        const index = this.query(user);
        const NO_EXIST = -1;

        if (index > NO_EXIST) {
            const users = getItem();

            users.splice(index, 1);
            setItem(users);
        }

    },

    read() {
        return getItem();
    },

    clear,

};

export default storage;
