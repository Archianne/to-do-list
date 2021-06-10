const tabContent = document.getElementsByClassName("tab-content");
//toggle tabs (to-do and done)
function openTab(event, toggleTabs) {
  let tabList;

  for (let i = 0; i < tabContent.length; i++) {
    tabContent[i].style.display = "none";
  }
  
  tabList = document.getElementsByClassName("tab-list");
  for (let i = 0; i < tabList.length; i++) {
    tabList[i].className = tabList[i].className.replace(" active");
  }
  
  document.getElementById(toggleTabs).style.display = "block";
  event.currentTarget.className += " active";
}

const defaultOpen = document.querySelector("#default-open");
defaultOpen.click();
