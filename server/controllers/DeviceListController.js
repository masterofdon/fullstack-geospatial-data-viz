const fs = require('fs');

function $$this_controller(req, res) {
    return res.send(JSON.stringify(deviceList));
}

function this_controller(req, res,callback) {
    
    const fields = [
        'address',
        'id',
        'lastUpdate',
        'online'
    ];
    
};

module.exports = $$this_controller;