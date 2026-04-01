const http = require('http');
const fs = require('fs')
const url = require('url')
const myserver = http.createServer((req,res)=>{
    // console.log("new req recieved")
    // console.log(req)
    const log = `${Date.now()} ${req.url} : New Request\n`
    const myurl = url.parse(req.url,true);
    if(req.url==="/favicon.ico") return res.end();
    fs.appendFile('log.txt',log,(err,data)=>{
        switch (myurl.pathname) {
            case '/':
                res.end("hello from server")                
                break;
            case '/about':
                const username = myurl.query.name
                res.end(`hi ${username}`)
                // res.end('hi sumedhyou bro')
                console.log(myurl)
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