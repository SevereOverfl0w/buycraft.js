var Cheerio = require('cheerio');
var trim = require('../util').trim;

var debug = require('debug')('Buycraft.js');

module.exports = function parseHome(params, html, cb){
  var $ = Cheerio.load(html);

  var scraped = {
    name: trim($('h3').text()),
    price: trim($('.modal-footer b').text()),
    description: $('.modal-body').html()
  }

  debug(scraped);
  cb(null, scraped);
};
