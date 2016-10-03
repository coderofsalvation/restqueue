module.exports = {
  'swagger': '2.0',
  'info': {
    'version': '1.0.0',
    'title': 'RESTqueue',
    'description': 'A REST interface to an array, for distributed push/pop purposes',
    'termsOfService': 'http://swagger.io/terms/',
    'contact': {
      'name': ''
    },
    'license': {
      'name': 'MIT'
    }
  },
  'host': 'localhost',
  'basePath': '/',
  'schemes': ['http'],
  'consumes': ['application/vnd.api+json', 'application/json'],
  'produces': ['application/vnd.api+json', 'application/json'],
  flowee: {
    model: {
      write: true,
      file: "/model.generated.json"
    },
    dataPath: '.',
    fortunejs: {
      memory: true, 
      settings:{
        endResponse: false
      }, 
      serializers: [
        {
          type: 'fortune-json-api',
          options: {}
        }
      ]
    }
  },
  paths: {
    '/model': {
      'get': {
        "public": false,
        'description': 'Returns flowee (generated) model for backup or documentation purposes',
        'produces': ['application/json'],
        'schema':{
          'query':{}, 
          'payload':{}
        }, 
        'responses': {
          '200': {
            'description': 'The flowee json model',
            'schema': {
              'type': 'object'
            }
          }
        },
        func: function(req, res, next) {
          res.writeHead(200, {
            'Content-Type': 'application/json'
          });
          res.header;
          res.end(JSON.stringify(req.flowee.model, null, 2));
          return next();
        }
      }
    }
  },
  definitions: {
  }
};
