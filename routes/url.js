//We Get Our Requirements
const Joi = require('joi');
const express = require('express');
const router = express.Router();
const shortid = require('shortid');
const urlFactories = require('../mongodb/urls_creation');
const debug = require('debug')('url-minifier:server');


//Creation of new urls...
router.post('/', function(req, res, next) {

  // We verify the body of the request
  const schema = {
    longUrl : Joi.string().required().regex(/^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/)
  }

  const result = Joi.validate(req.body, schema);
  
  if (result.error) {
    res.status(400).send(result.error.details[0].message);
    return
  }

  const longUrl = result.value.longUrl
  const shortUrl = shortid.generate()
  debug('Long Url: ', longUrl)

  //We save The new Url in the Db
  urlFactories.saveNewUrl(longUrl, shortUrl)
  .then(data =>  {
    debug(data)
    res.json(data)
  })
  .catch((err) => {
    debug(err.message)
    res.json(err.message)
  })

});

//Get Statistics of short Urls...
router.get('/:shortUrl', function(req, res, next) {

  const { shortUrl } = req.params;
 
  //Search for the short url...
  urlFactories.findUrl(shortUrl).then((data) => {
    if (!data) res.send('Url Not Found');
    debug(data);
    res.send(`Your Link Has Been Fired ${data.count} times`)
  }).catch((err) => {
    res.json(err);
  })
    
});

module.exports = router;
