import React, { Component } from 'react';
import ReactApexChart from "react-apexcharts";
import styles from './GroupedChart.module.css';

// data template


class GroupedChart extends React.Component {

state = {
    sheetsData: [],
    series: [{
        name: 'Net Profit',
        data: [44, 55, 57, 56, 61, 58, 63, 60, 66]
    }, {
        name: 'Revenue',
        data: [76, 85, 101, 98, 87, 105, 91, 114, 94]
    }, {
        name: 'Free Cash Flow',
        data: [35, 41, 36, 26, 45, 48, 52, 53, 41]
    }],
    options: {
        chart: {
            type: 'bar',
            height: 350
        },
        plotOptions: {
            bar: {
                horizontal: false,
                columnWidth: '55%',
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
            categories: ['Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
        },
        yaxis: {
            title: {
                text: '$ (thousands)'
            }
        },
        fill: {
            opacity: 1
        },
        tooltip: {
            y: {
                formatter: function (val) {
                    return "$ " + val + " thousands"
                }
            }
        }
    },


};

// Fetch Google Sheets data (restricted api key)
componentWillMount(){
    fetch("https://sheets.googleapis.com/v4/spreadsheets/1evjoQPchLR8iUhjQQ8i56hy6Df5z7K_eVSWs8yVugC4/values/Sheet1?key=AIzaSyArugq6TlxJTJHM-qWEe420k2xH3U0obxg")
        .then(res => res.json())
        .then(
            (result) => {
                const rawData = result.values;
                const formattedData = [];
                let prop, value;
                //nested loops-> convert array of arrays to array of objects
                for(let i = 1; i < rawData.length; i++) { //first row (0) contains each column key(prop)
                    let obj = {};
                    for (let j = 0; j < rawData[i].length; j++) {
                        prop = rawData[0][j];
                        value = rawData[i][j];
                        obj[prop] = value;
                    }
                    formattedData.push(obj);
                }

                const sheetsData = [...formattedData] 
                //format data
                sheetsData.forEach(function (d) {
                    d.ID = +d.ID;
                    d.Functions = +d.Functions;
                    d.Loops = +d.Loops;
                    d.Movement = +d.Movement;
                    d.PickDrop = +d.PickDrop;
                    d.Cycles = +d.Cycles;
                    d.Instructions = +d.Instructions;
                    d.minL = +d.minL;
                    d.avgL = +d.avgL;
                    d.minF = +d.minF;
                    d.avgF = +d.avgF;
                    d.minC = +d.minC;
                    d.avgC = +d.avgC;
                    d.minP = +d.minP;
                    d.avgP = +d.avgP;
                    d.minM = +d.minM;
                    d.avgM = +d.avgM;
                    d.minI = +d.minI;
                    d.avgI = +d.avgI;

                });

                console.log(sheetsData);
                this.setState({
                    sheetsData: sheetsData
                })
            },

            (error) => {
                this.setState({
                    isLoaded: true,
                    error
                });
            }
        )
        
}

render() {
    return (

        <div id="chart" className={styles.GroupedChart}>
            <ReactApexChart options={this.state.options} series={this.state.series} type="bar" height={350} />
        </div>
    );
  }
}

export default GroupedChart;