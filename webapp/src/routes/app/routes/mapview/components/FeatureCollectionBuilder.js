const isNull = (r) => (r == null || r == 'undefined')
const generateRandomLocs = false;
export function buildFeatureCollectionFromDeviceList(deviceList,sample){
    const fields = [
        'address',
        'id',
        'lastUpdateDate',
        'name',
        'online'
    ];
    var deviceArray = [];
    var featureCollection = {};
    featureCollection.type = "FeatureCollection";
    featureCollection.crs = {};
    featureCollection.crs.type = "name";
    featureCollection.crs.properties = {};
    featureCollection.crs.properties.name = "urn:ogc:def:crs:OGC:1.3:CRS84";
    featureCollection.features = [];
    var deviceListLength = deviceList.length;
    var fieldsLength = fields.length;
    var i = 0;
    for(;i<deviceListLength;i++){
        var feature = {};
        feature.type = "Feature";
        feature.properties = {};
        feature.geometry = {};
        feature.geometry.type = "Point";
        feature.geometry.coordinates = [];
        for(var j = 0;j < fieldsLength ; j++){
            feature.properties[fields[j]] = deviceList[i][fields[j]];
        }
        // Check the address of the icon in lastKnownLocation property first.
        // It could be on fixedLocation as well.
        if(!isNull(feature.properties.lastKnownLocation)){
            feature.geometry.coordinates.push(feature.properties.lastKnownLocation[0]);
            feature.geometry.coordinates.push(feature.properties.lastKnownLocation[1]);
            
        }else if(!isNull(feature.properties.address)){
            feature.geometry.coordinates.push(feature.properties.address[0]);
            feature.geometry.coordinates.push(feature.properties.address[1]);
        }else if(generateRandomLocs){
            feature.geometry.coordinates = getRandomElementFromArray(sample);
        }
        featureCollection.features.push(feature);
    }
    return featureCollection;

} 

function getRandomElementFromArray(array){
    if (!array)
        return -1;
    var min = 0;
    var max = array.length -1;
    if (max <= 0)
        return array[0];
    var index = parseInt(Math.random() * (max - min) + min, 10);
    
    return array[index];
}