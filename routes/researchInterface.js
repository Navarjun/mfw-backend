var express = require('express');
var router = express.Router();

const db = require('../models/db');

/* GET home exploratory page. */
router.get('/', function (req, res) {
    res.render('interface');
});

module.exports = router;
