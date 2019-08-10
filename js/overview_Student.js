/*main js*/

//** tabletop init function **//
function init() {     
  Tabletop.init( { key: '10g_TGtruCriERlXJurPZQk76pvk30U0pkWgbbfzPrjA', //google sheet key
                   callback: function(data, tabletop) { 
                       
                       
//** D3 js script **//
var margin = { left:90, right:20, top:50, bottom:100 };

var width = 700 - margin.left - margin.right,
    height = 350 - margin.top - margin.bottom;

// filter user ID
var data = data.filter(function(d){return d.ID == '10574525';});
// Filter the data for the dropdown selector
var columns = ['Playtime (min)', 'Rounds', 'Instructions'];
var selection = columns[0];

// Clean data
data.forEach(function(d) {
    d.Rounds = +d.Rounds;
    d["Playtime (min)"] = +d["Playtime (min)"];
    d.Instructions = +d.Instructions;
    d.Functions = +d.Functions;
    d.Loops = +d.Loops;
    d.Movement = +d.Movement;
    d.PickDrop = +d.PickDrop;
    d["Success Probability"] = +d["Success Probability"];
    d.Cycles = +d.Cycles;
 
    });

var t = d3.transition().duration(750);
    
var g = d3.select("#chart-area")
    .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
    .append("g")
        .attr("transform", "translate(" + margin.left + ", " + margin.top + ")");

var xApp = g.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height +")");

var yApp = g.append("g")
    .attr("class", "y axis");

// X Scale
var x = d3.scaleBand()
    .range([0, width])
    .padding(0.35);

// Y Scale
var y = d3.scaleLinear()
    .range([height, 0]);

// X Label
g.append("text")
    .attr("y", height + 50)
    .attr("x", width / 2)
    .attr("font-size", "20px")
    .attr("text-anchor", "middle")
    .attr("transform", "translate(" + margin.left + ", " + margin.top +  ")")
    .text("Level");

// Y Label
var yLabel = g.append("text")
    .attr("y", -60)
    .attr("x", -(height / 2))
    .attr("font-size", "20px")
    .attr("text-anchor", "middle")
    .attr("transform", "rotate(-90)")
    .text("Rounds");
  

//update function    
function update(data) {

var t = d3.transition().duration(500);
x.domain(data.map(function(d){ return d.level }));
y.domain([0, d3.max(data, function(d){return d[selection.value] || d[selection];})]);

// JOIN new data with old elements.
var rects = g.selectAll("rect")
    .data(data, function(d){
        return d.level;
        });

             // EXIT old elements not present in new data.
rects.exit()
    .attr("fill", "green")
    .transition(t)
    .attr("y", y(0))
    .attr("height", 0)
    .remove();

// ENTER new elements present in new data...

             rects.enter()
        .append("rect")
            .attr("fill", "green")
            .attr("y", y(0))
            .attr("height", 0)
            .attr("x", function(d){ return x(d.level) })
            .attr("width", x.bandwidth)
            // AND UPDATE old elements present in new data.
            .merge(rects)
            .transition(t)
                .attr("x", function(d){ return x(d.level) })
                .attr("width", x.bandwidth)
                .attr("y", function(d){ return y(d[selection.value] || d[selection]); })
                .attr("height", function(d){ return height - y(d[selection.value] || d[selection]); });


// axis update
d3.select("g.y.axis")  
      .transition(t)
      .call(yCall).select("text").attr("font-size", "12px");
d3.select("g.x.axis")   //changing from selectAll to select fixed the conflict between charts
      .transition(t)
      .call(xCall).selectAll("text").style("text-anchor", "end").attr("font-size", "12px").attr("dx", "-.8em")
      .attr("dy", ".15em").attr("transform", "rotate(-40)");

yLabel.text(selection.value || selection);   

}
   
// X Axis call
var xCall = d3.axisBottom(x);
    xApp.transition(t).call(xCall).selectAll("text") 
        .style("text-anchor", "end")
        .attr("dx", "-.8em")
        .attr("dy", ".15em")
        .attr("font-size", "12px")
        .attr("transform", "rotate(-40)" 
        );;;

// Y Axis call
var yCall = d3.axisLeft(y)
        .tickFormat(function(d){ return d; });
        yApp.transition(t).call(yCall).selectAll("text").attr("font-size", "12px");


var selector = d3.select("#drop") //dropdown change selection
    .append("select")
    .attr("id","dropdown")
    .on("change", function(d){
         selection = document.getElementById("dropdown");
            y.domain([0, d3.max(data, function(d){return d[selection.value];})]);
                console.log(selection.value);
                update(data);
            

});

//get values for the dropdown
selector.selectAll("option")
.data(columns)
.enter().append("option")
.attr("value", function(d){
  return d;
})
.text(function(d){
  return d;
})

// Run the vis for the first time
update(data);



/* Donut chart */

var colors = {
  'pink': '#E1499A',
  'yellow': '#f0ff08',
  'green': '#47e495'
};

var color = colors.green;

var data = data.filter(function(d){return d.ID == '10574525';});
var data = data.filter(function(d){return d["Success Probability"] > 0;});

var completedLevels = d3.map(data, function(d){return(d.level)}).keys();



var radius = 75;
var border = 5;
var padding = 20;
var startPercent = 0;
var endPercent = ((completedLevels.length)/11);



var twoPi = Math.PI * 2;
var formatPercent = d3.format('.0%');
var boxSize = (radius + padding)*2;


var count = Math.abs((endPercent - startPercent) / 0.01);
var step = endPercent < startPercent ? -0.01 : 0.01;

var arc = d3.arc()
  .startAngle(0)
  .innerRadius(radius)
  .outerRadius(radius - border);

var parent = d3.select('#donut-area');

var svg2 = parent.append('svg')
  .attr('width', boxSize)
  .attr('height', boxSize);

var defs = svg2.append('defs');

var filter = defs.append('filter')
  .attr('id', 'blur');

filter.append('feGaussianBlur')
  .attr('in', 'SourceGraphic')
  .attr('stdDeviation', '7');

var g2 = svg2.append('g')
  .attr('transform', 'translate(' + boxSize / 2 + ',' + boxSize / 2 + ')')
  

var meter = g2.append('g')
  .attr('class', 'progress-meter');

meter.append('path')
  .attr('class', 'background')
  .attr('fill', '#ccc')
  .attr('fill-opacity', 0.5)
  .attr('d', arc.endAngle(twoPi));

var foreground = meter.append('path')
  .attr('class', 'foreground')
  .attr('fill', color)
  .attr('fill-opacity', 1)
  .attr('stroke', color)
  .attr('stroke-width', 5)
  .attr('stroke-opacity', 1)
  .attr('filter', 'url(#blur)');

var front = meter.append('path')
  .attr('class', 'foreground')
  .attr('fill', color)
  .attr('fill-opacity', 1);

var numberText = meter.append('text')
  .attr('fill', '#000')
  .attr('text-anchor', 'middle')
  .attr('dy', '.35em')
  .style('font', 'ZCOOL QingKe HuangYou');


function updateProgress(progress) {
  foreground.attr('d', arc.endAngle(twoPi * progress));
  front.attr('d', arc.endAngle(twoPi * progress));
  numberText.text(formatPercent(progress));
}

var progress = startPercent;

(function loops() {
  updateProgress(progress);

  if (count > 0) {
      count--;
      progress += step;
      setTimeout(loops, 10);
  }
})();


            //** end of D3 script **//

                   },
                   simpleSheet: true } )
}
window.addEventListener('DOMContentLoaded', init)
//** end of tabletop init function **//


