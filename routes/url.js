//We Get Our Requirements
var express = require('express');
var router = express.Router();
var validUrl = require('valid-url');
var shortid = require('shortid');
var urlFactories = require('../factories/urls_creation');

/* GET Urls */
router.get('/', function(req, res, next) {
  res.send('In Url Router ');
});

//Route For Url transformation
router.get('/new/:longUrl(*)', function(req, res, next) {
  var { longUrl } = req.params;
  
  //First we Validate The Url
  if (validUrl.isUri(longUrl)) {
    var shortUrl = shortid.generate()
    urlFactories.saveNewUrl(longUrl, shortUrl).then((data) => {
      res.json(data);
    }).catch((err) => {
      res.json(err)
    })
   
  } else {
    res.json('Please Enter a valid Url');
  }
  
});



module.exports = router;
