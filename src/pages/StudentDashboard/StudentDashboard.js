import React, { Component, Fragment, Profiler } from "react";
import axios from "axios";
import GroupedBarChart from "../../components/GroupedChart/GroupedChart";
import RadialBar from "../../components/RadialBar/RadialBar";
import BarChart from "../../components/BarChart/BarChart";
import LeaderBoard from "../../components/Leaderboard/Leaderboard";
import styles from "./StudentDashboard.module.css";
import CalendarHeatmap from "react-calendar-heatmap";
import "react-calendar-heatmap/dist/styles.css";
import ReactTooltip from "react-tooltip";

const googleAPIKey = process.env.REACT_APP_GOOGLEAPI_KEY;
const dateFormat = require("dateformat");

class StudentDashboard extends Component {
  state = {
    isTutor: false,
    studentId: "",
    generalData: [],
    title: "",
    rounds: [],
    time: [],
    solutionsData: [],
    currentStudentProgress: 0,
    barChartSeries: [],
    options: {
      xaxis: {
        categories: [
          "Alterna",
          "Cattura il Cubo",
          "Concatena",
          "Copia",
          "Filtra Tutti I Rossi",
          "Filtro Doppio Rosso",
          "Filtro Rosso",
          "Hello, world!!!",
          "Inverti",
          "Inverti i Pari",
          "Scatter"
        ]
      }
    },
    tooltipData: []
  };
  //fetch data from first sheet
  async componentDidMount() {
    const res = await axios.get(
      `https://sheets.googleapis.com/v4/spreadsheets/10g_TGtruCriERlXJurPZQk76pvk30U0pkWgbbfzPrjA/values/Sheet1?key=${googleAPIKey}`
    );
    const rawData = res.data.values;
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

    const sheets1Data = [...formattedData];

    //format data
    sheets1Data.forEach(function(d) {
      d.Rounds = +d.Rounds;
      d["Playtime (min)"] = +d["Playtime (min)"];
      d.Instructions = +d.Instructions;
      d.Functions = +d.Functions;
      d.Loops = +d.Loops;
      d.Movement = +d.Movement;
      d.PickDrop = +d.PickDrop;
      d["Success Probability"] = +d["Success Probability"];
      d.Cycles = +d.Cycles;
      d.date = new Date(d.date);
    });

    const filteredData = [];
    const currentStudent = JSON.parse(localStorage.getItem("studentId"));
    for (let i = 0; i < formattedData.length; i++) {
      if (formattedData[i]["ID"] === currentStudent) {
        filteredData.push(formattedData[i]);
      }
    }

    const filterBySuccess = filteredData.filter(function(d) {
      return d["Success Probability"] > 0;
    }); //Filter completed levels

    const completedLevels = filterBySuccess.map(function(d) {
      return d.level;
    }); //get each level name
    const completedLevelsUnique = completedLevels.filter(function(item, pos) {
      //get unique values
      return completedLevels.indexOf(item) === pos;
    });
    console.log(completedLevelsUnique);
    const progressPercent = completedLevelsUnique.length / 11;
    console.log(filteredData);

    const currentRounds = [];
    const currentTime = [];
    const levels = [...this.state.options.xaxis.categories];

    for (let i = 0; i < levels.length; i++) {
      const currentArrayRounds = [];
      const currentArrayTime = [];
      for (let j = 0; j < filteredData.length; j++) {
        if (filteredData[j]["level"] === levels[i]) {
          currentArrayRounds.push(filteredData[j]["Rounds"]);
          currentArrayTime.push(filteredData[j]["Playtime (min)"]);
        }
      }
      currentRounds.push(Math.max(...currentArrayRounds));
      currentTime.push(Math.max(...currentArrayTime));
    }
    console.log(currentRounds);

    function sumAll(arr) {
      let sums = {},
        value = [],
        mapDate;
      for (var i = 0; i < arr.length; i++) {
        //loop through array
        mapDate = arr[i].date;
        if (!(mapDate in sums)) {
          sums[mapDate] = 0;
        }
        sums[mapDate] += arr[i]["Success Probability"]; //sum of values per date
      }

      for (mapDate in sums) {
        value.push({ date: mapDate, count: sums[mapDate] }); //push elements to new array with dates and values
      }
      return value; //return array of objects
    }

    const tooltipData = sumAll(filteredData);
    console.log(tooltipData);

    this.setState({
      generalData: sheets1Data,
      studentId: currentStudent,
      currentStudentProgress: progressPercent * 100,
      barChartSeries: [{ name: "Rounds", data: currentRounds }],
      tooltipData: tooltipData,
      rounds: [currentRounds],
      time: [currentTime],
      title: "Gameplay"
    });
  }

  roundsHandler = () => {
    const currentRounds = [...this.state.rounds];
    this.setState({
      barChartSeries: [{ name: "Rounds", data: currentRounds[0] }]
    });
  };

  timeHandler = () => {
    const currentTime = [...this.state.time];
    console.log(currentTime);
    this.setState({
      barChartSeries: [{ name: "Playtime (min)", data: currentTime[0] }]
    });
  };
  customTooltipDataAttrs = value =>
    value["count"]
      ? {
          "data-tip":
            "count: " +
            value["count"] +
            ", " +
            "date: " +
            dateFormat(value["date"], "dddd, mmmm dS, yyyy")
        }
      : {};

  render() {
    return (
      <Fragment>
        <div className={styles.Overview}>
          <RadialBar series={this.state.currentStudentProgress} />
          <LeaderBoard />
        </div>
        <BarChart
          barChartSeries={this.state.barChartSeries}
          categories={this.state.options}
          title={this.state.title}
          isTutor={this.state.isTutor}
          roundsHandler={this.roundsHandler}
          timeHandler={this.timeHandler}
        />
        <GroupedBarChart
          isTutor={this.state.isTutor}
          defaultStudent={JSON.parse(localStorage.getItem("studentId"))}
        />
        <div className={styles.HeatMap}>
          <p style={{ marginBottom: 30 }}>Heatmap</p>
          {this.state.tooltipData[0] ? (
            <div id='Heatmap'>
              <CalendarHeatmap
                startDate={new Date("2019-03-01")}
                endDate={new Date("2020-03-01")}
                style={{ width: 50 }}
                tooltipDataAttrs={this.customTooltipDataAttrs}
                values={this.state.tooltipData}
                classForValue={value => {
                  if (!value) {
                    return "color-empty";
                  }
                  return `color-github-${value["count"]}`;
                }}
              />
              <ReactTooltip />
            </div>
          ) : (
            <div></div>
          )}
        </div>
      </Fragment>
    );
  }
}

export default StudentDashboard;
