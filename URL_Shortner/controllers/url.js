const {nanoid} = require("nanoid");
const URL = require('../models/url')
async function handlegenerateNewShortURl(req,res) {
    const body = req.body;
    if(!body.url) return res.status(400).json({error:'url is required'})
    const shortID = nanoid(8);
    await URL.create({
        shortID: shortID,
        redirectURL: body.url,
        visitHistory: [],
    })

    return res.json({id: shortID});
}

async function handlegetanalytics(req,res){
    const shortId = req.params.shortId;
    const result = await URL.findOne({shortID: shortId});
    
    if (!result) return res.status(404).json({ error: "URL not found" });

    return res.json({ totalclicks: result.visitHistory.length, analytics: result.visitHistory });
}

module.exports = {
    handlegenerateNewShortURl,
    handlegetanalytics
}