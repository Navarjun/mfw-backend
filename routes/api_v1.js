const express = require('express');
const db = require('../models/db');
const router = express.Router();

router.get('/images', function (req, res) {
    const queryString = req.query || {};
    console.log(req.query);

    const limit = queryString.limit;
    const skip = queryString.skip;
    delete queryString.limit;
    delete queryString.skip;

    db.getImages(limit, skip, queryString, (err, docs) => {
        if (err) {
            console.log(err);
            res.send(400);
            return;
        }
        res.send(docs);
    });
});

router.get('/image/:id', function (req, res) {
    const id = req.params.id;

    db.getImage(id, (err, image) => {
        if (err) {
            console.log(err);
            res.send(400);
            return;
        }
        res.send(image[0]);
    });
});

router.post('/image/:id', function (req, res) {
    const id = req.params.id;
    const data = req.body;

    db.addMetadata(id, data, (err, data) => {
        if (err) {
            console.log(err);
            res.send(400);
            return;
        }
        res.send(data);
    });
});

module.exports = router;
