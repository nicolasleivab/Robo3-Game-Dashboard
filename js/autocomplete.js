/* auto complete */
//get top 100 coins for the list
let list = studentsArray;

const n= list.length;     
  
//autocomplete func adapted from: https://www.geeksforgeeks.org/javascript-auto-complete-suggestion-feature/
function autoComplete(value) { 
    //setting datalist empty at the start of function 
     document.getElementById('datalist').innerHTML = ''; 
    //input query length 
    for (let i = 0; i<n; i++) {   
        const node = document.createElement("option"); 
        const val = document.createTextNode(list[i]); 
        node.appendChild(val); 
        document.getElementById("datalist").appendChild(node); 
        //create and append new elements from list         
     } 
};
   