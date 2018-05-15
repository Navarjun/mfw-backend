var express = require('express');
var router = express.Router();

const db = require('../models/db');

/* GET home exploratory page. */
router.get('/', function (req, res) {
    console.log(req.useragent.isMobile);
    if (req.useragent.isMobile) {
        res.render('pug/m_interface');
    } else {
        res.render('pug/interface');
    }
});

module.exports = router;
