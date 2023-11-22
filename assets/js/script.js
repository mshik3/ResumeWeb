function openTab(evt, tabName) {
  var i, tabcontent, tablinks;
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }
  document.getElementById(tabName).style.display = "block";

  // Check if event source is not a tab button
  if (evt.currentTarget.className.includes("tablinks")) {
    evt.currentTarget.className += " active";
  } else {
    // If not, manually set the home tab to active
    var homeTab = document.querySelector(".tabbar button:first-child");
    if (tabName === "Home") {
      homeTab.className += " active";
    } else {
      homeTab.className = homeTab.className.replace(" active", "");
    }
  }
}

function calculateYearsSince(dateString) {
  const startDate = new Date(dateString);
  const currentDate = new Date();
  const differenceInYears = currentDate.getFullYear() - startDate.getFullYear();
  const differenceInMonths = currentDate.getMonth() - startDate.getMonth();

  // Adjust the years if the current date hasn't reached the anniversary in the current year
  return differenceInYears - (differenceInMonths < 0 ? 1 : 0);
}

document.addEventListener("DOMContentLoaded", () => {
  const years = calculateYearsSince("2017/01/01");
  document.getElementById("work-experience").textContent = `${years}`;
});

// Get the element with id="defaultOpen" and click on it
document.getElementsByClassName("tablinks")[0].click();
