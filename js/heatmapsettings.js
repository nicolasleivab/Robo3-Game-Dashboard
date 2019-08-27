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
	let sums = {}, value = [], mapDate;
	for (var i = 0; i < arr.length; i++) { //loop through array
		mapDate = new Date(arr[i].date).valueOf()/1000; //new date in unix timestamp
		if (!(mapDate in sums)) {
			sums[mapDate] = 0; 
		}
		sums[mapDate] += arr[i]['Success Probability']; //sum of values per date
		}
								
	for(mapDate in sums) {
		value.push({ date: mapDate, value: sums[mapDate]}); //push elements to new array with dates and values
		}
		return value; //return array of objects
}

let newData2 = sumAll(newData);
			
var parser = function(data) { //calheatmap parser function
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