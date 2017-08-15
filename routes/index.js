var express = require('express');
var router = express.Router();

const db = require('../models/db');

/* GET home page. */
router.get('/', function (req, res) {
    res.render('index');
});

module.exports = router;
