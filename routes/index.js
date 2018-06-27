const express = require('express');
const router = express.Router();
const { Urls } = require('../models/url');

/* GET home page. */
router.get('/', async (req, res, next) => {
  try { 
    res.render('index', { title: 'Url Minifier' });
  }

  catch (ex) {
    next(ex);
  }

});

//Route For Url Redirection
router.get('/:shortUrl', async (req, res, next) => {

  try {

    const { shortUrl } = req.params;

    //We Update and Redirect
    const urlUpdated = await Urls.findOneAndUpdate({'shorterUrl': shortUrl}, {
      $inc : { count : 1 }
    }, {new : true});

    if (!urlUpdated) return res.status(404).send('Short Url Not Found...');
    const re = new RegExp("^(http|https)://", "i");
    if(re.test(urlUpdated.originalUrl)) return res.redirect(301, urlUpdated.originalUrl);
    res.redirect(301, `http://${urlUpdated.originalUrl}`)
  }

  catch (ex) {
    next(ex);
  }
    
});

module.exports = router;

