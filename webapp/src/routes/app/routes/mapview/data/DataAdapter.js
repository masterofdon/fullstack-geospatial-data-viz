import { request as Request } from 'd3-request';
import { json as requestJson } from 'd3-request';
import { csv  as requestCsv } from 'd3-request';
import ApiStringBuilder from './ApiStringBuilder';
import { criteriaBuilder } from './CriteriaBuilder';


export function RequestDeviceDetails(device,token,callback){
    var PARAMS_GEOJSON = {};
    var apiBuilder = new ApiStringBuilder();
    var queryString = apiBuilder
        .api('1.0')
        .devices(device)
        .details()
        .parameters({
            access_token : token
        }).toString();
    Request(queryString)
        .header("Content-Type", "application/json")
        .header('Authorization', token)
        .get(JSON.stringify(PARAMS_GEOJSON),callback);
}

export function requestDevices(token,size,callback){
    var apistrbuilder = new ApiStringBuilder();
        var queryStr = apistrbuilder
        .api('1.0')
        .devices()
        .parameters({
            access_token : token,
            size : size
        })
        .toString();
        Request(queryStr)
        .header("Content-Type", "application/json")
        .header('Authorization', token)
        .get(callback);
}

export function getDevicePropertiesDetails(deviceName,token,callback){
    var apistrbuilder = new ApiStringBuilder('http','ion.netas.com.tr','30000');
    var queryObj = {};
    queryObj.from = 0;
    queryObj.size = 1;
    queryObj.query = {};
    queryObj.query.bool = {};
    queryObj.query.bool.must = [{exists : {field : 'data.aqi'}} , {match : {deviceId : deviceName} } ,{ range : {timestamp : {gte : 1512075600 , lte : 1514753999}}}];
    queryObj._source = {};
    queryObj._source.inlcudes = [];
    queryObj._source.excludes = [];
    queryObj.sort = [{timestamp : {order : 'asc'}}];
    var queryObjStr = JSON.stringify(queryObj);
    var uriEncodedQueryObj = encodeURI(queryObjStr);
    var queryStr = apistrbuilder
        .api('1.0')
        .search()
        .parameters({
            access_token : token
        }).toString();
    Request(queryStr)
        .post(JSON.stringify(queryObj),callback);
}

export function postDevicePropertiesDetails(deviceName,token,callback){
    var apistrbuilder = new ApiStringBuilder();
    var queryObj = criteriaBuilder([{op : 'equals' , name : 'data.device_id' , value: deviceName}]);
    var queryStr = apistrbuilder
        .api('1.0')
        .search()
        .parameters({
            access_token : token
        }).toString();
    Request(queryStr)
        .post(JSON.stringify(queryObj),callback);
}
/*
*  @param criteria : List of criterion for property search.
*   
*/
export function searchDeviceProperties(criteria,callback){
    var criterion = {};
    criterion.op = 'contains,not_contains,equals,not_equals,lt,gt,lte,gte';
    criterion.name = 'data.temperature';
    var apistrbuilder = new ApiStringBuilder();
    var queryObj = {};
    queryObj.from = 0;
    queryObj.size = 10;
    queryObj.query = {};
    queryObj.query.bool = {};
    queryObj.query.bool.must = [];
    queryObj._source = {};
    queryObj._source.inlcudes = [];
    queryObj._source.excludes = [];
    queryObj.sort = [{timestamp : {order : 'asc'}}];
    var i;
    var len = criteria.length;
    for(i = 0;i < len;i++){

    }
    var queryObjStr = JSON.stringify(queryObj);
    var uriEncodedQueryObj = encodeURI(queryObjStr);
    var queryStr = apistrbuilder
        .api('1.0')
        .search()
        .parameters({
            access_token : token
        }).toString();
    Request(queryStr)
        .post(JSON.stringify(queryObj),callback);
}

export function getTokenByUserPass(username,password,callback){
    var apistrbuilder = new ApiStringBuilder();
    var queryStr = apistrbuilder
        .api('1.0')
        .auth('oauth')
        .token()
        .parameters({
            grant_type : 'password'
        }).toString();
    Request(queryStr)
        .header("Content-Type", "application/x-www-form-urlencoded")
        .header('Authorization','Basic Y2xpZW50OnNlY3JldA==')
        .post('username='+username+'&'+'password='+password,callback);
}