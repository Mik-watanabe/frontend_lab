
"use strict"
{
    const formEl = document.querySelector("#log-form");
    const studyLogsEl = document.querySelector("#study-logs");
    const totalHoursEl = document.querySelector("#total-hours");
    const totalMinEl = document.querySelector("#total-min");


    let studyLogs;

    try {
        const saved = localStorage.getItem("study-logs");
        studyLogs = saved ? JSON.parse(saved) : [];
    } catch (e) {
        console.error("Failed to parse study logs from localStorage", e);
        studyLogs = [];
    }

    const renderScreen = () => {
        if (studyLogs.length > 0) {
            displayStudyLogs();
            displayTotalHours();
        }
    }

    const displayStudyLogs = () => {
        studyLogsEl.innerHTML = "";
        studyLogs.forEach(element => {
            renderStudyLog(element);
        });
    }

    const displayTotalHours = () => {
        const { hours, min } = calcTotalStudyDuration();
        console.log(hours, min);
        totalHoursEl.textContent = hours;
        totalMinEl.textContent = min;
    }


    const calcTotalStudyDuration = () => {
        const totalMinutes = studyLogs.reduce((sum, log) => {
            return sum + Number(log.studyDuration || 0);
        }, 0);

        console.log(totalMinutes, totalMinutes % 60);
        return {
            hours: Math.trunc(totalMinutes / 60),
            min: totalMinutes % 60
        };
    }

    const renderStudyLog = ({ title, date, studyDuration }) => {

        const titleEl = document.createElement("span");
        titleEl.classList.add("log-title");
        titleEl.textContent = title;

        const dateEl = document.createElement("time");
        dateEl.classList.add("log-date");
        dateEl.textContent = date;


        const durationEl = document.createElement("span");
        durationEl.classList.add("log-duration");
        durationEl.textContent = `${studyDuration} min`

        const liEl = document.createElement("li");
        liEl.classList.add("log-item");
        liEl.appendChild(titleEl);
        liEl.appendChild(dateEl);
        liEl.appendChild(durationEl);

        studyLogsEl.appendChild(liEl);
    }

    // ------ FUNCTIONS -------
    const generateDateString = () => {
        const today = new Date();

        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, "0");
        const day = String(today.getDate()).padStart(2, "0");
        const formattedDate = `${year}/${month}/${day}`;

        return formattedDate;
    }

    const addStudyLog = (title, duration) => {
        // -li .log-item
        //     -span .log-title
        //     -time .log-date
        //     -span .log-duration
        const log = {
            id: new Date(),
            title,
            date: generateDateString(),
            studyDuration: duration
        };

        studyLogs.unshift(log);
        console.log(studyLogs);

        updateLocalStorage();

        renderScreen();

    }

    const updateLocalStorage = () => {
        localStorage.setItem("study-logs", JSON.stringify(studyLogs));
    }


    // Register a log
    formEl.addEventListener("submit", (e) => {
        e.preventDefault();

        const title = e.target.title.value.trim();
        const duration = e.target.studyDuration.value.trim();
        // only continue if neither is null
        if (!title || !duration) {
            alert("Please Enter Both Subject and Study Duration");
            return;
        }

        addStudyLog(title, duration);

        e.target.title.value = "";
        e.target.title.focus();
        e.target.studyDuration.value = "";

    });

    renderScreen();
}
