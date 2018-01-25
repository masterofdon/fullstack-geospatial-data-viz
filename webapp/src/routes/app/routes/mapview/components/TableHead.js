import React, {Component} from 'react';

export default class TableHead extends Component {
    constructor(props){
        super(props);
    }

    render(){
        const {indicator , value, lastTime} = this.props;
        return(
        <tr>
            <th scope="col">{indicator}</th>
            <th scope="col">{value}</th>
        </tr>
        );
    }
}