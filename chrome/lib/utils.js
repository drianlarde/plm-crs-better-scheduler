function generateCSVFile(selectedStartDate, selectedEndDate) {
  if (!selectedStartDate || !selectedEndDate) {
    alert("Please select a start and end date.");
    return;
  }

  let xpath =
    "/html/body/table[2]/tbody/tr/td[2]/form/table/tbody/tr/td/table/tbody/tr[2]/td/table";
  let root = document.evaluate(
    xpath,
    document,
    null,
    XPathResult.FIRST_ORDERED_NODE_TYPE,
    null
  ).singleNodeValue;
  let rows = root.querySelectorAll("tr.preregnotes");

  let data = [].map.call(rows, function (row) {
    let classTitle = row.querySelector("td:nth-child(1)").innerText;
    let section = row.querySelector("td:nth-child(2)").innerText;
    let schedule = row.querySelector("td:nth-child(3)").innerText;
    let credits = row.querySelector("td:nth-child(4)").innerText;
    return { classTitle, section, schedule, credits };
  });

  // Get current date with day of week
  const days = ["Su", "M", "T", "W", "Th", "F", "S"];
  const currentDate = new Date();
  const currentDay = days[currentDate.getDay()];
  const newStartDate = new Date(selectedStartDate);
  const newEndDate = new Date(selectedEndDate);
  const result = [];

  // Since we know the currents and we have the selected start and end dates, we can fill in the missing days
  /* For example: selectedStartDate is 2023-09-01 and selectedEndDate is 2023-09-30, according to current, the date today is 2023-09-04 and its Monday. So we know that 2023-09-01 is Thursday, 2023-09-02 is Friday, 2023-09-03 is Saturday, and 2023-09-04 is Sunday. So we can fill in the missing days with the correct dates.
    [
      {
        date: 2023-09-01,
        day: Th
      },
      {
        date: 2023-09-02,
        day: F
      },
      ... up to 2023-09-30
      }
    ]*/

  while (newStartDate <= newEndDate) {
    result.push({
      date: newStartDate.toISOString().slice(0, 10),
      day: days[newStartDate.getDay()],
    });
    newStartDate.setDate(newStartDate.getDate() + 1);
  }

  // If the start date is in the future, add missing days with the correct dates
  if (selectedStartDate > currentDate) {
    const missingDays = days
      .slice(days.indexOf(currentDay))
      .concat(days.slice(0, days.indexOf(currentDay)));
    const missingDates = missingDays.map((day, index) => {
      const date = new Date(currentDate);
      date.setDate(date.getDate() + index + 1);
      return { date: date, day: day };
    });
    result.unshift(...missingDates);
  }

  // If the end date is in the future, add missing days with the correct dates
  if (selectedEndDate > currentDate) {
    const missingDays = days
      .slice(days.indexOf(currentDay) + 1)
      .concat(days.slice(0, days.indexOf(currentDay) + 1));
    const missingDates = missingDays.map((day, index) => {
      const date = new Date(selectedEndDate);
      date.setDate(date.getDate() + index + 1);
      return { date: date, day: day };
    });
    result.push(...missingDates);
  }

  let csvContent =
    "Subject,Start Date,Start Time,End Date,End Time,All Day Event,Description,Location,Private\r\n";

  data.forEach((event) => {
    let description = event.classTitle + " " + event.section;
    let classSchedules = event.schedule.split(",");
    let credits = event.credits;

    classSchedules.forEach(function (cs) {
      //converting your normal time to 24 hour time
      const tConvert = (time) => {
        let [hours, minutes, modifier] = time.split(/[:]/);

        if (hours === "12") {
          hours = "00";
        }

        if (modifier && modifier.toLowerCase().includes("p")) {
          hours = parseInt(hours, 10) + 12;
        }

        return `${hours}:${minutes}`; // Keep in mind that hours and minutes need to be two digits. 01, 02, ... , 09, 10, 11, ..., 23.
      };

      let details = cs.trim().split(" ");

      let day = details[0];
      let times = details[1].split("-");
      let start = tConvert(times[0]);
      let startAMPM = start.replace("a", " AM").replace("p", " PM");
      let end = tConvert(times[1]);
      let endAMPM = end.replace("a", " AM").replace("p", " PM");

      // Two-digit hours and minutes
      let startDate = new Date().toISOString().slice(0, 10);
      let endDate = new Date().toISOString().slice(0, 10);

      // Add the setup like `LecSyncOnline` in `M 7:00a-8:30a LecSyncOnline GCA 306,Th 7:00a-8:30a F2F GCA 306`
      let setup = details[2];

      // If setup includes F2F then add an emoji `🏫` to the description
      // If setup includes LecSyncOnline then add an emoji `🖥` to the description
      let setupEmoji = "";

      if (setup.includes("F2F")) {
        setupEmoji = "🏫";
      } else {
        setupEmoji = "🖥";
      }

      let location = details.slice(3).join(" "); // join the remaining details as the location

      result.forEach((r) => {
        if (r.day === day) {
          csvContent += `${setupEmoji} | ${description} ${setup},${r.date},${startAMPM},${r.date},${endAMPM},FALSE,${description},${location},TRUE\r\n`;
        }
      });
    });
  });

  var hiddenElement = document.createElement("a");
  hiddenElement.href = "data:text/csv;charset=utf-8," + encodeURI(csvContent);
  hiddenElement.target = "_blank";
  hiddenElement.download = "schedule.csv";
  hiddenElement.click();
}

function deleteAllEventsInAgenda() {
  const elements = document.querySelectorAll('[jsname="Fa5oWb"]');

  var classEventsElements = [];

  elements.forEach((element) => {
    if (element.innerText.includes("🏫") || element.innerText.includes("🖥")) {
      classEventsElements.push(element);
    }
  });

  if (classEventsElements.length === 0) {
    alert("All events have been deleted.");
    return; // Exit the function if there are no more elements to delete
  }

  const element = classEventsElements[0];

  element.click();

  // Wait for the modal to appear
  setTimeout(() => {
    // Click the element with aria-label="Delete event"
    const deleteElement = document.querySelector('[aria-label="Delete event"]');
    if (deleteElement) {
      deleteElement.click();
    }
    // Simulate the escape key press to close the modal
    const escapeEvent = new KeyboardEvent("keydown", { key: "Escape" });
    document.dispatchEvent(escapeEvent);
    // Call deleteElements function recursively after a delay
    setTimeout(deleteAllEventsInAgenda, 10);
  }, 10); // Wait for 1 second before deleting the next element
}
