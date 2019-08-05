/* Stacked Area Chart JS */

//** tabletop init function **//
function init() {     
  Tabletop.init( { key: '10g_TGtruCriERlXJurPZQk76pvk30U0pkWgbbfzPrjA', //google sheet key
                   callback: function(data, tabletop) { 
                       console.log(data)

// Set dimensions and append svg to div #histogram
var svg = d3.select("#histogram"),
    margin = {top: 20, right: 120, bottom: 100, left: 100},
    width = 1200 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom,
    g = svg.append("svg").attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + ", " + margin.top + ")");

var parseDate = d3.timeParse("%m/%d/%Y");

// Format Data
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
  d.date = parseDate(d.date);
});

// Filter values
allInstructions = data.columns.slice(2); //get Product columns for the filter
selection = allInstructions[0];
allLevels = d3.map(data, function(d){return(d.level)}).keys(); //get zones
selection2= allLevels[0];


            //** end of D3 script **//

                   },
                   simpleSheet: true } )
}
window.addEventListener('DOMContentLoaded', init)
//** end of tabletop init function **//