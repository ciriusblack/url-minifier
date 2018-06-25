//We get our Requirements 

const shortUrls = require('../models/shortUrls');
const debug = require('debug')('url-minifier:server');

module.exports = {
    saveNewUrl : async (longUrl, shortUrl) => {
        debug('Long Url Before Saving', longUrl);
        debug('Short Url Before Saving', shortUrl);
        //We Create Our New Data Object To Save
        var data = new shortUrls ({
            originalUrl : longUrl,
            shorterUrl : shortUrl,
        });

        newUrl = await data.save()
        return newUrl
    },

    findUrl : async (shortUrl) => {
        debug('We Searching This Url', shortUrl);
        const url = await shortUrls
            .findOne({'shorterUrl': shortUrl });
        if (!url) return;
        return url
    }, 

    updateCount : async (shortUrl) => {
        debug('We are looking for this Url : ', shortUrl);
        const urlUpdated = await shortUrls.findOneAndUpdate({'shorterUrl': shortUrl}, {
            $inc : { count : 1 }
        }, {new : true});
        if (!urlUpdated) return;
        return urlUpdated;   
    }
}