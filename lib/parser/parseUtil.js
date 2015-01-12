var Cheerio = require('cheerio');
var trim = require('../util').trim;
var debug = require('debug')('Buycraft.js');

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

exports.parsePackage = parsePackage;


exports.generic = function(html){
  var $ = Cheerio.load(html);
  var scraped = {};

  scraped.title = $('.logo span').text();
  scraped.status = {
    ip: trim($('.serverstatus .ip').text()),
    players: trim($('.serverstatus .players').text()),
    online: $('.serverstatus .status').hasClass('online') ? true : false,
  };

  scraped.categories = [];

  $('ul.nav > li:not(.dropdown) > a, ul.nav ul.dropdown-menu > li > a').each(function(){
    var link = $(this);
    var categoryId = link.attr('href').replace(/\D/g, '');
    var categoryName = link.text();
    var possibleParent = trim(link.parent('li').parent('ul.dropdown-menu').prev('.dropdown-toggle').remove('b.caret').text());
    debug(possibleParent)
    if(categoryId)
      var category = {id: categoryId, name: categoryName};
      if(possibleParent) category.parentLabel = possibleParent;
      debug(category);
      scraped.categories[scraped.categories.length] = category;
  })

  var $featured = $('.featured');
  scraped.featured = parsePackage($featured);

  return scraped;
}
