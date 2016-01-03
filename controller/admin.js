module.exports = {
    index: function *() {
        this.render('admin/surprise', {
            title: '奖品管理',
            csrf: this.csrf,
        });
    },

    user: function *() {
        this.render('admin/user', {
            title: '用户管理',
            csrf: this.csrf,
        });
    },
};
