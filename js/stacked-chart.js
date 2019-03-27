/*main js*/

//** tabletop init function **//
function init() {     
  Tabletop.init( { key: '10g_TGtruCriERlXJurPZQk76pvk30U0pkWgbbfzPrjA', //google sheet key
                   callback: function(data, tabletop) { 
                       console.log(data)
                       
//** D3 js script **//
var margin = { left:80, right:20, top:50, bottom:100 };

var width = 600 - margin.left - margin.right,
    height = 350 - margin.top - margin.bottom;

// filter user ID
    var data = data.filter(function(d){return d.ID == '10574525';});
    // Get every column value
    var elements = Object.keys(data[0])
        .filter(function(d){
            return ((d != "ID") & (d != "level") & (d != "date"));
        });
    var selection = elements[0];

    console.log(elements);

           // Clean data
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
    });
    

var t = d3.transition().duration(750);
    


    // Run the vis for the first time
    update(data);


function update(data) {




}



            //** end of D3 script **//

                   },
                   simpleSheet: true } )
}
window.addEventListener('DOMContentLoaded', init)
//** end of tabletop init function **//
