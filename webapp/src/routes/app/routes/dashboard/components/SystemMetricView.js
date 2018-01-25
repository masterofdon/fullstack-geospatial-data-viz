import React from 'react';

class SystemMetricView extends React.Component{

    render(){
        const {value,info} = this.props;

        return(
        <div className="col-xs-6 col-md-3 metric-box">
            <span className="metric">{value}</span>
            <span className="metric-info">{info}</span>
        </div>
        );
    }
}

module.exports = SystemMetricView;