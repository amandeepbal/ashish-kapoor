'use strict';

var express = require('express');
var http = require('http');
var NodeCache = require("node-cache");
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

// Start the server
http.createServer(app).listen(port, function () {
    console.log('Your server is listening on ', 'http://localhost:' + port);
});





