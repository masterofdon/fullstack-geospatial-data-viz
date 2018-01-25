import {getTokenByUserPass} from '../data/DataAdapter';
const isNull = (r) => (r === 'undefined' || r == null);

export default class AuthModule {

    constructor(){
        this.authentications = [];
    }

    authenticateWithUserPass(username,password,callback,fail){
        console.log("Authenticating...");
        if(isNull(this.username)){
            this.username = 'itest';
        }
        if(isNull(this.password)){
            this.password = '1234';
        }
        getTokenByUserPass(username,password,function(error,response){
            if(error){
                fail();
                return;
            }
            
            var incObj = JSON.parse(response.response);
            var authObj = {};
            authObj.access_token = incObj.access_token;
            authObj.expires = incObj.expires_in * 1000 + Date.now();
            authObj.username = username;
            authObj.password = password;
            var index = this.indexOf(username);
            if(index == -1){
                this.authentications.push(authObj);
            }else {
                this.authentications[index] = authObj;
            }
            if(!isNull(callback)){
                callback(authObj);
            }
        }.bind(this));
    }

    getAuthObject(username){
        var index = this.indexOf(username);
        if(index != -1){
            return this.authentications[index];
        }
        return null;
    }

    indexOf(username){
        var i;
        var len = this.authentications.length;
        for(i = 0;i < len;i++){
            if(this.authentications[i].username === username){
                return i;
            }
        }
        return -1;
    }
    
}
AuthModule.instance = null;
AuthModule.getInstance = function(){
    if(AuthModule.instance == null){
        AuthModule.instance = new AuthModule();
    }
    return AuthModule.instance;
}