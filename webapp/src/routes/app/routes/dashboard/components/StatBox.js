import React from 'react';
import CountUp from 'countup';

class StatBox extends React.Component{

    constructor(props){
        super(props);
        this.onHoverHandler = this.onHoverHandler.bind(this);
        this.onUnhoverHandler = this.onUnhoverHandler.bind(this);
        this.onHover = this.props.onHover.bind(this);
        this.onUnHover = this.props.onUnHover.bind(this);
    }

    onHoverHandler(e){
        var x = e.currentTarget.getElementsByClassName('animated-icon');
        if(x != null && x !== 'undefined'){
            var t =  x[0].getAttribute('class');
            if(t.includes("no-op")){
                var v = t.replace('no-op','op');
                x[0].setAttribute('class',v);
            }
        }
        this.onHover(e);
    }

    onUnhoverHandler(e){
        var x = e.currentTarget.getElementsByClassName('animated-icon');
        if(x != null && x !== 'undefined'){
            var t =  x[0].getAttribute('class');
            if(t.includes("op")){
                var v = t.replace('op','no-op');
                x[0].setAttribute('class',v);
            }
        }
        this.onUnHover(e);
    }

    render(){
        const {value , unit , info, icon , color} = this.props;
        let pngAssetsIcon = false;
        const styles = {
            statboxContainer : {
                backgroundColor : color
            }
        }
        if(icon.startsWith('assets')){
            pngAssetsIcon = true;
        }
        return(
            <div className="col-xl-3 col-sm-6" onMouseOverCapture={this.onHoverHandler} onMouseOutCapture={this.onUnhoverHandler}>
                <div style={styles.statboxContainer} className="box box-default animated-box no-op">
                    <div className="box-top">
                        <span >{value}<span className="size-h5">{unit}</span></span>
                    </div>
                    <div className="box-info">
                        <span>{info}</span>
                    </div>
                    <div className="box-bottom">
                        {pngAssetsIcon ? <img className={'animated-icon no-op'} src={icon} /> : <i className="material-icons animated-icon no-op" >{icon}</i>}
                    </div>
                </div>
            </div>
        );
    }
}

module.exports = StatBox;