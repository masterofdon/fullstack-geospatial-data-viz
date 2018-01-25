import React, { Component } from 'react';
import TaxiRealtimeDataIconOverlay from './TaxiRealtimeDataIconOverlay';
import { request as Request } from 'd3-request';
import {json as requestJson} from 'd3-request';
import {Popup} from 'react-map-gl';
import Mqtt from 'mqtt';
import ApiStringBuilder from '../data/ApiStringBuilder';
import AuthModule from './AuthModule';
import {buildFeatureCollectionFromDeviceList as BuildFeatureCollectionFromDeviceList} from './FeatureCollectionBuilder';
import {requestDevices as RequestDeviceDetails} from '../data/DataAdapter';
import WebSocketManager from '../data/WebSocketManager';
import PopupContent from './PopupContent';
import {postDevicePropertiesDetails as RequestDevProperties} from '../data/DataAdapter';
import IconComponentDetailsInfoBox from './IconComponentDetailsInfoBox';
const isNotNull = r => r != null && r != 'undefined';
const isNull = r => r == null || r === 'undefined'

export default class IconMapComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data : null,
            iconMapping : null,
            showCluster : true,
            popupLatLng : null,
            selectedDevice : null,
            featurecollection : null,
            deviceDetails : null,
            samplelocs : null,
            token : AuthModule.getInstance().getAuthObject('itest').access_token
        };
        this.deviceList = null;        
        
        this.requestIcons();
        this.requestSampleLocs();
        this.handleClose = this.handleClose.bind(this);
        this.onPopupShow = this.props.onPopupShow;
        this.onPopupHide = this.props.onPopupHide;
        this.lastHovered = null;
        this.onDeviceDetailsUpdated = this.props.onDeviceDetailsUpdated;         
    }

    requestDeviceListData(){
        RequestDeviceDetails(this.state.token,500,this.deviceDetailsResponseHandler.bind(this));
    }

    deviceDetailsResponseHandler(err, response){
        if(err) {
            throw new Error("Error on Server Request");
        }
        var outer = JSON.parse(response.response);
        this.deviceList = outer;
        var featureCollection = BuildFeatureCollectionFromDeviceList(this.deviceList,this.state.samplelocs);        
        this.setState({
            data : featureCollection.features
        });
        this.setState({featurecollection : featureCollection});
    }
    
    indexOfFeature(device_id){
        var len = this.state.featureCollection.features.length;
        var i;
        for(i = 0; i < len ; i++){
            if(this.state.featureCollection.features[i].properties.name === device_id){
                return i;
            }
        }
        return -1;
    }

    requestIcons(){
        requestJson('example/location-icon-mapping.json', (error, response) => {
            if (!error) {
                this.setState({iconMapping: response});
            }
        });
    }

    sampleLocation(error,response){
        if (!error) {
            this.setState({samplelocs: response});                
            setTimeout(this.requestDeviceListData.bind(this),1000);
        }
    }

    requestSampleLocs(){
        requestJson('example/sample_locs.json', this.sampleLocation.bind(this));
    }

    componentWillUnmount(){
        var deviceListLength = this.deviceList.length;
        var i = 0;
        if(this.state.selectedDevice != null && this.state.selectedDevice !== 'undefined'){
            this.setState({
                popupLatLng : null
            });   
        }
    }

    _onItemHover(item){
        var {viewport} = this.props;
        const z = Math.floor(viewport.zoom);
        var hoveredPoints = item.object && item.object.zoomLevels[z].points;
        if(hoveredPoints == null){
            this.lastHovered = null;
            this.hideToolTip();
            return;
        } else if(isNull(this.lastHovered)){
           this.lastHovered = item.object.properties.id;
           this.showToolTip(item);
        }
    }

    hideToolTip(){
        this.setState({popupLatLng : null, popupContent : null});  
    }

    showToolTip(item){
        if(isNull(item)){
            return;
        }
        var {viewport} = this.props;
        const z = Math.floor(viewport.zoom);
        var items = item.object.zoomLevels[z].points;
        var object = {};
        object.popupLatLng = [item.lngLat[0],item.lngLat[1]];
        object.content = [];
        for(var i=0;i < items.length;i++){
            object.content.push(items[i].properties);
        }
        this.setState({popupLatLng : object.popupLatLng, popupContent : object.content});  
    }

    _onItemClicked(item){
    }

    onDeviceSelected(event){
        var devicename = event.currentTarget.getAttribute('data-deviceid');
        //Find the device details.
        var i = 0;
        var len = this.state.featurecollection.features.length;

        for(;i < len;i++){
            if(this.state.featurecollection.features[i].properties.name === devicename){
                //this.setState({selectedDetailsItem : this.state.featurecollection.features[i]});
                this.requestDeviceDetails(this.state.featurecollection.features[i]);
                return;
            }
        }
    }

    requestDeviceDetails(device){
        var apistrbuilder = new ApiStringBuilder();
        var queryStr = apistrbuilder
            .api('1.0')
            .devices(device.properties.id)
            .details()
            .parameters({
                access_token : this.state.token
            })
            .toString();
        Request(queryStr)
        .header("Content-Type", "application/json")
        .header('Authorization', this.state.token)
        .get(this._deviceDetailsResponseHandler.bind(this));   
    }

    _deviceDetailsResponseHandler(error, response){
        var data = (response.response) ? JSON.parse(response.response) : null;
        this._requestDevicePropertiesDetails(data);
    }

    _requestDevicePropertiesDetails(devicedetails){
        RequestDevProperties(devicedetails.device.name,this.state.token,function(error,response){
            if(error){
                throw new Error("Error while _requestDevicePropertiesDetails");
            }
            var result = JSON.parse(response.response)._embedded.result[0];
            this.setState({
                deviceDetails : result.data
            });
        }.bind(this));
    }

    handleClose(){
        this.setState({
            deviceDetails : null
        });
    }

    render() {
        const {data,iconMapping,showCluster, popupLatLng, popupContent, deviceDetails} = this.state;
        var {selectedDevice, viewport} = this.props;
        return (            
            <div>
                {data && <TaxiRealtimeDataIconOverlay
                    viewport={viewport}
                    data={data}
                    iconAtlas="assets/images/location-icon-atlas.png"
                    iconMapping={iconMapping}
                    showCluster={showCluster}
                    onHover={this._onItemHover.bind(this)}
                    onClick={this._onItemClicked.bind(this)}
                >       
                </TaxiRealtimeDataIconOverlay>}
                {deviceDetails && <IconComponentDetailsInfoBox devicedetails={deviceDetails} captureScroll={true} onClose={this.handleClose}/>}
                {popupContent && <PopupContent lngLat={popupLatLng} anchor={"top"} devices={popupContent} onItemSelected={this.onDeviceSelected.bind(this)}/>}
            </div>
        );
    }

}