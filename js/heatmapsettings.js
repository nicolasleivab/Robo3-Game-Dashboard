//** Cal-heatmap library settings **//

   var calendar = new CalHeatMap();
    calendar.init({	

    start: new Date(2019, 5),
	id : "graph_k",
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