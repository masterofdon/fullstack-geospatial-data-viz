import React , {Component} from 'react';
import MapContainer from './MapContainer';
import MapConfig from '../config/MapConfig';
import AuthModule from './AuthModule';
import MapTypeController from './MapTypeController';
import MapTypeButton from './MapTypeButton';
import ImageBlurCircular from 'material-ui/svg-icons/image/blur-circular';
import ImageBlurOn from 'material-ui/svg-icons/image/blur-on';
import ImageGradient from 'material-ui/svg-icons/image/gradient';
import ErrorThrowingComponent from './ErrorThrowingComponent';

import R from 'constants/R';
const isNotEmpty = r => (r != null && r !== 'undefined' && Array.isArray(r) && r.length > 0)
class MapView extends Component{
    constructor(props){
        super(props);
        this.state = {
            maptype : 'taxiicon',
            errorbox : []
        }
        this.onHeatMapClicked = this.onHeatMapClicked.bind(this);
        this.onIconsClicked = this.onIconsClicked.bind(this);
        this.onErrorThrown = this.onErrorThrown.bind(this);
        this.onErrorCloseRequest = this.onErrorCloseRequest.bind(this)
    }

    onMapStateChange(){

    }

    onHeatMapClicked(){
        this.setState({
            maptype : 'heatmap'
        });
    }

    onIconsClicked(){
        this.setState({
            maptype : 'taxiicon'
        });
    }

    onErrorThrown(error){
        this.state.errorbox.push(error);
        this.setState({
            errorbox : this.state.errorbox
        });
    }
    onErrorCloseRequest(){
        this.setState({
            errorbox : []
        });
    }

    render(){
        const {errorbox} = this.state;
        var action , message;
        if(isNotEmpty(errorbox)){
            action = errorbox[0].action;
            message = errorbox[0].message;
        }
        return(
                <div className={"container-fluid no-breadcrumbs page-mapview"}>
                    <MapContainer 
                        onMapStateChange={this.onMapStateChange.bind(this)} 
                        maptype={this.state.maptype} 
                        mapstyle={MapConfig.mapstyle}
                        onErrorThrown={this.onErrorThrown}
                        onErrorCloseRequest={this.onErrorCloseRequest}/>
                    <ErrorThrowingComponent 
                        isOpen={isNotEmpty(errorbox)} 
                        action={action} 
                        message={message} 
                        onErrorCloseRequest={this.onErrorCloseRequest}/>
                </div>
        );
    }
}

module.exports = MapView;