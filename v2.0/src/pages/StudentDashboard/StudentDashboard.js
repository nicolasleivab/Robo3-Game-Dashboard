import React, { Component, Fragment, Profiler } from "react";
import axios from "axios";
import GroupedBarChart from "../../components/GroupedChart/GroupedChart";
import RadialBar from "../../components/RadialBar/RadialBar";
import BarChart from "../../components/BarChart/BarChart";

let googleAPIKey;
let series = 0;

if (process.env.NODE_ENV !== "production") {
  googleAPIKey = process.env.REACT_APP_GOOGLEAPI_KEY;
} else {
  googleAPIKey = process.env.GOOGLEAPI_KEY;
}

class StudentDashboard extends Component {
  state = {
    isTutor: false,
    studentId: "",
    generalData: [],
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
    }
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
      const currentArray = [];
      for (let j = 0; j < filteredData.length; j++) {
        if (filteredData[j]["level"] === levels[i]) {
          currentArray.push(filteredData[j]["Rounds"]);
        }
      }
      currentRounds.push(Math.max(...currentArray));
    }
    console.log(currentRounds);

    this.setState({
      generalData: sheets1Data,
      studentId: currentStudent,
      currentStudentProgress: progressPercent * 100,
      barChartSeries: [{ name: "Rounds", data: currentRounds }]
    });
  }

  render() {
    return (
      <Fragment>
        <RadialBar series={this.state.currentStudentProgress} />
        <BarChart
          barChartSeries={this.state.barChartSeries}
          categories={this.state.options}
          title={"Rounds"}
        />
        <GroupedBarChart
          isTutor={this.state.isTutor}
          defaultStudent={JSON.parse(localStorage.getItem("studentId"))}
        />
      </Fragment>
    );
  }
}

export default StudentDashboard;
