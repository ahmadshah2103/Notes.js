
const generateUsername = (email) => {
    const username = email.split('@')[0];
    return `${username}_${Date.now()}`;
};

module.exports = generateUsername;