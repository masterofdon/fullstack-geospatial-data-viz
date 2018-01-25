const express = require('express');
const DeviceListController = require('./controllers/DeviceListController');
const app = express();
const seedrandom = require('seedrandom');
const d3 = require('d3-request');
const fs = require('fs');
var exec = require('child_process').exec;

seedrandom('added entropy.', { entropy: true });
var deviceList = [];
app.get('/api/1.0/devices',function(req,res){
    return res.send(JSON.stringify(deviceList));
});

app.post('/api/1.0/auth/oauth/token',function(req,res){
    console.log("|Incoming|");
    return res.send(JSON.stringify({
        access_token : "dalsfjaksd"
    }));
});

(function readTable(){
    const name = './random_germany.csv';
    var lineReader = require('readline').createInterface({
        input: fs.createReadStream(name)
    });
    lineReader.on('line', function (line) {
        var x = line.split(',');
        var lat = parseFloat(x[0]);
        var lng = parseFloat(x[1]);
        var device = {};
        device.address = [lng, lat];
        device.id = "device_" + (Math.floor(Math.random() * 10000) + 1);
        device.online = Math.floor(Math.random() + 1) % 0 ? true : false;
        device.lastUpdate = Date.now();
        deviceList.push(device);
    });
    lineReader.on('close', function () {
        //callback(deviceList);
    });
})();
app.listen(3001 , () => console.log('Example app listening on port 3000!'));

