/* Stacked Area Chart JS */

//** tabletop init function **//
function init() {     
  Tabletop.init( { key: '10g_TGtruCriERlXJurPZQk76pvk30U0pkWgbbfzPrjA', //google sheet key
                   callback: function(data, tabletop) { 
                       console.log(data)


//* Filter and format data *//
var data = data.filter(function(d){return d.ID == '10574525';});

var parseDate = d3.timeParse("%m/%d/%Y");

    data.forEach(function(d) {
        d.date = parseDate(d.date);
        d['Best Solution'] = d['Best Solution'];
        d.Cycles = +d.Cycles;


    });

 var levels = d3.map(data, function(d){return(d.level)}).keys();

 var selection = levels[0];


 //*Chart code*//

var svg = d3.select("#area-chart"),
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
        .attr("class", "y axis");
    

//X and Y scales
var x = d3.scaleTime()
    .range([0, width])

var y = d3.scaleLinear()
    .range([height, 0]);

var area = d3.area()
        .x(function(d) { return x(d.data.date); })
        .y0(function(d) { return y(d[0]); })
        .y1(function(d) { return y(d[1]); });

var stack = d3.stack()



var keys = ['Cycles', 'Best Solution'];


          // Run the vis for the first time
    update(data);


function update(data) {


              var selector = d3.select("#drop") //dropdown change selection
        .append("select")
        .attr("id","dropdown")
        .on("change", function(d){
            selection2 = document.getElementById("dropdown");

        color.domain(d3.keys(data[0]).filter(function(key) { return key !== 'date'; }));
        
            y.domain([0, d3.max(data, function(d){return +d[selection2.value];})]);
                                           console.log(selection2.value);




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

    x.domain(data.map(function(d){ return d.level }));

    // X Axis
    var xAxisCall = d3.axisBottom(x);
    xAxisApp.transition(t).call(xAxisCall).selectAll("text") 
            .style("text-anchor", "end")
            .attr("dx", "-.8em")
            .attr("dy", ".15em")
            .attr("transform", "rotate(-40)" 
                );;;

    // Y Axis
    var yAxisCall = d3.axisLeft(y)
        .tickFormat(function(d){ return d; });
    yAxisApp.transition(t).call(yAxisCall);


}


            //** end of D3 script **//

                   },
                   simpleSheet: true } )
}
window.addEventListener('DOMContentLoaded', init)
//** end of tabletop init function **//