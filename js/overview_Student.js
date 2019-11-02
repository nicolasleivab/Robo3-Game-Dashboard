/*Overview Student*/
                       
//** D3 js script **//
const margin = { left:90, right:20, top:50, bottom:100 };

const width = 700 - margin.left - margin.right,
    height = 350 - margin.top - margin.bottom;

// Filter the data for the dropdown selector
const columns = ['Playtime (min)', 'Rounds', 'Instructions'];
let selection = columns[0];

const filteredData = data1.filter(function(d){return d["Success Probability"] > 0;}); //filter all data by succesful rounds
personCode = Number(personCode);
console.log(personCode);

// filter user ID
const newData = filteredData.filter(function(d){return d.ID == personCode;});
console.log(newData);

const t = d3.transition().duration(750);
    
const g = d3.select("#chart-area")
    .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
    .append("g")
        .attr("transform", "translate(" + margin.left + ", " + margin.top + ")");

const xApp = g.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height +")");

const yApp = g.append("g")
    .attr("class", "y axis");

// X Scale
const x = d3.scaleBand()
    .range([0, width])
    .padding(0.35);

// Y Scale
const y = d3.scaleLinear()
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
const yLabel = g.append("text")
    .attr("y", -60)
    .attr("x", -(height / 2))
    .attr("font-size", "20px")
    .attr("text-anchor", "middle")
    .attr("transform", "rotate(-90)")
    .text("Rounds");
  

//update function    
function update(newData) {

const t = d3.transition().duration(500);

// JOIN new data with old elements.
const rects = g.selectAll("rect")
    .data(newData, function(d){
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
                .attr("y", function(d){ return y(d[selection.value] || d[selection]); })
                .attr("height", function(d){ return height - y(d[selection.value] || d[selection]); });


// axis update
d3.select("g.y.axis")  
      .transition(t)
      .call(yCall).select("text").attr("font-size", "12px");
d3.select("g.x.axis")   //changing from selectAll to select fixed the conflict between charts
      .transition(t)
      .call(xCall).selectAll("text").style("text-anchor", "end").attr("font-size", "12px").attr("transform", "rotate(-40)");

yLabel.text(selection.value || selection);   

}

//XY domain
x.domain(newData.map(function(d){ return d.level }));
y.domain([0, d3.max(newData, function(d){return d[selection.value] || d[selection];})]);

// X Axis call
const xCall = d3.axisBottom(x);
    xApp.transition(t).call(xCall).selectAll("text") 
        .style("text-anchor", "end")
        .attr("dx", "-.8em")
        .attr("dy", ".15em")
        .attr("font-size", "12px")
        .attr("transform", "rotate(-40)" 
        );;;

// Y Axis call
const yCall = d3.axisLeft(y)
        .tickFormat(function(d){ return d; });
        yApp.transition(t).call(yCall).selectAll("text").attr("font-size", "12px");


const selector = d3.select("#drop") //dropdown change selection
    .append("select")
    .attr("id","dropdown")
    .on("change", function(d){
         selection = document.getElementById("dropdown");
            y.domain([0, d3.max(newData, function(d){return d[selection.value];})]);
                console.log(selection.value);
                update(newData);
            

});

//get values for the dropdown
selector.selectAll("option")
.data(columns)
.enter().append("option")
.attr("value", function(d){
  return d;
})
.text(function(d){
  return d;
})

// Run the vis for the first time
update(newData);



/* Donut chart */

const color = '#47e495';


const donutData = newData.filter(function(d){return d["Success Probability"] > 0;}); //Filter completed levels

const completedLevels = d3.map(donutData, function(d){return(d.level)}).keys(); //get each level name

const radius = 75;
const border = 5;
const padding = 20;
const startPercent = 0;
const endPercent = ((completedLevels.length)/11);

const twoPi = Math.PI * 2;
const formatPercent = d3.format('.0%');
const boxSize = (radius + padding)*2;

let count = Math.abs((endPercent - startPercent) / 0.01);   //count and step must be mutable
let step = endPercent < startPercent ? -0.01 : 0.01;

const arc = d3.arc()
  .startAngle(0)
  .innerRadius(radius)
  .outerRadius(radius - border);

const parent = d3.select('#donut-area');

const svg2 = parent.append('svg')
  .attr('width', boxSize)
  .attr('height', boxSize);

const defs = svg2.append('defs');

const filter = defs.append('filter')
  .attr('id', 'blur');

filter.append('feGaussianBlur')
  .attr('in', 'SourceGraphic')
  .attr('stdDeviation', '7');

const g2 = svg2.append('g')
  .attr('transform', 'translate(' + boxSize / 2 + ',' + boxSize / 2 + ')')
  

const meter = g2.append('g')
  .attr('class', 'progress-meter');

meter.append('path')
  .attr('class', 'background')
  .attr('fill', '#ccc')
  .attr('fill-opacity', 0.5)
  .attr('d', arc.endAngle(twoPi));

const foreground = meter.append('path')
  .attr('class', 'foreground')
  .attr('fill', color)
  .attr('fill-opacity', 1)
  .attr('stroke', color)
  .attr('stroke-width', 5)
  .attr('stroke-opacity', 1)
  .attr('filter', 'url(#blur)');

const front = meter.append('path')
  .attr('class', 'foreground')
  .attr('fill', color)
  .attr('fill-opacity', 1);

const numberText = meter.append('text')
  .attr('fill', '#000')
  .attr('text-anchor', 'middle')
  .attr('dy', '.35em')
  .style('font', 'ZCOOL QingKe HuangYou');

//update function adapted from Nam Nguyen https://codepen.io/hoangnam/pen/VLXBPq
function updateProgress(progress) {
  foreground.attr('d', arc.endAngle(twoPi * progress));
  front.attr('d', arc.endAngle(twoPi * progress));
  numberText.text(formatPercent(progress));
}

let progress = startPercent;

(function loops() {
  updateProgress(progress);

  if (count > 0) {
      count--;
      progress += step;
      setTimeout(loops, 10);
  }
})();


