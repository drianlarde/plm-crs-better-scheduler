const startDateElement = document.querySelector('input[id="startDate"]');
const startDatePicker = new Datepicker(startDateElement);

const endDateElement = document.querySelector('input[id="endDate"]');
const endDatePicker = new Datepicker(endDateElement);

document.getElementById("convertButton").addEventListener("click", () => {
  let startDate = document.getElementById("startDate").value;
  let endDate = document.getElementById("endDate").value;

  if (!startDate || !endDate) {
    alert("Please select a valid start and end date.");
    return;
  }

  // send message to content script
  browser.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    browser.tabs.sendMessage(tabs[0].id, {
      command: "generateCSV",
      startDate,
      endDate,
    });
  });
});
