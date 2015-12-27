module.exports = {
    get: function *() {
        const session = this.session;
        session.count = session.count || 0;
        session.count += 1;
        this.body = session.count;
    },
    
    remove: function *() {
        this.session = null;
        this.body = 0;
    },
    
    regenerate: function *() {
        yield this.regenerateSession();
        get.call(this);
    },
};
