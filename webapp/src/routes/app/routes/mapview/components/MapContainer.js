import React, { Component } from 'react';
import MapGL from 'react-map-gl';
import HeatmapComponent from './HeatmapComponent';
import IconMapComponent from './IconMapComponent';
import PopupContent from './PopupContent';
import IconComponentDetailsInfoBox from './IconComponentDetailsInfoBox';
import ApiStringBuilder from '../data/ApiStringBuilder';
import {request as Request} from 'd3-request';
import axios from 'axios';
import {postDevicePropertiesDetails as RequestDevProperties} from '../data/DataAdapter';
import AuthModule from './AuthModule';
import {criteriaBuilder} from '../data/CriteriaBuilder';
import MapConfig from '../config/MapConfig';
import RefreshIndicator from 'material-ui/RefreshIndicator';

const MAPBOX_TOKEN = 'pk.eyJ1IjoiYWVyZGVtZWtpbiIsImEiOiJjajhtdGRxb2ExMmE5MnZqczljOXA0MDJhIn0.Fo8sD9jDikhVUu72blwRUA'; // eslint-disable-line
const prefWidth = window.innerWidth * 0.90;
const prefHeight = window.innerHeight * 0.80;
const isNotNull = (r) => (!isNull(r));
const isNull = (r) => (r == null || r === 'undefined');
const MAPTYPES = {
    taxiicon : 'taxiicon'
}
export default class MapContainer extends Component {

    constructor(props) {
        super(props);
        this.onMapStateChange = this.props.onMapStateChange;
        this.state = {
            viewport: {
                ...MapConfig.defaultViewport,
                width: prefWidth,
                height: prefHeight
            },
            authObj : null,
            map: null,
            maptype: this.props.maptype,
            mapstyle: this.props.mapstyle,
            featurecollection : null
        }
        this.onErrorThrown = this.props.onErrorThrown;
        this.retryAuthenticationTimer = null;
        this.authenticateForMap()
        .then()
        .catch(function(error){
            console.log("Authentication problem...Retry after 5sec.");
            if(isNull(this.retryAuthenticationTimer)){
                this.retryAuthenticationTimer = setInterval(this.authenticateForMap().then(this.setAuthState.bind(this)).bind(this),5000);
            }
            
        }.bind(this));
    }

    setAuthState(authobj){
        if(isNotNull(this.retryAuthenticationTimer)){
            clearInterval(this.retryAuthenticationTimer);
        }
        this.setState({
            authObj : authobj
        });
    }

    authenticateForMap(){
        return new Promise((resolve,reject) => {
            var authModule = AuthModule.getInstance();
            authModule.authenticateWithUserPass('itest','1234',resolve,reject);
        }).then(this.setAuthState.bind(this))
        .catch(function(error){
            console.log("Authentication problem...Retry after 5sec.");
            if(isNull(this.retryAuthenticationTimer)){
                this.retryAuthenticationTimer = setInterval(this.authenticateForMap.bind(this),15000);
            }
            
        }.bind(this));
    }

    componentDidMount() {
        window.addEventListener('resize', this._resize.bind(this));
        this._resize();
    }

    _resize() {
        this._onViewportChange({
            width: prefWidth,
            height: prefHeight
        });
    }

    _onViewportChange(viewport) {
        this.setState({
            viewport: { ...this.state.viewport, ...viewport }
        });
    }

    _changeMapType(maptype) {
        this.setState({
            maptype: maptype
        });
    }

    _onMapStateChange(mapstate) {
        this.onMapStateChange(mapstate);
    }

    render() {
        var { maptype, mapstyle } = this.props;
        var { authObj } = this.state;
        var { loadingState, percentage, viewport, deviceDetails , featurecol} = this.state;
        return (
            <MapGL
                {...viewport}
                mapStyle={mapstyle}
                onViewportChange={this._onViewportChange.bind(this)}
                mapboxApiAccessToken={MAPBOX_TOKEN}
                ref={nodeElement => nodeElement && !this.state.map && this.loadMap(nodeElement)}>
                {isNotNull(authObj) && (maptype === 'taxiicon') && <IconMapComponent 
                    selectedDevice={deviceDetails} 
                    viewport={viewport}
                    onErrorThrown={this.onErrorThrown}/>}
                {isNotNull(authObj) && (maptype === 'heatmap') && <HeatmapComponent
                    onMapStateChange={this._onMapStateChange.bind(this)} 
                    viewport={viewport} map={this.state.map}
                    onErrorThrown={this.onErrorThrown}
                    />}
                
            </MapGL>
        );
    }

    loadMap(nodeElement) {
        var canvas = nodeElement.getMap().getCanvas();
        this.setState({
            map: nodeElement
        });
    }

}