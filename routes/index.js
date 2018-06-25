const express = require('express');
const router = express.Router();
const urlFactories = require('../mongodb/urls_creation');
const debug = require('debug')('url-minifier:server');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Url Minifier' });
});

//Route For Url Redirection
router.get('/:shortUrl', function(req, res, next) {

  const { shortUrl } = req.params;

  //We Update and Redirect
  urlFactories.updateCount(shortUrl)
  .then((data) => {
    if (!data) res.json('Url Not Found...');
      debug(data);
      res.redirect(301, data.originalUrl);
  })
  .catch((err) => {
    res.json(err);
  }) 
    
});

module.exports = router;
