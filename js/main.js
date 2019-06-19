/*main js*/

//** tabletop init function **//
function init() {     
  Tabletop.init( { key: '10g_TGtruCriERlXJurPZQk76pvk30U0pkWgbbfzPrjA', //google sheet key
                   callback: function(data, tabletop) { 
                       console.log(data)
                       
//** D3 js script **//
var margin = { left:80, right:20, top:50, bottom:100 };

var width = 600 - margin.left - margin.right,
    height = 350 - margin.top - margin.bottom;

// filter user ID
    var data = data.filter(function(d){return d.ID == '10574525';});
    // Filter the data for the dropdown selector
    var elements = ['Rounds', 'Playtime (min)', 'Instructions'];
    var selection = elements[0];

    console.log(elements[0]);

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
    

var t = d3.transition().duration(750);
    
var g = d3.select("#chart-area")
    .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
    .append("g")
        .attr("transform", "translate(" + margin.left + ", " + margin.top + ")");

var xAxisGroup = g.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height +")");

var yAxisGroup = g.append("g")
    .attr("class", "y axis");

// X Scale
var x = d3.scaleBand()
    .range([0, width])
    .padding(0.2);

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




  
    

        
 
  

    // Run the vis for the first time
update(data);
    
    

function update(data) {

var selector = d3.select("#drop") //dropdown change selection
    .append("select")
    .attr("id","dropdown")
    .on("change", function(d){
         selection = document.getElementById("dropdown");
            y.domain([0, d3.max(data, function(d){return +d[selection.value];})]);
                console.log(selection.value);


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
                .attr("y", function(d){ return y(d[selection.value]); })
                .attr("height", function(d){ return height - y(d[selection.value]); });

                    d3.select("g.y.axis")  //changing from selectAll to select fixed the conflict between charts
                .transition()
                .call(yAxisCall).selectAll("text").attr("font-size", "12px");

             yLabel.text(selection.value);   

         });
//get values for the dropdown
    selector.selectAll("option")
      .data(elements)
      .enter().append("option")
      .attr("value", function(d){
        return d;
      })
      .text(function(d){
        return d;
      })
//* Run default viszualization *//


    x.domain(data.map(function(d){ return d.level }));
    y.domain([0, d3.max(data, function(d){return +d[selection];})]);
   
    // X Axis
    var xAxisCall = d3.axisBottom(x);
    xAxisGroup.transition(t).call(xAxisCall).selectAll("text") 
            .style("text-anchor", "end")
            .attr("dx", "-.8em")
            .attr("dy", ".15em")
            .attr("font-size", "12px")
            .attr("transform", "rotate(-40)" 
                );;;

    // Y Axis
    var yAxisCall = d3.axisLeft(y)
        .tickFormat(function(d){ return d; });
    yAxisGroup.transition(t).call(yAxisCall).selectAll("text").attr("font-size", "12px");


           
      g.selectAll("rect")
        .data(data, function(d){
        return d.level;
        }).enter()
            .append("rect")
            .attr("fill", "green")
            .attr("y", y(0))
            .attr("height", 0)
            .attr("x", function(d){ return x(d.level) })
            .attr("width", x.bandwidth)
            .transition(t)
                .attr("x", function(d){ return x(d.level) })
                .attr("width", x.bandwidth)
                .attr("y", function(d){ return y(d[selection]); })
                .attr("height", function(d){ return height - y(d[selection]); });

}



            //** end of D3 script **//

                   },
                   simpleSheet: true } )
}
window.addEventListener('DOMContentLoaded', init)
//** end of tabletop init function **//


