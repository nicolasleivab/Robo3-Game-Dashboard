//** tabletop init function **//
function init() {     
  Tabletop.init( { key: '10g_TGtruCriERlXJurPZQk76pvk30U0pkWgbbfzPrjA', //google sheet key
                   callback: function(data, tabletop) { 
                       console.log(data)
                       
//** D3 js script **//
// Filter user ID
    var data = data.filter(function(d){return d.ID == '10574525';});
// Create svg
var svg = d3.select("svg"),
    margin = {left:80, right:150, top:50, bottom:100},
    width = +svg.attr("width") - margin.left - margin.right,
    height = +svg.attr("height") - margin.top - margin.bottom,
    g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// X scale
var x = d3.scaleBand()
    .rangeRound([0, width])
    .padding(0.2)
    .align(0.1);

// Y scale
var y = d3.scaleLinear()
    .rangeRound([height, 0]);

// Scheme color
var z = d3.scaleOrdinal(d3.schemePastel1);;



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

  var keys = ['Functions', 'Loops', 'PickDrop', 'Movement'];

  // Set domains and create viz
  x.domain(data.map(function(d) { return d.level; }));
  y.domain([0, d3.max(data, function(d) { return d.Instructions; })]).nice();
  z.domain(keys);

  g.append("g")
    .selectAll("g")
    .data(d3.stack().keys(keys)(data))
    .enter().append("g")
      .attr("fill", function(d) { return z(d.key); })
    .selectAll("rect")
    .data(function(d) { return d; })
    .enter().append("rect")
      .attr("x", function(d) { return x(d.data.level); })
      .attr("y", function(d) { return y(d[1]); })
      .attr("height", function(d) { return y(d[0]) - y(d[1]); })
      .attr("width", x.bandwidth())
    .on("mouseover", function() { tooltip.style("display", null); })
    .on("mouseout", function() { tooltip.style("display", "none"); })
    .on("mousemove", function(d) {
      console.log(d);
      var xPosition = d3.mouse(this)[0] - 5;
      var yPosition = d3.mouse(this)[1] - 5;
      tooltip.attr("transform", "translate(" + xPosition + "," + yPosition + ")");
      tooltip.select("text").text(d[1]-d[0]);
    });

  g.append("g")
      .attr("class", "axis")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x)).selectAll("text") 
            .style("text-anchor", "end")
            .attr("dx", "-.8em")
            .attr("dy", ".15em")
            .attr("transform", "rotate(-40)" 
                );;;;

  g.append("g")
      .attr("class", "axis")
      .call(d3.axisLeft(y).ticks(null, "s"))
    .append("text")
      .attr("x", 2)
      .attr("y", y(y.ticks().pop()) + 0.5)
      .attr("dy", "0.32em")
      .attr("fill", "#000")
      .attr("font-weight", "bold")
      .attr("text-anchor", "start");

  var legend = g.append("g")
      .attr("font-family", "sans-serif")
      .attr("font-size", 10)
      .attr("text-anchor", "end")
    .selectAll("g")
    .data(keys.slice().reverse())
    .enter().append("g")
      .attr("transform", function(d, i) { return "translate(0," + i * 30 + ")"; });

  legend.append("rect")            //legend svgs
      .attr("x", width + 50)
      .attr("width", 19)
      .attr("height", 19)
      .attr("fill", z);

  legend.append("text")              // legend text
      .attr("x", width  + 45)
      .attr("y", 9.5)
      .attr("dy", "0.32em")
      .text(function(d) { return d; });


  // Tooltips
  var tooltip = svg.append("g")
    .attr("class", "tooltip")
    .style("display", "none");
      
  tooltip.append("rect")
    .attr("width", 60)
    .attr("height", 20)
    .attr("fill", "white")
    .style("opacity", 0.5);

  tooltip.append("text")
    .attr("x", 30)
    .attr("dy", "1.2em")
    .style("text-anchor", "middle")
    .attr("font-size", "12px")
    .attr("font-weight", "bold");


            //** end of D3 script **//

                   },
                   simpleSheet: true } )
}
window.addEventListener('DOMContentLoaded', init)
//** end of tabletop init function **//