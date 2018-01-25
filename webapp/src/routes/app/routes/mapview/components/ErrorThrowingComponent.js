import React , {Component} from 'react';
import Snackbar from 'material-ui/Snackbar';
export default class ErrorThrowingComponent extends Component {

    constructor(props){
        super(props);
        this.state = {
            isOpen : this.props.isOpen
        }
        this.onCloseHandler = this.onCloseHandler.bind(this);
    }


    onCloseHandler(){
        this.props.onErrorCloseRequest();
    }

    render(){
        const errorStyle = {
            width : '100%'
        }
        return(
            <Snackbar 
                open={this.props.isOpen}
                action={this.props.action}
                onActionClick={this.props.onActionClick}
                onRequestClose={this.onCloseHandler}
                bodyStyle={errorStyle}
                autoHideDuration={10000}
                message={this.props.message}
            />
        );
    }
}