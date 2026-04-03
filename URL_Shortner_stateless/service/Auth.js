const jwt = require('jsonwebtoken')
const secret = 'sumedh@%^2'

function setUser(user){
    const payload = {
        name:user.name,
        email : user.email,
        role: user.role
    }
    return jwt.sign(payload,secret, { expiresIn: '1h' })
}

function getUser(token){
    if(!token) return null
    try {
        return jwt.verify(token,secret)
        
    } catch (error) {
        return null
    }
}

module.exports = {
    setUser,getUser
}