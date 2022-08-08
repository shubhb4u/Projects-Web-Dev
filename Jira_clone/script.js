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

// Selecting priority colors while creating tickets.
//  Note we have used queryselectorAll here why ??
const allPriorityColors = document.querySelectorAll(".priority-color");


// Ques. To show only that color tickets whne clicked on top Grid and 
// show all tickets if one color is double clicked.
// Selecting child of toolbox container.

const toolBoxColors = document.querySelectorAll(".toolbox-color-cont>*");
console.log(toolBoxColors);

// Created an array to push stored objects
let ticketsArr = [];

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

function createTicket(ticketColor, data, ticketId) {
    
    //generate uid
    let id = ticketId || uid();

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

    //if ticket is being generated for the first time save it in local Storage
    if (!ticketId) {
      ticketsArr.push({

      ticketId: id,
      ticketColor,
      ticketTask: data,

    });

    // Setting Key value pair in local storage of the object being pushed.
    localStorage.setItem("tickets", JSON.stringify(ticketsArr));
  }
}

//getting data from localStorage, for re rendering of tickets
if (localStorage.getItem("tickets")) {
    ticketsArr = JSON.parse(localStorage.getItem("tickets"));
    ticketsArr.forEach(ticketObj => {
      createTicket(ticketObj.ticketColor, ticketObj.ticketTask, ticketObj.ticketId)
    })
  }


// Ques. To show only that color tickets whne clicked on top Grid and 
// show all tickets if one color is double clicked.

//geting tickets on the basis of ticketColor
for (let i = 0; i < toolBoxColors.length; i++) {
    toolBoxColors[i].addEventListener("click", function () {
      let currColor = toolBoxColors[i].classList[0];
      let filteredTickets = ticketsArr.filter(ticketObj => ticketObj.ticketColor == currColor);
      console.log(filteredTickets);
  
      //remove all tickets
      let allTickets = document.querySelectorAll(".ticket-cont");
      allTickets.forEach(ticket => ticket.remove());
  
      //display filtered tickets 
      filteredTickets.forEach(ticket => createTicket(ticket.ticketColor, ticket.ticketTask, ticket.ticketId));
    })
  
  }



// The tickets disappear when we refresh the page. We need to save 
// it in local storage. - https://blog.logrocket.com/localstorage-javascript-complete-guide/


// Selecting active colors to create new tickets.
// using foreach loop to iterate through each color element.
allPriorityColors.forEach(colorElement => {
    colorElement.addEventListener("click", function () {

        //First remove previous all active colors selected 
        //ClassList is a special function that gives all classes on an element.
        allPriorityColors.forEach(el => {
            el.classList.remove("active");
        })

        // Niw select a new priority color to be active.
        colorElement.classList.add("active");

        //Set the top ribbon of new ticket same as that being selected.
        modalPriorityColor = colorElement.classList[0];
    })
});