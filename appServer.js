var express = require('express');
var app = express();
var fs = require("fs");
app.use(express.static('public'));
var led;
var led2;
var led3;
var fireR;
var fireG;
var fireB;
var lightsPin1 = 18; 
var lightsPin2 = 27;
var lightsPin3 = 22; 
var firePinG = 23;
var firePinR = 24;
var firePinB = 25;
var Player = require('player');
var player = new Player(['1.mp3','2.mp3','3.mp3']);

var Lights = function (led1, led2, led3)
{ this.led1 = led1; this.led2 = led2;  this.led3=led3;  };

Lights.prototype.lightsEnabled = false;
Lights.prototype.myTimer;
Lights.prototype.lightsOn = function() {
	this.lightsEnabled=true;
	this.lightsLoop(this);
}

Lights.prototype.lightsOff = function() {
	this.lightsEnabled=false;
	clearTimeout(this.myTimer);
        this.led1.writeSync(0);
        this.led2.writeSync(0);
        this.led3.writeSync(0);
};

Lights.prototype.lightsLoop = function() {
	var that = this;
	if(this.lightsEnabled=true){
		var inta = Math.floor(Math.random() * (1 - 0 + 1)) + 0;
		var intb = Math.floor(Math.random() * (1 - 0 + 1)) + 0;
		var intc = Math.floor(Math.random() * (1 - 0 + 1)) + 0;
		this.led1.writeSync(inta);
		this.led2.writeSync(intb);
		this.led3.writeSync(intc);			
		this.myTimer = setTimeout(function() {that.lightsLoop() },1000);
	}
};


var GPIO = require('onoff').Gpio, led = new GPIO(lightsPin1, 'out'),led2 = new GPIO(lightsPin2, 'out'),led3 = new GPIO(lightsPin3, 'out'),fireR = new GPIO(firePinR, 'out'), fireG = new GPIO(firePinG, 'out'), fireB = new GPIO(firePinB, 'out');

var lights = new Lights(led, led2, led3);

app.get('/house/lights/on', function (req, res) {
	//led.writeSync(1);
	//led2.writeSync(1);
	//led3.writeSync(1);
	lights.lightsOn();
        res.end();
})

app.get('/house/lights/off', function (req, res) {
        //led.writeSync(0);
        //led2.writeSync(0);
        //led3.writeSync(0);
	lights.lightsOff();
        res.end();
})

app.get('/house/music/on', function (req, res) {
	console.log('play');
	player.play();;
        res.end();
})

app.get('/house/music/pause', function (req, res) {
	console.log('pause');
        player.pause(); 
        res.end();
})

app.get('/house/music/off', function (req, res) {
	console.log('stop');
	player.stop();
        res.end();
})

app.get('/house/fire/naughty', function (req, res) {
	fireR.writeSync(1);
        fireG.writeSync(0);
        fireB.writeSync(0);
        res.end();
})

app.get('/house/fire/nice', function (req, res) {
	fireR.writeSync(0);
        fireG.writeSync(1);
        fireB.writeSync(0);
        res.end();
})

app.get('/house/fire/yellow', function (req, res) {
	fireR.writeSync(1);
        fireG.writeSync(1);
        fireB.writeSync(0);
	res.end();
})

app.get('/house/fire/off', function (req, res) {
        fireR.writeSync(0);
        fireG.writeSync(0);
        fireB.writeSync(0);
        res.end();
})



var server = app.listen(8081, function () {
               
    var host = server.address().address
    var port = server.address().port
                        
    console.log("Localhost instance app listening at http://%s:%s", host, port)
                        
})

var server2 = app.listen(8082, '[YOUR IP ADDRESS HERE]', function () {
                         
    var host = server2.address().address
    var port = server2.address().port
                         
    console.log("External instance app listening at http://%s:%s", host, port)
                         
})


