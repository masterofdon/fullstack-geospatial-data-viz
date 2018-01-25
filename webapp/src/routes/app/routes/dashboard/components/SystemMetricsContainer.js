import React from 'react';
import SystemMetricView from './SystemMetricView';

class SystemMetricsContainer extends React.Component {

    constructor(props){
        super(props);
    }

    render(){
        var {metrics} = this.props || [];
        const metricMap = metrics.map((e) => {
            return <SystemMetricView key={e.id} value={e.value} info={e.info} />
        }); 
        
        return(
            <div className="row text-center metrics">
                {metricMap}
            </div>
        );
    }
}

module.exports = SystemMetricsContainer;