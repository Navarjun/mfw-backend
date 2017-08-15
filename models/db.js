const mongoose = require('mongoose');
const schemas = require('./Schemas');

const ImageModel = mongoose.model('image', schemas.image);

const obj = {};

obj.getImages = function (limit = 100, skip = 0, callback = null) {
    if (!limit) { limit = 100; }
    if (!skip) { skip = 0; }

    const query = ImageModel.find();
    query.select('-_id filename colors properties logos text hasManualData');
    query.limit(+limit);
    query.skip(+skip);

    query.exec(callback);
};

obj.getImage = function (filename, callback) {
    const query = ImageModel.find({ filename: filename });
    query.exec(callback);
};

obj.addMetadata = function (filename, data, callback) {
    console.log(filename, data);
    ImageModel.findOneAndUpdate({filename: filename}, {$set: data}, callback);
};

module.exports = obj;
