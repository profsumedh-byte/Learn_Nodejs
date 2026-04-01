const express = require('express')
const app = express();
const mongoose = require('mongoose');
const PORT = 8000;

const userSchema = new mongoose.Schema({
    id: {
        type: Number,
    },
    firstname : {
        type: String,
        required : true
    },
    lastname:{
        type: String,
    },
    email:{
        type: String,
        required : true,
        unique: true
    },
    jobtitle:{
        type: String,
    },
    gender:{
        type: String
    }

})

mongoose.connect('mongodb://127.0.0.1:27017/api-app-1') // api-app-1 is a database name
.then(()=> console.log('mongodb connected'))
.catch((err)=> console.log('mongo error',err))

const user = mongoose.model('user',userSchema)  // user is the collection name
app.use(express.urlencoded({ extended: false }));

app.get('/api/users',async(req,res)=>{
    const alldbusers = await user.find({});
    return res.json(alldbusers)
})

app.get('/api/users/:id',async(req,res)=>{
    const Users = await user.findById(req.params.id)
    if (!Users) return res.status(404).json({err:'user not found'})
    return res.json(Users)
})
app.patch('/api/users/:id',async(req,res)=>{
    const updateData = { ...req.body };
    if (updateData.first_name) {
        updateData.firstname = updateData.first_name;
        delete updateData.first_name;
    }
    if (updateData.last_name) {
        updateData.lastname = updateData.last_name;
        delete updateData.last_name;
    }
    await user.findByIdAndUpdate(req.params.id, updateData);
    return res.json({status:'Success'})
})
app.delete('/api/users/:id',async(req,res)=>{
    const Users = await user.findByIdAndDelete(req.params.id)
    return res.json({status:"sucess"})
    
})

app.post('/api/users',async(req,res)=>{
    const body = req.body;
    if(
        !body || ! body.first_name || !body.last_name || !body.email || !body.gender || !body.jobtitle
    ){
        return res.status(400).json({msg: " all fields ae req..."})
    }
    const result = await user.create({
        firstname: body.first_name,
        lastname: body.last_name,
        email: body.email,
        gender: body.gender,
        jobtitle: body.jobtitle
    })
    return res.status(201).json({msg:"Success"})
})



app.listen(PORT ,()=>{console.log(`http://localhost:${PORT}`)})