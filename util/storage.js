const fs = require('fs');
const path = require('path');

function getAvatars() {
    return function (done) {
        const avatarDir = require('../config/config').avatarDir;
        fs.readdir(avatarDir, done);
    };
}

module.exports = {
    getUsers: function *() {
        const avatars = yield getAvatars();
        const users = avatars.map(function (avatar) {
            const parts = avatar.split(/-|\./);
            return {
                department: parts[0],
                name: parts[1],
                phone: parts[2],
                image: `avatar/${avatar}`,
            };
        });

        return users;
    },
};
