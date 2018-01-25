import React, { Component } from 'react';
import Chart from 'chart.js';
import moment from 'moment';

import Plugin from 'chartjs-plugin-streaming';

export default class InfoBoxChart extends Component {

    constructor(props) {
        super(props);
        setTimeout(createChart.bind(this), 1000);
    }

    render() {
        return (
            <canvas id="chart4"></canvas>
        );
    }

}

function onRefresh(chart) {
    chart.data.datasets.forEach(function (dataset) {
        dataset.data.push({
            x: Date.now(),
            y: Math.random()
        });
    });
}

function createChart(){
    var ctx4 = document.getElementById('chart4').getContext('2d');
    Chart.defaults.global.defaultFontColor = '#41C4C4';
    var chart4 = new Chart(ctx4, {
        type: 'line',
        data: {
            datasets: [{
                data: [],
                label: 'Tum Olcumler',
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
                lineTension: 0,
                borderDash: [8, 4]
            }, {
                data: [],
                label: 'Kritik Olcumler',
                borderColor: 'rgb(54, 162, 235)',
                backgroundColor: 'rgba(54, 162, 235, 0.5)'
            }]
        },
        options: {
            scales: { xAxes: [{ type: 'realtime' , display: true}] },
            plugins: { streaming: { onRefresh: onRefresh, delay: 2000 } },
            legend: {
                labels: {
                    // This more specific font property overrides the global property
                    fontColor: '#41C4C4'
                }
            }
        }
    });
}
