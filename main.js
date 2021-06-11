//toggle tabs (to-do and done)
const tabContent = document.getElementsByClassName("tab-content");
const tabList = document.getElementsByClassName("tab-list");
const defaultOpen = document.querySelector("#default-open");

function openTab(event, toggleTabs) {
  for (let i = 0; i < tabContent.length; i++) {
    tabContent[i].style.display = "none";
  }

  for (let i = 0; i < tabList.length; i++) {
    tabList[i].className = tabList[i].className.replace(" active", "");
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

//show items
renderItems = (items, tabName) => {
  todoOutput.innerHTML = "";
  doneOutput.innerHTML = "";
  for (let i = 0; i < items.length; i++) {
    if (!items[i].isChecked && tabName === TODO_LIST) {
      todoOutput.innerHTML += `
      <li data-index="${i}">
      <input onclick="checkItem(${i})" class="checkbox" type="checkbox">
      <label>${items[i].todoItem}</label>
      <input class="edit-input" type="text" onfocusout="editItem(${i})">
      <div>
      <button onclick="editItem(${i})" class="edit-button">&#9998;</button>
      <button onclick="deleteItem(${i})" class="delete-button">&#10006;</button>
      </div>
    </li>`;
    } else {
      doneOutput.innerHTML += `
      <li id="done-list" data-index="${i}">
      <input onclick="checkItem(${i})" class="checkbox" type="checkbox" checked>
      <label>${items[i].todoItem}</label>
      <button onclick="deleteItem(${i})" class="delete-button">&#10006;</button>
    </li>`;
    }
  }
};

//local storage
const itemsFromStorage = JSON.parse(localStorage.getItem("items"));
if (itemsFromStorage) {
  allItems = itemsFromStorage;
  renderItems(allItems, TODO_LIST);
}

//add items
addItems = () => {
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
  allItems.splice(index, 1);
  storeItems();
  renderItems(allItems, TODO_LIST);
};

//edit items
editItem = (index) => {
  let listItem = document.querySelector(`[data-index='${index}']`);
  let editInput = listItem.querySelector(".edit-input");
  let label = listItem.querySelector("label");
  let containsClass = listItem.classList.contains("edit");

  if (containsClass) {
    label.innerText = editInput.value;
    allItems.splice(index, 1, { todoItem: editInput.value, isChecked: false });
    storeItems();
    renderItems(allItems, TODO_LIST);
  } else {
    editInput.value = label.innerText;
  }
  listItem.classList.toggle("edit");
};

//check item
checkItem = (index) => {
  let listItem = document.querySelector(`[data-index='${index}']`);
  let checkbox = listItem.querySelector(".checkbox");

  if (checkbox.checked) {
    let ul = listItem.parentNode;
    ul.removeChild(listItem);

    allItems = allItems.map((item, itemIndex) => {
      if (index === itemIndex) {
        return {
          ...item,
          isChecked: true,
        };
      }
      return item;
    });

    storeItems();
    renderItems(allItems, TODO_LIST);
    console.log(allItems);
  }

  if (!checkbox.checked) {
    let ul = listItem.parentNode;
    ul.removeChild(listItem);

    allItems = allItems.map((item, itemIndex) => {
      if (index === itemIndex) {
        return {
          ...item,
          isChecked: false,
        };
      }
      return item;
    });

    storeItems();
    renderItems(allItems, TODO_LIST);
    console.log(allItems);
  }
};

//store all items
storeItems = () => {
  localStorage.setItem("items", JSON.stringify(allItems));
};
