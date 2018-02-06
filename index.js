'use strict';

var express = require('express');
var http = require('http');
var NodeCache = require("node-cache");
var pg = require('pg');
var db = require('./db.js');

var myCache = new NodeCache();

const config = {
    host:'ec2-50-19-105-188.compute-1.amazonaws.com',
    ssl: true,
    user: 'pmemqhietpvqty',
    database: 'dcf1185buk5dbe',
    password: '43932c604eb9646db5307cd0987e34f0536ca6723f68dd3fe85381d32d857a70',
    port: 5432
};


var app = express()
var port = process.env.PORT || 3000;

const pool = new pg.Pool(config);

app.get('/db', (req, res, next) => {
    pool.connect(function (err, client, done) {
    if (err) {
        console.log("Error while connecting to DB" + err);
    }
    client.query('SELECT * FROM contest', function (err, result) {
        done();
        if (err) {
            console.log(err);
            res.status(400).send(JSON.stringify(err));
        }else{
            res.status(200).send(JSON.stringify(result.rows));
        }
    })
})
});

app.post('/db', (req, res, next) => {
    var data = {};
    data.contestId = 0;
    data.propertyURL = "http://yahoo.com/prop/1";
    data.contestHeading = 'This is a test Header';

    db.contest.findOrCreate({where: {contestId: data.contestId}, defaults: {
            propertyURL:data.propertyURL,
            active: true,
            contestHeading: data.contestHeading
    }}).spread((contest, created) => {
            res.status(200).send(created);
            console.log(created)
        });
});

// Start the server
db.sequelize.sync({force:true}).then(function () {
    http.createServer(app).listen(port, function () {
        console.log('Your server is listening on ', 'http://localhost:' + port);
    });
});






