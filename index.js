'use strict';

var express = require('express');
var http = require('http');
var NodeCache = require("node-cache");
var pg = require('pg');

var myCache = new NodeCache();

var app = express()
var port = process.env.PORT || 3000;

app.get('/', function (req, res) {

    var obj = {my: "Special", variable: 42};

    var value = myCache.get("myKey");
    if (value == undefined) {
// set the cache
        var success = myCache.set("myKey", obj, 10000);
        res.send('cache has been set:' + success);
        console.log('Testing Cache set');
    } else {
        res.send('data from cache:' + JSON.stringify(value));
    }
})


app.get('/db', function (request, response) {
    pg.connect(process.env.DATABASE_URL, function(err, client, done) {
        client.query('SELECT * FROM test_table', function(err, result) {
            done();
            if (err){ console.error(err); response.send("Error " + err);
            } else {
                response.send(JSON.stringify(result.rows) );
            }
        });
    });
});

// Start the server
http.createServer(app).listen(port, function () {
    console.log('Your server is listening on ', 'http://localhost:' + port);
});





