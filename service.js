const { workerData, parentPort } = require('worker_threads')
var crypto = require('crypto')

function generateDocHash(){
    var current_date = (new Date()).valueOf().toString()
    var random = Math.random().toString()
    return crypto.createHash('sha1').update(current_date + random).digest('hex')
}

// You can do any heavy stuff here, in a synchronous way
// without blocking the "main thread"
for(var i = 0; i < 1000; i++){
    workerData.docIndex[generateDocHash()] = workerData.hi
}

parentPort.postMessage({ docIndex: workerData.docIndex })