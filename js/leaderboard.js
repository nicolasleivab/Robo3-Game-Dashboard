/*Leaderboard js*/

//** tabletop init function **//
function init() {     
  Tabletop.init( { key: '1evjoQPchLR8iUhjQQ8i56hy6Df5z7K_eVSWs8yVugC4', //google sheet key
                   callback: function(data, tabletop) { 
                       console.log(data)

//** Leaderboard script **//

// Create and sort array of players from data
var groupBy = function(data, key) { // `data` is an array of objects, `key` is the key (or property accessor) to group by
  // reduce runs this anonymous function on each element of `data` (the `item` parameter,
  // returning the `storage` parameter at the end
  return data.reduce(function(storage, item) {
    // get the first instance of the key by which we're grouping
    var group = item[key];
    
    // set `storage` for this instance of group to the outer scope (if not empty) or initialize it
    storage[group] = storage[group] || [];
    
    // add this item to its group within `storage`
    storage[group].push(item);
    
    // return the updated storage to the reduce function, which will then loop through the next 
    return storage;

  }, {}); // {} is the initial value of the storage
};

console.log(groupBy(data, "ID"));


var Players = data.sort((aPlayer, bPlayer) => aPlayer.Cycles - bPlayer.Cycles);;

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