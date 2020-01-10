import React, { Component } from 'react';
import ReactApexChart from "react-apexcharts";
import styles from './GroupedChart.module.css';
import DropdownUI from '../DropdownUI/DropdownUI';
import AutocompleteUI from '../AutocompleteUI/AutocompleteUI';

class GroupedChart extends Component {

state = {
    sheetsData: [],
    filteredData: [],
    allStudents: [],
    currentFilter: 'Cycles',
    avgFilter: 'avgC',
    minFilter: 'avgC',
    personFilter: '10574525',
    series: [{
        name: "Student's Solution",
        data: []
    }, {
        name: 'Best Solution',
        data: []
    }, {
        name: 'Average Solution',
        data: []
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
            categories: [],
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

// Fetch Google Sheets data 2 (restricted api key)
componentDidMount(){
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

                const students = sheetsData.map(function (d) { //create new array with students
                    return d.ID;
                })
                const allStudents = students.filter(function (item, pos) { //get unique values
                    return students.indexOf(item) == pos;
                });
                //get default person code
                const personFilter = this.state.personFilter;
                const filteredData = sheetsData.filter(word => word.ID == personFilter);
                console.log(filteredData);
                //new series by column
                const firstColumn = [];
                const secondColumn = [];
                const thirdColumn = [];
                filteredData.forEach(function (d) {
                    firstColumn.push(d.Cycles);
                    secondColumn.push(d.avgC);
                    thirdColumn.push(d.minC);
                });
                //get categories of filtered data
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
                //set new state
                this.setState({
                    sheetsData : sheetsData,
                    allStudents: allStudents,
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

    const firstColumn = [];
    const secondColumn = [];
    const thirdColumn = [];
    const filteredData = [...this.state.filteredData];

    filteredData.forEach(function (d) {
        firstColumn.push(d.Cycles);
        secondColumn.push(d.avgC);
        thirdColumn.push(d.minC);
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

    this.setState({
        options: { yaxis: { title: { text: 'Cycles' } } },
        series: newSeries,
        currentFilter: 'Cycles',
        avgFilter: 'avgC',
        minFilter: 'minC'
    });
}
instructionsDataHandler = ()=>{

    const firstColumn = [];
    const secondColumn = [];
    const thirdColumn = [];
    const filteredData = [...this.state.filteredData];

    filteredData.forEach(function (d) {
        firstColumn.push(d.Instructions);
        secondColumn.push(d.avgI);
        thirdColumn.push(d.minI);
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

    this.setState({
        options: { yaxis: { title: { text: 'Instructions' } } },
        series: newSeries,
        currentFilter: 'Instructions',
        avgFilter: 'avgI',
        minFilter: 'minI'
    });
}
functionsDataHandler = ()=>{

    const firstColumn = [];
    const secondColumn = [];
    const thirdColumn = [];
    const filteredData = [...this.state.filteredData];

    filteredData.forEach(function (d) {
        firstColumn.push(d.Functions);
        secondColumn.push(d.avgF);
        thirdColumn.push(d.minF);
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

    this.setState({
        options: { yaxis: { title: { text: 'Functions' } } },
        series: newSeries,
        currentFilter: 'Functions',
        avgFilter: 'avgF',
        minFilter: 'minF'
    });
}
loopsDataHandler = ()=>{

    const firstColumn = [];
    const secondColumn = [];
    const thirdColumn = [];
    const filteredData = [...this.state.filteredData];

    filteredData.forEach(function (d) {
        firstColumn.push(d.Loops);
        secondColumn.push(d.avgL);
        thirdColumn.push(d.minL);
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

    this.setState({
        options: { yaxis: { title: { text: 'Loops' } } },
        series: newSeries,
        currentFilter: 'Loops',
        avgFilter: 'avgL',
        minFilter: 'minL'
    });
}
pickdropDataHandler = ()=>{

    const firstColumn = [];
    const secondColumn = [];
    const thirdColumn = [];
    const filteredData = [...this.state.filteredData];

    filteredData.forEach(function (d) {
        firstColumn.push(d.PickDrop);
        secondColumn.push(d.avgP);
        thirdColumn.push(d.minP);
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

    this.setState({
        options: { yaxis: { title: { text: 'PickDrop' } } },
        series: newSeries,
        currentFilter: 'PickDrop',
        avgFilter: 'avgP',
        minFilter: 'minP'
    });
}
movementDataHandler = ()=>{

    const firstColumn = [];
    const secondColumn = [];
    const thirdColumn = [];
    const filteredData = [...this.state.filteredData];

    filteredData.forEach(function (d) {
        firstColumn.push(d.Movement);
        secondColumn.push(d.avgM);
        thirdColumn.push(d.minM);
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

    this.setState({
        options: { yaxis: { title: { text: 'Movement' } } },
        series: newSeries,
        currentFilter: 'Movement',
        avgFilter: 'avgM',
        minFilter: 'minM'
    });
}

filterByStudent = ()=>{
    const currentStudent = document.getElementById('student-autocomplete').value;
    const sheetsData = [...this.state.sheetsData];
    const selectedData = sheetsData.filter(word => word.ID == currentStudent);
    
    const firstColumn = [];
    const secondColumn = [];
    const thirdColumn = [];
    const currentFilter = this.state.currentFilter;
    const avgFilter = this.state.avgFilter;
    const minFilter = this.state.minFilter;

    selectedData.forEach(function (d) {
        firstColumn.push(d[currentFilter]);
        secondColumn.push(d[avgFilter]);
        thirdColumn.push(d[minFilter]);
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

    const newCategories = [];
    selectedData.forEach(function (d) {
        newCategories.push(d.level);
    });

    this.setState({
        filteredData: selectedData,
        series: newSeries,
        options: { xaxis: { categories: newCategories } },
        personFilter: currentStudent
    })
}

render() {
    return (
        <div className={styles.GroupedChart} id='GroupedChart'>
            <p>Solutions</p>
        <div className={styles.Container}>
        <AutocompleteUI
            students={this.state.allStudents}
            filterByStudent={this.filterByStudent}
            currentStudent={this.state.personFilter}
        />
        <DropdownUI
                cyclesDataHandler={this.cyclesDataHandler}
                instructionsDataHandler={this.instructionsDataHandler}
                functionsDataHandler={this.functionsDataHandler}
                loopsDataHandler={this.loopsDataHandler}
                pickdropDataHandler={this.pickdropDataHandler}
                movementDataHandler={this.movementDataHandler}
        />
        </div>
        <div>
            <ReactApexChart options={this.state.options} series={this.state.series} type="bar" height={350} />
        </div>
        </div>
    );
  }
}

export default GroupedChart;