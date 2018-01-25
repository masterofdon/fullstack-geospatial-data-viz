import React , {Component} from 'react';
import {Popup} from 'react-map-gl';
import IconPopover from './IconPopover';
import R from 'constants/R';
export default class PopupContent extends Component{
    constructor(props){
        super(props);
    }

    render(){
        const {lngLat, anchor, devices, onItemSelected} = this.props;
        return(
            <Popup 
                longitude={lngLat[0]} 
                latitude={lngLat[1]} 
                anchor={anchor} 
                closeButton={false} 
                captureScroll={true}>
                <IconPopover 
                    header={R.labels.TR.mapview.popover.header.deviceList} 
                    onItemSelected={onItemSelected} 
                    devices={devices}/>
            </Popup>
        );
    }
}