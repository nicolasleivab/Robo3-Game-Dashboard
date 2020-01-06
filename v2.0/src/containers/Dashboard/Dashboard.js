import React, { Component } from 'react';
import GroupedChart from '../../components/GroupedChart/GroupedChart';

class Dashboard extends Component {
    state = {
        sheetsData: []
    };
// Fetch Google Sheets data 1 (restricted api key)
componentWillMount(){
    fetch("https://sheets.googleapis.com/v4/spreadsheets/10g_TGtruCriERlXJurPZQk76pvk30U0pkWgbbfzPrjA/values/Sheet1?key=AIzaSyArugq6TlxJTJHM-qWEe420k2xH3U0obxg")
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
                console.log(sheetsData);
                this.setState({
                    sheetsData: sheetsData
                });
            },

            (error) => {
                this.setState({
                    isLoaded: true,
                    error
                });
            }
        )
        
}

    render(){
    return <GroupedChart/>
    }
}

export default Dashboard;