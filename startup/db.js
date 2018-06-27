const mongoose =  require('mongoose');
const debug = require('debug')('url-minifier:server');
const config = require('config')

module.exports = () => {
    //We connect the Db process.env.MONGODB_URI 
    const db = config.get('db'); 
    console.log(db);
    mongoose.connect( db )
        .then(() => debug(`Connected to MongoDb ${db}`))
        .catch((err) => debug('Could Not Connect to Mongodb', err))
    }