const mongoose = require('mongoose');
const user = require('./User');
const page = require('./Page');
const blog = require('./Blog');
const post = require('./Post');
const navigation = require('./Navigation');
const container = require('./Container');

module.exports = {
    user: user,
    page: page,
    blog: blog,
    post: post,
    navigation: navigation,
    container: container,
    initialSetup: function() {
        user.initialSetup();
    }
};
