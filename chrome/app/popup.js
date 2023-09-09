document.getElementById("convertButton").addEventListener("click", () => {
  let startDate = document.getElementById("startDate").value;
  let endDate = document.getElementById("endDate").value;

  console.log({ startDate, endDate });

  chrome.tabs.update({
    url: "https://web1.plm.edu.ph/crs/studentaccess/enlistment_view.php",
  });

  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.scripting.executeScript({
      target: { tabId: tabs[0].id },
      args: [startDate, endDate],
      function: generateCSVFile,
    });
  });
});

document
  .getElementById("deleteAllEventsWithEmojiButton")
  .addEventListener("click", () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const tab = tabs[0];

      if (tab.url.includes("https://calendar.google.com/calendar/") === false) {
        alert("Please go to https://calendar.google.com/calendar/");
        chrome.tabs.update({
          url: "https://calendar.google.com/calendar/u/0/r/agenda",
        });
      } else {
        chrome.scripting.executeScript({
          target: { tabId: tabs[0].id },
          function: deleteAllEventsWithEmojiOnly,
        });
      }
    });
  });

document.getElementById("deleteAllEvents").addEventListener("click", () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const tab = tabs[0];

    if (tab.url.includes("https://calendar.google.com/calendar/") === false) {
      alert("Please go to https://calendar.google.com/calendar/");
      chrome.tabs.update({
        url: "https://calendar.google.com/calendar/u/0/r/agenda",
      });
    } else {
      // Create an alert confirmation with yes or no user response
      const userResponse = confirm(
        "Are you sure that all events are from `.csv` file?"
      );

      if (userResponse) {
        chrome.scripting.executeScript({
          target: { tabId: tabs[0].id },
          function: deleteAllEvents,
        });
      }
    }
  });
});
