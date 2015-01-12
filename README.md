# buycraft.js
[![Build Status](https://travis-ci.org/SevereOverfl0w/buycraft.js.svg?branch=master)](https://travis-ci.org/SevereOverfl0w/buycraft.js)
[![Coverage Status](https://img.shields.io/coveralls/SevereOverfl0w/buycraft.js.svg)](https://coveralls.io/r/SevereOverfl0w/buycraft.js)
A buycraft api wrapper for javascript.

## Usage
```javascript
var Buycraft = require('buycraft.js')

var buycraft = new Buycraft({
  secret: "0a0000000a00000000000aa0ad00000000aaa0a0",
})

// Use the buycraft rest api
buycraft.rest({ action: categories }, function(err, response){
  if (err) throw err;

  console.log(response.payload);
})

buycraft.scrape('/', function(err, scraped){
  if (err) throw err;;
  console.log(scraped);
})
```

## Tests
To run the tests, first ensure you have [Mocha](http://mochajs.org/) installed
globally to run the tasks, also set the environment variables `BUYCRAFT_KEY`
and `STORE_URL` to the secret key and url of your store respectively.
For example:

```
$ env BUYCRAFT_KEY="0a0000000a00000000000aa0ad00000000aaa0a0" STORE_URL="https://your-store-here.buycraft.net" mocha -Cd
```

### Sponsor
This is available thanks to
![Isles Softworks](http://i.imgur.com/cO2IN85.png)
