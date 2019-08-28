const bcrypt = require('bcrypt')

module.exports = {
    hash(password) {
        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(password, salt)
        return hash
    },

    compare(originalPassword, hash) {
        return bcrypt.compare(originalPassword, hash)
    }
}