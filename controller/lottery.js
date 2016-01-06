const storage = require('../util/storage');

module.exports = {
    index: function *() {
        const users = yield storage.getUsers();
        this.render('lottery/index', {
            title: 'React Lottery',
            users: users,
            prize: require('../data/prize'),
            csrf: this.csrf,
        });
    },
};
