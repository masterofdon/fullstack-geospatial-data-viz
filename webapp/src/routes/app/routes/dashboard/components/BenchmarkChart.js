import React from 'react';
import ReactEcharts from 'components/ReactECharts';
import CHARTCONFIG from 'constants/ChartConfig';

const radar = {};
radar.options = {
  legend: {
    orient: 'vertical',
    x: 'right',
    y: 'bottom',
    data: ['Industry Average', 'Our Company'],
    textStyle: {
      color: CHARTCONFIG.color.text
    }
  },
  toolbox: {
    show: false,
  },
  radar: [
    {
      axisLine: {
        show: true,
        lineStyle: {
                    // for both indicator and axisLine, bad, better seperate them
          color: '#b1b1b1'
        }
      },
      splitLine: {
        lineStyle: {
          color: 'rgba(0,0,0,.1)'
        }
      },
      splitArea: {
        show: true,
        areaStyle: {
          color: CHARTCONFIG.color.splitArea
        }
      },
      indicator: [
        { name: 'Hava Kalitesi', max: 6000},
        { name: 'Olcum Sayisi', max: 16000},
        { name: 'Olcum Suresi', max: 30000},
        { name: 'Gurultu', max: 38000},
        { name: 'Sicaklik', max: 52000},
        { name: 'Nem', max: 25000}
      ]
    }
  ],
  calculable: true,
  series: [
    {
      name: 'Hava Kalitesi Olcumleri',
      type: 'radar',
      data: [
        {
          value: [5000, 14000, 28000, 31000, 42000, 21000],
          name: 'Sabit',
          itemStyle: {
            normal: {
              color: CHARTCONFIG.color.success
            }
          }
        },
        {
          value: [4300, 10000, 28000, 35000, 50000, 19000],
          name: 'Hareketli',
          itemStyle: {
            normal: {
              color: CHARTCONFIG.color.info
            }
          }
        }
      ]
    }
  ]
};


const Chart = () => (
  <ReactEcharts option={radar.options} showLoading={false} />
);

module.exports = Chart;
