/*Leaderboard js*/

//** tabletop init function **//
function init() {     
  Tabletop.init( { key: '1evjoQPchLR8iUhjQQ8i56hy6Df5z7K_eVSWs8yVugC4', //google sheet key
                   callback: function(data, tabletop) { 
                       console.log(data)

//** Leaderboard script **//

 // Clean data
data.forEach(function(d) {
    d.Rounds = +d.Rounds;
    d.Playtime = +d.Playtime;
    d.Instructions = +d.Instructions;
    d.Functions = +d.Functions;
    d.Loops = +d.Loops;
    d.Movement = +d.Movement;
    d.PickDrop = +d.PickDrop;
    d["Success Probability"] = +d["Success Probability"];
    d.Cycles = +d.Cycles;
   
});

//Filter students 100% progress
    
personCode = Number(personCode);

function sumAll(arr) {
    let sums = {}, value = [], studentID;
        for (var i = 0; i < arr.length; i++) { //loop through array
          studentID = arr[i].ID 
          if (!(studentID in sums)) {
            sums[studentID] = 0; 
          }
          sums[studentID] += arr[i]['Cycles'];
          sums[studentID]  += arr[i]['Instructions']; //sum Score (Cycles + Instructions)
          }
                      
        for(studentID in sums) {
          value.push({ ID: studentID, Score: sums[studentID]}); //push elements to new array students and score
          }
    return value; //return array of objects
}
      
const sumPlayers = sumAll(data);
      
const sortedPlayers = sumPlayers.sort((aPlayer, bPlayer) => aPlayer.Score - bPlayer.Score); //sorts the players by score (ascending)

for(i = 0; i < sortedPlayers.length; i++) {
    sortedPlayers[i].ranking = i+1; //Add ranking
}

const topPlayers = sortedPlayers.slice(0, 3); //filters the first 3 players

console.log(sortedPlayers);

// Display table func adapted from https://stackoverflow.com/questions/52507871/creating-a-leaderboard-in-html-js
function displayLeaderboard() {
    let theExport = ""; //initialize the export
    topPlayers.forEach((player) => theExport += '<tr><td>' + player.ranking + '</td><td>' + player.ID + '</td><td>' + player.Score + '</td></tr>'); //prints the row tables
    document.getElementById("leaderboard").innerHTML = theExport;
}

displayLeaderboard(topPlayers);

//JQuery show ranking func
$(document).ready(function() {
    $('span').click(function() {
        if(topPlayers.some(student => student.ID == personCode)){
            //if the current student is already in the leaderboard do nothing
    }else{
        let currentStudent = sortedPlayers.find( student => student.ID == personCode );
        topPlayers.push(currentStudent);
        console.log(topPlayers);
        let theExport = ""; //initialize the export
        topPlayers.forEach((player) => theExport += '<tr><td>' + player.ranking + '</td><td>' + player.ID + '</td><td>' + player.Score + '</td></tr>'); //prints the row tables
        document.getElementById("leaderboard").innerHTML = theExport;
    }
    });
});


            //** end of Leaderboard script **//

                   },
                   simpleSheet: true } )
}
window.addEventListener('DOMContentLoaded', init)
//** end of tabletop init function **//