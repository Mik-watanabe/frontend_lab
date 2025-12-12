"use strict"

{
    class Board {
        panels;
        game;

        constructor(game) {
            this.game = game;
            this.panels = [];

            for (let i = 0; i < this.game.getLevel() ** 2; i++) {
                console.log(i);
                this.panels.push(new Panel(this.game));
            }

            this.setup();
        }


        setup() {
            const board = document.getElementById("board");
            this.panels.forEach((panel) => {
                board.appendChild(panel.getEl());
            })
        }

        activate() {
            this.game.resetCurrentNum();
            const nums = [];
            for (let i = 0; i < this.game.getLevel() ** 2; i++) {
                nums.push(i);
            }
            this.panels.forEach((panel) => {
                const num = nums.splice(Math.floor(Math.random() * nums.length), 1)[0];
                panel.activate(num);
            })
        }
    }

    class Panel {
        el;
        game;
        /* <li class="pressed">1</li> */

        constructor(game) {
            this.game = game;
            this.el = document.createElement("li");
            this.el.classList.add("pressed");
            this.el.addEventListener("click", () => {
                this.checkMatching();
            });
        }

        getEl() {
            return this.el;
        }

        activate(num) {
            this.el.classList.remove("pressed");
            this.el.textContent = num;
        }

        checkMatching() {
            if (this.game.getCurrentPanelNum() === parseInt(this.el.textContent, 10)) {
                this.el.classList.add("pressed");
                this.game.addCurrentPanelNum();
                console.log(this.game.getCurrentPanelNum());

                if (this.game.getCurrentPanelNum() === this.game.getLevel() ** 2) {
                    clearTimeout(this.game.getTimeoutId());
                }
            }
        }
    }

    class Game {
        board;
        currentPanelNum;
        startTime;
        timeOutId;
        level;

        constructor(level) {
            this.level = level;
            this.board = new Board(this);

            this.currentPanelNum = undefined;
            this.startTime = undefined;
            this.timeOutId = undefined;

            const startBtn = document.getElementById("start-btn");
            startBtn.addEventListener("click", () => {
                this.start();
            })
            this.setup();
        }

        start() {
            if (typeof this.timeOutId !== "undefined") {
                // timer is already running
                clearTimeout(this.timeOutId);
            }

            this.board.activate();

            this.startTime = Date.now();
            this.startTimer();
        }

        // TIMER
        startTimer() {
            const timer = document.getElementById("timer");
            timer.textContent = ((Date.now() - this.startTime) / 1000).toFixed(2);

            this.timeOutId = setTimeout(() => {
                this.startTimer();
            }, 10);
        }

        setup() {
            const container = document.getElementById("container");
            const PANEL_WIDTH = 50;
            const BOARD_PADDING = 10;
            container.style.width = PANEL_WIDTH * this.level + BOARD_PADDING * 2 + "px";
        }

        getCurrentPanelNum() {
            return this.currentPanelNum;
        }

        addCurrentPanelNum() {
            this.currentPanelNum++;
        }

        resetCurrentNum() {
            this.currentPanelNum = 0;
        }

        getTimeoutId() {
            return this.timeOutId;
        }

        getLevel() {
            return this.level;
        }
    }

    let level;

    while (true) {
        level = prompt("What level would you like to play? (numbers only)");

        // Cancel
        if (level === null) continue;

        // Check if numeric
        if (!isNaN(level) && level.trim() !== "") {
            break; // valid number → exit loop
        }

        alert("Please enter a valid number!");
    }

    new Game(Number(level));

}