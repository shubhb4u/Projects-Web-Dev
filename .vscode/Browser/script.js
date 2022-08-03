// Returns the first element that matches selectors.

//Get the action button where clicked
let addBtn = document.querySelector(".add-btn");

// Similarly get the object which is affected by the click
// and provide the required behaviour in the function below.
const modalCont = document.querySelector(".modal-cont");
const textArea = document.querySelector(".textarea-cont");


var isModalPresent = false;

// Kis event pe trigger karna hai ?? - jab addBtn lo "Click" karenge tab
addBtn.addEventListener("click",function(){


    // Case 1 - If modal is not present then display modal.
    if(!isModalPresent){

        //Alter the display element in the object as requirement here.
        modalCont.style.display = "flex";
    }

    // Case2 - If present hide it.
    else if(isModalPresent){

        //Hide the display by using none
        modalCont.style.display = "none";

    }
    isModalPresent = !isModalPresent;
})