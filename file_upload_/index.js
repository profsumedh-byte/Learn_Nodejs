const path = require('path')
const express = require('express')
const multer  = require('multer')
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
    cb(null, './uploads')
  },
    filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix + ext);
  }
})

const upload = multer({storage })
const app = express();
const PORT = 3001

app.set('view engine','ejs')
app.set('views',path.resolve('./views'))

app.use(express.json())

app.get('/',(req,res)=>{
    return res.render('homepage')
})

app.post('/uploads',upload.single("profileImage"),(req,res)=>{
    console.log(req.file);
    res.redirect('/')
})

app.listen(PORT,() => console.log(`http://localhost:${PORT}`))