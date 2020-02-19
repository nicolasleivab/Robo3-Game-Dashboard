import React from "react";
import MaterialTable from "material-table";

export default function LeaderBoard() {
  const [state, setState] = React.useState({
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

  return (
    <div style={{ width: 400, marginLeft: "10%" }}>
      <MaterialTable
        title='Leaderboard'
        columns={state.columns}
        data={state.data}
      />
    </div>
  );
}
