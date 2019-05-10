/*code adapted from Maggie Lee as an example*/

    
    var tsvData = null;
    var margin = {top: 80, right: 20, bottom: 50, left: 100},
        width = 600 - margin.left - margin.right, 
        height = 350 - margin.top - margin.bottom;
    var parseDate = d3.timeParse("%m/%d/%Y");
    var formatSi = d3.format(".3s");
    var formatNumber = d3.format(".1f"),
    formatBillion = function(x) { return formatNumber(x / 1e9); };
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

       
    d3.csv('data/stacked_area2.csv').then(function(data) {
        color.domain(d3.keys(data[0]).filter(function(key) { return key !== 'date'; }));
        
        var keys = data.columns.filter(function(key) { return key !== 'date'; })
        
        data.forEach(function(d) {
            d.date = parseDate(d.date); 
        });
        
      
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
            .call(xAxis).	selectAll("text") 
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
    });

  
   
