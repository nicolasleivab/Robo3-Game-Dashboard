import React, { Component } from 'react';
import ReactApexChart from "react-apexcharts";
import styles from './Histogram.module.css';
import DropdownUI from '../DropdownUI/DropdownUI';
import DropdownLevel from '../DropdownLevel/DropdownLevel';
import PieChart from '../PieChart/PieChart';

//let sheetsData = JSON.parse(localStorage.getItem('sheetsData1'));

class Histogram extends Component {

state = {
    sheetsData: [],
    filteredData: [],
    pieSeries: [],
    lastFilter: 'Cycles',
    series: [{
        name: 'Frequency',
        data: [0, 0, 0, 0, 0, 0]
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
            categories: [0, 10, 20, 30, 40, 50],
            axisBorder: {
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
                const rangeSize = Math.ceil((maxR - minR) / 6);
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
                    name: "Frequency",
                    data: groupedCycles
                }];
                //copy options object to change state in an immutable fashion
                const newOptions = { ...this.state.options };
                newOptions.xaxis.categories = newCategories;
                console.log(sheetsData);
                //Pie data series
                const pieData = [];
                let sumFunc = 0, sumLoops = 0, sumPD = 0, sumMov = 0;
                for(let i=0; i<sheetsData.length; i++){
                    sumFunc = sumFunc + sheetsData[i]['Functions'];
                    sumLoops = sumLoops + sheetsData[i]['Loops'];
                    sumPD = sumPD + sheetsData[i]['PickDrop'];
                    sumMov = sumMov + sheetsData[i]['Movement'];
                }
                pieData.push(sumFunc, sumLoops, sumPD, sumMov);
                console.log(pieData);
                this.setState({
                    sheetsData: sheetsData,
                    filteredData: sheetsData,
                    lastFilter: 'Cycles',
                    series: newSeries,
                    options: newOptions,
                    pieSeries: pieData

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
/* Instruction Data Filter Handlers */
cyclesDataHandler = ()=>{
    const cyclesArray = [];
    const sheetsData = [...this.state.filteredData];
    sheetsData.forEach(function (d) {
        cyclesArray.push(d.Cycles)
    })
    //calculate the range of each bin
    const minR = Math.min(...cyclesArray);
    const maxR = Math.max(...cyclesArray);
    const rangeSize = Math.ceil((maxR - minR) / 6);
   
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
        name: "Frequency",
        data: groupedCycles
    }];
    //copy options object to change state in an immutable fashion
    const newOptions = { ...this.state.options };
    newOptions.xaxis.categories = newCategories;

    this.setState({
        series: newSeries,
        options: newOptions,
        lastFilter: 'Cycles'

    })
}
instructionsDataHandler = ()=>{
    const instructionsArray = [];
    const sheetsData = [...this.state.filteredData];
    sheetsData.forEach(function (d) {
        instructionsArray.push(d.Instructions)
    })
    //calculate the range of each bin
    const minR = Math.min(...instructionsArray);
    const maxR = Math.max(...instructionsArray);
    const rangeSize = Math.ceil((maxR - minR) / 6);

    const groupedInstructions = [];
    const newCategories = [];
    //first loop for ranges
    for (let i = minR; i <= maxR; i = i + rangeSize) {
        let limit = i + rangeSize;
        let n = 0;
        //get each new category
        newCategories.push(limit);
        //nested loop for pushing the counter for each range
        for (let j = 0; j < instructionsArray.length; j++) {
            if (instructionsArray[j] >= i && instructionsArray[j] < limit) {
                n = n + 1;
            }
        }
        groupedInstructions.push(n);
    }
    console.log(newCategories)
    const newSeries = [{
        name: "Frequency",
        data: groupedInstructions
    }];
    //copy options object to change state in an immutable fashion
    const newOptions = { ...this.state.options };
    newOptions.xaxis.categories = newCategories;

    this.setState({
        series: newSeries,
        options: newOptions,
        lastFilter: 'Instructions'

    })
}
functionsDataHandler = ()=>{
    const functiosnArray = [];
    const sheetsData = [...this.state.filteredData];
    if (sheetsData.some(e => e.Functions > 0)) {
    sheetsData.forEach(function (d) {
        functiosnArray.push(d.Functions)
    })

    //calculate the range of each bin
    const minR = Math.min(...functiosnArray);
    const maxR = Math.max(...functiosnArray);
    const rangeSize = Math.ceil((maxR - minR) / 6);

    const groupedFunctions = [];
    const newCategories = [];
    //first loop for ranges
    for (let i = minR; i <= maxR; i = i + rangeSize) {
        let limit = i + rangeSize;
        let n = 0;
        //get each new category
        newCategories.push(limit);
        //nested loop for pushing the counter for each range
        for (let j = 0; j < functiosnArray.length; j++) {
            if (functiosnArray[j] >= i && functiosnArray[j] < limit) {
                n = n + 1;
            }
        }
        groupedFunctions.push(n);
    }
    console.log(newCategories)
    const newSeries = [{
        name: "Frequency",
        data: groupedFunctions
    }];
    //copy options object to change state in an immutable fashion
    const newOptions = { ...this.state.options };
    newOptions.xaxis.categories = newCategories;
    
    this.setState({
        series: newSeries,
        options: newOptions,
        lastFilter: 'Functions'

    })
    }else{
        const newSeries = [{
            name: "Frequency",
            data: [0]
        }];
        this.setState({
            series: newSeries,
            lastFilter: 'Functions'

        }) 
    }
}
loopsDataHandler = ()=>{
    const loopsArray = [];
    const sheetsData = [...this.state.filteredData];

    if (sheetsData.some(e => e.Loops > 0)) {
    sheetsData.forEach(function (d) {
        loopsArray.push(d.Loops)
    })
    //calculate the range of each bin
    const minR = Math.min(...loopsArray);
    const maxR = Math.max(...loopsArray);
    const rangeSize = Math.ceil((maxR - minR) / 6);

    const groupedLoops = [];
    const newCategories = [];
    //first loop for ranges
    for (let i = minR; i <= maxR; i = i + rangeSize) {
        let limit = i + rangeSize;
        let n = 0;
        //get each new category
        newCategories.push(limit);
        //nested loop for pushing the counter for each range
        for (let j = 0; j < loopsArray.length; j++) {
            if (loopsArray[j] >= i && loopsArray[j] < limit) {
                n = n + 1;
            }
        }
        groupedLoops.push(n);
    }
    console.log(newCategories)
    const newSeries = [{
        name: "Frequency",
        data: groupedLoops
    }];
    //copy options object to change state in an immutable fashion
    const newOptions = { ...this.state.options };
    newOptions.xaxis.categories = newCategories;

    this.setState({
        series: newSeries,
        options: newOptions,
        lastFilter: 'Loops'

    })
    }else{
        const newSeries = [{
            name: "Frequency",
            data: [0]
        }];
        this.setState({
            series: newSeries,
            lastFilter: 'Functions'

        }) 
    }
}
pickdropDataHandler = ()=>{
    const pdArray = [];
    const sheetsData = [...this.state.filteredData];
    sheetsData.forEach(function (d) {
        pdArray.push(d.PickDrop)
    })
    //calculate the range of each bin
    const minR = Math.min(...pdArray);
    const maxR = Math.max(...pdArray);
    const rangeSize = Math.ceil((maxR - minR) / 6);

    const groupedPD = [];
    const newCategories = [];
    //first loop for ranges
    for (let i = minR; i <= maxR; i = i + rangeSize) {
        let limit = i + rangeSize;
        let n = 0;
        //get each new category
        newCategories.push(limit);
        //nested loop for pushing the counter for each range
        for (let j = 0; j < pdArray.length; j++) {
            if (pdArray[j] >= i && pdArray[j] < limit) {
                n = n + 1;
            }
        }
        groupedPD.push(n);
    }
    console.log(newCategories)
    const newSeries = [{
        name: "Frequency",
        data: groupedPD
    }];
    //copy options object to change state in an immutable fashion
    const newOptions = { ...this.state.options };
    newOptions.xaxis.categories = newCategories;

    this.setState({
        series: newSeries,
        options: newOptions,
        lastFilter: 'PickDrop'

    })
}
movementDataHandler = ()=>{
    const movArray = [];
    const sheetsData = [...this.state.filteredData];
    sheetsData.forEach(function (d) {
        movArray.push(d.Movement)
    })
    //calculate the range of each bin
    const minR = Math.min(...movArray);
    const maxR = Math.max(...movArray);
    const rangeSize = Math.ceil((maxR - minR) / 6);

    const groupedMov = [];
    const newCategories = [];
    //first loop for ranges
    for (let i = minR; i <= maxR; i = i + rangeSize) {
        let limit = i + rangeSize;
        let n = 0;
        //get each new category
        newCategories.push(limit);
        //nested loop for pushing the counter for each range
        for (let j = 0; j < movArray.length; j++) {
            if (movArray[j] >= i && movArray[j] < limit) {
                n = n + 1;
            }
        }
        groupedMov.push(n);
    }
    console.log(newCategories)
    const newSeries = [{
        name: "Frequency",
        data: groupedMov
    }];
    //copy options object to change state in an immutable fashion
    const newOptions = { ...this.state.options };
    newOptions.xaxis.categories = newCategories;

    this.setState({
        series: newSeries,
        options: newOptions,
        lastFilter: 'Movement'

    })
}

//calculate pie series func
sumPieData = (filteredData)=>{
const pieData = [];
let sumFunc = 0, sumLoops = 0, sumPD = 0, sumMov = 0;
for (let i = 0; i < filteredData.length; i++) {
    sumFunc = sumFunc + filteredData[i]['Functions'];
    sumLoops = sumLoops + filteredData[i]['Loops'];
    sumPD = sumPD + filteredData[i]['PickDrop'];
    sumMov = sumMov + filteredData[i]['Movement'];
}
pieData.push(sumFunc, sumLoops, sumPD, sumMov);
return pieData;
}

/* Level Data Filter Handlers */
allLevelsHandler= ()=>{
    const filteredData = [...this.state.sheetsData];
    //Pie data series
    const pieData = this.sumPieData(filteredData);
   
    this.setState({
        filteredData: filteredData,
        pieSeries: pieData
    }, function () {
        if (this.state.lastFilter === 'Cycles') {
            this.cyclesDataHandler()
        } else if (this.state.lastFilter === 'Instructions') {
            this.instructionsDataHandler()
        } else if (this.state.lastFilter === 'Functions') {
            this.functionsDataHandler()
        } else if (this.state.lastFilter === 'Loops') {
            this.loopsDataHandler()
        } else if (this.state.lastFilter === 'PickDrop') {
            this.pickdropDataHandler()
        } else if (this.state.lastFilter === 'Movement') {
            this.movementDataHandler()
        }
    }.bind(this)
    )   
}
level1Handler= ()=>{
    const sheetsData = [...this.state.sheetsData];
    const filteredData = sheetsData.filter( function(obj){
        return obj.level == 'Hello, world!!!'
    })
    //Pie data series
    const pieData = this.sumPieData(filteredData);
    
    this.setState({
        filteredData: filteredData,
        pieSeries: pieData
    }, function () { 
        if(this.state.lastFilter === 'Cycles'){
            this.cyclesDataHandler()
        }else if(this.state.lastFilter === 'Instructions'){
            this.instructionsDataHandler()
        }else if (this.state.lastFilter === 'Functions') {
            this.functionsDataHandler()
        }else if (this.state.lastFilter === 'Loops') {
            this.loopsDataHandler()
        }else if (this.state.lastFilter === 'PickDrop') {
            this.pickdropDataHandler()
        }else if (this.state.lastFilter === 'Movement') {
            this.movementDataHandler()
        }}.bind(this)
        ) 
}
level2Handler= ()=>{
    const sheetsData = [...this.state.sheetsData];
    const filteredData = sheetsData.filter(function (obj) {
        return obj.level == 'Inverti'
    })
    //Pie data series
    const pieData = this.sumPieData(filteredData);

    this.setState({
        filteredData: filteredData,
        pieSeries: pieData
    }, function () {
        if (this.state.lastFilter === 'Cycles') {
            this.cyclesDataHandler()
        } else if (this.state.lastFilter === 'Instructions') {
            this.instructionsDataHandler()
        } else if (this.state.lastFilter === 'Functions') {
            this.functionsDataHandler()
        } else if (this.state.lastFilter === 'Loops') {
            this.loopsDataHandler()
        } else if (this.state.lastFilter === 'PickDrop') {
            this.pickdropDataHandler()
        } else if (this.state.lastFilter === 'Movement') {
            this.movementDataHandler()
        }
    }.bind(this)
    )
}
level3Handler= ()=>{
    const sheetsData = [...this.state.sheetsData];
    const filteredData = sheetsData.filter(function (obj) {
        return obj.level == 'Inverti i Pari'
    })
    //Pie data series
    const pieData = this.sumPieData(filteredData);

    this.setState({
        filteredData: filteredData,
        pieSeries: pieData
    }, function () {
        if (this.state.lastFilter === 'Cycles') {
            this.cyclesDataHandler()
        } else if (this.state.lastFilter === 'Instructions') {
            this.instructionsDataHandler()
        } else if (this.state.lastFilter === 'Functions') {
            this.functionsDataHandler()
        } else if (this.state.lastFilter === 'Loops') {
            this.loopsDataHandler()
        } else if (this.state.lastFilter === 'PickDrop') {
            this.pickdropDataHandler()
        } else if (this.state.lastFilter === 'Movement') {
            this.movementDataHandler()
        }
    }.bind(this)
    )
}
level4Handler= ()=>{
    const sheetsData = [...this.state.sheetsData];
    const filteredData = sheetsData.filter(function (obj) {
        return obj.level == 'Concatena'
    })
    //Pie data series
    const pieData = this.sumPieData(filteredData);

    this.setState({
        filteredData: filteredData,
        pieSeries: pieData
    }, function () {
        if (this.state.lastFilter === 'Cycles') {
            this.cyclesDataHandler()
        } else if (this.state.lastFilter === 'Instructions') {
            this.instructionsDataHandler()
        } else if (this.state.lastFilter === 'Functions') {
            this.functionsDataHandler()
        } else if (this.state.lastFilter === 'Loops') {
            this.loopsDataHandler()
        } else if (this.state.lastFilter === 'PickDrop') {
            this.pickdropDataHandler()
        } else if (this.state.lastFilter === 'Movement') {
            this.movementDataHandler()
        }
    }.bind(this)
    )
}
level5Handler= ()=>{
    const sheetsData = [...this.state.sheetsData];
    const filteredData = sheetsData.filter(function (obj) {
        return obj.level == 'Filtro Rosso'
    })
    //Pie data series
    const pieData = this.sumPieData(filteredData);

    this.setState({
        filteredData: filteredData,
        pieSeries: pieData
    }, function () {
        if (this.state.lastFilter === 'Cycles') {
            this.cyclesDataHandler()
        } else if (this.state.lastFilter === 'Instructions') {
            this.instructionsDataHandler()
        } else if (this.state.lastFilter === 'Functions') {
            this.functionsDataHandler()
        } else if (this.state.lastFilter === 'Loops') {
            this.loopsDataHandler()
        } else if (this.state.lastFilter === 'PickDrop') {
            this.pickdropDataHandler()
        } else if (this.state.lastFilter === 'Movement') {
            this.movementDataHandler()
        }
    }.bind(this)
    )
}
level6Handler= ()=>{
    const sheetsData = [...this.state.sheetsData];
    const filteredData = sheetsData.filter(function (obj) {
        return obj.level == 'Filtro Doppio Rosso'
    })
    //Pie data series
    const pieData = this.sumPieData(filteredData);

    this.setState({
        filteredData: filteredData,
        pieSeries: pieData
    }, function () {
        if (this.state.lastFilter === 'Cycles') {
            this.cyclesDataHandler()
        } else if (this.state.lastFilter === 'Instructions') {
            this.instructionsDataHandler()
        } else if (this.state.lastFilter === 'Functions') {
            this.functionsDataHandler()
        } else if (this.state.lastFilter === 'Loops') {
            this.loopsDataHandler()
        } else if (this.state.lastFilter === 'PickDrop') {
            this.pickdropDataHandler()
        } else if (this.state.lastFilter === 'Movement') {
            this.movementDataHandler()
        }
    }.bind(this)
    )
}
level7Handler= ()=>{
    const sheetsData = [...this.state.sheetsData];
    const filteredData = sheetsData.filter(function (obj) {
        return obj.level == 'Filtra Tutti I Rossi'
    })
    //Pie data series
    const pieData = this.sumPieData(filteredData);

    this.setState({
        filteredData: filteredData,
        pieSeries: pieData
    }, function () {
        if (this.state.lastFilter === 'Cycles') {
            this.cyclesDataHandler()
        } else if (this.state.lastFilter === 'Instructions') {
            this.instructionsDataHandler()
        } else if (this.state.lastFilter === 'Functions') {
            this.functionsDataHandler()
        } else if (this.state.lastFilter === 'Loops') {
            this.loopsDataHandler()
        } else if (this.state.lastFilter === 'PickDrop') {
            this.pickdropDataHandler()
        } else if (this.state.lastFilter === 'Movement') {
            this.movementDataHandler()
        }
    }.bind(this)
    )

}
level8Handler= ()=>{
    const sheetsData = [...this.state.sheetsData];
    const filteredData = sheetsData.filter(function (obj) {
        return obj.level == 'Copia'
    })
    //Pie data series
    const pieData = this.sumPieData(filteredData);

    this.setState({
        filteredData: filteredData,
        pieSeries: pieData
    }, function () {
        if (this.state.lastFilter === 'Cycles') {
            this.cyclesDataHandler()
        } else if (this.state.lastFilter === 'Instructions') {
            this.instructionsDataHandler()
        } else if (this.state.lastFilter === 'Functions') {
            this.functionsDataHandler()
        } else if (this.state.lastFilter === 'Loops') {
            this.loopsDataHandler()
        } else if (this.state.lastFilter === 'PickDrop') {
            this.pickdropDataHandler()
        } else if (this.state.lastFilter === 'Movement') {
            this.movementDataHandler()
        }
    }.bind(this)
    )
}
level9Handler= ()=>{
    const sheetsData = [...this.state.sheetsData];
    const filteredData = sheetsData.filter(function (obj) {
        return obj.level == 'Cattura il Cubo'
    })
    //Pie data series
    const pieData = this.sumPieData(filteredData);

    this.setState({
        filteredData: filteredData,
        pieSeries: pieData
    }, function () {
        if (this.state.lastFilter === 'Cycles') {
            this.cyclesDataHandler()
        } else if (this.state.lastFilter === 'Instructions') {
            this.instructionsDataHandler()
        } else if (this.state.lastFilter === 'Functions') {
            this.functionsDataHandler()
        } else if (this.state.lastFilter === 'Loops') {
            this.loopsDataHandler()
        } else if (this.state.lastFilter === 'PickDrop') {
            this.pickdropDataHandler()
        } else if (this.state.lastFilter === 'Movement') {
            this.movementDataHandler()
        }
    }.bind(this)
    ) 
}
level10Handler= ()=>{
    const sheetsData = [...this.state.sheetsData];
    const filteredData = sheetsData.filter(function (obj) {
        return obj.level == 'Scatter'
    })
    //Pie data series
    const pieData = this.sumPieData(filteredData);

    this.setState({
        filteredData: filteredData,
        pieSeries: pieData
    }, function () {
        if (this.state.lastFilter === 'Cycles') {
            this.cyclesDataHandler()
        } else if (this.state.lastFilter === 'Instructions') {
            this.instructionsDataHandler()
        } else if (this.state.lastFilter === 'Functions') {
            this.functionsDataHandler()
        } else if (this.state.lastFilter === 'Loops') {
            this.loopsDataHandler()
        } else if (this.state.lastFilter === 'PickDrop') {
            this.pickdropDataHandler()
        } else if (this.state.lastFilter === 'Movement') {
            this.movementDataHandler()
        }
    }.bind(this)
    )
}
level11Handler= ()=>{
    const sheetsData = [...this.state.sheetsData];
    const filteredData = sheetsData.filter(function (obj) {
        return obj.level == 'Alterna'
    })
    //Pie data series
    const pieData = this.sumPieData(filteredData);

    this.setState({
        filteredData: filteredData,
        pieSeries: pieData
    }, function () {
        if (this.state.lastFilter === 'Cycles') {
            this.cyclesDataHandler()
        } else if (this.state.lastFilter === 'Instructions') {
            this.instructionsDataHandler()
        } else if (this.state.lastFilter === 'Functions') {
            this.functionsDataHandler()
        } else if (this.state.lastFilter === 'Loops') {
            this.loopsDataHandler()
        } else if (this.state.lastFilter === 'PickDrop') {
            this.pickdropDataHandler()
        } else if (this.state.lastFilter === 'Movement') {
            this.movementDataHandler()
        }
    }.bind(this)
    )
}

render() {
    return (
        <div className={styles.Wrapper}>
        <div className={styles.Histogram}>
                <p>Distribution per Level</p>
            <div className={styles.Container}>
            <DropdownLevel
                allLevelsHandler={this.allLevelsHandler}
                level1Handler={this.level1Handler}
                level2Handler={this.level2Handler}
                level3Handler={this.level3Handler}
                level4Handler={this.level4Handler}
                level5Handler={this.level5Handler}
                level6Handler={this.level6Handler}
                level7Handler={this.level7Handler}
                level8Handler={this.level8Handler}
                level9Handler={this.level9Handler}
                level10Handler={this.level10Handler}
                level11Handler={this.level11Handler}
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
            <ReactApexChart 
            options={this.state.options} 
            series={this.state.series} 
            type="histogram" height={350} 
            />
            </div>
            <div className={styles.PieChart}>
            <PieChart
                series={this.state.pieSeries}
            />
        </div>
        </div>
    );
  }
}

export default Histogram;