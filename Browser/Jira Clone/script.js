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
// console.log(toolBoxColors);

// Created an array to push stored objects
let ticketsArr = [];

//Task 5. 
const removeBtn = document.querySelector(".fa-xmark");
// console.log(removeBtn);

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
        createTicket(modalPriorityColor, textArea.value);// Here id will be undefind and an autonumber will be generated

        //2 alter display and update isModalPresent
        modalCont.style.display = "none";
        isModalPresent = false;
        textArea.value = "";
    }
});


// ticketId will be undefined when new ticket is created beacuse from above a are
// passing only 2 arguments, but it will have value when called from local storage. 
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
    //This new ticket ko show karana hai front end me.
    mainCont.appendChild(ticketCont);

    //if ticket is being generated for the first time save it in local Storage,
    //otherwise duplicate ticket will be created.
    if (!ticketId) {

    //Note these are array of OBJECTS !!!!!!
      ticketsArr.push({

      ticketId: id,
      ticketColor,
      ticketTask: data,

    });

    // Setting Key value pair in local storage of the object being pushed.
    localStorage.setItem("tickets", JSON.stringify(ticketsArr));
  }

  handleRemoval(ticketCont, id);
  handlePriorityColor(ticketCont, id);
  handleLock(ticketCont,id);


}

//getting data from localStorage, for re rendering of tickets.
//Id only we have tickets named key, then move further.
if (localStorage.getItem("tickets")) {
    ticketsArr = JSON.parse(localStorage.getItem("tickets"));

    //We are calling createFunction to display the tickets 
    //from local storage to front end using appendChild-

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
  
      //remove all tickets, find this class in CSS.
      let allTickets = document.querySelectorAll(".ticket-cont");
      allTickets.forEach(ticket => ticket.remove());
  
      //display filtered tickets 
      filteredTickets.forEach(ticket => createTicket(ticket.ticketColor, ticket.ticketTask, ticket.ticketId));
    })

    //display all the tickets of all priorities on double clicking any priorityColor
    toolBoxColors[i].addEventListener("dblclick", function () {
        
        //remove tickets of specific color from UI
        let allTickets = document.querySelectorAll(".ticket-cont");
        allTickets.forEach((ticket) => ticket.remove());

        //display all tickets
        ticketsArr.forEach(ticket => createTicket(ticket.ticketColor, ticket.ticketTask, ticket.ticketId));
    })

}

//Task 5 -> Remove button. 
// 1. Click once - turns the color red
// 2. Click again - turns it to white.

//toggling the remove btn 
var isRemoveBtnActive = false;
removeBtn.addEventListener("click", function () {
  console.log("in btn");
  //    case 1 -> if removeBtn is not active
  //              then make it active i.e. red color
  if (!isRemoveBtnActive) {
    // display modal
    console.log("inside not active");
    removeBtn.style.color = "red";
  }

  // case 2 -> if removeBtn is active
  //           then make it inactive i.e. white color
  else if (isRemoveBtnActive) {
    // display none
    console.log("inside active");
    removeBtn.style.color = "white";
  }

  isRemoveBtnActive = !isRemoveBtnActive;
});

//helps in removing the ticket from frontend and saving in localStorage
function handleRemoval(ticketCont,id){
  ticketCont.addEventListener("click", function () {
    if (!isRemoveBtnActive) return;

    //remove from ticketsArr
    let idx = getTicketIdx(id);
    console.log(idx);
    ticketsArr.splice(idx, 1);
    console.log(ticketsArr);
    //set in local storage
    localStorage.setItem("tickets", JSON.stringify(ticketsArr));
    //remove from frontend
    ticketCont.remove();
  });
}

// function getTicketIdx(id) {
  
//   return ticketsArr.forEach(ticketObj => {
    
//     if (ticketObj.ticketId == id) {
      
//       let idx = ticketsArr.indexOf(ticketObj);
//       return idx;
//     }
    
//   })
  
// }


//retuns the index of ticket present in ticketsArr
function getTicketIdx(id) { 
  let idx = ticketsArr.findIndex(ticketObj => {
    return ticketObj.ticketId==id
  })
  return idx;
}


//change the priority of the ticketColor in ticketCont 
function handlePriorityColor(ticketCont, id) {
  let ticketColor = ticketCont.querySelector(".ticket-color");
  // console.log(ticketColor);

  //add event listener of type click on  ticketColor
  ticketColor.addEventListener("click", function () {
    let currTicketColor = ticketColor.classList[1]; //lightpink
    let currTicketColorIdx = colors.indexOf(currTicketColor); //0
    let newTicketColorIdx = (currTicketColorIdx + 1)%colors.length; //1
    let newTicketColor = colors[newTicketColorIdx]; //lightgreen
    ticketColor.classList.remove(currTicketColor); //lightpink class removed
    ticketColor.classList.add(newTicketColor); //lightgreen class added

    //update local storage
    let idx = getTicketIdx(id);
    //update the newticketcolor in ticketArr
    ticketsArr[idx].ticketColor = newTicketColor;
    //set in local storage
    localStorage.setItem("tickets", JSON.stringify(ticketsArr));
  });
}


//unlock class->fa-lock-open
const unlock = "fa-lock-open";
function handleLock(ticketCont, id) {
  let ticketLock = ticketCont.querySelector(".ticket-lock");
  let lock = ticketLock.children[0].classList[1];
  let ticketTaskArea = ticketCont.querySelector(".task-area");

  ticketLock.addEventListener("click", function () {
    if (ticketLock.children[0].classList.contains(lock)) {
      //remove lock class
      ticketLock.children[0].classList.remove(lock);
      //add unlock class 
      ticketLock.children[0].classList.add(unlock);

      //make content editable 
      ticketTaskArea.setAttribute("contenteditable", "true");
    }

    else if (ticketLock.children[0].classList.contains(unlock)) {
      //add lock class
      ticketLock.children[0].classList.add(lock);
      //remove unlock class
      ticketLock.children[0].classList.remove(unlock);

      ////make content non editable
      ticketTaskArea.setAttribute("contenteditable", "false");
    }

    let idx = getTicketIdx(id);
    console.log(ticketTaskArea.textContent);
    ticketsArr[idx].ticketTask = ticketTaskArea.textContent;
    localStorage.setItem("tickets", JSON.stringify(ticketsArr));
    
  })
}





//Task 3.
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