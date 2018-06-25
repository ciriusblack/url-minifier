const express = require('express');
const router = express.Router();
const urlFactories = require('../factories/urls_creation');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Url Minifier' });
});

//Route For Url Redirection
router.get('/:shortUrl', function(req, res, next) {

  var { shortUrl } = req.params;

  //Search for the short url...
  urlFactories.findUrl(shortUrl).then((data) => {

    //We need to update the count there ...
    res.redirect(301, data.originalUrl)
    console.log(data.originalUrl);
  }).catch((err) => {
    res.json(err);
  })
    
});

module.exports = router;
