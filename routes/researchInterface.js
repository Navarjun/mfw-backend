var express = require('express');
var router = express.Router();

const db = require('../models/db');

/* GET home exploratory page. */
router.get('/', function (req, res) {
    console.log(req.useragent.isMobile);
    if (req.useragent.isMobile) {
        res.render('m_interface');
    } else {
        res.render('interface');
    }
});

module.exports = router;
