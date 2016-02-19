const storage = require('../util/storage');

module.exports = {
    index: function *() {
        const users = yield storage.getUsers();
        this.render('index', {
            title: 'React Lottery',
            users: users,
            prizes: require('../data/prizes'),
            csrf: this.csrf,
        });
    },

    user: function *() {
        const users = yield storage.getUsers();
        this.render('user', {
            title: '参加抽奖名单',
            users: users,
            csrf: this.csrf,
        });
    },
};
