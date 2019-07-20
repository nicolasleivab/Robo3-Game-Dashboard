/*Leaderboard js*/

//** tabletop init function **//
function init() {     
  Tabletop.init( { key: '1evjoQPchLR8iUhjQQ8i56hy6Df5z7K_eVSWs8yVugC4', //google sheet key
                   callback: function(data, tabletop) { 
                       console.log(data)

//** Leaderboard script **//

// Create and sort array of players from data
// groupBy function adapted from Rob Mathers https://gist.github.com/robmathers/1830ce09695f759bf2c4df15c29dd22d


function groupBy(arr, key) { 
  
return data.reduce(function(storage, item) {

    var group = item[key];
    

    storage[group] = storage[group] || [];
    
  
    storage[group].push(item);
    
    
    return storage;
  }, {}); 
};

var group = groupBy(data, "ID");
console.log(group);


var Players = data.sort((aPlayer, bPlayer) => aPlayer.Cycles - bPlayer.Cycles);

var topPlayers = Players.slice(0, 3);


console.log(topPlayers);


// Display table func adapted from https://stackoverflow.com/questions/52507871/creating-a-leaderboard-in-html-js
function displayLeaderboard() {
        let theExport = ""; 
        topPlayers.forEach((player) => theExport += '<tr><td>' + player.ID + '</td><td>' + player.Cycles + '</td><td>' + player.Instructions + '</td></tr>');
        document.getElementById("leaderboard").innerHTML = theExport;
    }

displayLeaderboard(topPlayers);



            //** end of Leaderboard script **//

                   },
                   simpleSheet: true } )
}
window.addEventListener('DOMContentLoaded', init)
//** end of tabletop init function **//