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
    cb(err, JSON.parse(body));
  })
}

module.exports = Buycraft;
