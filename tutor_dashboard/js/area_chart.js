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

// Color scheme
var z = d3.scaleOrdinal().range(["#ccffcc","#ffb3b3"])

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

        z.domain(d3.keys(data[0]).filter(function(key) { return key !== 'date'; }));
        
            y.domain([0, d3.max(data, function(d){return +d[selection2.value];})]);
                                           console.log(selection2.value);
        
     
        console.log(data);
        console.log(keys);
      
// Set domains for axes
 x.domain(d3.extent(data, function(d) { return d.date; }));
        
    stack.keys(keys);
    stack.order(d3.stackOrderNone);
    stack.offset(d3.stackOffsetNone);

//Join
var browser = g.selectAll('.browser')
            .data(stack(data))
            .enter().append('g')
            .attr('class', function(d){ return 'browser ' + d.key; })
            .attr('fill-opacity', 0.5);

//Exit old elements
browser.exit()
    .attr("fill", function(d) { return color(d.key); })
    .transition(t)
        .attr("y", y(0))
        .attr("height", 0)
        .remove();

       // ENTER new elements present in new data...
browser.enter()
        .append('path')
            .attr('class', 'area')
            .attr('d', area)
            .style('fill', function(d) { return color(d.key); });
        browser.append('text')
            .datum(function(d) { return d; })
            .attr('transform', function(d) { 
                return 'translate(' + x(data[12].date) + ',' + y(d[11][1]) + ')'; 
            }) //Update
            .merge(browser)
            .transition(t)
            .attr("x", function(d){ return x(data[12].date) })
            .attr("y", function(d){ return y(d[11][1][selection2.value]) })
            .attr('dy', '.35em')
            .style("text-anchor", "start")
            .text(function(d) { return d.key; })
                .attr('fill-opacity', 1);
        g.append('g')
            .attr('class', 'x axis')
            .attr('transform', 'translate(0,' + height + ')')
            .call(xAxis).   selectAll("text") 
            .style("text-anchor", "end")
            .attr("dx", "-.8em")
            .attr("dy", ".15em")
            .attr("transform", "rotate(-40)" 
                );;;
        g.append('g')
            .attr('class', 'y axis')
            .call(yAxis);
        g.append ("text")
            .attr("x", 0-margin.left)
            .attr("y", -60)
            .attr("x", -(height / 2))
            .attr("text-anchor", "middle")
            .attr("transform", "rotate(-90)")
            .text("Cycles")




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