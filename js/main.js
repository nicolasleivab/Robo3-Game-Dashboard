/* Main JS: get and store data */
let allStudents = [];

/*Get data from the googlesheet using Googlesheets API */
request('GET', 'https://sheets.googleapis.com/v4/spreadsheets/10g_TGtruCriERlXJurPZQk76pvk30U0pkWgbbfzPrjA/values/Sheet1?key=AIzaSyArugq6TlxJTJHM-qWEe420k2xH3U0obxg')
.then((response) => {
    const data = JSON.parse(response.target.responseText);
    const values = data.values;//array of arrays with ROWS
    const formattedData =[];
    let prop, value;
    //nested loops-> convert array of arrays to array of objects
    for(let i=1; i<values.length; i++){ //first row (0) contains each column key(prop)
        let obj ={};
        for(let j=0; j<values[i].length; j++){
        prop = values[0][j];
        value = values[i][j];
        obj[prop] = value;
        }
        formattedData.push(obj);
    }
    
console.log(formattedData);
localStorage.setItem('data1', JSON.stringify(formattedData)); //store data in local storage

}).catch()

/*Get data from the second googlesheet*/
request('GET', 'https://sheets.googleapis.com/v4/spreadsheets/1evjoQPchLR8iUhjQQ8i56hy6Df5z7K_eVSWs8yVugC4/values/Sheet1?key=AIzaSyArugq6TlxJTJHM-qWEe420k2xH3U0obxg')
.then((response) => {
    const data = JSON.parse(response.target.responseText);
    const values = data.values;//array of arrays with ROWS
    const formattedData =[];
    let prop, value;
    //nested loops-> convert array of arrays to array of objects
    for(let i=1; i<values.length; i++){ //first row (0) contains each column key(prop)
        let obj ={};
        for(let j=0; j<values[i].length; j++){
        prop = values[0][j];
        value = values[i][j];
        obj[prop] = value;
        }
        formattedData.push(obj);
    }

console.log(formattedData);
localStorage.setItem('data2', JSON.stringify(formattedData)); //store data in local storage
let students = formattedData.map(function(d){
    return +d.ID;
});
//get unique values
function uniqueValues(arr) {
    var result = Array.from(new Set(arr));
    return result    
  }
allStudents = uniqueValues(students);

console.log(students);
console.log(allStudents);

localStorage.setItem('allStudents', JSON.stringify(allStudents)); //save students list in local storage

}).catch()

function request(method, url) {
    return new Promise(function (resolve, reject){
        const xhr = new XMLHttpRequest();
        xhr.open(method, url);
        xhr.onload = resolve;
        xhr.onerror = reject;
        xhr.send();

    });
    
}

function check(form) { //function to check personCode
    let code = Number(form.personCode.value);
    if(localStorage.getItem("allStudents") && localStorage.getItem("data1") && localStorage.getItem("data2") != null){
        if(allStudents.includes(code)){
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
    }else{//in case the data is not ready
        return false;
    }
    };
    //check if data is available when login as a tutor
    function checkTutor(){
        if(localStorage.getItem("allStudents") && localStorage.getItem("data1") && localStorage.getItem("data2") != null){
            window.location.href = "tutor.html";
        }else{//in case the user clears data storage
            return false;
    }
    };
    document.getElementById('tutorSubmit').addEventListener('click', checkTutor);