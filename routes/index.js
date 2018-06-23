var express = require('express');
var router = express.Router();
var urlFactories = require('../factories/urls_creation');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Url Minifier' });
});

//Route For Url Redirection
router.get('/:shortUrl', function(req, res, next) {
  var { shortUrl } = req.params;
  urlFactories.findUrl(shortUrl).then((data) => {
    res.redirect(301, data.originalUrl)
    console.log(data.originalUrl);
  }).catch((err) => {
    res.json(err);
  })
  //First we Validate The Url
  
  
});

module.exports = router;
