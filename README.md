# buycraft.js
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
  if (response.code != 0) return console.log('Error using the api, dangit!')

  console.log(response.payload);
})
```

## Tests
To run the tests, first ensure you have [Mocha](http://mochajs.org/) installed
globally to run the tasks, also set the environment variable `BUYCRAFT_KEY` to
the secret key of your store. For example:

```
$ env BUYCRAFT_KEY="0a0000000a00000000000aa0ad00000000aaa0a0" mocha -Cd
```
