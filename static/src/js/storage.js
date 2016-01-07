const STORAGE_KEY = 'lottery';

function getItem() {
    return JSON.parse(window.localStorage.getItem(STORAGE_KEY) || '[]');
}

function setItem(val) {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(val));
}

function clear() {
    window.localStorage.removeItem(STORAGE_KEY);
}

const storage = {

    query: function (user) {

        const users = getItem();

        return users.findIndex(function (value) {
            if (user.department === value.department &&
                    user.name === value.name &&
                    user.phone === value.phone) {
                return true;
            }
            return false;
        });

    },

    append: function (user) {

        const index = this.query(user);

        if (index === -1) {
            const users = getItem();
            users.push(user);
            setItem(users);
        }

    },

    remove: function (user) {

        const index = this.query(user);

        if (index > -1) {
            const users = getItem();
            users.splice(index, 1);
            setItem(users);
        }

    },

    read: function () {
        return getItem();
    },

    clear: clear,

};

export default storage;
