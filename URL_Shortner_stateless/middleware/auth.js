const {getUser} = require('../service/Auth')

function checkForAuthentication(req,res,next){
    const token = req.cookies?.uid;
    req.user = null
    if(!token){
        return next();
    }
    const user = getUser(token)
    req.user = user;
    next()

}

function restrictTo(roles = []){
    return function (req,res,next) {
        if(!req.user) return res.redirect('/login')
        if(!roles.includes(req.user.role)) return res.end('unAuthorized')
        return next();
    }
}

module.exports = {
    checkForAuthentication,restrictTo
}