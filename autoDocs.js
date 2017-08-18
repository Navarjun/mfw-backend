var express = require('express');

function autoDocs (config) {
    var router = express.Router();
    /* GET home page. */
    router.get('/', function (req, res) {
        res.render('autoDocs', config);
    });

    return router;
}

module.exports = autoDocs;
