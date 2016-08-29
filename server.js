'use strict';

var express = require('express');

var app = express();

// serve all asset files from necessary directories
app.use(express.static(__dirname + '/app'));
app.use("/scripts", express.static(__dirname + "/app/scripts"));
app.use("/styles", express.static(__dirname + "/app/styles"));
app.use("/views", express.static(__dirname + "/app/views"));

// serve index.html for all remaining routes, in order to leave routing up to angular
app.get('/*', function(req, res) { 
	res.sendFile(__dirname + '/app/index.html');
});

app.listen(process.env.PORT || 1337, process.env.IP);
console.log('GiphyApp server listening on port 1337');
