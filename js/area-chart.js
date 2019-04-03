/*line-chart js*/

//** tabletop init function **//
function init() {     
  Tabletop.init( { key: '10g_TGtruCriERlXJurPZQk76pvk30U0pkWgbbfzPrjA', //google sheet key
                   callback: function(data, tabletop) { 
                       console.log(data)
                       
//** D3 js script **//
 // set the dimensions and margins of the graph
var margin = {top: 80, right: 20, bottom: 50, left: 100},
    width = 600 - margin.left - margin.right,
    height = 350 - margin.top - margin.bottom;

    // parse the date / time
var parseTime = d3.timeParse("%m/%d/%Y");


// set the ranges
var x = d3.scaleTime().range([0, width]);
var y = d3.scaleLinear().range([height, 0]);

// define the line
var valueline = d3.line()
      .x(function(d) { return x(d.date); })
    .y(function(d) { return y(d.Cycles); });

// append the svg obgect to the body of the page
// appends a 'group' element to 'svg'
// moves the 'group' element to the top left margin
var svg = d3.select("#stacked-chart").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");



  // format the data
  data.forEach(function(d) {
     d.date = parseTime(d.date);
      d.Cycles = +d.Cycles;
  });

  // Scale the range of the data
  x.domain(d3.extent(data, function(d) { return d.date; }));
  y.domain([0, d3.max(data, function(d) { return d.Cycles; })]);

  // Add the valueline path.
  svg.append("path")
      .data([data])
      .attr("class", "line")
      .attr("d", valueline)
      .style("fill", "none")
      .style("stroke", "green");

  // Add the X Axis
  svg.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x)).selectAll("text") 
            .style("text-anchor", "end")
            .attr("dx", "-.8em")
            .attr("dy", ".15em")
            .attr("transform", "rotate(-40)" 
                );;;

  // Add the Y Axis
  svg.append("g")
      .call(d3.axisLeft(y));

console.log(data);



            //** end of D3 script **//

                   },
                   simpleSheet: true } )
}
window.addEventListener('DOMContentLoaded', init)
//** end of tabletop init function **//
