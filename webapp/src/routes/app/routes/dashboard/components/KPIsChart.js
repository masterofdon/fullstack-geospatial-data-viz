import React ,{Component} from 'react';
import ReactEcharts from 'components/ReactECharts';
import CHARTCONFIG from 'constants/ChartConfig';

class KPIChart extends Component{
  constructor(props){
    super(props);
    this.state = {
      option : option
    }
  }

  render(){
    const {loading, data} = this.props;
    if(data != null && data !== 'undefined'){
      this.state.option.series = data;
    }
    var {option} = this.state; 
    return(
      <ReactEcharts style={{height: '400px'}} option={option} showLoading={loading} />
    );
  }
}
var base = +new Date(2017, 1, 10);
var oneDay = 24 * 3600 * 1000;
var date = [];
for (var i = 1; i < 365; i++) {
  var now = new Date(base += oneDay);
  date.push([now.getFullYear(), now.getMonth() + 1, now.getDate()].join('/'));
  
}
var option = {
  title: {
      text: 'Interaction',
      show : false
  },
  tooltip : {
      trigger: 'axis',
      axisPointer: {
          type: 'cross',
          label: {
              backgroundColor: '#6a7985'
          }
      }
  },
  legend: {
      data:['Chrome','Safari','Mozilla','Edge'],
      bottom: 10,
      left: 'center',
      padding : [
        100,  // up
        0, // right
        0,  // down
        0, // left
      ] 
  },
  toolbox: {
      feature: {
          saveAsImage: {
            title : 'SAVE'
          }
      },
      right : 24
  },
  grid: {
      left: '3%',
      right: '4%',
      bottom: '15%',
      containLabel: true
  },
  xAxis : [
      {
          type : 'category',
          boundaryGap : false,
          data : date
      }
  ],
  yAxis : [
      {
          type : 'value'
      }
  ],
  series : [      
  ]
};

module.exports = KPIChart;
