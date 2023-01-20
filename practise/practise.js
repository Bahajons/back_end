console.clear()
// const path = require('path')
// const filename=path.basename('sadsad/sadsa/dsa/fds.js')
// const join=path.join('Users','user','sads.js')

// let a = "salom"
// console.log(a)
// console.log('basename = > ',filename)
// console.log('join = > ',join)
// console.log(path.parse(__filename))
// Os
// const os = require('os')
// const freeMem = os.freemem()
// const useInfo = os.userInfo()
// const fullMemory = os.totalmem()

// console.log(`
// ${freeMem}
// ${useInfo.username}
// ${fullMemory},
// ${(fullMemory - freeMem) / (1024 * 1024)}`)

// const fs = require('fs')

// const files = fs.readdirSync('./')

// fs.readdir('./', function (err, files) {
//     if (err) {
//         console.log(err);
//     }
//     else {
//         console.log(files);
//     }
// })
// console.log('syn', files)

// fs.readFile('./logger.js','utf-8', function (err, files) {
//     if (err)
//         throw err

//         console.log(files);
// })

// fs.writeFile("books.txt", 'Men dunyoni nima qildim', (err) => {
//     if (err)
//       console.log(err);
//     else {
//       console.log("File written successfully\n");
//       console.log("The written has the following contents:");
//       console.log(fs.readFileSync("salom.txt", "utf8"));
//     }
//   });

//   fs.rename('books.txt','salom.txt',function(err,thro){
//     console.log(err);
//     console.log(thro);
//   })
//   fs.unlink("salom.txt", (err => {
//     if (err) console.log(err);
//     else {
//       console.log("\nDeleted file: example_file.txt");

//       // Get the files in current directory
//       // after deletion
//     }
//   }));

// const Emitter = require('events')
// const emitter = new Emitter()

// const log = require('./logger')
// const logger =new log()

// emitter.on('messageLogged', (arg) => {
//     console.log('Listener chaqirilgi', arg.message);
// })


// // emitter.emit('messageLogged', { id: 1, name: "mr Chotki", message: "Rais xammasi yaxshi" })
// logger.log('Vasya')


// console.log(emitter.eventNames)

        // 15 dars
// const http = require('http')
// const server = http.createServer((req, res) => {
//     if (req.url === '/') {
//         res.write('Asosiy sahifa')
//         res.end()
//     }
//     if (req.url === '/api/books') {
//         res.write(JSON.stringify(['sda', 'sdads']))
//         res.end()
//     }
//     // server.on('connection', (soket) => {
//     // console.log('Yangi bog\'lanish')
// })

// server.listen(8000)
// console.log(`${server.address().port} da eshitvoti`)
// ========///////=======





