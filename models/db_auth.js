const mongoose = require('mongoose');
const process = require('process');
const magikDB = require('./magikDB/MagikDB');
mongoose.useMongoClient = true;

const dbUrl = process.env.UN_MARCH_DBURL ? process.env.UN_MARCH_DBURL : 'mongodb://localhost:27017/mfw';

mongoose.connect(dbUrl, function (err) {
    if (err) {
        console.log('Error connecting to DB');
        console.log(err);
        return;
    }
    console.log('Connected to Database');
    magikDB.initialSetup();
});
