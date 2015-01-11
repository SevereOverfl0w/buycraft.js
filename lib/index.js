var request = require('request');
var Qs = require('querystring');
var debug = require('debug')('Buycraft.js');
var _ = require('lodash');

var Buycraft = function(config){
  var defaults = {
    apiURL: 'https://api.buycraft.net/v4',
  }
  this.config = _.merge(defaults, config);
}

Buycraft.prototype.rest = function(queryParams, cb){
  queryParams.secret = this.config.secret;

  request({url: this.config.apiURL, qs: queryParams}, function(err, response, body){
    debug(response.statusCode);
    debug(body);

    var data = JSON.parse(body);
    if(!err){
      switch(data.code){
        case 102:
          err = new Error('Invalid action.');
          break;
        case 100:
          err = new Error('Possibly missing parameters.');
          break;
        case 0:
          break;
      }
    }

    cb(err, data);
  })
}

module.exports = Buycraft;
