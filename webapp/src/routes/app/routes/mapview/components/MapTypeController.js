import React , {Component} from 'react';

class MapTypeController extends Component{
    constructor(props){
        super(props);
    }
    
    render(){
        const {children} = this.props;
        return(
            <div>
                {children}
            </div>
        );
    }
}

module.exports = MapTypeController;