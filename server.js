var restqueue = require('./index.js')

restqueue([
    'myqueue', 
    'anotherqueue'
//  'coreapi_avp_push', 
//  'homeaway_searchresult', 
//  'bookingcom_avp_scrape', 
//  'bookingcom_avp_push', 
//  'bookingcom_searchresult', 
//  'bookingcom_roomtypes'
], function(app, server){
  console.log("queue started at port "+process.env.PORT )
})
