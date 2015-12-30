module.exports = {
    index: function *() {
        this.render('lottery/index', {
            title: 'React Lottery',
            csrf: this.csrf,
        });
    },
};
