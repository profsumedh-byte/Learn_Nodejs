const fs = require('fs');
const os = require('os');
console.log(os.cpus().length)

// blocking operation 
// fs.writeFileSync('./test.txt',"ky re sumedh");
// const result = fs.readFileSync('./contact.txt','utf-8')
// console.log(result)

// non-blocking operation
// fs.readFile('./contact.txt','utf-8',(err,result)=>{
//     if (err) {
//         console.log(err);

//     } else{
//         console.log(result);
//     }
// })

// fs.appendFileSync("./test.txt",`${Date.now()}hey there\n`);
// fs.copyFileSync('./test.txt','./copy.txt')
// fs.unlinkSync("./copy.txt")
console.log(fs.statSync("./test.txt"))

// Default Thread Pool Size = 4 
// if Max - 8 core cpu - 8 Thread pool 