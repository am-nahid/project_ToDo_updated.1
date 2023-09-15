const addbtn1 = document.querySelector(".button1");
const addbtn2 = document.querySelector(".add1");
const flexcontainer = document.querySelector(".container");
const mainBody = document.querySelector("body");

const displayJustCard = document.querySelector(".displayJustCard");

let newList = document.querySelector(".addlist");

// created an array
let data = [];
let cardId;



// to make 1st popup visible
function addNewItem() {
  const newList = document.querySelector(".addlist");
  newList.style.display = "block";
}

// to close the first popup
function closePopUp1() {
  const newList = document.querySelector(".addlist");
  newList.style.display = "none";
}

// to add card(gives functionality to button)
function addCardToContainer() {
  newList.style.display = "none";
  const cardName = document.getElementById("myInput").value;

  const item = {
    id: new Date().getTime().toString(),
    title: cardName,
    content: [],
  };

  if (!cardName) {
    alert("Enter the title");
    newList.style.display = "block";
  } else {
    data.push(item);
    addCard();
  

  document.getElementById("myInput").value = "";

  const cardHeading = document.querySelector(".cardHeading");
  cardHeading.innerHTML = "";

  const navBar = document.querySelector(".head1");
  navBar.style.display = "block";

  const backButton = document.querySelector(".back");
  backButton.style.display = "none";
}
}

// to delete the flex card
function deleteCard(id) {
  const cardId = `${id}`;
  console.log(id);
  const card = document.getElementById(id);
  card.parentNode.removeChild(card);
  data = data.filter((item) => item.id !== id);

  if(data.length===0){
    cardContainer =  document.querySelector(".container1");
    cardContainer.innerHTML = "No items in the todo list"
    console.log("dattta",data);
  }
}

// made a second popup
function addListToCard(id) {
  let newText = document.querySelector(".addlist2");
  newText.style.display = "block";
  cardId = id;
  // console.log(cardId);
}

// To close the second popup
function closeText() {
  let newList = document.querySelector(".addlist2");
  newList.style.display = "none";
}



// adding viva list
function addCard() {
  const cardcontainer = document.querySelector(".container1");
  let child = "";
  for (let i = 0; i < data.length; i++) {
    //   console.log("data[i]:", data[i]);
    child += `<div id="${data[i].id}" class="card">
      <div value="${data[i].title}" onclick ="displayMyCard(${data[i].id}, this.getAttribute('value'))" class="ftext1">${data[i].title}</div>
      <hr>
      <div class="task1">
          <ul id="content_list_${data[i].id}">
          </ul>
      </div>    
          <div class = "btnspace">
          <button value = ${data[i].id} onclick ="deleteCard(this.value)" class = "delb"><i class="fa fa-trash" aria-hidden="true"></i></button>
          <button value = ${data[i].id} onclick ="addListToCard(this.value)"  class = "plusbutn"><i class="fa fa-plus" aria-hidden="true"></i></button>
          </div>
          </div>`;
  }
  // cardcontainer.style.justifyContent = "space-between"
  cardcontainer.innerHTML = child;
  renderContents(); 
}

// Updating data for the content in list
function addContenttext() {
  const contentListId = `content_list_${cardId}`;
  // console.log(cardId);
  const Ul = document.getElementById(contentListId);
  const contentText = document.getElementById("myInput1").value;
  if (!contentText) {
    alert("Please add task name");
  } else {
    document.getElementById("myInput1").value = "";
    const liNode = document.createElement("li");

    liNode.innerHTML = contentText;
    liNode.className = "content";

    Ul.appendChild(liNode);
    closeText();
    for (let i = 0; i < data.length; i++) {
      if (data[i].id == cardId) {
        let content = {
          id: new Date().getTime().toString(),
          contentText: contentText,
          done: false,
        };
        data[i].content.push(content);
        // console.log(data[i].content);
      }
    }
    renderContents();
  }
}


const taskState = {};

function renderContents() {
  for (let i = 0; i < data.length; i++) {
    let ulelement = document.getElementById(`content_list_${data[i].id}`);
    let child = "";
    for (let j = 0; j < data[i].content.length; j++) {
      let content = data[i].content[j];
      const isDone = taskState[content.id] || false;
      const doneButtonStyle = isDone ? "display: none;" : ""; // Hide button if task is done
      const taskStyle = isDone ? "text-decoration: line-through;" : "";
      
      child += `<li class="content" id="content_${content.id}" style="${taskStyle}">
        ${content.contentText}
        <button onclick="doneTask(${content.id}, ${data[i].id})" id="markDoneBtn_${content.id}" style="${doneButtonStyle}">
          mark done
        </button>
      </li>`;
    }
    ulelement.innerHTML = child;
  }
}

function doneTask(taskId, cardId) {
  const contentId = `content_${taskId}`;
  const liElement = document.getElementById(contentId);
  
  liElement.style.textDecoration = "line-through"; // Apply line-through style
  taskState[taskId] = true; // Update task state
  
  const markDoneButton = document.getElementById(`markDoneBtn_${taskId}`);
  markDoneButton.style.display = "none"; // Hide the "mark done" button
}


function displayMyCard(id, value) {
  // addbtn1.style.display = "block";

  const cardHeading = document.querySelector(".cardHeading");
  cardHeading.innerHTML = value;

  const cardcontainer = document.querySelector(".container1");
  const cards = document.querySelectorAll(".card");
  cards.forEach((allcards) => {
    allcards.style.display = "none";
    cardcontainer.style.justifyContent = "center"
  });
  const cardToShow = document.getElementById(id);
  cardToShow.style.display = "block";

  const navBar = document.querySelector(".head1");
  navBar.style.display = "none";

  const backButton = document.querySelector(".back");
  backButton.style.display = "block";
}

function openFirstPage() {
  const cards = document.querySelectorAll(".card");
  const cardHeading = document.querySelector(".cardHeading");
  const cardcontainer = document.querySelector(".container1");
  cardHeading.innerHTML = "";
  cards.forEach((allcards) => {
    allcards.style.display = "block";
   
  });
  const navBar = document.querySelector(".head1");
  navBar.style.display = "block";
 
  cardcontainer.style.justifyContent = "space-between"
  const backButton = document.querySelector(".back");
  backButton.style.display = "none";
}




