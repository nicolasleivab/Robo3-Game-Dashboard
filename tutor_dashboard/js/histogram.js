/* Stacked Area Chart JS */

//** tabletop init function **//
function init() {     
  Tabletop.init( { key: '10g_TGtruCriERlXJurPZQk76pvk30U0pkWgbbfzPrjA', //google sheet key
                   callback: function(data, tabletop) { 
                       console.log(data)


//* Filter and format data *//

var parseDate = d3.timeParse("%m/%d/%Y");

    data.forEach(function(d) {
        d.date = parseDate(d.date);
        d.Cycles = +d.Cycles;


    });

var data = data.filter(function(d){return d.ID == '';});

 var levels = d3.map(data, function(d){return(d.level)}).keys();

 var selection = levels[0];


 //*Chart code*//
 // Derived from https://www.d3-graph-gallery.com/graph/histogram_basic.html

//Dimensions
var margin = {top: 10, right: 30, bottom: 30, left: 40},
    width = 600 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

//Append svg
var svg = d3.select("#histogram")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

// X axis and call func
var x = d3.scaleLinear()
    .domain([0, 1000])   // domain to be replaced later in the update function    
    .range([0, width]);
svg.append("g")          //Call axis to be replaced later in the update function
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x));

// Histogram Parameters
var histogram = d3.histogram()
    .value(function(d) { return d.Instructions; })   //parameters to be replaced later in the update function with level filter
    .domain(x.domain())  // domain of the graphic
    .thresholds(x.ticks(70)); // numbers of bins

// D3 function to get the bins, assigned to a variable for later reuse
var bins = histogram(data);

// X axis and call func
var y = d3.scaleLinear()
    .range([height, 0]);
    y.domain([0, d3.max(bins, function(d) { return d.Instructions; })]);   // domain to be replaced later in the update function
    .call(d3.axisLeft(y)) //Call axis to be replaced later in the update function

  
// Appending the bars to the svg 
svg.selectAll("rect")
    .data(bins)
    .enter()
    .append("rect")
      .attr("x", 1)
      .attr("transform", function(d) { return "translate(" + x(d.x0) + "," + y(d.Instructions) + ")"; })
      .attr("width", function(d) { return x(d.x1) - x(d.x0) -1 ; })
      .attr("height", function(d) { return height - y(d.Instructions); })
      .style("fill", "#69b3a2")

;


            //** end of D3 script **//

                   },
                   simpleSheet: true } )
}
window.addEventListener('DOMContentLoaded', init)
//** end of tabletop init function **//