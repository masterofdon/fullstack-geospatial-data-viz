import React, {Component} from 'react'
import StatBox from './StatBox';

class StatBoxContainer extends Component{
    constructor(props){
        super(props);
    }

    onHoverHandler(e){
        var x = e.currentTarget.getElementsByClassName('animated-box');
        if(x != null && x !== 'undefined'){
            var t =  x[0].getAttribute('class');
            if(t.includes("no-op")){
                var v = t.replace('no-op','op');
                x[0].setAttribute('class',v);
            }
        }
    }

    onUnhoverHandler(e){
        var x = e.currentTarget.getElementsByClassName('animated-box');
        if(x != null && x !== 'undefined'){
            var t =  x[0].getAttribute('class');
            if(t.includes("op")){
                var v = t.replace('op','no-op');
                x[0].setAttribute('class',v);
            }
        }
    }

    render(){
        const { stats } = this.props;
        var statMap = stats.map((e) => {
            return <StatBox                 
                key={e.id} 
                value={e.value} 
                unit={e.unit} 
                info={e.info} 
                icon={e.icon} 
                color={e.color}
                onHover={this.onHoverHandler}
                onUnHover={this.onUnhoverHandler}/>
        });
        return(
            <div className="row">
                {statMap}    
            </div>
        );
    }
}

module.exports = StatBoxContainer;