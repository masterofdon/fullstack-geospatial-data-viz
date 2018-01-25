import React , {Component} from 'react';
import TableRow from './TableRow';
import TableHead from './TableHead';
import moment from 'moment';
import R from 'constants/R';

const INDICATOR_LIST = [
    ['vehiclestatus' , 'Vehicle Status'],
    ['distance' , 'Distance'],
    ['device_id' , 'Device ID'],
    ['latitude' , 'Latitude'],
    ['longitude' , 'Longitude'],
    ['speed' , 'Speed'],
    ['temperature' , 'Temperature'],
    ['aqi' , 'AQI'],
    ['vehiclemodel' , 'Vehicle Model'],
    ['id' , 'ID'],
    ['ignition' , 'Ignition'],
    ['direction' , 'Direciton'],
    ['timestamp' , 'Time']
]

export default class InfoBoxWidget extends Component{
    constructor(props){
        super(props);
        console.log(R.labels.TR.mapview.infoboxes.icon);
    }

    indexOfIndicator(item){
        var i;
        var len = INDICATOR_LIST.length;
        for(i = 0;i < len;i++){
            if(INDICATOR_LIST[i][0] === item){
                return i;
            }
        }
        return -1;
    }

    render(){
        const {deviceprops} = this.props;
        const rows = [];
        for(var key in deviceprops){
            rows.push(key);
        }
        const items = rows.map((item) => {
            var index = this.indexOfIndicator(item);
            var newItem = '';
            if(index != -1){
                newItem = R.labels.TR.mapview.infoboxes.icon[item]
            }else {
                newItem = item;
            }
            var value = deviceprops[item];
            if(item == 'timestamp'){
                var x  = parseFloat(deviceprops[item]);
                value = moment(x * 1000).format('D/M/YYYY H:mm:ss');
            }
            return <TableRow key={item} indicator={newItem} value={value.toString()} />
        });
        const style = {
            backgroundColor : 'white',
            margin : '15px'
        }
        return(
            <div className="infobox-widget" style={style}>
                <table className="table">
                    <thead>
                        <TableHead indicator={'Gosterge'} value={'Deger'}/>
                    </thead>
                    <tbody>
                        {items}
                    </tbody>
                </table>
            </div>
        );
    }
}