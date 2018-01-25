import React , {Component} from 'react';
import ProgressBar from 'progressbar.js';
export default class InfoBoxCirclePercentage extends Component {

    constructor(props){
        super(props);
        this.state = {
            progressbar : getEx()
        }
        //setTimeout(getEx,2000);
        
    }

    render(){
        var {percentage} = this.props;
        setTimeout(function(e){
            this.state.progressbar.animate(percentage);
        }.bind(this),1000);
        return(
            <div ref={(nodeElement) => nodeElement && nodeElement.appendChild(this.state.progressbar)}/>
        );
    }
}

function getEx(){
    var container = document.createElement('div');
    container.setAttribute('id',"container");
    var bar = new ProgressBar.Circle(container, {
        color: '#41C4C4',
        // This has to be the same size as the maximum width to
        // prevent clipping
        strokeWidth: 4,
        trailWidth: 4,
        trailColor: '#a5acba',
        easing: 'easeInOut',
        duration: 1400,
        text: {
          autoStyleContainer: false
        },
        from: { color: '#41C4C4', width: 4 },
        to: { color: '#41C4C4', width: 4 },
        // Set default step function for all animate calls
        step: function(state, circle) {
          circle.path.setAttribute('stroke', state.color);
          circle.path.setAttribute('stroke-width', state.width);
      
          var value = Math.round(circle.value() * 100);
          if (value === 0) {
            circle.setText('');
          } else {
            circle.setText(value);
          }
      
        }
      });
      bar.text.style.fontFamily = '"Raleway", Helvetica, sans-serif';
      bar.text.style.fontSize = '3rem';
      
      //bar.animate(0.8);  // Number from 0.0 to 1.0
      container.animate = bar.animate.bind(bar);
      return container;
}