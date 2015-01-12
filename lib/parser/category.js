var Cheerio = require('cheerio');
var parseUtil = require('./parseUtil');
var _ = require('lodash');
var trim = require('../util').trim;

var debug = require('debug')('Buycraft.js');

module.exports = function parseHome(params, html, cb){
  var $ = Cheerio.load(html);

  var $infoArea = $('.span7 .box-container:first-child');
  var scraped = {
    meta: {
      name: $infoArea.find('.header').text(),
      infoHtml: trim($infoArea.find('.content').html()),
    }
  }

  var generic = parseUtil.generic(html);
  debug(scraped);
  debug(generic);

  cb(null, _.merge(scraped, generic));
};
