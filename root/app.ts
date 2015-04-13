/// <reference path="./typings/node/node.d.ts" />
/// <reference path="./typings/express/express.d.ts" />

import express = require('express');
import http = require('http');
import path = require('path');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());

app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
    app.use(express.errorHandler());

    app.get('/', function (req, res) {
        console.log(app.get('env'));
        res.redirect('/src/index.html');
    });
}

// production only
if ('production' == app.get('env')) {
    app.get('/', function (req, res) {
        console.log(app.get('env'));
        res.redirect('/dist/index.html');
    });
}

app.post('/json', function (req, res) {
    console.log("requested");
    res.contentType('application/json');
    var json = JSON.parse('{ "id":"foo" }');
    res.send(JSON.stringify(json));
});

http.createServer(app).listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});
