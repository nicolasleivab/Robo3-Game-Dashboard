/* Grouped Bar Chart JS */

//* Filter and format data *//

data2.forEach(function(d) {
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

//load default personCode for the tutor page
if (personCode != null && personCode != undefined){
  personCode = personCode;
} else {
  personCode = 10574525;
}
// filter user ID
const groupData = data2.filter(function(d){return d.ID == personCode;});

console.log(groupData)

const solution = ['Functions', 'Loops', 'Cycles', 'Movement', 'PickDrop', 'Instructions'];

let selected = solution[0];

//*Chart code*//

const svg3 = d3.select("#groupedchart"),
    margin3 = {top: 20, right: 120, bottom: 100, left: 100},
    width3 = 1200 - margin3.left - margin3.right,
    height3 = 350 - margin3.top - margin3.bottom,
    g3 = svg3.append("svg").attr("width", width3 + margin3.left + margin3.right)
        .attr("height", height3 + margin3.top + margin3.bottom)
        .append("g")
        .attr("transform", "translate(" + margin3.left + ", " + margin3.top + ")");

//Append and class for each axis to reuse later

const xAxisApp = g3.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height3 +")");

const yAxisApp = g3.append("g")
    .attr("class", "y2 axis");

//X and Y scales
const x0 = d3.scaleBand()
    .range([0, width3])
    .padding(0.2);

const x1 = d3.scaleBand()
    .range([0, x0.bandwidth() - 5])
    .padding(0.2);

const y2 = d3.scaleLinear()
    .range([height3, 0]);

// Color scheme
const z = d3.scaleOrdinal().range(["#ccffcc","#ffb3b3", "#b3e6ff"])

// X and Y Labels
const xLabel = g3.append("text")
    .attr("y", height3 + 50)
    .attr("x", width3 / 2)
    .attr("font-size", "20px")
    .attr("text-anchor", "middle")
    .attr("transform", "translate(" + margin3.left + ", " + margin3.top +  ")")
    .text("Level");

const yLabel2 = g3.append("text")
    .attr("y", -60)
    .attr("x", -(height3 / 2))
    .attr("font-size", "20px")
    .attr("text-anchor", "middle")
    .attr("transform", "rotate(-90)")
    .text("Functions");


const dropSelector = d3.select("#drop2") //dropdown change selection
    .append("select")
    .attr("id","dropdown2");

//*Update Function*//

function update2(groupData){

dropSelector.on("change", function(d){
         selected = document.getElementById("dropdown2");
           
                console.log(selected.value);
            let xFilter = ['Loops', 'minL', 'avgL']; 
             //Filter for x1 variables and domain
            if(selected.value == 'Loops'){
              xFilter = ['Loops', 'minL', 'avgL']; 
            }
            else if(selected.value == 'Functions'){
              xFilter = ['Functions', 'minF', 'avgF'];
            }
            else if(selected.value == 'Cycles'){
              xFilter = ['Cycles', 'minC', 'avgC'];
            }
            else if(selected.value == 'PickDrop'){
              xFilter = ['PickDrop', 'minP', 'avgP'];
            }
            else if(selected.value == 'Movement'){
              xFilter = ['Movement', 'minM', 'avgM'];
            }
            else if(selected.value == 'Instructions'){
              xFilter = ['Instructions', 'minI', 'avgI'];
            }

  
    x1.domain(xFilter).rangeRound([0, x0.bandwidth()]);
    y2.domain([0, d3.max(groupData, function(d) { return d3.max(xFilter, function(key) { return d[key]; }); })]).nice(); 


//* Actual D3 update func *//

// Join new with old data.
const rects = g3.selectAll("rect")
    .data(groupData, function(d){
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
g3.append("g")
            .selectAll("g")
            .data(groupData)
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
            .attr("height", function(d) { return height3 - y2(d.value); })
            .attr("fill", function(d) { return z(d.key); })
            .attr("width", x1.bandwidth());

console.log(groupData);
console.log(selected.value);


        d3.select("g.y2.axis")  //Changing from selectAll to select fix the y axis conflict
                .transition()
                .call(yAxisCall2).selectAll("text").attr("font-size", "15px");

                 yLabel2.text(selected.value);

//Legend

const legend = g3.append("g")
            .attr("font-family", "sans-serif")
            .attr("font-size", 10)
            .attr("text-anchor", "end")
            .selectAll("g")
            .data(keysl)
            .enter().append("g")
            .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

        legend.append("rect")
            .attr("x", width3 + 80)
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

const keys = ['Functions', 'minF', 'avgF'];
x0.domain(groupData.map(function(d) { return d.level; }));
x1.domain(keys).rangeRound([0, x0.bandwidth()]);
y2.domain([0, d3.max(groupData, function(d) { return d3.max(keys, function(key) { return d[key]; }); })]).nice(); 

//Call X Axis
const xAxisCall = d3.axisBottom(x0);
    xAxisApp.transition(t).call(xAxisCall).selectAll("text") 
            .style("text-anchor", "end")
            .attr("dx", "-.8em")
            .attr("dy", ".15em")
            .attr("font-size", "15px")
            .attr("transform", "rotate(-40)" 
                );;;

// Call Y Axis
const yAxisCall2 = d3.axisLeft(y2)
        .tickFormat(function(d){ return d; });
        yAxisApp.transition(t).call(yAxisCall2).selectAll("text").attr("font-size", "15px");

g3.append("g")
            .selectAll("g")
            .data(groupData)
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
            .attr("height", function(d) { return height3 - y2(d.value); })
            .attr("fill", function(d) { return z(d.key); });

//apend legend rects          
legend.append("rect")
    .attr("x", width3 + 80)
    .attr("width", 15)
    .attr("height", 15)
    .attr("fill", z)
    .attr("stroke", z)
    .attr("stroke-width",2)
}

//Legend Default
const keysl = ["Student's Solution", 'Min Solution', 'Average Solution']; 
const legend = g3.append("g")
            .attr("font-family", "sans-serif")
            .attr("font-size", 10)
            .attr("text-anchor", "end")
            .selectAll("g")
            .data(keysl)
            .enter().append("g")
            .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

legend.append("text")
    .attr("x", width3 + 75)
    .attr("y", 9.5)
    .attr("dy", "0.32em")
    .text(function(d) { return d; });

//Run visualization for the first time
update2(groupData);

//student filter
function filterStudent(){
            
    let studentID = Number(document.getElementById('filterID').value);
    console.log(studentID);

    if(studentsArray.includes(studentID)){
      g3.selectAll("rect")       //removing old rects
      .data(data2, function(d){
          return d.level;
          }).exit()
      .attr("fill", 'none')
      .transition(t)
      .attr("y2", y2(0))
      .attr("height", 0)
      .attr('text')
      .remove();
      update2(data2.filter(function(d){return d.ID == studentID;})) //enter new rects for the new filtered student 

      } else {
      alert("'Please input a valid Person Code (10574525, 11336789, 15678900 or 12341234)'")//error message and list of students  
      }
};
//event listener for tutor.html
document.getElementById('filter').addEventListener('click', filterStudent);
