/*Leaderboard js*/

//** tabletop init function **//
function init() {     
  Tabletop.init( { key: '10g_TGtruCriERlXJurPZQk76pvk30U0pkWgbbfzPrjA', //google sheet key
                   callback: function(data, tabletop) { 
                       console.log(data)

//** Leaderboard script **//



//Adapted from https://stackoverflow.com/questions/52507871/creating-a-leaderboard-in-html-js
 function Player(myName, myDate, myScore) {
        this.name = myName;
        this.date = myDate;
        this.score = myScore;
    }

    // Create new players
    player1 = new Player("10101010", "01/23/18", 201);
    player2 = new Player("10574525", "03/24/17", 943);
    player3 = new Player("11111111", "06/04/18", 79); 
    Players = [player1, player2, player3];

    function displayLeaderboard() {
        let theExport = ""; 
        Players.sort((aPlayer, bPlayer) => bPlayer.score - aPlayer.score);
        Players.forEach((player) => theExport += '<tr><td>' + player.name + '</td><td>' + player.score + '</td><td>' + player.date + '</td></tr>');
        document.getElementById("leaderboard").innerHTML = theExport; 
    }

    displayLeaderboard(Players);




            //** end of Leaderboard script **//

                   },
                   simpleSheet: true } )
}
window.addEventListener('DOMContentLoaded', init)
//** end of tabletop init function **//