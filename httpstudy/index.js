const http = require('http');
const fs = require('fs')
const myserver = http.createServer((req,res)=>{
    // console.log("new req recieved")
    // console.log(req)
    const log = `${Date.now()} ${req.url} : New Request\n`
    fs.appendFile('log.txt',log,(err,data)=>{
        console.log(data);
        switch (req.url) {
            case '/':
                res.end("hello from server")                
                break;
            case '/about':
                res.end("i am sumedh gangurde")
                break;
        
            default:
                res.end("404 page not found")
                break;
        }


    })
}); 

myserver.listen(8000,()=>{
    console.log('server started')
});