import CHARTCONFIG from 'constants/CHARTCONFIG';

class StackedAreaChartDataBuilder{

    static buildData(param){
        var x = {
            name: param.name || 'NO2',
            type:'line',
            stack: param.stack || 'stacka',
            areaStyle: {normal: {}},
            smooth: true,
            symbol: 'none',
            sampling: param.sampling || 'average',
            itemStyle: {
              normal: {
                color: param.itemStyle.color || CHARTCONFIG.color.success
              }
            },
            data: param.data || []
        };

    }
}