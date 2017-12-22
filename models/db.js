const mongoose = require('mongoose');
const schemas = require('./Schemas');

const ImageModel = mongoose.model('image', schemas.image);

const obj = {};

obj.getImages = function (pageSize = 100, pageNumber = 0, searchQuery, callback = null) {
    if (!pageSize) { pageSize = 100; }
    if (!pageNumber) { pageNumber = 0; }
    let params = {};
    if (searchQuery.params) {
        try {
            params = JSON.parse(searchQuery.params)
        } catch (e) {
            console.log(e);
        }
    }

    const query = ImageModel.find(params).sort({ 'filename': 1 });
    const countQuery = ImageModel.find(params).sort({ 'filename': 1 });

    if (searchQuery.select) {
        query.select('-_id filename ' + searchQuery.select);
        countQuery.select('-_id filename ' + searchQuery.select);
    } else {
        query.select('-_id');
        countQuery.select('-_id');
    }
    query.limit(+pageSize);
    query.skip(pageSize * pageNumber);

    query.exec(function (err, data) {
        if (err) {
            callback({description: 'DB Error'}, null)
            return
        }
        countQuery.count().exec(function (err, count) {
            if (err) {
                callback({description: 'DB Error'}, null)
                return
            }
            callback(null, { data: data, total: count, pageNumber: pageNumber, pageSize: pageSize, totalPages: Math.ceil(count / pageSize) })
        });
    });
};

obj.getImage = function (filename, callback) {
    const query = ImageModel.find({ filename: filename });
    query.exec(callback);
};

obj.addMetadata = function (filename, data, callback) {
    ImageModel.findOneAndUpdate({filename: filename}, {$set: data}, callback);
};

obj.aggregate = function (array, callback) {
    ImageModel.aggregate(array, function(err, data) {
        if (err) {
            callback({description: 'DB Error'}, null)
            return
        }
        callback(null, {data: data})
    });
}

obj.search = function(searchString, callback) {
    ImageModel.aggregate([
        { $match: { $text: { $search: searchString } } },
        { $sort: { score: { $meta: "textScore" } } },
        { $project: { _id: 0 } }
    ], function (err, data) {
        if (err) {
            callback({description: 'DB Error'}, null)
            return
        }
        callback(null, {data: data})
    })
}

module.exports = obj;