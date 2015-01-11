var expect = require('chai').expect;
var Buycraft = require('../lib/');


describe('Buycraft', function(){
  var buycraft = new Buycraft({
    secret: process.env.BUYCRAFT_KEY,
  });

  describe('#rest()', function(){
    it('should return an array when action is categories', function(done){
      buycraft.rest({action: 'categories'}, function(err, response){
        expect(response.payload).to.be.an.instanceof(Array);
        done();
      }) 
    })
  })
});
