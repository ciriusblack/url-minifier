//We get our Requirements 

const shortUrls = require('../models/shortUrls');

module.exports = {
    saveNewUrl : (longUrl, shortUrl) => {
        console.log('Long Url Before Saving', longUrl);
        console.log('Short Url Before Saving', shortUrl);
        return new Promise ((resolve, reject) => {
            //We Create Our New Data Object To Save
            var data = new shortUrls ({
                originalUrl : longUrl,
                shorterUrl : shortUrl,
                count : 0
            });

            data.save(err => {
                if (err) {
                    reject(err)
                }
                resolve(data)
            })
        })
    },

    findUrl : (shortUrl) => {
        console.log('We  Are Redirecting You With This Url', shortUrl);
        return new Promise ((resolve, reject) => {
            shortUrls.findOne({
                'shorterUrl': shortUrl 
            }, (err, data) => {
                if (err) {
                    reject(err)
                }
                resolve(data)
            })
            

        })

    }
}