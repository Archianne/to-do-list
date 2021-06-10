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

let allItems = [];

//local storage
const itemsFromStorage = JSON.parse(localStorage.getItem("items"));
if (itemsFromStorage) {
  allItems = itemsFromStorage;
  renderItems(allItems, TODO_LIST);
}
console.log(itemsFromStorage);

function renderItems(items, tabName) {
  todoOutput.innerHTML = "";
  for (let i = 0; i < items.length; i++) {
    const itemHTML = `
      <li data-index="${i}">
      <input onclick="checkItem(${i})" class="checkbox" type="checkbox">
      <label>${items[i].todoItem}</label>
      <input class="edit-input" type="text">
      <button onclick="editItem(${i})" class="edit-button">&#9998;</button>
      <button onclick="deleteItem(${i})" class="delete-button">&#10006;</button>
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
  allItems.push({ todoItem: userInput.value, isChecked: false });
  renderItems(allItems, TODO_LIST);
  storeItems();
  userInput.value = "";
};

//addEventListener
addButton.addEventListener("click", addItems);
userInput.addEventListener("keypress", (event) => {
  if (event.keyCode === 13) {
    addItems();
  }
});

//delete items
deleteItem = (index) => {
  let listItem = document.querySelector(`[data-index='${index}']`);
  let ul = listItem.parentNode;

  allItems.splice(index, 1);
  ul.removeChild(listItem);
  storeItems();
};

//edit items
editItem = (index) => {
  let listItem = document.querySelector(`[data-index='${index}']`);
  let editInput = listItem.querySelector(".edit-input");
  let label = listItem.querySelector("label");
  let containsClass = listItem.classList.contains("edit");

  if (containsClass) {
    label.innerText = editInput.value;
    allItems.splice(index, 1, { todoItem: editInput.value });
    storeItems();
  } else {
    editInput.value = label.innerText;
  }
  listItem.classList.toggle("edit");
};

//store all items
let storeItems = () => {
  localStorage.setItem("items", JSON.stringify(allItems));
};
