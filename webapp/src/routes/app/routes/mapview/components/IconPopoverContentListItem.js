import React , {Component} from 'react';

export default class IconPopoverContentListItem extends Component{
    constructor(props){
        super(props);
        this.onItemSelected = this.props.onItemSelected;
    }

    _onClickHandler(event){
        this.onItemSelected(event);
    }

    render(){
        const {deviceid , onItemSelected} = this.props;
        return(
            <li onClick={this._onClickHandler.bind(this)} data-deviceid={deviceid} >{deviceid}</li>
        );
    }
}