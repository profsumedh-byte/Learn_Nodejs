const user = require('../models/user')
const {getUser,setUser} = require('../service/Auth')
const {v4:uuidv4} = require('uuid')
async function handleusersignup(req,res){
    const {name,email,password} = req.body;
    await user.create({
        name,
        email,
        password
    })

    return res.redirect('/');
}

async function handleuserlogin(req,res){
    const {email,password} = req.body;
    const loggedInUser = await user.findOne({email, password});
    if(!loggedInUser) return res.render('login',{error:'Invalid username or password'});
    const sessionId = uuidv4();
    setUser(sessionId,loggedInUser);
    res.cookie('uid',sessionId);
    return res.redirect('/');
}

module.exports = {
    handleusersignup,
    handleuserlogin
}