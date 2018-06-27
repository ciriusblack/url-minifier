// Structure OF Document for ShortUrl

const Joi = require('joi');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//We Create our Schema 

const urlSchema =  new Schema({
    originalUrl :{ type : String, unique : true},
    shorterUrl :{ type : String, unique: true},
    count : {type : Number, default : 0}
}, {timestamps: true});

const ModelClass = mongoose.model('shortUrls', urlSchema);

function validateUrl (url) {
    // We verify the body of the request
    const schema = {
        longUrl : Joi.string().required().regex(/^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/)
    }

    return Joi.validate(url, schema);
}

module.exports = {
    Urls : ModelClass,
    validate : validateUrl
};