/* Stacked Area Chart JS */

//** tabletop init function **//
function init() {     
  Tabletop.init( { key: '10g_TGtruCriERlXJurPZQk76pvk30U0pkWgbbfzPrjA', //google sheet key
                   callback: function(data, tabletop) { 
                       console.log(data)


//* Filter and format data *//
var data = data.filter(function(d){return d.ID == '10574525';});

var parseDate = d3.timeParse("%m/%d/%Y");

    data.forEach(function(d) {
        d.date = parseDate(d.date);
        d['Best Solution'] = d['Best Solution'];
        d.Cycles = +d.Cycles;


    });

 var levels = d3.map(data, function(d){return(d.level)}).keys();

 var selection = levels[0];


 //*Chart code*//

var svg = d3.select("#area-chart"),
    margin = {top: 20, right: 120, bottom: 100, left: 100},
    width = 1200 - margin.left - margin.right,
    height = 350 - margin.top - margin.bottom,
    g = svg.append("svg").attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + ", " + margin.top + ")");










            //** end of D3 script **//

                   },
                   simpleSheet: true } )
}
window.addEventListener('DOMContentLoaded', init)
//** end of tabletop init function **//