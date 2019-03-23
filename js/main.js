/*main js*/

//** tabletop init function **//
function init() {     
  Tabletop.init( { key: '10g_TGtruCriERlXJurPZQk76pvk30U0pkWgbbfzPrjA', //google sheet key
                   callback: function(data, tabletop) { 
                       console.log(data)
                       
//** D3 js script **//
var margin = { left:80, right:20, top:50, bottom:100 };

var width = 600 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;
    
var g = d3.select("#chart-area")
    .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
    .append("g")
        .attr("transform", "translate(" + margin.left + ", " + margin.top + ")"); //translating our chart

// X Label
g.append("text")
    .attr("y", height + 50)
    .attr("x", width / 2)
    .attr("font-size", "20px")
    .attr("text-anchor", "middle") //align
    .attr("transform", "translate(" + margin.left + ", " + margin.top +  ")")
    .text("Level");

// Y Label
g.append("text")
    .attr("y", -60)
    .attr("x", -(height / 2))
    .attr("font-size", "20px")
    .attr("text-anchor", "middle") //align
    .attr("transform", "rotate(-90)") //rotate label along y scale
    .text("Played Time");


     

    // Clean data: string to integer
    data.forEach(function(d) {
        d.sumtime = +d.sumtime; d.num = +d.num;
    });
console.log(data);

const MAX = d3.max(data, function(d) { return d.sumtime }); // assigning d3.max to MAX constant

    // X Scale
    var x = d3.scaleBand()
        .domain(data.map(function(d){ return d.level })) // data.map to get the domain of our x in scaleBand 
        .range([0, width])
        .padding(0.3);

    // Y Scale
    var y = d3.scaleLinear()
        .domain([0, MAX])
        .range([height, 0]);

    // X Axis
    var xAxisCall = d3.axisBottom(x);
    g.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height +")")
        .call(xAxisCall)
        .selectAll("text") 
            .style("text-anchor", "end")
            .attr("dx", "-.8em")
            .attr("dy", ".15em")
            .attr("transform", "rotate(-40)");

    // Y Axis
    var yAxisCall = d3.axisLeft(y)
        .tickFormat(function(d){ return d + "min"; });
    g.append("g")
        .attr("class", "y axis")
        .call(yAxisCall);

    // Bars
    var rects = g.selectAll("rect")
        .data(data);
        
    rects.enter()
        .append("rect")
            .attr("class", "bars")
            .attr("y", function(d){ return y(d.sumtime); })
            .attr("x", function(d){ return x(d.level) })
            .attr("height", function(d){ return height - y(d.sumtime); })
            .attr("width", x.bandwidth)
            .attr("fill", "#00994d");

            //** end of D3 script **//

                   },
                   simpleSheet: true } )
}
window.addEventListener('DOMContentLoaded', init)
//** end of tabletop init function **//


