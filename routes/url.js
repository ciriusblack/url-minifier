//We Get Our Requirements
const express = require('express');
const router = express.Router();
const shortid = require('shortid');
const { Urls , validate} = require('../models/url');
const debug = require('debug')('url-minifier:server');


//Creation of new urls...
router.post('/', async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  
  const { longUrl } = req.body;
  const shortUrl = shortid.generate()
  debug('Long Url: ', longUrl)

  let url = new Urls ({
    originalUrl : longUrl,
    shorterUrl : shortUrl,
  })

  url.save()
  .then(data => res.status(200).send(data))
  .catch(err => res.status(400).json(err.message))

});

//Get Statistics of short Urls...
router.get('/:shortUrl', async (req, res, next) => {

  try {
    const { shortUrl } = req.params;
    const url = await Urls.findOne({'shorterUrl': shortUrl });
    if (!url) return res.status(404).send('Short Url Not Found');
    res.status(200).json({ clicked : url.count })
  }
  catch (ex) {
    next(ex)
  }

});

module.exports = router;
