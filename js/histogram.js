/* Histogram JS */

//** tabletop init function **//
function init() {     
  Tabletop.init( { key: '10g_TGtruCriERlXJurPZQk76pvk30U0pkWgbbfzPrjA', //google sheet key
                   callback: function(data, tabletop) { 
                       console.log(data)

// Set dimensions and append svg to div #histogram
var svg = d3.select("#histogram"),
    margin = {top: 30, right: 40, bottom: 50, left: 50},
    width = 600 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom,
    g = svg.append("svg").attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + ", " + margin.top + ")");

var parseDate = d3.timeParse("%m/%d/%Y");
var formatTime = d3.timeFormat("%d/%m/%Y");

// Format Data
data.forEach(function(d) {
  d.Rounds = +d.Rounds;
  d['Playtime (min)'] = +d['Playtime (min)'];
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
allInstructions = ['Cycles','Instructions', 'PickDrop', 'Movement', 'Functions', 'Loops']; //get Product columns for the filter
selection = allInstructions[0];
allLevels = d3.map(data, function(d){return(d.level)}).keys(); //get zones
selection2= allLevels[0];

// Y axis and call func
var y = d3.scaleLinear()
    .range([height, 0]);

// X axis and call func
var x = d3.scaleLinear()
    .range([0, width]);

// X axis append
xApp = g.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height +")");

// Y axis append
yApp = g.append("g")
.attr("class", "y axis");

// transition time 
var t = d3.transition().duration(500);

function update(data) {
    
  // X domain   
  x.domain([(d3.min(data, function(d) { return d[selection.value] || d[selection]; })) - 2, (d3.max(data, function(d) { return d[selection.value] || d[selection] ; })) + 2]); 
      
  // Setting Histogram parameters
  var histogram = d3.histogram()
      .value(function(d) { return d[selection.value] || d[selection] ; })   //Value of the vector
      .domain(x.domain())  //load x domain
      .thresholds(x.ticks(7)); //Set number of bins
  
  var bins = histogram(data); //Apply d3.histogram function with array data as input and creat a binding 'bins'
  
  // Y domain
  y.domain([0, d3.max(bins, function(d) { return d.length; })]);   //return length of selected value in hist func
  
  // Remove old elements
  g.selectAll("rect")
      .data(bins)
      .exit()
      .attr("fill", "green")
      .transition(t)
      .attr("height", 0)
      .attr("width", 0)
      .remove();
      
  // Append new rects to svg element
  g.selectAll("rect")
      .data(bins)
      .enter()
      .append("rect")
          .attr("x", 1)
          .attr("transform", function(d) { return "translate(" + x(d.x0) + "," + y(d.length) + ")"; })
          .attr("width", d => Math.max(0, x(d.x1) - x(d.x0) - 1))
          .style("fill", "green")
          .merge(g.selectAll("rect") // Update old elements
          .data(bins))
              .transition(t)
              .attr("x", 1)
              .attr("transform", function(d) { return "translate(" + x(d.x0) + "," + y(d.length) + ")"; })
              .attr("width", d => Math.max(0, x(d.x1) - x(d.x0) - 1))
              .attr("height", function(d) { return height - y(d.length); })
              .style("fill", "green")
  
  // axis update
  d3.select("g.y.axis")  //changing from selectAll to select fixed the conflict between charts
      .transition()
      .call(yCall).selectAll("text").attr("font-size", "12px");
  d3.select("g.x.axis")  //changing from selectAll to select fixed the conflict between charts
      .transition()
      .call(xCall).selectAll("text").attr("font-size", "12px");
  
  }


//jQuery UI slider
$("#dateSlider").slider({
  range: true,
  max: parseDate("8/07/2019").getTime(),
  min: parseDate("1/01/2019").getTime(),
  step: 86400000, //for each day
  values: [parseDate("1/01/2019").getTime(), parseDate("8/07/2019").getTime()],
  slide: function(event, ui){
      $("#dateLabel1").text(formatTime(new Date(ui.values[0])));
      $("#dateLabel2").text(formatTime(new Date(ui.values[1])));
      update(data.filter(function(d){return ((d.date >= ui.values[0]) && (d.date <= ui.values[1]) && (d.level == [selection2.value] || d.level == [selection2]));}));
      updateDate(data.filter(function(d){return ((d.date >= ui.values[0]) && (d.date <= ui.values[1]) && (d.level == [selection2.value] || d.level == [selection2]));}));
      console.log(ui.values[0]);
      console.log(data);
  }
});

//Reset slider func
function resetSlider() {
  $("#dateSlider").slider("values", 0, parseDate("1/01/2019").getTime());
  $("#dateSlider").slider("values", 1, parseDate("8/07/2019").getTime());
  $("#dateLabel1").text("1/01/2019");
  $("#dateLabel2").text("8/07/2019");
}

// Filters
var levelSelector = d3.select("#drop4") //dropdown change selection
.append("select") //append row filter dropdown
.attr("id","dropdown4")
.on("change", function(d){ // Row Filter
    selection2 = document.getElementById("dropdown4");
    console.log([selection2.value]);
    update(data.filter(function(d){return d.level == [selection2.value];}));
    updatePie(data.filter(function(d){return d.level == [selection2.value];}), "level");
    resetSlider();
        instructionSelector.on("change", function(d){ // Column Filter
            selection = document.getElementById("dropdown3");
            console.log([selection.value]);
            update(data.filter(function(d){return d.level == [selection2.value];}));
            resetSlider();
             });
      });

//get values for the row filter dropdown
levelSelector.selectAll("option")
.data(allLevels)
.enter().append("option")
.attr("value", function(d){
  return d;
})
.text(function(d){
  return d;
})

// append column filter dropdown
var instructionSelector = d3.select("#drop3") //dropdown change selection
.append("select")
.attr("id","dropdown3")
.on("change", function(d){ //default run for column filter
    selection = document.getElementById("dropdown3");
    console.log([selection.value]);
    update(data.filter(function(d){return d.level == [selection2];}));
    resetSlider();
     });

//get values for the column filter dropdown
instructionSelector.selectAll("option")
.data(allInstructions)
.enter().append("option")
.attr("value", function(d){
  return d;
})
.text(function(d){
  return d;
})

//xcall func
var xCall = d3.axisBottom(x)
.tickFormat(function(d){ return d; });
xApp.transition(t).call(xCall).selectAll("text").attr("font-size", "12px");

//ycall func
var yCall = d3.axisLeft(y)
.tickFormat(function(d){ return d; });
yApp.transition(t).call(yCall).selectAll("text").attr("font-size", "12px");

// Render first viz
update(data.filter(function(d){return d.level == [selection2];}));


/* Pie Chart */
// Structure and path update adapted from Adam Jane 
// https://bl.ocks.org/adamjanes/5e53cfa2ef3d3f05828020315a3ba18c/22619fa86de2045b6eeb4060e747c5076569ec47 

const width2 = 250;
const height2 = 250;
const radius = Math.min(width2, height2) / 2;

const svg2 = d3.select("#donut")
    .append("svg")
        .attr("width", width2)
        .attr("height", height2)
    .append("g")
        .attr("transform", `translate(${width2 / 2}, ${height2 / 2})`);

const color = d3.scaleOrdinal().range(["#ccffcc","#ffb3b3", "#b3e6ff", "#fdfd96"]);

const pie = d3.pie()
    .value(d => d.count)
    .sort(null);

const arc = d3.arc()
    .innerRadius(0)
    .outerRadius(radius);

function arcTween(a) {
    const i = d3.interpolate(this._current, a);
    this._current = i(1);
    return (t) => arc(i(t));
}

//Legend
var resultLegend = [data.reduce((acc, n) => {    //loop through data array objects and sum objects properties
  for (var prop in n) {
    if (acc.hasOwnProperty(prop)) acc[prop] += n[prop];
    else acc[prop] = n[prop];
    }
    return acc;
    }, {})]

var legendData = (resultLegend.map(function(d){return [
  {"Instruction": "Functions", "count": d.Functions}, 
  {"Instruction": "Loops", "count": d.Loops}, 
  {"Instruction": "Movement", "count": d.Movement}, 
  {"Instruction": "PickDrop", "count": d.PickDrop} ];}))[0];
  
var legend = d3.select("#donut").append("svg")
  .attr("class", "legend")
  .selectAll("g")
  .data(legendData)
  .enter().append("g")
  .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

legend.append("text")
  .attr("x", 115)
  .attr("y", 40)
  .attr("dy", ".35em")
  .text(function(d) { return d.Instruction; });

legend.append("rect")
  .attr("x", 90)
  .attr("y", 33)
  .attr("width", 18)
  .attr("height", 18)
  .attr("fill", color)
  .style("fill", function(d, i) {
  return color(d.Instruction);
});



function updateDate(data){ //update data by date range (JQuery slider func above)
  updatePie(data, "level");
}

function updatePie(data, val = this.value) {
  var result = [data.reduce((acc, n) => {    //loop through data array objects and sum objects properties
    for (var prop in n) {
      if (acc.hasOwnProperty(prop)) acc[prop] += n[prop];
      else acc[prop] = n[prop];
      }
      return acc;
      }, {})]
    
var newData = result.map(function(d){return [
  {"Instruction": "Functions", "count": d.Functions}, 
  {"Instruction": "Loops", "count": d.Loops}, 
  {"Instruction": "Movement", "count": d.Movement}, 
  {"Instruction": "PickDrop", "count": d.PickDrop} ];})
var pieData = {"level":newData[0]}; //new filtered data to be used in path update func
var legendData = newData[0];
console.log(legendData);

//path update
// Join new data
const path = svg2.selectAll("path")
.data(pie(pieData[val]));

// Update existing arcs
path.transition().duration(200).attrTween("d", arcTween);

// Enter new arcs
path.enter().append("path")
    .attr("fill", (d, i) => color(i))
    .attr("d", arc)
    .attr("stroke", "white")
    .attr("stroke-width", "6px")
    .each(function(d) { this._current = d; });

}

updatePie(data.filter(function(d){return d.level == [selection2];}), "level");

            //** end of D3 script **//

                   },
                   simpleSheet: true } )
}
window.addEventListener('DOMContentLoaded', init)
//** end of tabletop init function **//