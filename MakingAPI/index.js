const express = require('express')
const app = express();
const data = require('./MOCK_DATA.json')
let users = [...data]
const fs = require('fs')
const PORT = 8000;
app.use(express.urlencoded({ extended: false }));

app.get('/api/users',(req,res)=>{
    return res.json(users)
})

app.get('/api/users/:id',(req,res)=>{
    const id = Number(req.params.id);
    const user = users.find(user => user.id === id)
    return res.json(user)
})
app.patch('/api/users/:id',(req,res)=>{
    const id = Number(req.params.id);
    const body = req.body;
    const userIndex = users.findIndex(user => user.id === id);
    
    if (userIndex !== -1) {
        users[userIndex] = { ...users[userIndex], ...body };
        fs.writeFile('./MOCK_DATA.json', JSON.stringify(users), (err) => {
            return res.json({ status: "success", id: id });
        });
    } else {
        return res.status(404).json({ status: "error", message: "User not found" });
    }
})
app.delete('/api/users/:id',(req,res)=>{
    const id = Number(req.params.id);
    users = users.filter(user => user.id !== id )
    fs.writeFile('./MOCK_DATA.json',JSON.stringify(users),(err)=>{
        return res.json({status:"success",id:id})
    })
    
})

app.post('/api/users',(req,res)=>{
    const body = req.body;
    users.push({...body, id : users.length + 1})
    fs.writeFile('./MOCK_DATA.json',JSON.stringify(users),(err)=>{
        return res.json({status:"success",id: users.length})
    })
})



app.listen(PORT ,()=>{console.log(`http://localhost:${PORT}`)})