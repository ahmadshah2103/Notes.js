const { User } = require('../models');

const createOrUpdateUser = (userDict) => {
    return User.findOne({ where: { email: userDict.email } })
        .then(async (existingUser) => {
            if (existingUser) {
                await existingUser.update({
                    googleSub: userDict.googleSub,
                    avatarUrl: userDict.avatarUrl
                })
                return [existingUser, false];
            }
            const newUser = await User.create(userDict)
            return [newUser, true];
        });
}

module.exports = createOrUpdateUser;