var expect = require('chai').expect;
var Buycraft = require('../lib/');


describe('Buycraft', function(){
  var buycraft = new Buycraft({
    secret: process.env.BUYCRAFT_KEY,
    storeURL: process.env.STORE_URL,
  });

  describe('#rest()', function(){
    it('should return an array when action is categories', function(done){
      buycraft.rest({action: 'categories'}, function(err, response){
        if(err) throw err;
        expect(response.payload).to.be.an.instanceof(Array);
        done();
      }) 
    })
  });

  describe('#scrape()', function(){
    it('should throw an error when scraping unknown url', function(done){
      buycraft.scrape('/404', function(err, scraped){
        expect(function(){
          if(err) throw err;
        }).to.throw('Not a URL that can be scraped')
        done();
      })
    })

    it('should create an object when scraping "/"', function(done){
      buycraft.scrape('/', function(err, scraped){
        if(err) throw err;
        expect(scraped).to.be.an.instanceof(Object);
        done();
      })
    })
  });
});
