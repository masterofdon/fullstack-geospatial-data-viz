import React ,{Component} from 'react';
import SystemMetricsContainer from './SystemMetricsContainer';
import EngagementStats from './EngagementStats';
import BoxContainer from './BoxContainer';
import BenchmarkChart from './BenchmarkChart';
import SystemMetric from '../data/SystemMetric';
import R from 'constants/R';

let metrics = [];
metrics.push(new SystemMetric('3.2 K',R.labels.TR.dashboard.metrics.metric1.header));
metrics.push(new SystemMetric('13',R.labels.TR.dashboard.metrics.metric2.header));
metrics.push(new SystemMetric('18',R.labels.TR.dashboard.metrics.metric3.header));
metrics.push(new SystemMetric('218.091 $',R.labels.TR.dashboard.metrics.metric4.header));

class Engagement extends Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <div className="box box-default">
                <div className="box-body">
                    <div className="row">
                        <BoxContainer size={8} title={R.labels.TR.dashboard.metrics.header}>
                            <SystemMetricsContainer metrics={metrics} />
                            <EngagementStats />
                        </BoxContainer>
                        <BoxContainer size={4} title={'Benchmark'}>
                            <BenchmarkChart />
                        </BoxContainer>
                    </div>
                </div>
            </div>
        );
    }
}

module.exports = Engagement;