var expect = require('chai').expect;
var Buycraft = require('../lib/');


describe('Buycraft', function(){
  var secret = process.env.BUYCRAFT_KEY || '';
  var buycraft = new Buycraft({
    secret: secret,
    storeURL: process.env.STORE_URL || 'https://islandclash.buycraft.net',
  });

  if (secret){
    describe('#rest()', function(){
      it('should return an array when action is categories', function(done){
        buycraft.rest({action: 'categories'}, function(err, response){
          if(err) throw err;
          expect(response.payload).to.be.an.instanceof(Array);
          done();
        }) 
      })
    });
  }

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

    it('should throw error when storeURL is not set.', function(){
      var storelessBC = new Buycraft();
      expect(function(){
        storelessBC.scrape('/', function(err, scraped){
          if(err) throw err;
        })
      }).to.throw('storeURL');
    });

    var icBuycraft = new Buycraft({
      storeURL: 'https://islandclash.buycraft.net'
    })
    it('should get 30Days:7.49USD when scraping a /package/884110 on IC.', function(done){
      icBuycraft.scrape('/package/884110', function(err, scraped){
        if(err) throw err;
        expect(scraped).to.have.a.property('price').that.match(/7.49 USD/i)
        expect(scraped).to.have.a.property('name').that.match(/30 Days/i);
        done();
      })
    })
  });
});
