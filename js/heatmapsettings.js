//** Cal-heatmap library settings **//

const parseDate = d3.timeParse("%m/%d/%Y");
personCode = Number(personCode);
const mapFilteredData = data1.filter(function(d){return d.ID == personCode;});

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

const mapData = sumAll(mapFilteredData);
			
const parser = function(arr) { //calheatmap parser function
	var stats = {};
		for (var d in arr) {
			stats[arr[d].date] = arr[d].value;
			}
	return stats;
};

const formattedMapData = parser(mapData);

   const calendar = new CalHeatMap();
    calendar.init({	

    start: new Date(2019, 2),
	id : "graph_k",
	data: formattedMapData,
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