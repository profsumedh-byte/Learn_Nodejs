const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const {connectToMongodb} = require('./connect')

const {checkForAuthentication,restrictTo} = require('./middleware/auth')
const URL = require('./models/url')
const app = express();
const PORT = 3000;

app.set('view engine', 'ejs');
app.set('views', path.resolve('./views'));

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())

app.use(checkForAuthentication)

connectToMongodb('mongodb://127.0.0.1:27017/short-url')
.then(()=>{ console.log("connect to mongodb")})
.catch((err)=>{ console.error("failed to connect to mongodb", err)})


const urlRoute = require('./router/url')
const staticRoute = require('./router/staticRouter')
const userRoute = require('./router/user')


app.use('/url',restrictTo(['NORMAL','ADMIN']),urlRoute)
app.use('/user',userRoute)
app.use('/', staticRoute)

app.get('/:shortId',async(req,res)=>{
    const shortId = req.params.shortId;
    const entry = await URL.findOneAndUpdate({shortID: shortId},{$push:{
        visitHistory: {timestamp :Date.now()}
    }})
    
    if (!entry) {
        return res.status(404).json({ error: "URL not found" })
    }
    
    res.redirect(entry.redirectURL)
})


app.listen(PORT,()=>console.log(`http://localhost:${PORT}`))