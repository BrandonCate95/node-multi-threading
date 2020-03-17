// index.js
// run with node --experimental-worker index.js on Node.js 10.x
const { Worker } = require('worker_threads')

var docIndex = {}

function runService(workerData) {
  return new Promise((resolve, reject) => {
    const worker = new Worker('./service.js', { workerData });
    worker.on('message', resolve);
    worker.on('error', reject);
    worker.on('exit', (code) => {
      if (code !== 0)
        reject(new Error(`Worker stopped with exit code ${code}`));
    })
  })
}

async function run() {
  for(var i = 0; i < 10; i++){
    const result = await runService({hi:'hi', bye:'bye', docIndex})
    console.log(result);
  }  
}

run().catch(err => console.error(err))