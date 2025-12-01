const CAREER_START_DATE = "2017-01-01";

function openTab(evt, tabName) {
  const tabContents = document.querySelectorAll(".tabcontent");
  const tabLinks = document.querySelectorAll(".tablinks");
  const homeTab = document.querySelector(".tabbar button:first-child");
  const targetTab = document.getElementById(tabName);

  if (!targetTab) return;

  tabContents.forEach((tab) => (tab.style.display = "none"));
  tabLinks.forEach((link) => link.classList.remove("active"));

  targetTab.style.display = "block";

  if (evt.currentTarget.classList.contains("tablinks")) {
    evt.currentTarget.classList.add("active");
  } else if (tabName === "Home" && homeTab) {
    homeTab.classList.add("active");
  }
}

function calculateYearsSince(dateString) {
  const startDate = new Date(dateString);
  const currentDate = new Date();
  const yearDiff = currentDate.getFullYear() - startDate.getFullYear();
  const monthDiff = currentDate.getMonth() - startDate.getMonth();
  return yearDiff - (monthDiff < 0 ? 1 : 0);
}

document.addEventListener("DOMContentLoaded", () => {
  const experienceEl = document.getElementById("work-experience");
  if (experienceEl) {
    experienceEl.textContent = calculateYearsSince(CAREER_START_DATE);
  }

  const firstTab = document.querySelector(".tablinks");
  if (firstTab) firstTab.click();
});
