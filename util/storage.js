'use strict';

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
        let avatars = yield getAvatars();
        avatars = avatars.filter((avatar) => {
            if (!/^.+\-.+\-\d{11}\.(?:jpg|jpeg|png)$/i) {
                console.log('错误图片：', avatar);
                return false;
            }
            return true;
        });
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
