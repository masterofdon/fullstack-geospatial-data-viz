import React, {Component} from 'react';
import IconButton from 'material-ui/IconButton';
import {red500, yellow500, blue500} from 'material-ui/styles/colors';

export default class InfoBoxHeader extends Component {

    constructor(props){
        super(props);
        this.state = {
            displaytext : this.props.displaytext
        }
        this.onHeaderChange = this.props.onHeaderChange;        
    }

    render() {
        var textStyle = {
            textAlign : "center",
            display: 'inline-block',
            verticalAlign: 'middle',
            padding: '5px',
            marginTop : '10px'
        };
        const iconStyles = {            
            cursor : 'pointer',
            color : 'red'
        };
        const buttonStyle = {            
            float : 'right',
            marginRight: '25px',
        }
        
        return (
            <div className={"infobox-header-container bg-color-primary"}>
                <span style={textStyle}>{this.state.displaytext}</span>
                <IconButton
                    style={buttonStyle}
                    iconClassName="material-icons"
                    iconStyle={iconStyles}
                    onClick={this.props.onClose.bind(this)}
                    tooltip="Close">close
                </IconButton>
            </div>
        );
    }

}

