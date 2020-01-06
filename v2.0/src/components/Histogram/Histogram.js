import React, { Component } from 'react';
import ReactApexChart from "react-apexcharts";
import styles from './Histogram.module.css';

class Histogram extends React.Component {

state = {
    sheetsData: [],
    filteredData: [],
    series: [{
        name: "asd",
        data: [4, 5, 6, 4, 5, 1, 7, 14, 15, 17, 17, 17, 25, 25, 30, 10, 11, 11, 11]
    }],
    options: {
        chart: {
            type: 'histogram',
            height: 350
        },
        plotOptions: {
            bar: {
                horizontal: false,
                columnWidth: '95%',
                endingShape: 'rounded'
            },
        },
        dataLabels: {
            enabled: false
        },
        stroke: {
            show: true,
            width: 2,
            colors: ['transparent']
        },
        xaxis: {
            categories: [5, 10, 15, 20, 25, 30, 35],
        },
        yaxis: {
            title: {
                text: 'Abosulute Frequency'
            }
        },
        fill: {
            opacity: 1,
            colors: ['#00e68a']

        },
        tooltip: {
            y: {
                formatter: function (y) {
                    return y
                }
            }
        }
    },


};

render() {
    return (
        <div className={styles.Histogram}>
            <ReactApexChart 
            options={this.state.options} 
            series={this.state.series} 
            type="histogram" height={350} />
        </div>
    );
  }
}

export default Histogram;