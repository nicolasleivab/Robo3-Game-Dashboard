import React, { Component } from "react";
import GroupedChart from "../../components/GroupedChart/GroupedChart";
import BarChart from "../../components/BarChart/BarChart";
import Histogram from "../../components/Histogram/Histogram";
import styles from "./TutorDashboard.module.css";
let googleAPIKey;

if (process.env.NODE_ENV !== "production") {
  googleAPIKey = process.env.REACT_APP_GOOGLEAPI_KEY;
} else {
  googleAPIKey = process.env.GOOGLEAPI_KEY;
}

class TutorDashboard extends Component {
  state = {
    isTutor: true,
    sheetsData: [],
    barChartSeries: [],
    options: {
      xaxis: {
        categories: []
      }
    }
  };
  // Fetch Google Sheets data 1 (restricted api key)
  componentDidMount() {
    fetch(
      `https://sheets.googleapis.com/v4/spreadsheets/10g_TGtruCriERlXJurPZQk76pvk30U0pkWgbbfzPrjA/values/Sheet1?key=${googleAPIKey}`
    )
      .then(res => res.json())
      .then(
        result => {
          const rawData = result.values;
          const formattedData = [];
          let prop, value;
          //nested loops-> convert array of arrays to array of objects
          for (let i = 1; i < rawData.length; i++) {
            //first row (0) contains each column key(prop)
            let obj = {};
            for (let j = 0; j < rawData[i].length; j++) {
              prop = rawData[0][j];
              value = rawData[i][j];
              obj[prop] = value;
            }
            formattedData.push(obj);
          }

          const sheetsData = [...formattedData];

          //format data
          sheetsData.forEach(function(d) {
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

          //average for each level formula
          function averageProb(arr) {
            let sums = {},
              counts = {},
              averages = [],
              name;
            for (var i = 0; i < arr.length; i++) {
              //loop through array
              name = arr[i].level;
              if (!(name in sums)) {
                sums[name] = 0;
                counts[name] = 0;
              }
              sums[name] += arr[i]["Success Probability"];
              counts[name]++;
            }
            for (name in sums) {
              averages.push({
                level: name,
                average: sums[name] / counts[name]
              }); //push elements to new array with averages per level
            }
            return averages;
          }
          localStorage.setItem("sheetsData1", JSON.stringify(sheetsData));
          const averagePerLevel = averageProb(sheetsData);
          //sort alphabetically
          const sortedList = averagePerLevel.sort(function(a, b) {
            if (a.level < b.level) {
              return -1;
            }
            if (a.level > b.level) {
              return 1;
            }
            return 0;
          });

          const barChartSeries = sortedList.map(obj => obj.average);
          const categories = sortedList.map(obj => obj.level);
          //set new state
          console.log(sortedList);
          this.setState({
            sheetsData: sheetsData,
            barChartSeries: [
              { name: "Sucess Probability", data: barChartSeries }
            ],
            options: { xaxis: { categories: categories } }
          });
        },

        error => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      );
  }

  render() {
    return (
      <div>
        <Histogram />
        <GroupedChart
          isTutor={this.state.isTutor}
          defaultStudent={"10574525"}
        />
        <BarChart
          barChartSeries={this.state.barChartSeries}
          categories={this.state.options}
        />
      </div>
    );
  }
}

export default TutorDashboard;
