/*donut-chart js*/

//** tabletop init function **//
function init() {     
  Tabletop.init( { key: '10g_TGtruCriERlXJurPZQk76pvk30U0pkWgbbfzPrjA', //google sheet key
                   callback: function(data, tabletop) { 
                       console.log(data)

                       //** D3 js script **//

var colors = {
    'pink': '#E1499A',
    'yellow': '#f0ff08',
    'green': '#47e495'
};

var color = colors.green;

var data = data.filter(function(d){return d.ID == '10574525';});
var levels = data.filter(function(d){return d["Success Probability"] > 0;});

console.log(levels.length);





var radius = 75;
var border = 5;
var padding = 20;
var startPercent = 0;
var endPercent = ((levels.length)/11);


var twoPi = Math.PI * 2;
var formatPercent = d3.format('.0%');
var boxSize = (radius + padding)*2;


var count = Math.abs((endPercent - startPercent) / 0.01);
var step = endPercent < startPercent ? -0.01 : 0.01;

var arc = d3.arc()
    .startAngle(0)
    .innerRadius(radius)
    .outerRadius(radius - border);

var parent = d3.select('#donut-area');

var svg = parent.append('svg')
    .attr('width', boxSize)
    .attr('height', boxSize);

var defs = svg.append('defs');

var filter = defs.append('filter')
    .attr('id', 'blur');

filter.append('feGaussianBlur')
    .attr('in', 'SourceGraphic')
    .attr('stdDeviation', '7');

var g = svg.append('g')
    .attr('transform', 'translate(' + boxSize / 2 + ',' + boxSize / 2 + ')')
    

var meter = g.append('g')
    .attr('class', 'progress-meter');

meter.append('path')
    .attr('class', 'background')
    .attr('fill', '#ccc')
    .attr('fill-opacity', 0.5)
    .attr('d', arc.endAngle(twoPi));

var foreground = meter.append('path')
    .attr('class', 'foreground')
    .attr('fill', color)
    .attr('fill-opacity', 1)
    .attr('stroke', color)
    .attr('stroke-width', 5)
    .attr('stroke-opacity', 1)
    .attr('filter', 'url(#blur)');

var front = meter.append('path')
    .attr('class', 'foreground')
    .attr('fill', color)
    .attr('fill-opacity', 1);

var numberText = meter.append('text')
    .attr('fill', '#000')
    .attr('text-anchor', 'middle')
    .attr('dy', '.35em')
    .style('font', 'ZCOOL QingKe HuangYou');


function updateProgress(progress) {
    foreground.attr('d', arc.endAngle(twoPi * progress));
    front.attr('d', arc.endAngle(twoPi * progress));
    numberText.text(formatPercent(progress));
}

var progress = startPercent;

(function loops() {
    updateProgress(progress);

    if (count > 0) {
        count--;
        progress += step;
        setTimeout(loops, 10);
    }
})();



                                   //** end of D3 script **//

                   },
                   simpleSheet: true } )
}
window.addEventListener('DOMContentLoaded', init)
//** end of tabletop init function **//