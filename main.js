const tabContent = document.getElementsByClassName("tab-content");
const tabList = document.getElementsByClassName("tab-list");
const defaultOpen = document.querySelector("#default-open");

//toggle tabs (to-do and done)
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