const express = require('express')
const {handlegenerateNewShortURl,handlegetanalytics} = require('../controllers/url')
const router = express.Router()

router.post('/',handlegenerateNewShortURl);

router.get('/',(req, res) => {
    res.redirect('/');
});
router.get('/analytics/:shortId',handlegetanalytics);
module.exports = router;