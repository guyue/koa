module.exports = {
    index: function *() {
        this.render('index', {
            title: 'React View',
            csrf: this.csrf,
        });
    },
};
