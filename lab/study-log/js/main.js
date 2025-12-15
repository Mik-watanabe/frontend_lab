
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
        studyLogsEl.innerHTML = "";

        if (studyLogs.length === 0) {
            renderEmptyState();
            totalHoursEl.textContent = "1";
            totalMinEl.textContent = "30";
            return;
        }

        displayStudyLogs();
        displayTotalHours();
    };


    const renderEmptyState = () => {
        studyLogsEl.innerHTML = `
            <li class="log-item">
                <span class="log-title">Enter the subjects you studied</span>
                <time class="log-date" datetime="2025-09-12">2025/09/12</time>
                <span class="log-duration">40 min</span>
            </li>
            <li class="log-item">
                <span class="log-title">This app helps you track your study time</span>
                <time class="log-date" datetime="2025-09-12">2025/09/10</time>
                <span class="log-duration">50 min</span>
            </li>
        `;
    }

    const displayStudyLogs = () => {
        studyLogs.forEach(element => {
            renderStudyLog(element);
        });
    }

    const displayTotalHours = () => {
        const { hours, min } = calcTotalStudyDuration();
        totalHoursEl.textContent = hours;
        totalMinEl.textContent = min;
    }


    const calcTotalStudyDuration = () => {
        const totalMinutes = studyLogs.reduce((sum, log) => {
            return sum + Number(log.studyDuration || 0);
        }, 0);

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
        dateEl.dateTime = date.replaceAll("/", "-"); // "YYYY-MM-DD"
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
            id: Date.now(),
            title,
            date: generateDateString(),
            studyDuration: duration
        };

        studyLogs.unshift(log);
        updateLocalStorage();

        renderScreen();
    }

    const updateLocalStorage = () => {
        localStorage.setItem("study-logs", JSON.stringify(studyLogs));
    }


    // Add a new study log
    formEl.addEventListener("submit", (e) => {
        e.preventDefault();

        const title = e.target.title.value.trim();
        const duration = e.target.studyDuration.value.trim();
        // Stop if either field is empty
        if (!title || !duration) {
            alert("Please Enter Both Subject and Study Duration");
            return;
        }

        addStudyLog(title, duration);

        e.target.reset();
        e.target.title.focus();
    });

    renderScreen();
}
