let studentsArray = JSON.parse(localStorage.getItem('allStudents'));

function check(form) { //function to check personCode
let code = Number(form.personCode.value);
if(localStorage.getItem("allStudents") && localStorage.getItem("data1") && localStorage.getItem("data2") != null){
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
}else{//in case the user clears data storage
    window.location.href = "index.html";
}
};
//check if data is available when login as a tutor
function checkTutor(){
    if(localStorage.getItem("allStudents") && localStorage.getItem("data1") && localStorage.getItem("data2") != null){
        window.location.href = "tutor.html";
    }else{//in case the user clears data storage
        window.location.href = "index.html";
}
};
document.getElementById('tutorSubmit').addEventListener('click', checkTutor);
