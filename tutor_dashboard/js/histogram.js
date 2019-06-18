/* Stacked Area Chart JS */

//** tabletop init function **//
function init() {     
  Tabletop.init( { key: '10g_TGtruCriERlXJurPZQk76pvk30U0pkWgbbfzPrjA', //google sheet key
                   callback: function(data, tabletop) { 
                       console.log(data)


//* Filter and format data *//

var parseDate = d3.timeParse("%m/%d/%Y");

    data.forEach(function(d) {
        d.date = parseDate(d.date);
        d.Cycles = +d.Cycles;


    });

var data = data.filter(function(d){return d.ID == '';});

 var levels = d3.map(data, function(d){return(d.level)}).keys();

 var selection = levels[0];


 //*Chart code*//




            //** end of D3 script **//

                   },
                   simpleSheet: true } )
}
window.addEventListener('DOMContentLoaded', init)
//** end of tabletop init function **//