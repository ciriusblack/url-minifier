// Structure OF Document for ShortUrl

//Require Mongoose

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//We Create our Schema 
const urlSchema =  new Schema({
    originalUrl :{ type : String, unique : true},
    shorterUrl :{ type : String, unique: true},
    count : {type : Number, default : 0}
}, {timestamps: true});

const ModelClass = mongoose.model('shortUrls', urlSchema);

module.exports = ModelClass;