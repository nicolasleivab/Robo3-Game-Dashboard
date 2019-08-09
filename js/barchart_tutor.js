/*Barchart tutor js*/

//** tabletop init function **//
function init() {     
    Tabletop.init( { key: '10g_TGtruCriERlXJurPZQk76pvk30U0pkWgbbfzPrjA', //google sheet key
                     callback: function(data, tabletop) { 
                         
                         
  //** D3 js script **//
  var margin = { left:40, right:20, top:30, bottom:100 };
  
  var width = 700 - margin.left - margin.right,
      height = 400 - margin.top - margin.bottom;
    
  var parseDate = d3.timeParse("%m/%d/%Y");
  var formatTime = d3.timeFormat("%d/%m/%Y");

  // Format data
  data.forEach(function(d) {
      d["Success Probability"] = +d["Success Probability"];
      d.date = parseDate(d.date);
      d.Instructions = +d.Instructions
      });
  
  console.log(data);
  
  var t = d3.transition().duration(750);
      
  var g2 = d3.select("#barchart_tutor")
      .append("svg")
          .attr("width", width + margin.left + margin.right)
          .attr("height", height + margin.top + margin.bottom)
      .append("g")
          .attr("transform", "translate(" + margin.left + ", " + margin.top + ")");
  
  var xApp2 = g2.append("g")
      .attr("class", "x2 axis")
      .attr("transform", "translate(0," + height +")");
  
  var yApp2 = g2.append("g")
      .attr("class", "y2 axis");
  
  // X Scale
  var x2 = d3.scaleBand()
      .range([0, width])
      .padding(0.5);
  
  // Y Scale
  var y2 = d3.scaleLinear()
      .range([height, 0]);
  
  // X Label
g2.append("text")
      .attr("y2", height + 50)
      .attr("x2", width / 2)
      .attr("font-size", "20px")
      .attr("text-anchor", "end")
      .attr("transform", "translate(" + margin.left + ", " + margin.top +  ")")
      .text("");
  
  // Y Label
g2.append("text")
      .attr("y2", -60)
      .attr("x2", -(height / 2))
      .attr("font-size", "20px")
      .attr("text-anchor", "end")
      .attr("transform", "rotate(-90)")
      .text("");
    
  
  //update function    
  function update3(data) {
  
  var t = d3.transition().duration(500);
  x2.domain(data.map(function(d){ return d.level }));
  y2.domain([0, d3.max(data, function(d){return d.Instructions;})]);
  
  // JOIN new data with old elements.
  var rects = g2.selectAll("rect")
      .data(data, function(d){
          return d.level;
          });
  
               // EXIT old elements not present in new data.
  rects.exit()
      .attr("fill", "green")
      .transition(t)
      .attr("y", y2(0))
      .attr("height", 0)
      .remove();
  
  // ENTER new elements present in new data...
  
               rects.enter()
          .append("rect")
              .attr("fill", "green")
              .attr("y", y2(0))
              .attr("height", 0)
              .attr("x", function(d){ return x2(d.level) })
              .attr("width", x2.bandwidth)
              // AND UPDATE old elements present in new data.
              .merge(rects)
              .transition(t)
                  .attr("x", function(d){ return x2(d.level) })
                  .attr("width", x2.bandwidth)
                  .attr("y", function(d){ return y2(d.Instructions); })
                  .attr("height", function(d){ return height - y2(d.Instructions); });
  
  
  // axis update
  d3.select("g.y2.axis")  
        .transition(t)
        .call(yCall2).select("text").attr("font-size", "12px");
  d3.select("g.x2.axis")   //changing from selectAll to select fixed the conflict between charts
        .transition(t)
        .call(xCall2).selectAll("text").style("text-anchor", "end").attr("font-size", "12px").attr("dx", "-.8em")
        .attr("dy", ".15em").attr("transform", "rotate(-40)");  
  
  }
 

     
  // X Axis call
  var xCall2 = d3.axisBottom(x2);
      xApp2.transition(t).call(xCall2).selectAll("text") 
          .style("text-anchor", "end")
          .attr("dx", "-.8em")
          .attr("dy", ".15em")
          .attr("font-size", "12px")
          .attr("transform", "rotate(-40)" 
          );;;
  
  // Y Axis call
  var yCall2 = d3.axisLeft(y2)
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
  
  