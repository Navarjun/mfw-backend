var express = require('express');
var router = express.Router();
var Model = require('../../models/magikDB/MagikDB');

router.use('/*', function(req, res, next) {
    Model.navigation.get()
        .then(function(navOptions) {
            if (navOptions && Array.isArray(navOptions)) {
                const options = navOptions.sort((a, b) => a-b);
                req.navOptions = options;
                next();
            } else {
                throw 'No navigation options set';
            }
        }).catch(function(err) {
            res.status(err.code || 500).send({ message: err.message || 'Server Error' });
        });
});

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('interface/index', { title: 'Express', navOptions: req.navOptions });
});

String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.replace(new RegExp(search, 'g'), replacement);
};

router.get('/:type/:uri', function (req, res, next) {
    const type = req.params.type;
    const uri = req.params.uri;
    switch (type) {
    case 'page':
        Model.page.findByUri(uri)
            .then(function (page) {
                if (page) {
                    page.content = decodeURIComponent(page.content).replaceAll('&lt;', '<').replaceAll('&gt;', '>');
                    res.render('interface/page', {navOptions: req.navOptions, page: page});
                } else {
                    res.status(404);
                    next();
                }
            });
        break;
    default:
        res.status(200).send({message: `No entity of ${type} exists`});
    }
});

module.exports = router;