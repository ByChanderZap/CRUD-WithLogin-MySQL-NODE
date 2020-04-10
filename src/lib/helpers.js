const bcrypt = require('bcryptjs');

const helpers = {};

helpers.encryptPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    const finalPass = bcrypt.hash(password, salt);

    return finalPass;
};


helpers.mathPassword = async (password, savedPassword) => {
    try {
        await bcrypt.compare(password, savedPassword);
    } catch (error) {
        console.error(error);
    }    
};


module.exports = helpers;