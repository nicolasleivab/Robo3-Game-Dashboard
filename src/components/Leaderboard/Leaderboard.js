import React, { useState, useEffect } from "react";
import MaterialTable from "material-table";
import axios from "axios";
const googleAPIKey = process.env.REACT_APP_GOOGLEAPI_KEY;

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

      function sumAll(arr) {
        let sums = {},
          value = [],
          studentID;
        for (var i = 0; i < arr.length; i++) {
          //loop through array
          studentID = arr[i].ID;
          if (!(studentID in sums)) {
            sums[studentID] = 0;
          }
          sums[studentID] += arr[i]["Cycles"];
          sums[studentID] += arr[i]["Instructions"]; //sum Score (Cycles + Instructions)
        }

        for (studentID in sums) {
          value.push({ rank: 0, id: studentID, score: sums[studentID] }); //push elements to new array students and score
        }
        return value; //return array of objects
      }

      const sumPlayers = sumAll(sheets2Data);

      const sortedPlayers = sumPlayers.sort(
        (aPlayer, bPlayer) => aPlayer.score - bPlayer.score
      ); //sorts the players by score (ascending)

      for (let i = 0; i < sortedPlayers.length; i++) {
        sortedPlayers[i].rank = i + 1; //Add ranking
      }
      console.log(sortedPlayers);
      setState({
        columns: [
          { title: "Rank", field: "rank" },
          { title: "ID", field: "id" },
          { title: "Score", field: "score" }
        ],
        data: sortedPlayers
      });
      console.log(state.data);
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
