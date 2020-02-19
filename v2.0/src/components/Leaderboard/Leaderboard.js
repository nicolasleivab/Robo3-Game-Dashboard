import React, { useState, useEffect } from "react";
import MaterialTable from "material-table";
import axios from "axios";

let googleAPIKey;

if (process.env.NODE_ENV !== "production") {
  googleAPIKey = process.env.REACT_APP_GOOGLEAPI_KEY;
} else {
  googleAPIKey = process.env.GOOGLEAPI_KEY;
}

export default function LeaderBoard(props) {
  const [state, setState] = useState({
    columns: [
      { title: "Rank", field: "rank" },
      { title: "ID", field: "id" },
      { title: "Score", field: "score" }
    ],
    data: [
      { rank: 1, id: "10574525", score: 100 },
      { rank: 2, id: "12341234", score: 220 }
    ]
  });
  const [solutionsData, setData] = useState("[]");
  //fetch data from second sheet
  useEffect(() => {
    async function getData() {
      const res = await axios.get(
        `https://sheets.googleapis.com/v4/spreadsheets/1evjoQPchLR8iUhjQQ8i56hy6Df5z7K_eVSWs8yVugC4/values/Sheet1?key=${googleAPIKey}`
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

      const sheets2Data = [...formattedData];

      //format data
      sheets2Data.forEach(function(d) {
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

      setData(sheets2Data);
    }
    getData();
  }, []);

  return (
    <div style={{ width: 450, marginLeft: "10%" }}>
      <MaterialTable
        title='Leaderboard'
        columns={state.columns}
        data={state.data}
      />
    </div>
  );
}
