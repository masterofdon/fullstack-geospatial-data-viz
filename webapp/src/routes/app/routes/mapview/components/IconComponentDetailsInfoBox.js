import React , {Component} from 'react';
import InfoBoxHeader from './InfoBoxHeader';
import InfoBoxDivider from './InfoBoxDivider';
import ApiStringBuilder from '../data/ApiStringBuilder';
import {request as Request} from 'd3-request';
import {BaseControl} from 'react-map-gl';
import autobind from 'react-map-gl'
import InfoBoxWidget from './InfoBoxWidget';

export default class IconComponentDetailsInfoBox extends BaseControl{
    constructor(props){
        super(props);
        this.state = {
            progress : null,
            device : this.props.devicedetails
        }        
        this.handleScroll = this.handleScroll.bind(this);
        this._onContainerLoad = this._onContainerLoad.bind(this);
        this.handleClose = this.props.onClose.bind(this);
    }
    
    componentDidMount(){
    }

    handleScroll(event) {
        var target = event.currentTarget;
        target.scrollBy(0,event.deltaY / 3);
    }

    render(){
        const {devicedetails} = this.props;
        return React.createElement('div',
        {
            className : "infobox-container bg-color-primary",
            ref : this._onContainerLoad,
            onWheel : this.handleScroll
        },
        [
            <InfoBoxHeader key={1} displaytext={devicedetails.device_id || devicedetails.device.name} onClose={this.handleClose}/>,
            <InfoBoxDivider key={2} />,
            <InfoBoxWidget key={3} deviceprops={devicedetails}/>
        ]);
    }
}