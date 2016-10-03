module.exports = function(qs, cb){
  var flowee = require('flowee')
  var bodyParser = require('body-parser')
  require('flowee-doc')(flowee)
  var model = require('./model.js')
  var q = {}

  // create Queues
  model.paths['/reset'] = {
    'get': {
      "public": true,
      'schema':{
        'query':{}, 
        'payload':{}
      }, 
      'description': 'Flushes all jobs in all queues',
      'produces': ['application/json'],
      'responses': {
        '200': {
          'description': 'Shows statistics of all queues',
          'schema': {
            'type': 'object',
          }
        }
      },
      func: (function(q, req, res, next) {
        for ( var i in q  ) {
          q[i] = []
        }
        res.json({"status":"flushed"})
        return next();
      }).bind(this, q)
    }
  }
  model.paths['/stats'] = {
    'get': {
      "public": true,
      'schema':{
        'query':{}, 
        'payload':{}
      }, 
      'description': 'Provides stats of all queues', 
      'produces': ['application/json'],
      'responses': {
        '200': {
          'description': 'Shows statistics of all queues',
          'schema': {
            'type': 'object',
          }
        }
      },
      func: (function(q, req, res, next) {
        var stats = {}
        for ( var i in q  ) {
          stats[i] = q[i].length
        }
        res.json(stats)
        return next();
      }).bind(this, q)
    }
  }
  qs.map( function(qname){
    qurl = '/q/'+qname
    console.log("creating Q: http://localhost:"+process.env.PORT+qurl)
    q[qname] = []
    model.paths[qurl+'/reset'] = {
      'post': {
        "public": true,
        'schema':{
          'query':{}, 
          'payload':{}
        }, 
        'description': 'Flushes all jobs in '+qname+' queue',
        'produces': ['application/json'],
        'responses': {
          '200': {
            'description': 'A list of owners.',
            'schema': {
              'type': 'object',
            }
          }
        },
        func: (function(q, qname, req, res, next) {
          q[qname] = []
          res.json({
            "status":"flushed"
          });
          return next();
        }).bind(this, q, qname)
      }
    }
    model.paths[qurl] = {
      'get': {
        "public": true,
        'schema':{
          'query':{}, 
          'payload':{}
        }, 
        'description': 'Returns 1 '+qname+' job',
        'produces': ['application/json'],
        'responses': {
          '200': {
            'description': 'A list of owners.',
            'schema': {
              'type': 'object',
            }
          }
        },
        func: (function(q, qname, req, res, next) {
          res.json( q[qname].pop().data )
          return next();
        }).bind(this, q, qname)
      }, 
      'post': {
        "public": true,
        'schema':{
          'query':{}, 
          'payload':{}
        }, 
        'description': 'Add job to queue',
        'produces': ['application/json'],
        'responses': {
          '200': {
            'description': 'A list of owners.',
            'schema': {
              'type': 'object',
            }
          }
        },
        func: (function(q, qname, req, res, next) {
          if( req.body && req.body.data){
            q[qname].push( req.body )
            res.json({"status":"pushed"})
          }else{
            res.json({"status":"error: no valid json received,  like '{\"data\":{\"foo\":1}}'"})
          }
          return next();
        }).bind(this, q, qname)
      }
    }
  })

  flowee.use( bodyParser.json() )
  var app = flowee.init({ model: model, store: true, router:true });
  flowee.start( function(server) {
    return cb(app, server.listen( process.env.PORT ));
  });
}
