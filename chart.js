

   function drawChart(data) { 
var category = [];
for (i = 0; i < data.length; i++) {
  category.push(data[i].level);
    
}
data.forEach(function(d){d.qty = +d.qty;});        // passing values from string to integer
       var max=d3.max(data, function(data) { return data.qty; }); 
var margin = {top: 20, right: 5, bottom: 30, left: 40},
    width = 500 - margin.left - margin.right,
    height = 250 - margin.top - margin.bottom;
var x = d3.scale.ordinal()
    .rangeRoundBands([0, width], .25)
    .domain(category);
var y = d3.scale.linear()
    .range([height, 0])
    .domain([0, max]); //input scale
var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");
var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left")
    .ticks(10);
var svg = d3.select("body").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis);
       
             var g=0;
//***grid-lines***//
       for (g = 0; g < (max+1) ; g=g+ Math.round(max/10)) { 
           svg.append("line")
    .attr("x1", 0)
    .attr("y1", function() { return y(g) })
    .attr("x2", width)
    .attr("y2", function() { return y(g) })
    .attr("class","limit-line");
   }
 //***//    
      
  svg.append("g")
      .attr("class", "y axis")
      .call(yAxis)
    .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end");
      //.text("Hlasy");
  
      svg.selectAll(".bar-chart")
      .data(data)
    .enter().append("rect")
      .attr("class", function(d) {return "bar new " + d.shortname})
      .attr("x", function(d) { return x(d.level); })
      .attr("width", x.rangeBand())
      .attr("y", function(d) { return y(d.qty); })
      .attr("height", function(d) { return height - y(d.qty); })
      .attr("title",function(d) {title = "times played " + (d.qty); return title;});
  
}
console.log(data);