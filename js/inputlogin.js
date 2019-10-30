let allStudents = localStorage.getItem('arrayToPass');
    
let studentsArray;
if (allStudents.length === 0) {
    studentsArray = new Array();
} else {
    studentsArray = allStudents.replace(/, +/g, ",").split(",").map(Number); //convert stored string to array of integers
}
console.log(studentsArray);

function check(form) { //function to check personCode
let code = Number(form.personCode.value);

    if(studentsArray.includes(code)){
    let form = document.getElementById("studentForm");
    form.addEventListener("reset", function(){
    let personCode = document.getElementById('personCode').value;
    localStorage.setItem( 'objectToPass', personCode );
        
    window.location = 'student.html'; //pass person code input value to student dashboard page
    });  
    }
    else {
    alert("Invalid Person Code")/*displays error message*/  
    }
}
