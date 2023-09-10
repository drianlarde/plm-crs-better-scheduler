document.getElementById("convertCSVButton").addEventListener("click", () => {
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

document.getElementById("fileUploadCSV").addEventListener("change", () => {
  const file = document.getElementById("fileUploadCSV").files[0];
  const reader = new FileReader();

  reader.onload = function (e) {
    const rows = e.target.result.split("\n");

    let icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Chimbori//CSV to iCal Convertor// https://csv-to-ical.chimbori.com/ //EN
CALSCALE:GREGORIAN
X-WR-CALNAME;VALUE=TEXT:schedule (35)\n`;

    rows.forEach((row, index) => {
      if (index === 0 || row.trim() === "") {
        // Skip header row or empty rows
        return;
      }

      /*
      Sample Desired Output:
      SUMMARY:🖥 | CS Thesis Writing 1 - CSC 0411 1 LecSyncOnline
DTSTAMP:20230904T070000
DESCRIPTION:CS Thesis Writing 1 - CSC 0411 1
DTSTART:20230904T070000
DTEND:20230904T083000
LOCATION:GCA 306
END:VEVENT
      */

      /*
      columns
[
    "🖥 | CS Thesis Writing 1 - CSC 0411 1 LecSyncOnline",
    "2023-09-04",
    "7:00 AM",
    "2023-09-04",
    "8:30 AM",
    "FALSE",
    "CS Thesis Writing 1 - CSC 0411 1",
    "GCA 306",
    "TRUE\r"
] 
      */
      const columns = row.split(",");

      if (columns.length < 5) {
        // Skip rows with fewer than 5 columns
        console.warn(
          `Skipping row ${index} because it has fewer than 5 columns`
        );
        return;
      }

      // "TRUE"
      const allDayEvent = columns[5] === "TRUE" ? true : false;

      // "CS Thesis Writing 1 - CSC 0411 1"
      const description = columns[6];

      // "GCA 306"
      const location = columns[7];

      // "🖥 | CS Thesis Writing 1 - CSC 0411 1 LecSyncOnline"
      const subject = columns[0];

      console.log({ columns, subject, description, location, allDayEvent });

      // "AM"
      let endAmPm = columns[4].split(" ")[1];

      // "20230904"
      let endDate = columns[3].replace(/-/g, "");

      // "83000"
      let endTime = columns[4].split(" ")[0].replace(/:/g, "") + "00";

      // "AM"
      let startAmPm = columns[2].split(" ")[1];

      // "20230904"
      let startDate = columns[1].replace(/-/g, "");

      // "70000"
      let startTime = columns[2].split(" ")[0].replace(/:/g, "") + "00";

      console.log({
        startDate,
        startTime,
        startAmPm,
        endDate,
        endTime,
        endAmPm,
      });

      if (startAmPm === "PM") {
        let startHour = parseInt(startTime.substring(0, 2));
        if (startHour !== 12) {
          startHour += 12;
        }
        startTime = startHour.toString() + startTime.substring(2);
      }

      if (endAmPm === "PM") {
        let endHour = parseInt(endTime.substring(0, 2));
        if (endHour !== 12) {
          endHour += 12;
        }
        endTime = endHour.toString() + endTime.substring(2);
      }

      // Incorrect: DTSTAMP:20230904T70000
      // Corrected: DTSTAMP:20230904T070000
      startTime = startTime.padStart(6, "0");
      endTime = endTime.padStart(6, "0");

      if (allDayEvent) {
        startTime = "";
        endTime = "";
      }

      icsContent += `BEGIN:VEVENT
SUMMARY:${subject}
DTSTAMP:${startDate}T${startTime}
DESCRIPTION:${description}
DTSTART:${startDate}T${startTime}
DTEND:${endDate}T${endTime}
LOCATION:${location}
END:VEVENT\n`;
    });

    icsContent += `END:VCALENDAR`;

    // Create a link to download the .ics file
    const hiddenElement = document.createElement("a");
    hiddenElement.href =
      "data:text/calendar;charset=utf-8," + encodeURI(icsContent);
    hiddenElement.target = "_blank";
    hiddenElement.download = "schedule.ics";
    hiddenElement.click();
  };

  reader.readAsText(file);
});
