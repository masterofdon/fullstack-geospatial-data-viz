import React , {Component} from 'react';
import IconPopoverHeader from './IconPopoverHeader';
import IconPopoverContentList from './IconPopoverContentList';

export default class IconPopover extends Component{
    
    constructor(props){
        super(props);
        this.onSearchHandler = this.onSearchHandler.bind(this);
        this.state = {
            search : null
        }
    }

    onSearchHandler(event){
        this.setState({search : event.target.value});
    }

    render(){
        const {header , devices, onItemSelected} = this.props;
        const {search} = this.state; 
        return(
            <div className='iconpopover-container bg-color-primary'>
                <IconPopoverHeader onSearch={this.onSearchHandler} header={header}/>
                <IconPopoverContentList onItemSelected={onItemSelected} search={search} devices={devices}/>
            </div>
        )

    }
}