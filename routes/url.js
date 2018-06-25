//We Get Our Requirements
const Joi = require('joi');
const express = require('express');
const router = express.Router();
const shortid = require('shortid');
const urlFactories = require('../factories/urls_creation');


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

});

//Get Statistics of short Urls...
router.get('/:shortUrl', function(req, res, next) {

  var { shortUrl } = req.params;

  //Search for the short url...
  urlFactories.findUrl(shortUrl).then((data) => {
    res.json(data.count)
    console.log(data.originalUrl);
  }).catch((err) => {
    res.json(err);
  })
    
});




module.exports = router;





  // if (!req.body.longUrl) {
  //   res.status(400).send('Long Url is Required')
  //   return;
  // }

  // const { longUrl } = req.body;
  
  // //First we Validate The Url
  // if (validUrl.isUri(longUrl)) {
  //   const shortUrl = shortid.generate()
  //   urlFactories.saveNewUrl(longUrl, shortUrl).then((data) => {
  //     res.json(data);
  //   }).catch((err) => {
  //     res.json(err)
  //   })
   
  // } else {
  //   res.json('Please Enter a valid Url');
  // }