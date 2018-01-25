import React, {Component} from 'react';

export default class InfoBoxDividerProgressor extends Component {

    constructor(props){
        super(props);
    }

    render() {

        return(
            <div className={'infobox-divider-ontop ' + this.props.transition}></div>
        );
    }
}