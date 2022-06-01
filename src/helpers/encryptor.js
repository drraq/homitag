const crypto = require('crypto')

const encryptDecryptPassword = function (password, selector, config){
    const {algorithm, key} = config.get('encryption:aes')
    const secretKey = crypto.scryptSync(key, 'salt', key.length)
    const iv = Buffer.alloc(16, 0)

    if(selector === "encrypt"){
        const cipher = crypto.createCipheriv(algorithm, secretKey, iv)
        password = cipher.update(password, 'utf8', 'hex') + cipher.final('hex')
        return password
    }
    else if(selector === "decrypt"){
        const decipher = crypto.createDecipheriv(algorithm, secretKey, iv)
        password = decipher.update(password, 'hex', 'utf8') + decipher.final('utf8')
        return password
    }
}

module.exports = () => ({
    encryptDecryptPassword: encryptDecryptPassword.bind(null)
})