import React ,{Component} from 'react';
import QueueAnim from 'rc-queue-anim';
import KPIsChart from './KPIsChart';
import AquisitionChart from './AquisitionChart';
import StatBoxes from './StatBoxes';
import BenchmarkChart from './BenchmarkChart';
import GraphCard from 'components/ChartCard';
import SystemMetric from '../data/SystemMetric';
import StatBoxContainer from './StatBoxContainer';
import Stat from '../data/Stat';
import ActionableChart from './ActionableChart';
import CHARTCONFIG from 'constants/ChartConfig';
import AQIRadarChart from './AQIRadarChart';
import BoxContainer from './BoxContainer';
import Engagement from './Engagement';
import R from 'constants/R';

const testDistricts = [
  'Device1',
  'Device2',
  'Device3'
];


var datav = [Math.random() * 300];
var data2 = [Math.random() * 300];
var data3 = [Math.random() * 300];
var data4 = [Math.random() * 300];
for (var i = 1; i < 365; i++) {
  datav.push(Math.abs(Math.round((Math.random() - 0.5) * 20 + datav[i - 1])));
  data2.push(Math.abs(Math.round((Math.random() - 0.5) * 20 + data2[i - 1])));
  data3.push(Math.abs(Math.round((Math.random() - 0.5) * 20 + data3[i - 1])));
  data4.push(Math.abs(Math.round((Math.random() - 0.5) * 20 + data4[i - 1])));
}
var dataBJ = [
  [55,9,56,0.46,18,6,1],
  [3,11,21,0.65,34,9,2],
  [5,7,63,0.3,14,5,3],
  [3,7,29,0.33,16,6,4],
  [2,24,44,0.76,40,16,5],
  [82,58,90,1.77,68,33,6],
  [74,49,77,1.46,48,27,7],
  [78,55,80,1.29,59,29,8],
  [267,216,280,4.8,108,64,9],
  [185,127,216,2.52,61,27,10],
  [39,19,38,0.57,31,15,11],
  [41,11,40,0.43,21,7,12],
  [64,38,74,1.04,46,22,13],
  [108,79,120,1.7,75,41,14],
  [108,63,116,1.48,44,26,15],
  [33,6,29,0.34,13,5,16],
  [94,66,110,1.54,62,31,17],
  [186,142,192,3.88,93,79,18],
  [57,31,54,0.96,32,14,19],
  [22,8,17,0.48,23,10,20],
  [39,15,36,0.61,29,13,21],
  [94,69,114,2.08,73,39,22],
  [99,73,110,2.43,76,48,23],
  [31,12,30,0.5,32,16,24],
  [42,27,43,1,53,22,25],
  [154,117,157,3.05,92,58,26],
  [234,185,230,4.09,123,69,27],
  [160,120,186,2.77,91,50,28],
  [134,96,165,2.76,83,41,29],
  [52,24,60,1.03,50,21,30],
  [46,5,49,0.28,10,6,31]
];

const data = [
  {
      name:'Chrome',
      type:'line',
      stack: 'till',
      areaStyle: {normal: {}},
      smooth: true,
      symbol: 'none',
      sampling: 'average',
      itemStyle: {
        normal: {
          color: CHARTCONFIG.color.success
        }
      },
      data: datav
  },
  {
    name:'Safari',
    type:'line',
    stack: 'till',
    areaStyle: {normal: {}},
    smooth: true,
    symbol: 'none',
    sampling: 'average',
    itemStyle: {
      normal: {
        color: CHARTCONFIG.color.danger
      }
    },
    data: data2
  },
  {
    name:'Mozilla',
    type:'line',
    stack: 'till',
    areaStyle: {normal: {}},
    smooth: true,
    symbol: 'none',
    sampling: 'average',
    itemStyle: {
      normal: {
        color: CHARTCONFIG.color.warning
      }
    },
    data: data3
  },
  {
    name:'Edge',
    type:'line',
    stack: 'till',
    areaStyle: {normal: {}},
    smooth: true,
    symbol: 'none',
    sampling: 'average',
    itemStyle: {
      normal: {
        color: CHARTCONFIG.color.info
      }
    },
    data: data4
  }
];
class Dashboard extends Component {
  constructor(props){
    super(props);
    this.state  = {
      loading : true
    };
    setTimeout(function(e){
      this.setState({
        loading : false,
        data : data
      });
    }.bind(this),6000);
  }

  render(){
    const {loading,data} = this.state;
    return(
      <div className="container-fluid no-breadcrumbs page-dashboard">
        <div key="1">
          <StatBoxContainer stats={stats}/>
        </div>
        <div key="2">
          <div className="row">
            <ActionableChart 
                onChange={onChangeHandler} 
                dropdownItems={testDistricts} 
                loading={loading}
                title={R.labels.TR.dashboard.charts.chart1.header}
                size={8}
                data={data}>
                <KPIsChart loading={loading} data={data}/>
            </ActionableChart>
            <ActionableChart 
                onChange={onChangeHandler} 
                dropdownItems={testDistricts} 
                loading={loading}
                title={R.labels.TR.dashboard.charts.chart2.header}
                size={4}
                data={data}>
                <AQIRadarChart loading={loading} data={dataBJ}/>
            </ActionableChart>
          </div>
        </div>
        <div key="3"><Engagement /></div>
      </div>
    );
  }
}

function onChangeHandler(value){
  console.log(value);
}

let stats = [];
stats.push(new Stat('2317','',R.labels.TR.dashboard.stats.stat1.header,'dvr',CHARTCONFIG.color.info));
stats.push(new Stat(99.8,'%',R.labels.TR.dashboard.stats.stat2.header,"wifi_tethering",CHARTCONFIG.color.success));
stats.push(new Stat(187119,' HOURS',R.labels.TR.dashboard.stats.stat3.header,'assets/images/clock.svg',CHARTCONFIG.color.warning));
stats.push(new Stat(13056199,'',R.labels.TR.dashboard.stats.stat4.header,'assets/images/speedometer.svg',CHARTCONFIG.color.danger));

module.exports = Dashboard;
