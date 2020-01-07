import React, { Component } from 'react';
import ReactApexChart from "react-apexcharts";
import styles from './Histogram.module.css';
import DropdownUI from '../DropdownUI/DropdownUI';

const sheetsData1 = JSON.parse(localStorage.getItem('sheetsData1'));
class Histogram extends React.Component {

state = {
    sheetsData: [],
    filteredData: [],
    series: [{
        name: 'Frequency',
        data: [4, 3, 10, 9, 29, 19, 22]
    }],
    options : {
        chart: {
            type: "histogram",
            height: 350,
            foreColor: "#999",
        },
        plotOptions: {
            bar: {
                dataLabels: {
                    enabled: false
                }
            }
        },
        states: {
            active: {
                allowMultipleDataPointsSelection: true
            }
        },
        xaxis: {
            categories: [10, 20, 30, 40, 50, 60, 70],
            axisBorder: {
                show: false
            },
            axisTicks: {
                show: false
            }, 
            labels: {
                offsetX: 16,
                offsetY: -5
            }
        },
        yaxis: {
            tickAmount: 4,
            labels: {
                offsetX: 0,
                offsetY: -5
            },
            title: {
                text: 'Abosulute Frequency'
            },
        },
        tooltip: {
            y: {
                formatter: function (y) {
                    return y
                }
                },
        },
    }
};

componentWillMount(){
    console.log(sheetsData1);
    const cyclesArray = [];
    sheetsData1.forEach( function(d){
        cyclesArray.push(d.Cycles)
    })
    
    const newSeries = [{
        name: "Cycles Frequency",
        data: cyclesArray
    }];

    console.log(cyclesArray);
    /*this.setState({
        sheetsData: sheetsData1,
        series: newSeries
})*/
}

cyclesDataHandler = ()=>{
    console.log('cyc')
}
instructionsDataHandler = ()=>{
    console.log('inst')
}
functionsDataHandler = ()=>{
    console.log('func')
}
loopsDataHandler = ()=>{
    console.log('loops')
}
pickdropDataHandler = ()=>{
    console.log('pick')
}
movementDataHandler = ()=>{
    console.log('mov')
}

render() {
    return (
        <div className={styles.Histogram}>
            <DropdownUI
                cyclesDataHandler={this.cyclesDataHandler}
                instructionsDataHandler={this.instructionsDataHandler}
                functionsDataHandler={this.functionsDataHandler}
                loopsDataHandler={this.loopsDataHandler}
                pickdropDataHandler={this.pickdropDataHandler}
                movementDataHandler={this.movementDataHandler}
            />
            <ReactApexChart 
            options={this.state.options} 
            series={this.state.series} 
            type="histogram" height={350} />
        </div>
    );
  }
}

export default Histogram;