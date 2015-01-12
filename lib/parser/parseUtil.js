var Cheerio = require('cheerio');
var trim = require('../util').trim;

function parsePackage($html){
  if($html.length == 0) return {}
  scraped = {
    imageURL: $html.find('.image img').attr('src'),
    name: trim($html.find('.name').text()),
    priceDiscount: trim($html.find('.price-discount').text()),
  };
  var $newHtml = $html.remove('.price-discount');
  scraped.price = trim($newHtml.find('.price').text().replace(scraped.priceDiscount, ''));

  // showModal('/package/:id'), this strips non-number chars.
  scraped.id = $html.find('.image a').attr('onclick').replace(/\D/g, '');

  return scraped;
}


exports.generic = function(html){
  var $ = Cheerio.load(html);
  var scraped = {};

  scraped.title = $('.logo span').text();
  scraped.status = {
    ip: trim($('.serverstatus .ip').text()),
    players: trim($('.serverstatus .players').text()),
    online: $('.serverstatus .status').hasClass('online') ? true : false,
  };

  var $featured = $('.featured');
  scraped.featured = parsePackage($featured);

  return scraped;
}
