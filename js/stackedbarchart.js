//** tabletop init function **//
function init() {     
  Tabletop.init( { key: '10g_TGtruCriERlXJurPZQk76pvk30U0pkWgbbfzPrjA', //google sheet key
                   callback: function(data, tabletop) { 
                       console.log(data)
                       
//** D3 js script **//
//** D3 js script **//
var margin = { left:80, right:150, top:50, bottom:100 };

var width = 750 - margin.left - margin.right,
    height = 350 - margin.top - margin.bottom;

// filter user ID
    var data = data.filter(function(d){return d.ID == '10574525';});
    // Filter the data for the dropdown selector
    var elements2 = Object.keys(data[0])
        .filter(function(d){
            return ((d != "ID") & (d != "level") & (d != "date") & (d != "Best Solution") & (d != "Rounds") &
               (d != "Playtime (min)") & (d != "Success Probability") & (d != "Instructions")&
               (d != "avgL") & (d != "minL") & (d != "avgF") & (d != "minF") & (d != "avgM") &
               (d != "minM") & (d != "avgC") & (d != "minC") & (d != "avgP") & (d != "minP"));
        });
    var selection2 = elements2[0];

    console.log(elements2);

var g = d3.select("#barstacked")
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

    });

    var t = d3.transition().duration(750);


update2(data);

function update2(data){

                var selector = d3.select("#drop2") //dropdown change selection
        .append("select")
        .attr("id","dropdown")
        .on("change", function(d){
            selection2 = document.getElementById("dropdown");

            if(selection2.value == 'Loops'){
              var keys = ['Loops', 'minL', 'avgL'];
              var minLmax = d3.max(data, function(d) { return d.minL; })
              var avgLmax = d3.max(data, function(d) { return d.avgL; })
              y.domain([0, d3.max(data, function(d) { return d[selection2.value] + avgLmax + minLmax;})]);

            }
            else if(selection2.value == 'Functions'){
             var keys = ['Functions', 'minF', 'avgF']; 
              var minFmax = d3.max(data, function(d) { return d.minF; })
              var avgFmax = d3.max(data, function(d) { return d.avgF; })
              y.domain([0, d3.max(data, function(d) { return d[selection2.value] + avgFmax + minFmax;})]);
            }
            else if(selection2.value == 'Cycles'){
             var keys = ['Cycles', 'minC', 'avgC'];
              var minCmax = d3.max(data, function(d) { return d.minC; })
              var avgCmax = d3.max(data, function(d) { return d.avgC; })
              y.domain([0, d3.max(data, function(d) { return d[selection2.value] + avgCmax + minCmax;})]);
            }
            else if(selection2.value == 'PickDrop'){
             var keys = ['PickDrop', 'minP', 'avgP'];
                var minPmax = d3.max(data, function(d) { return d.minP; })
              var avgPmax = d3.max(data, function(d) { return d.avgP; })
              y.domain([0, d3.max(data, function(d) { return d[selection2.value] + avgPmax + minPmax;})]);
            }
            else if(selection2.value == 'Movement'){
             var keys = ['Movement', 'minM', 'avgM'];
             var minMmax = d3.max(data, function(d) { return d.minM; })
              var avgMmax = d3.max(data, function(d) { return d.avgM; })
              y.domain([0, d3.max(data, function(d) { return d[selection2.value] + avgMmax + minMmax;})]);
            }
  
  console.log(selection2.value)

  // Set domains and create viz
  
  
  z.domain(keys);

             // JOIN new data with old elements.
    var rects = g.selectAll("rect")
        .data(data, function(d){
            return d.level;
        });

                     // EXIT old elements not present in new data.
    rects.exit()
        .attr("fill", 'none')
    .transition(t)
        .attr("y", y(0))
        .attr("height", 0)
        .remove();
        // ENTER new elements present in new data...
rects.enter()
  g.append("g")
    .selectAll("g")
    .data(d3.stack().keys(keys)(data))
    .enter().append("g")
      .attr("fill", function(d) { return z(d.key); })
    .selectAll("rect")
    .data(function(d) { return d; })
    .enter().append("rect")
    // AND UPDATE old elements present in new data.
            .merge(rects)
            .transition(t)
      .attr("x", function(d) { return x(d.data.level); })
      .attr("y", function(d) { return y(d[1]); })
      .attr("height", function(d) { return y(d[0]) - y(d[1]); })
      .attr("width", x.bandwidth())

        

    // Y Axis
    var yAxisCall = d3.axisLeft(y)
        .tickFormat(function(d){ return d; });
    yAxisGroup.transition(t).call(yAxisCall);



}); 
        //get values for the dropdown
    selector.selectAll("option")
      .data(elements2)
      .enter().append("option")
      .attr("value", function(d){
        return d;
      })
      .text(function(d){
        return d;
      })

      x.domain(data.map(function(d) { return d.level; }));
    // X Axis
    var xAxisCall = d3.axisBottom(x);
    xAxisGroup.transition(t).call(xAxisCall).selectAll("text") 
            .style("text-anchor", "end")
            .attr("dx", "-.8em")
            .attr("dy", ".15em")
            .attr("transform", "rotate(-40)" 
                );;;
 // Y Axis
    var yAxisCall = d3.axisLeft(y)
        .tickFormat(function(d){ return d; });
    yAxisGroup.transition(t).call(yAxisCall);


}
let keys = ['Your Score', 'Min', 'Average'];
      var legend = g.append("g")
      .attr("font-family", "sans-serif")
      .attr("font-size", 10)
      .attr("text-anchor", "end")
    .selectAll("g")
    .data(keys)
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


            //** end of D3 script **//

                   },
                   simpleSheet: true } )
}
window.addEventListener('DOMContentLoaded', init)
//** end of tabletop init function **//