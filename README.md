Simple in-memory (or nedb- mysql- mongodb) queue using REST calls

## Usage 

Put this in `server.js`:

    var restqueue = require('./index.js')

    restqueue([
      'myqueue', 
      'anotherqueue'
    ], function(app, server){
      console.log("queue started at port "+process.env.PORT )
    })

And then run

    $ PORT=4444 node server.js

> Voila: now each queue has api-endpoints. The documentation/playground can be viewed at 'http://localhost:4444/doc/#!/default'

<img src="https://github.com/coderofsalvation/restqueue/raw/master/doc/restqueue.png" width="60%"/>

## Rest calls 

    $ curl -H 'Content-Type: application/json' -X POST http://localhost:4444/q/myqueue --data '{"data":{"foo":"bar"}}'
    {"jsonapi":{"version":"1.0"}, "errors":[], "data":{"status":"pushed"}}

    $ curl -X GET http://localhost:4444/q/myqueue
    {"jsonapi":{"version":"1.0"}, "errors":[], "data":{"foo":"bar"}}

## Why

I tried [rsmq](https://npmjs.org/package/rsmq) and [kue](https://npmjs.org/package/kue) as nodejs-queues, but wondered why redisdb was needed.
This is an REST + nodejs approach, simply using arrays.
For a more serious distributed queue i would suggest rabbitmq,  and for an single-process async queue i would suggest [queue](https://npmjs.org/package/queue) 
