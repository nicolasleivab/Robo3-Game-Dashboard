//** Cal-heatmap library settings **//
//** tabletop init function **//
function init() {     
    Tabletop.init( { key: '10g_TGtruCriERlXJurPZQk76pvk30U0pkWgbbfzPrjA', //google sheet key
                     callback: function(data, tabletop) { 

const parseDate = d3.timeParse("%m/%d/%Y");
// Format data
data.forEach(function(d) {
	d["Success Probability"] = +d["Success Probability"];
	d.ID = +d.ID;
	d.date = parseDate(d.date);

    });

personCode = Number(personCode);
let newData = data.filter(function(d){return d.ID == personCode;});

function sumAll(arr) {
	let sums = {}, counts = {}, value = [], name;
	for (var i = 0; i < arr.length; i++) { //loop through array
		name = new Date(arr[i].date).valueOf()/1000;
		if (!(name in sums)) {
			sums[name] = 0;
			counts[name] = 0;
		}
		sums[name] += arr[i]['Success Probability'];
		counts[name]++;
		}
								
	for(name in sums) {
		value.push({ date: name, value: sums[name]}); //push elements to new array with averages per level
		}
		return value;
}

let newData2 = sumAll(newData);
			
var parser = function(data) {
							var stats = {};
							for (var d in data) {
								stats[data[d].date] = data[d].value;
							}
							return stats;
						};

var data2 = parser(newData2);

   var calendar = new CalHeatMap();
    calendar.init({	

    start: new Date(2019, 2),
	id : "graph_k",
	data: data2,
	domain : "month",
	subDomain : "x_day",
	range : 12,
	cellsize: 15,
	cellpadding: 300,
	cellradius: 15,
	domainGutter: 15,
	weekStartOnMonday: 0,
	scale: [40, 60, 80, 100]

});

},
simpleSheet: true } )
}
window.addEventListener('DOMContentLoaded', init)
//** end of tabletop init function **//