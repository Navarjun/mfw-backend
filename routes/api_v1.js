const express = require('express');
const db = require('../models/db');
const router = express.Router();

router.get('/images', function (req, res) {
    const queryString = req.query || {};
    console.log(queryString);

    const pageSize = queryString.pageSize;
    const pageNumber = queryString.pageNumber;
    delete queryString.pageSize;
    delete queryString.pageNumber;

    db.getImages(pageSize, pageNumber, queryString, (err, data) => {
        if (err) {
            console.log(err);
            res.send(400);
            return;
        }
        res.send(data);
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

router.get('/aggregate', function(req, res) {
    const data = req.body;
    try {
        const query = JSON.parse(req.query.query);
        db.aggregate(query, (err, data) => {
            if (err) {
                console.log(err);
                res.send(400);
                return;
            }
            res.send(data);
        });
    } catch (e) {
        res.send({code: 500, errorDescription: 'Most probably problem with the JSON format of your query'});
    }
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

router.get('/search', function(req, res) {
    const searchString = req.query.query;
    if (!searchString) {
        res.send(400);
        return
    }
    db.search(searchString, (err, data) => {
        if (err) {
            console.log(err);
            res.send(400);
            return;
        }
        res.send(data);
    })
});

module.exports = router;
