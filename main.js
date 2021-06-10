//toggle tabs (to-do and done)
const tabContent = document.getElementsByClassName("tab-content");
const tabList = document.getElementsByClassName("tab-list");
const defaultOpen = document.querySelector("#default-open");

function openTab(event, toggleTabs) {
  for (let i = 0; i < tabContent.length; i++) {
    tabContent[i].style.display = "none";
  }

  for (let i = 0; i < tabList.length; i++) {
    tabList[i].className = tabList[i].className.replace(" active");
  }

  document.getElementById(toggleTabs).style.display = "block";
  event.currentTarget.className += " active";
}

defaultOpen.click();

//main code

//dom //variables
const userInput = document.querySelector("#user-input");
const addButton = document.querySelector("#add-button");
const todoOutput = document.querySelector("#todo-output");
const doneOutput = document.querySelector("#done-output");
const TODO_LIST = "todoList";

let todoItems = [];

//local storage
const itemsFromStorage = JSON.parse(localStorage.getItem("items"));
if (itemsFromStorage) {
  todoItems = itemsFromStorage;
  renderItems(todoItems, TODO_LIST);
}
console.log(itemsFromStorage);

function renderItems(items, tabName) {
  todoOutput.innerHTML = "";
  for (let i = 0; i < items.length; i++) {
    const itemHTML = `
      <li data-index="${i}">
      <input onclick="checkItem(${i})" class="checkbox" type="checkbox">
      <label>${items[i].toBuy}</label>
      <input class="editInput" type="text">
      <button onclick="editItem(${i})" class="editButton">&#9998;</button>
      <button onclick="deleteItem(${i})" class="deleteButton">&#10006;</button>
    </li>`;

    if (!items[i].isChecked && tabName === TODO_LIST) {
      todoOutput.innerHTML += itemHTML;
    } else {
      doneOutput.innerHTML += itemHTML;
    }
  }
}

//add items
let addItems = () => {
  todoItems.push({ toBuy: userInput.value, inBasket: false });
  renderItems(todoItems, TODO_LIST);
  // storeItems();
  userInput.value = "";
};

//addEventListener
addButton.addEventListener("click", addItems);
userInput.addEventListener("keypress", (event) => {
  if (event.keyCode === 13) {
    addItems();
  }
});