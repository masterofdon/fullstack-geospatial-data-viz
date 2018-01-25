import React , {Component} from 'react';
import FontIcon from 'material-ui/FontIcon';

export default class IconPopoverHeader extends Component{
    constructor(props){
        super(props);
    }

    render(){
        const {header} = this.props;
        const style = {
            marginTop: '15px',
            marginLeft: '10px',
            position : 'absolute'
        }
        return(
            <div className={'input-group'}>
                <FontIcon className="material-icons" style={style} >search</FontIcon>
                <input className={'iconpopover-header'} onChange={this.props.onSearch} placeholder={header}/>
            </div>
        );
    }
}