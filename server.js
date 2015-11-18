var fs = require('fs');

var express = require('express');
var app = express();

var ejs = require('ejs');

var busboy = require('connect-busboy');

var server = require('http').Server(app);

var io = require('socket.io')(server);


var assert = require('assert');

// Render engine
app.engine('html', ejs.renderFile);

app.use(busboy());

//View folder
app.set('views', __dirname + '/views');

app.use("/css", express.static( __dirname + '/css'));
app.use("/img", express.static( __dirname + '/img'));
app.use("/js", express.static( __dirname + '/js'));
app.use("/videos", express.static( __dirname + '/videos'));

app.get('/', function(req, res) {
	res.render('index.ejs.html');
});

io.on('connection', function(socket){
  console.log('a user connected');

  socket.on('message', function(msg){
    console.log('mess: ' + msg);
  });

  socket.on('addVideo', function(videoResult){
    var section = videoResult.sectionName;
    var video = videoResult.video;
    addVideo(section, video.videoSource, video.videoName, video.videoImage, video.videoImageOffset);
  });


  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
});

server.listen(9990, function(socket) {
	console.log('listening on *:3000');
});

