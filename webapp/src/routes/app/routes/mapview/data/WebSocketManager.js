import Mqtt from 'mqtt';

const isNull = (r) => (r == null || r === 'undefined')

class WebSocketMgr {
    
    constructor(address,username,password){        
        if(isNull(address)){
            address = 'ws://10.254.157.165:30000/ws';
        }
        this.address = address;
        if(isNull(username)){
            username = 'itest'
        }
        this.username = username;
        if(isNull(password)){
            password = '1234'
        }
        this.password = password;
        console.log("Creating WebSocketManager");
    }

    connect(username,password){
        this.websocket = Mqtt.connect(this.address, {
            protocol: 'wss',
            username : this.username,
            password : AuthModule.getInstance().getAuthObject('itest').access_token
        });
        return this.websocket;
    }

    subscribeTopic(topic,callback){
        this.websocket.subscribe(topic,callback);
    }

    unsubscribeTopic(topic){
        this.websocket.unsubscribe(topic);
    }
    
    getSocket(){
        return this.websocket;
    }
}

//var WebSocketManager = {};
var WebSocketManager = new WebSocketMgr();
// WebSocketManager.instance = null;
// WebSocketManager = Object.assign({},WebSocketManager,s_WebSocketManager());
// var s_WebSocketManager = function(){
//     if(WebSocketManager.instance == null){
//         WebSocketManager.instance = new WebSocketMgr()
//     }
//     return WebSocketManager.instance;
// }

module.exports = WebSocketManager;