import React ,{Component} from 'react';
import KPIsChart from './KPIsChart';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import CHARTCONFIG from 'constants/ChartConfig';
import { setTimeout } from 'timers';

const isNull = ((r) => (r == null || r === 'undefined'));
const testDistricts = [
    'ISBAK',
    'Atasehir',
    'Kadikoy'
];

class ActionableChart extends Component{
    
    constructor(props){
        super(props);
        this.state = {
            value : 1
        }
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event, index, value) {
        var {dropdownItems} = this.props;
        this.props.onChange(dropdownItems[index]);
        this.setState({value});
    }

    render(){
        const styles = {
          customWidth: {
            width: 200,
          },
          titleStyle :{
            paddingLeft : '24px',
            paddingTop: '10px',
            paddingBottom: '10px',
            color : '#000',
            fontSize: '24px',
            fontWeight: '400'
          },
          headerStyle : {
              margin  : '5px 0px'
          }
        };
        var {children, dropdownItems ,data, loading , title, size} = this.props;
        var itemsMap;
        if(!isNull(dropdownItems)){
            itemsMap = dropdownItems.map((e,index) => {
                return <MenuItem key={index} value={index + 1} primaryText={e} />
            });
        } else {
            itemsMap = dropdownItems.map((e,index) =>{
                return <MenuItem key={index} value={index + 1} primaryText={e} />
            });
        }
        return(            
            <div className={"col-xl-" + size}>
                <div className="box box-default">
                <div className="box-body">
                    <div style={styles.headerStyle}>
                        <div style={styles.titleStyle}>{title}</div>
                        <div>
                            <DropDownMenu className={'dropdown-place-selection'} style={styles.customWidth} value={this.state.value} onChange={this.handleChange}>
                                {itemsMap}
                            </DropDownMenu>
                        </div>
                    </div>
                    {children}
                </div>
                </div>
            </div>
        );
    }
}

module.exports = ActionableChart;