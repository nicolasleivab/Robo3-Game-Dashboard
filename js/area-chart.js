/*area-chart js*/

//** tabletop init function **//
function init() {     
  Tabletop.init( { key: '10g_TGtruCriERlXJurPZQk76pvk30U0pkWgbbfzPrjA', //google sheet key
                   callback: function(data, tabletop) { 
                       console.log(data)
                       
//** D3 js script **//


    
    var tsvData = null;
    var margin = {top: 80, right: 20, bottom: 50, left: 100},
        width = 600 - margin.left - margin.right, 
        height = 350 - margin.top - margin.bottom;
    var parseDate = d3.timeParse("%m/%d/%Y");
    
   
    var x = d3.scaleTime()
        .range([0, width]);
    var y = d3.scaleLinear()
        .range([height, 0]);
    var color = d3.scaleOrdinal(d3.schemeCategory10);
    var xAxis = d3.axisBottom()
        .scale(x);
    var yAxis2 = d3.axisLeft()
        .scale(y)
        .ticks(10);
    var area = d3.area()
        .x(function(d) { return x(d.data.date); })
        .y0(function(d) { return y(d[0]); })
        .y1(function(d) { return y(d[1]); });
    var stack = d3.stack()
    var svg = d3.select('#stacked-chart').append('svg')
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)
        .append('g')
        .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

var data = data.filter(function(d){return d.ID == '10574525';});

       
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
        d["Best Solution"] = +d["Best Solution"];
    });

        color.domain(d3.keys(data[0]).filter(function(key) { return key !== 'date'; }));
        
        var keys = ['Cycles', 'Best Solution'];
        
        data.forEach(function(d) {
            d.date = parseDate(d.date); 
        });
        console.log(data);
        console.log(keys);
      
        // Set domains for axes
        x.domain(d3.extent(data, function(d) { return d.date; }));
        y.domain([0, 100])
        stack.keys(keys);
        stack.order(d3.stackOrderNone);
        stack.offset(d3.stackOffsetNone);
        var browser = svg.selectAll('.browser')
            .data(stack(data))
            .enter().append('g')
            .attr('class', function(d){ return 'browser ' + d.key; })
            .attr('fill-opacity', 0.5);
        browser.append('path')
            .attr('class', 'area')
            .attr('d', area)
            .style('fill', function(d) { return color(d.key); });
        browser.append('text')
            .datum(function(d) { return d; })
            .attr('transform', function(d) { 
                return 'translate(' + x(data[12].date) + ',' + y(d[11][1]) + ')'; 
            })
            .attr('x', -6) 
            .attr('dy', '.35em')
            .style("text-anchor", "start")
            .text(function(d) { return d.key; })
                .attr('fill-opacity', 1);
        svg.append('g')
            .attr('class', 'x axis')
            .attr('transform', 'translate(0,' + height + ')')
            .call(xAxis).   selectAll("text") 
            .style("text-anchor", "end")
            .attr("dx", "-.8em")
            .attr("dy", ".15em")
            .attr("transform", "rotate(-40)" 
                );;;
        svg.append('g')
            .attr('class', 'y axis')
            .call(yAxis2);
        svg.append ("text")
            .attr("x", 0-margin.left)
            .attr("y", -60)
            .attr("x", -(height / 2))
            .attr("text-anchor", "middle")
            .attr("transform", "rotate(-90)")
            .text("Cycles")
    


            //** end of D3 script **//

                   },
                   simpleSheet: true } )
}
window.addEventListener('DOMContentLoaded', init)
//** end of tabletop init function **//
   