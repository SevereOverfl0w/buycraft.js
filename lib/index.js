var request = require('request');
var Qs = require('querystring');
var Url = require('url');
var debug = require('debug')('Buycraft.js');
var _ = require('lodash');
var Ruta3 = require('ruta3');

var Buycraft = function(config){
  var defaults = {
    apiURL: 'https://api.buycraft.net/v4',
  }
  this.config = _.merge(defaults, config);
}

Buycraft.prototype.rest = function(queryParams, cb){
  queryParams.secret = this.config.secret;

  request({url: this.config.apiURL, qs: queryParams},
      function(err, response, body){
        debug(response.statusCode);
        debug(body);

        var data = JSON.parse(body);
        if(!err){
          switch(data.code){
            case 102:
              err = new Error('Invalid action.');
              break;
            case 101:
              err = new Error('Invalid secret key.');
              break;
            case 100:
              err = new Error('Possibly missing parameters.');
              break;
            case 0:
              break;
            default:
              err = new Error('Unknown error occurred.');
              break;
          }
        }

        cb(err, data);
      }
  )
}

Buycraft.prototype.scrape = function(relativeURL, options, cb){
  if(typeof options == 'function') cb = options;
  if(typeof this.config.storeURL != 'string')
    cb(new Error('storeURL needs to be set.'), null);

  var fullURL = Url.resolve(this.config.storeURL, relativeURL);
  var parsedURL = Url.parse(fullURL);
  var router = Ruta3();

  router.addRoute('/', require('./parser/home'));
  router.addRoute('/category/:id', require('./parser/category'));
  router.addRoute('/package/:id', require('./parser/package'));

  request.post({url: parsedURL, form: {ign: 'Notch'}},
      function(err, response, body){
        if(err) return cb(err, body);
        var routed = router.match(parsedURL.pathname);


        if(routed != null)
          if(response.statusCode != 200)
            return cb(new Error('We receieved HTTP ' + response.statusCode + ' when connecting.'), body);
          else
            routed.action.apply(this, [routed.params, body, cb]); 
        else
          cb(new Error('Not a URL that can be scraped. (yet?)'), body)
      }
  )
}

module.exports = Buycraft;
