import React, { Component } from 'react';
import ReactApexChart from "react-apexcharts";
import styles from './PieChart.module.css';

class PieChart extends Component {

state = {

    series: [44, 55, 13, 43],
    options: {
        chart: {
            width: 380,
            type: 'pie',
        },
        labels: ['Functions', 'Loops', 'PickDrop', 'Movement'],
        responsive: [{
            breakpoint: 480,
            options: {
                chart: {
                    width: 200
                },
                legend: {
                    position: 'bottom'
                }
            }
        }]
    },


};

render() {
    return (

    <div id="chart">
        <ReactApexChart options={this.state.options} series={this.props.series} type="pie" width={380} />
    </div>

    );
}
}

export default PieChart;