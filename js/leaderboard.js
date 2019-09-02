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

// Group and sort array of players from data with their Cycles attribute summed up
// DataGrouper function adapted from Scott Sauyet https://stackoverflow.com/questions/14446511/most-efficient-method-to-groupby-on-an-array-of-objects


var DataGrouper = (function() {
  var has = function(obj, target) {
      return _.any(obj, function(value) {
          return _.isEqual(value, target);
      });
  };

  var keys = function(data, names) {
      return _.reduce(data, function(memo, item) {
          var key = _.pick(item, names);
          if (!has(memo, key)) {
              memo.push(key);
          }
          return memo;
      }, []);
  };

  var group = function(data, names) {
      var stems = keys(data, names);
      return _.map(stems, function(stem) {
          return {
              key: stem,
              vals:_.map(_.where(data, stem), function(item) {
                  return _.omit(item, names);
              })
          };
      });
  };

  group.register = function(name, converter) {
      return group[name] = function(data, names) {
          return _.map(group(data, names), converter);
      };
  };

  return group;
}());

DataGrouper.register("sum", function(item) {
  return _.extend({}, item.key, {Score: _.reduce(item.vals, function(memo, node) {
      return memo + Number(node.Cycles + node.Instructions); //total score defined by total number of Cycles and Instructions
  }, 0)});
});

var sumPlayers = DataGrouper.sum(data, ["ID"]); //assign to sumPlayers the array with the players grouped by score
console.log(sumPlayers);

var sortedPlayers = sumPlayers.sort((aPlayer, bPlayer) => aPlayer.Score - bPlayer.Score); //sorts the players by score (ascending)

var topPlayers = sortedPlayers.slice(0, 3); //filters the first 3 players


console.log(topPlayers);


// Display table func adapted from https://stackoverflow.com/questions/52507871/creating-a-leaderboard-in-html-js
function displayLeaderboard() {
    let theExport = ""; //initialize the export
    var i=1; // counter for ranking position
    topPlayers.forEach((player) => theExport += '<tr><td>' + i++ + '</td><td>' + player.ID + '</td><td>' + player.Score + '</td></tr>'); //prints the row tables
    document.getElementById("leaderboard").innerHTML = theExport;
}

displayLeaderboard(topPlayers);

//JQuery show ranking func
$(document).ready(function() {
    $('span').click(function() {
        var showYourRanking = sortedPlayers.slice(0, 4); //to be replaced by a ID filter once the login page is setup
        let theExport = "";
        var i=1;
        showYourRanking.forEach((player) => theExport += '<tr><td>' + i++ + '</td><td>' + player.ID + '</td><td>' + player.Score + '</td></tr>');
        document.getElementById("leaderboard").innerHTML = theExport;
        });
});


            //** end of Leaderboard script **//

                   },
                   simpleSheet: true } )
}
window.addEventListener('DOMContentLoaded', init)
//** end of tabletop init function **//