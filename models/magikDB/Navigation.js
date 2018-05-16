const mongoose = require('mongoose');
const Schema = require('mongoose').Schema;
const MagikError = require('../../helpers/MagikError');

const schema = new Schema({
    title: String,
    type: {
        type: String,
        enum: ['blog', 'page', 'container'],
        required: true
    },
    blogId: {
        type: Schema.Types.ObjectId,
        ref: 'Blog',
        required: function () {
            return this.type === 'blog';
        }
    },
    pageId: {
        type: Schema.Types.ObjectId,
        ref: 'Page',
        required: function () {
            return this.type === 'page';
        }
    },
    containerId: {
        type: Schema.Types.ObjectId,
        ref: 'Container',
        required: function () {
            return this.type === 'container';
        }
    }
}, {timestamps: true});

const Model = mongoose.model('Navigation', schema);

Model.create = function (object) {
    return Model.find()
        .count()
        .exec()
        .then(function (count) {
            return new Model(object).save();
        });
};

Model.get = function () {
    return Model.find()
        .sort('createdAt')
        .populate('blogId pageId containerId', 'uri')
        .exec();
};

Model.update = function (navigation) {
    return new Promise(function (resolve, reject) {
        Model.findByIdAndUpdate(navigation._id, navigation)
            .then(function (obj) {
                if (obj) {
                    resolve(obj);
                } else {
                    reject(new MagikError(404, 'Navigation item with id requested not found'));
                }
            }).catch(function (err) {
                reject(err);
            });
    });
};

Model.delete = function (id) {
    return Model.findByIdAndRemove(id)
        .exec();
};

module.exports = Model;
