import React, { Component } from 'react';
import ReactApexChart from "react-apexcharts";
import styles from './GroupedChart.module.css';
import DropdownUI from '../DropdownUI/DropdownUI';
import Auxiliar from '../../hoc/Auxiliar';

// data template


class GroupedChart extends React.Component {

state = {
    sheetsData: [],
    filteredData: [],
    series: [{
        name: "Student's Solution",
        data: [44, 55, 57, 56, 61, 58, 63, 60, 66]
    }, {
        name: 'Best Solution',
        data: [76, 85, 101, 98, 87, 105, 91, 114, 94]
    }, {
        name: 'Average Solution',
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
                text: 'Cycles'
            }
        },
        fill: {
            opacity: 1
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

                
                const filteredData = sheetsData.filter(word => word.ID == 10574525);
                console.log(filteredData);
    
                const firstColumn = [];
                const secondColumn = [];
                const thirdColumn = [];
                filteredData.forEach(function (d) {
                    firstColumn.push(d.Cycles);
                });
                filteredData.forEach(function (d) {
                    secondColumn.push(d.avgC);
                });
                filteredData.forEach(function (d) {
                    thirdColumn.push(d.minC);
                });

                const newCategories = [];
                filteredData.forEach(function(d){
                    newCategories.push(d.level);
                });

                const newSeries = [{
                    name: "Student's Solution",
                    data: firstColumn
                }, {
                    name: 'Best Solution',
                    data: secondColumn
                }, {
                    name: 'Average Solution',
                    data: thirdColumn
                }]
                console.log(firstColumn);

                this.setState({
                    sheetsData : sheetsData,
                    filteredData: filteredData,
                    series: newSeries,
                    options: {xaxis:{ categories: newCategories}}
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

cyclesDataHandler = ()=>{

    this.setState({
        options: { yaxis: { title: { text: 'Cycles' } } }
    });
}
instructionsDataHandler = ()=>{

    this.setState({
        options: { yaxis: { title: { text: 'Instructions' } } }
    });
}
functionsDataHandler = ()=>{

    this.setState({
        options: { yaxis: { title: { text: 'Functions' } } }
    });
}
loopsDataHandler = ()=>{

    this.setState({
        options: { yaxis: { title: { text: 'Loops' } } }
    });
}
pickdropDataHandler = ()=>{

    this.setState({
        options: { yaxis: { title: { text: 'PickDrop' } } }
    });
}
movementDataHandler = ()=>{

    this.setState({
        options: { yaxis: { title: { text: 'Movement' } } }
    });
}

render() {
    return (
        <Auxiliar>
        <DropdownUI
                cyclesDataHandler={this.cyclesDataHandler}
                instructionsDataHandler={this.instructionsDataHandler}
                functionsDataHandler={this.functionsDataHandler}
                loopsDataHandler={this.loopsDataHandler}
                pickdropDataHandler={this.pickdropDataHandler}
                movementDataHandler={this.movementDataHandler}
        />
        <div id="chart" className={styles.GroupedChart}>
            <ReactApexChart options={this.state.options} series={this.state.series} type="bar" height={350} />
        </div>
        </Auxiliar>
    );
  }
}

export default GroupedChart;