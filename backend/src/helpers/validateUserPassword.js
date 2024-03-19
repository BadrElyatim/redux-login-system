const bcrypt = require('bcrypt')

const validateUserPassword = async (password, hash) => {
    try {
        const result = await bcrypt.compare(password, hash)
        return result
    } catch(err) {
        throw new Error(err);
    }
}

module.exports = validateUserPassword