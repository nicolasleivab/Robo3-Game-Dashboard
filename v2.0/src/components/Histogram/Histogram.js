import React, { Component } from 'react';
import ReactApexChart from "react-apexcharts";
import styles from './Histogram.module.css';
import DropdownUI from '../DropdownUI/DropdownUI';

class Histogram extends Component {

state = {
    sheetsData: [],
    filteredData: [],
    series: [{
        name: 'Frequency',
        data: [0, 0, 0, 0, 0, 0, 0]
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
            categories: [0, 10, 20, 30, 40, 50, 60],
            axisBorder: {
                show: false
            },
            axisTicks: {
                show: false
            }, 
            labels: {
                offsetX: 15,
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

// Fetch Google Sheets data 2 (restricted api key)
componentDidMount() {
    fetch("https://sheets.googleapis.com/v4/spreadsheets/10g_TGtruCriERlXJurPZQk76pvk30U0pkWgbbfzPrjA/values/Sheet1?key=AIzaSyArugq6TlxJTJHM-qWEe420k2xH3U0obxg")
        .then(res => res.json())
        .then(
            (result) => {
                const rawData = result.values;
                const formattedData = [];
                let prop, value;
                //nested loops-> convert array of arrays to array of objects
                for (let i = 1; i < rawData.length; i++) { //first row (0) contains each column key(prop)
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
                    d.Rounds = +d.Rounds;
                    d["Playtime (min)"] = +d["Playtime (min)"];
                    d.Instructions = +d.Instructions;
                    d.Functions = +d.Functions;
                    d.Loops = +d.Loops;
                    d.Movement = +d.Movement;
                    d.PickDrop = +d.PickDrop;
                    d["Success Probability"] = +d["Success Probability"];
                    d.Cycles = +d.Cycles;
                    d.ID = +d.ID;
                    d.date = new Date(d.date);
                });

                const cyclesArray = [];
                sheetsData.forEach(function (d) {
                    cyclesArray.push(d.Cycles)
                })
                //calculate the range of each bin
                const minR = Math.min(...cyclesArray);
                const maxR = Math.max(...cyclesArray);
                const rangeSize = Math.ceil((maxR - minR) / 7);
                console.log(rangeSize);
                const groupedCycles = [];
                const newCategories = [];
                //first loop for ranges
                for (let i = minR; i <= maxR; i = i + rangeSize) {
                    let limit = i + rangeSize;
                    let n = 0;
                    //get each new category
                    newCategories.push(limit);
                    //nested loop for pushing the counter for each range
                    for (let j = 0; j < cyclesArray.length; j++) {
                        if (cyclesArray[j] >= i && cyclesArray[j] < limit) {
                            n = n + 1;
                        }
                    }
                    groupedCycles.push(n);
                }
                console.log(newCategories)
                const newSeries = [{
                    name: "Cycles Frequency",
                    data: groupedCycles
                }];
                //copy options object to change state in an immutable fashion
                const newOptions = { ...this.state.options };
                newOptions.xaxis.categories = newCategories;
                console.log(newCategories);

                console.log(groupedCycles);
                this.setState({
                    sheetsData: sheetsData,
                    series: newSeries,
                    options: newOptions

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