const express = require('express')
const {connectToMongodb} = require('./connect')
const URL = require('./models/url')
const app = express();
const PORT = 3000;

app.use(express.json())

connectToMongodb('mongodb://127.0.0.1:27017/short-url')
.then(()=>{ console.log("connect to mongodb")})
.catch((err)=>{ console.error("failed to connect to mongodb", err)})


const urlRoute = require('./router/url')
app.use('/url',urlRoute)

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