import React, { Component } from "react";
import axios from "axios";
import GroupedBarChart from "../../components/GroupedChart/GroupedChart";

let googleAPIKey;

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
    solutionsData: []
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
      d.ID = +d.ID;
      d.date = new Date(d.date);
    });

    console.log(sheets1Data);
    this.setState({
      generalData: sheets1Data,
      studentId: JSON.parse(localStorage.getItem("studentId"))
    });
  }

  render() {
    return (
      <GroupedBarChart
        isTutor={this.state.isTutor}
        defaultStudent={JSON.parse(localStorage.getItem("studentId"))}
      />
    );
  }
}

export default StudentDashboard;
