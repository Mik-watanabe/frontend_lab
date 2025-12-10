"use strict"

{
    const IMAGES = [
        "img/cherry.png",
        "img/keroro.png",
        "img/powerpuff.png",
        "img/seven.png",
        "img/simpson.png",
        "img/bell.png",
    ];


    class Panel {
        img;
        timeOutId;
        stop;

        constructor() {

            // <section class="panel">
            //     <img src="img/powerpuff.png" alt="">
            //     <div class="stop">STOP</div>
            // </section>

            const section = document.createElement("section");
            section.classList.add("panel");

            this.img = document.createElement("img");
            this.img.src = this.getRandomImage();
            this.timeOutId = undefined;

            this.stop = document.createElement("div");
            this.stop.textContent = "STOP";
            this.stop.classList.add("stop", "inactive");

            this.stop.addEventListener("click", () => {
                if (this.stop.classList.contains("inactive")) return;
                this.stop.classList.add("inactive");
                clearTimeout(this.timeOutId);

                panelsLeft--;

                if (panelsLeft === 0) {
                    spin.classList.remove("inactive");
                    panelsLeft = 3;
                    checkResult();
                }
                console.log(panelsLeft);
            })

            section.appendChild(this.img);
            section.appendChild(this.stop);

            const main = document.querySelector("main");
            main.appendChild(section);
        }

        getRandomImage() {
            return IMAGES[Math.floor(Math.random() * IMAGES.length)];
        }

        spin() {
            this.img.src = this.getRandomImage();
            this.timeOutId = setTimeout(() => {
                this.spin();
            }, 50);
        }

        isUnmatched(p1, p2) {
            return this.img.src !== p1.img.src && this.img.src !== p2.img.src;
        }

        unmatch() {
            this.img.classList.add("unmatched");
        }

        activate() {
            this.img.classList.remove("unmatched");
            this.stop.classList.remove("inactive");
        }
    }



    function checkResult() {
        if (panels[0].isUnmatched(panels[1], panels[2])) {
            panels[0].unmatch();
        }
        if (panels[1].isUnmatched(panels[0], panels[2])) {
            panels[1].unmatch();
        }
        if (panels[2].isUnmatched(panels[0], panels[1])) {
            panels[2].unmatch();
        }
    }

    const panels = [
        new Panel(),
        new Panel(),
        new Panel(),
    ]

    let panelsLeft = panels.length;

    const spin = document.getElementById("spin");
    spin.addEventListener("click", () => {
        if (spin.classList.contains("inactive")) return;

        spin.classList.add("inactive");
        panels.forEach((panel) => {
            panel.activate(); // Reset panel state before spinning again.
            panel.spin();
        })
    })
}