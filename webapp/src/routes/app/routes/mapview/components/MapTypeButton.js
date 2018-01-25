import React, { Component } from 'react';
import FlatButton from 'material-ui/FlatButton';

import RaisedButton from 'material-ui/RaisedButton';
export default class MapTypeButton extends Component {

    constructor(props) {
        super(props);
        this.onClickHandler = this.props.onClick.bind(this);
    }

    render() {
        const styles = {
            button: {
                margin: 12,
            },
            exampleImageInput: {
                cursor: 'pointer',
                position: 'absolute',
                top: 0,
                bottom: 0,
                right: 0,
                left: 0,
                width: '100%',
                opacity: 0,
            },
        };
        const { label , icon } = this.props;
        return (
            <RaisedButton
                label={label}
                labelPosition="before"
                icon={icon}
                onClick={this.onClickHandler}
                style={styles.button}
            />
        )
    }
}