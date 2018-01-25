import React, {Component} from 'react';

export default class TableRow extends Component {
    constructor(props){
        super(props);
    }

    render(){
        const {indicator , value} = this.props;
        return(
        <tr>
            <td scope="col">{indicator}</td>
            <td scope="col">{value}</td>
        </tr>
        );
    }
}