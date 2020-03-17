var obj = require('./object')
var crypto = require('crypto')

var SIZE = 1000000

var start = Date.now()
for(var i = 0; i < 4 * SIZE; i++){
    obj[generateDocHash()] = Math.random() * 10000000
} 
console.log(Date.now() - start)

// process.on('message', function(message) {
//     console.log('[child] received message from server:', message);
//     for(var i = 0; i < SIZE; i++){
//         obj[generateDocHash()] = Math.random() * 10000000
//     } 
    
//     //console.log(Object.keys(obj).length)

//     process.send({
//         child: process.pid,
//         result: obj
//     }, (error) => {
//         if(error) console.log(error)
//         process.disconnect()
//     })

//   });

function generateDocHash(){
    var current_date = (new Date()).valueOf().toString()
    var random = Math.random().toString()
    return crypto.createHash('sha1').update(current_date + random).digest('hex')
}