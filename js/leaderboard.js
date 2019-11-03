/*Leaderboard js*/
let personCode = localStorage.getItem('objectToPass');
let data1 = JSON.parse(localStorage.getItem('data1'));
let data2 = JSON.parse(localStorage.getItem('data2'));

 // Format data
data1.forEach(function(d) {
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
});

data2.forEach(function(d) {
    d.ID = +d.ID;
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

/*Filter students and get only the ones that have completed every level
const completedLevels = d3.map(donutData, function(d){return(d.level)}).keys(); //get each level
data2.forEach((player) => if(completedLevels.length < 11){ return player.exclude = 1} // boolean property for the filer
let boardData = data2.filter(function(d){return d.exclude < 1;}); //filter in progress students
*/
    
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
      
const sumPlayers = sumAll(data2);
      
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
        //if the current student is already in the leaderboard add class
        if(topPlayers.some(student => student.ID == personCode)){
            //add first place class, then second, then third...
            if(topPlayers[0].ID == personCode){
            document.querySelector('.row tr:nth-child(1) td:nth-child(1)').classList.add('focus');
            document.querySelector('.row tr:nth-child(1) td:nth-child(2)').classList.add('focus');
            document.querySelector('.row tr:nth-child(1) td:nth-child(3)').classList.add('focus');
            }else if(topPlayers[1].ID == personCode){
            document.querySelector('.row tr:nth-child(2) td:nth-child(1)').classList.add('focus');
            document.querySelector('.row tr:nth-child(2) td:nth-child(2)').classList.add('focus');
            document.querySelector('.row tr:nth-child(2) td:nth-child(3)').classList.add('focus');
            }else if(topPlayers[2].ID == personCode){
            document.querySelector('.row tr:nth-child(3) td:nth-child(1)').classList.add('focus');
            document.querySelector('.row tr:nth-child(3) td:nth-child(2)').classList.add('focus');
            document.querySelector('.row tr:nth-child(3) td:nth-child(3)').classList.add('focus');
            }
    }else{//append new player
        let currentStudent = sortedPlayers.find( student => student.ID == personCode );
        topPlayers.push(currentStudent);
        console.log(topPlayers);
        let theExport = ""; //initialize the export
        topPlayers.forEach((player) => theExport += '<tr><td>' + player.ranking + '</td><td>' + player.ID + '</td><td>' + player.Score + '</td></tr>'); //prints the row tables
        document.getElementById("leaderboard").innerHTML = theExport;
    }
    });
});