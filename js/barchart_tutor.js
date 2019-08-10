/*Barchart tutor js*/

//** tabletop init function **//
function init() {     
    Tabletop.init( { key: '10g_TGtruCriERlXJurPZQk76pvk30U0pkWgbbfzPrjA', //google sheet key
                     callback: function(data, tabletop) { 
                         
                         
//** D3 js script **//
const margin = { left:90, right:20, top:30, bottom:100 };
  
const width = 800 - margin.left - margin.right,
      height = 400 - margin.top - margin.bottom;
    
const parseDate = d3.timeParse("%m/%d/%Y");
const formatTime = d3.timeFormat("%d/%m/%Y");

// Format data
data.forEach(function(d) {
    d["Success Probability"] = +d["Success Probability"];
    d.date = parseDate(d.date);
    d.Instructions = +d.Instructions
    });
 
let t = d3.transition().duration(750);
      
const g2 = d3.select("#barchart_tutor")
      .append("svg")
          .attr("width", width + margin.left + margin.right)
          .attr("height", height + margin.top + margin.bottom)
      .append("g")
          .attr("transform", "translate(" + margin.left + ", " + margin.top + ")");
  
const xApp2 = g2.append("g")
      .attr("class", "x2 axis")
      .attr("transform", "translate(0," + height +")");
  
const yApp2 = g2.append("g")
      .attr("class", "y2 axis");
  
// X Scale
const x2 = d3.scaleBand()
      .range([0, width])
      .padding(0.5);
  
// Y Scale
const y3 = d3.scaleLinear()
      .range([height, 0]);
  
  // X Label
g2.append("text")
      .attr("y", height + 60)
      .attr("x", width / 2)
      .attr("font-size", "20px")
      .attr("text-anchor", "end")
      .attr("transform", "translate(" + margin.left + ", " + margin.top +  ")")
      .text("Level");
  
  // Y Label
g2.append("text")
      .attr("y",  - 60)
      .attr("x", -50)
      .attr("font-size", "20px")
      .attr("text-anchor", "end")
      .attr("transform", "rotate(-90)")
      .text("Probability of Success");
    
  
  //update function    
function update3(data) {
  
let t = d3.transition().duration(500);
x2.domain(data.map(function(d){ return d.level }));
y3.domain([0, d3.max(data, function(d){return d.Instructions;})]);
  
// JOIN new data with old elements.
const rects = g2.selectAll("rect")
    .data(data, function(d){
        return d.level;
        });
  
               // EXIT old elements not present in new data.
rects.exit()
    .attr("fill", "green")
    .transition(t)
    .attr("y3", y3(0))
    .attr("height", 0)
    .remove();
  
  // ENTER new elements present in new data...
  
rects.enter()
    .append("rect")
        .attr("fill", "green")
        .attr("y3", y3(0))
        .attr("height", 0)
        .attr("x", function(d){ return x2(d.level) })
        .attr("width", x2.bandwidth)
        // AND UPDATE old elements present in new data.
            .merge(rects)
            .transition(t)
                .attr("x", function(d){ return x2(d.level) })
                .attr("width", x2.bandwidth)
                .attr("y", function(d){ return y3(d.Instructions); })
                .attr("height", function(d){ return height - y3(d.Instructions); });
  
  
  // axis update
d3.select("g.y3.axis")  
        .transition(t)
        .call(yCall2).select("text").attr("font-size", "12px");
d3.select("g.x2.axis")   
        .transition(t)
        .call(xCall2).selectAll("text").style("text-anchor", "end").attr("font-size", "12px").attr("dx", "-.8em")
        .attr("dy", ".15em").attr("transform", "rotate(-40)");  
  
  }
 

     
// X Axis call
const xCall2 = d3.axisBottom(x2);
    xApp2.transition(t).call(xCall2).selectAll("text") 
        .style("text-anchor", "end")
        .attr("dx", "-.8em")
        .attr("dy", ".15em")
        .attr("font-size", "12px")
        .attr("transform", "rotate(-40)" 
        );;;
  
// Y Axis call
const yCall2 = d3.axisLeft(y3)
          .tickFormat(function(d){ return d; });
          yApp2.transition(t).call(yCall2).selectAll("text").attr("font-size", "12px");
  

// Run the vis for the first time
update3(data);


              //** end of D3 script **//
  
                    },
                    simpleSheet: true } )
}
window.addEventListener('DOMContentLoaded', init)
  //** end of tabletop init function **//
  
  