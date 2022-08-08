//https://shortunique.id/ - Use as browser for random Id's
var uid = new ShortUniqueId();

// Returns the first element that matches selectors.

//Get the action button where clicked
let addBtn = document.querySelector(".add-btn");

// Similarly get the object which is affected by the click
// and provide the required behaviour in the function below.
const modalCont = document.querySelector(".modal-cont");

// Getting the text area details while using shift to create new ticket,
// and setting the priorities of the colors in this array based on index.
const textArea = document.querySelector(".textarea-cont");
const colors = ["lightpink", "lightgreen", "lightblue", "black"];
let modalPriorityColor = colors[colors.length - 1];

const mainCont = document.querySelector(".main-cont");


var isModalPresent = false;

//1.--> Kis event pe trigger karna hai ?? - jab addBtn lo "Click" karenge tab
addBtn.addEventListener("click",function(e){

    // This e object event represents what type of action has occured
    //  and brings other very inportant information toolbar.
    console.log(e);

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
});

//2. --> Create a new ticket when shift is pressed. 
modalCont.addEventListener("keydown", function(e){

    // The value of key in this field will show which button is pressed.
    console.log(e);

    if(e.key == "Shift"){

        //1. Call Create ticket function
        console.log(textArea.value);
        createTicket(modalPriorityColor, textArea.value);

        //2 alter display and update isModalPresent
        modalCont.style.display = "none";
        isModalPresent = false;
        textArea.value = "";
    }
});

function createTicket(ticketColor, data) {
    
    //generate uid
    let id =    uid();

    // CreateElement is used to create new div/or any other for new ticket
    let ticketCont = document.createElement("div");
    ticketCont.setAttribute("class", "ticket-cont");
    // see at 1:14:00(key = value pair basically like [class = black])
    
    ticketCont.innerHTML = `
          <div class="ticket-color ${ticketColor}"></div>
          <div class="ticket-id">#${id}</div>
          <div class="task-area">${data}</div>
          <div class="ticket-lock">
              <i class="fa-solid fa-lock"></i>
          </div>
      `;
    mainCont.appendChild(ticketCont);
}

//Hovering over toolbox-color-cont which changes its color

