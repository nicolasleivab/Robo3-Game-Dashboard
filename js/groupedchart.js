/* Grouped Bar Chart JS */

//** tabletop init function **//
function init() {     
  Tabletop.init( { key: '1evjoQPchLR8iUhjQQ8i56hy6Df5z7K_eVSWs8yVugC4', //google sheet key
                   callback: function(data, tabletop) { 
                       


//** D3.js code **//

//* Filter and format data *//

    data.forEach(function(d) {
        d.ID = +d.ID;
        d.Functions = +d.Functions;
        d.Loops = +d.Loops;
        d.Movement = +d.Movement;
        d.PickDrop = +d.PickDrop;
        d.Cycles = +d.Cycles;
        d.Instructions = +d.Instructions;
        d.minL = +d.minL;
        d.avgL = +d.avgL;
        d.minF = +d.minF;
        d.avgF = +d.avgF;
        d.minC = +d.minC;
        d.avgC = +d.avgC; 
        d.minP = +d.minP;
        d.avgP = +d.avgP;
        d.minM = +d.minM;
        d.avgM = +d.avgM;	
        d.minI = +d.minI;
        d.avgI = +d.avgI;

    });

console.log(data)

var solution = ['Functions', 'Loops', 'Cycles', 'Movement', 'PickDrop', 'Instructions'];

var selected = solution[0];

//*Chart code*//

var svg = d3.select("#groupedchart"),
    margin = {top: 20, right: 120, bottom: 100, left: 100},
    width = 1200 - margin.left - margin.right,
    height = 350 - margin.top - margin.bottom,
    g = svg.append("svg").attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + ", " + margin.top + ")");

//Append and class for each axis to reuse later

var xAxisApp = g.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height +")");

var yAxisApp = g.append("g")
    .attr("class", "y2 axis");

//X and Y scales
var x0 = d3.scaleBand()
    .range([0, width])
    .padding(0.2);

var xFilter;

var x1 = d3.scaleBand()
    .range([0, x0.bandwidth() - 5])
    .padding(0.2);

var y2 = d3.scaleLinear()
    .range([height, 0]);

// Color scheme
var z = d3.scaleOrdinal().range(["#ccffcc","#ffb3b3", "#b3e6ff"])

//Transition
var t = d3.transition().duration(750);


// X and Y Labels

var xLabel = g.append("text")
    .attr("y", height + 50)
    .attr("x", width / 2)
    .attr("font-size", "20px")
    .attr("text-anchor", "middle")
    .attr("transform", "translate(" + margin.left + ", " + margin.top +  ")")
    .text("Level");

var yLabel2 = g.append("text")
    .attr("y", -60)
    .attr("x", -(height / 2))
    .attr("font-size", "20px")
    .attr("text-anchor", "middle")
    .attr("transform", "rotate(-90)")
    .text("Functions");


var dropSelector = d3.select("#drop2") //dropdown change selection
    .append("select")
    .attr("id","dropdown2");

//*Update Function*//

function update2(data){

dropSelector.on("change", function(d){
         selected = document.getElementById("dropdown2");
           
                console.log(selected.value);
            var xFilter = ['Loops', 'minL', 'avgL']; 
             //Filter for x1 variables and domain
            if(selected.value == 'Loops'){
              var xFilter = ['Loops', 'minL', 'avgL']; 
            }
            else if(selected.value == 'Functions'){
              var xFilter = ['Functions', 'minF', 'avgF'];
            }
            else if(selected.value == 'Cycles'){
              var xFilter = ['Cycles', 'minC', 'avgC'];
            }
            else if(selected.value == 'PickDrop'){
              var xFilter = ['PickDrop', 'minP', 'avgP'];
            }
            else if(selected.value == 'Movement'){
              var xFilter = ['Movement', 'minM', 'avgM'];
            }
            else if(selected.value == 'Instructions'){
              var xFilter = ['Instructions', 'minI', 'avgI'];
            }

  
    x1.domain(xFilter).rangeRound([0, x0.bandwidth()]);
    y2.domain([0, d3.max(data, function(d) { return d3.max(xFilter, function(key) { return d[key]; }); })]).nice(); 


//* Actual D3 update func *//

// Join new with old data.
var rects = g.selectAll("rect")
    .data(data, function(d){
        return d.level;
        });

// Exit old elements.
rects.exit()
    .attr("fill", 'none')
    .transition(t)
    .attr("y2", y2(0))
    .attr("height", 0)
    .remove();

// Enter new elements.
g.append("g")
            .selectAll("g")
            .data(data)
        rects.enter()
            .append("g")
            .attr("class","bar")
            .attr("transform", function(d) { return "translate(" + x0(d.level) + ",0)"; })
            .selectAll("rect")
            .data(function(d) { return xFilter.map(function(key) { return {key: key, value: d[key]}; }); })
            .enter().append("rect")
            .attr("x", function(d) { return x1(d.key); })
            .attr("y", function(d) { return y2(d.value); })
            .attr("width", x1.bandwidth())
        .merge(rects)
            .transition(t)
            .attr("height", function(d) { return height - y2(d.value); })
            .attr("fill", function(d) { return z(d.key); })
            .attr("width", x1.bandwidth());

console.log(data);
console.log(selected.value);


        d3.select("g.y2.axis")  //Changing from selectAll to select fix the y axis conflict
                .transition()
                .call(yAxisCall2).selectAll("text").attr("font-size", "15px");

                 yLabel2.text(selected.value);

//Legend

var legend = g.append("g")
            .attr("font-family", "sans-serif")
            .attr("font-size", 10)
            .attr("text-anchor", "end")
            .selectAll("g")
            .data(keysl)
            .enter().append("g")
            .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

        legend.append("rect")
            .attr("x", width + 80)
            .attr("width", 15)
            .attr("height", 15)
            .attr("fill", z)
            .attr("stroke", z)
            .attr("stroke-width",2)

});

//Get values for the dropdown (solutions)
dropSelector.selectAll("option")
      .data(solution)
      .enter().append("option")
      .attr("value", function(d){
        return d;
      })
      .text(function(d){
        return d;
      })

//* Run default visualization *// 

var keys = ['Functions', 'minF', 'avgF'];
x0.domain(data.map(function(d) { return d.level; }));
x1.domain(keys).rangeRound([0, x0.bandwidth()]);
y2.domain([0, d3.max(data, function(d) { return d3.max(keys, function(key) { return d[key]; }); })]).nice(); 

//Call X Axis
var xAxisCall = d3.axisBottom(x0);
    xAxisApp.transition(t).call(xAxisCall).selectAll("text") 
            .style("text-anchor", "end")
            .attr("dx", "-.8em")
            .attr("dy", ".15em")
            .attr("font-size", "15px")
            .attr("transform", "rotate(-40)" 
                );;;

// Call Y Axis
var yAxisCall2 = d3.axisLeft(y2)
        .tickFormat(function(d){ return d; });
        yAxisApp.transition(t).call(yAxisCall2).selectAll("text").attr("font-size", "15px");

g.append("g")
            .selectAll("g")
            .data(data)
            .enter().append("g")
            .attr("class","bar")
            .attr("transform", function(d) { return "translate(" + x0(d.level) + ",0)"; })
            .selectAll("rect")
            .data(function(d) { return keys.map(function(key) { return {key: key, value: d[key]}; }); })
            .enter().append("rect")
            .attr("x", function(d) { return x1(d.key); })
            .attr("y", function(d) { return y2(d.value); })
            .transition(t)
            .attr("width", x1.bandwidth())
            .attr("height", function(d) { return height - y2(d.value); })
            .attr("fill", function(d) { return z(d.key); });

//apend legend rects          
legend.append("rect")
    .attr("x", width + 80)
    .attr("width", 15)
    .attr("height", 15)
    .attr("fill", z)
    .attr("stroke", z)
    .attr("stroke-width",2)
}

//Legend Default
var keysl = ["Student's Solution", 'Min Solution', 'Average Solution']; 
var legend = g.append("g")
            .attr("font-family", "sans-serif")
            .attr("font-size", 10)
            .attr("text-anchor", "end")
            .selectAll("g")
            .data(keysl)
            .enter().append("g")
            .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

legend.append("text")
    .attr("x", width + 75)
    .attr("y", 9.5)
    .attr("dy", "0.32em")
    .text(function(d) { return d; });

//Run visualization for the first time
update2(data);

//student filter
$(document).ready(function() {
  $('#filter').click(function() {
            
    var studentID = document.getElementById('filterID').value;
    console.log(studentID);
    
    if(studentID > 9999999){
      
    g.selectAll("rect")       //removing rects to update according to filter
    .data(data, function(d){
        return d.level;
        }).exit()
    .attr("fill", 'none')
    .transition(t)
    .attr("y2", y2(0))
    .attr("height", 0)
    .attr('text')
    .remove();
    update2(data.filter(function(d){return d.ID == studentID;}))
      }
    else{
    alert('Please input a valid format like: 10574525');
    }
  });
});


//** end of D3.js code **//

                   },
                   simpleSheet: true } )
}
window.addEventListener('DOMContentLoaded', init)
//** end of tabletop init function **//