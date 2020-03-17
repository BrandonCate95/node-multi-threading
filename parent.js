// parent.js
var child_process = require('child_process');

var numchild  = require('os').cpus().length;
var done      = 0;

var obj = {}

var start = Date.now()
for (var i = 0; i < numchild; i++){
  var child = child_process.fork('./child');
  child.send('start');
  child.on('message', function(message) {
    //console.log('[parent] received message from child:', message);
    obj = {...obj, ...message.result}
    done++;
    if (done === numchild) {
      console.log(Date.now() - start)  
      console.log('[parent] received all results');
      console.log(Object.keys(obj).length)
    }
  });
}