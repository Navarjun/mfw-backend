const mongoose = require('mongoose');
const schemas = require('./Schemas');

const ImageModel = mongoose.model('image', schemas.image);

const obj = {};

obj.getImages = function (limit = 100, skip = 0, searchQuery, callback = null) {
    if (!limit) { limit = 100; }
    if (!skip) { skip = 0; }

    if (searchQuery.ne) {
        const columns = searchQuery.ne.split(',');
        columns.forEach(d => {
            searchQuery[d] = { $exists: false };
        });
        delete searchQuery.ne;
    }
    const query = ImageModel.find(searchQuery).sort({ 'filename': 1 });
    // query.select('-_id filename colors properties logos text hasManualData');
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
