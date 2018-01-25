import React, {Component} from 'react';

import InfoBoxDividerProgressor from './InfoBoxDividerProgressor'
const PROGRESSOR_STOP = 0;
const PROGRESSOR_STOPPING = 1;
const PROGRESSOR_PROGRESS = 2;
const STR_PROGRESSOR_STATE = [
    'divider-stop',
    'divider-stopping',
    'divider-progress'
];
export default class InfoBoxDivider extends Component {

    constructor(props){
        super(props);
        this.state = {
            progressorState : STR_PROGRESSOR_STATE[PROGRESSOR_STOP]
        }
        /*setTimeout(function(){
            this._toProgressorProgressState.bind(this)();
            setTimeout(function(e){
                this._toProgressorStoppingState.bind(this)();
            }.bind(this),7000);
        }.bind(this),1000);*/
    }

    _toProgressorStopState(){
        this.setState({
            progressorState : STR_PROGRESSOR_STATE[PROGRESSOR_STOP]
        });
    }

    _toProgressorStoppingState(){
        this.setState({
            progressorState : STR_PROGRESSOR_STATE[PROGRESSOR_STOPPING]
        });
    }

    _toProgressorProgressState(){
        this.setState({
            progressorState : STR_PROGRESSOR_STATE[PROGRESSOR_PROGRESS]
        });
    }

    render() {
        if(this.props.loadingState === 'loading')
            this.state.progressorState = STR_PROGRESSOR_STATE[PROGRESSOR_PROGRESS]
        else if(this.props.loadingState === 'loaded'){
            this.state.progressorState = STR_PROGRESSOR_STATE[PROGRESSOR_STOPPING]
        }else if(this.props.loadingState === 'finished'){
            progressorState : STR_PROGRESSOR_STATE[PROGRESSOR_STOP]
        }
        return(
            <div className={"row infobox-divider line-progressor"}>
                <InfoBoxDividerProgressor transition={this.state.progressorState} />
            </div>
        )
    }
}