const mongoose =  require('mongoose');
const debug = require('debug')('url-minifier:server');
const config = require('config')

module.exports = () => {
    //We connect the Db
    const db = config.get('db'); 
    mongoose.connect(process.env.MONGODB_URI || db )
        .then(() => debug(`Connected to MongoDb ${db}`))
        .catch((err) => debug('Could Not Connect to Mongodb', err))
    }