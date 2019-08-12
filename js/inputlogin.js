//** tabletop init function **//
function init() {     
    Tabletop.init( { key: '1evjoQPchLR8iUhjQQ8i56hy6Df5z7K_eVSWs8yVugC4', //google sheet key
                     callback: function(data, tabletop) { 
                    
let students = d3.map(data, function(d){return(+d.ID)}).keys();
let allStudents = students.map(Number);
console.log(allStudents);

},
simpleSheet: true } )
}
window.addEventListener('DOMContentLoaded', init)

function check(form) { //function to check personCode
let code = form.personCode.value;
    if(code == 10574525 || code == 10101010 || code == 11111111 ||code == 12341234){
        var form = document.getElementById("studentForm");

        form.addEventListener("reset", function(){
        var personCode = document.getElementById('personCode').value;
        localStorage.setItem( 'objectToPass', personCode );
        
        window.location = "/student.html"; //pass person code input value to student dashboard page
        
        });
    }
    else {
        alert("Invalid Person Code")/*displays error message*/
    }

}
