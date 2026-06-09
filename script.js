let startTime = 0;
let elapsedTime = 0;
let timerInterval;
let running = false;

const display = document.getElementById("display");
const laps = document.getElementById("laps");

function updateTime() {

    const currentTime = Date.now() - startTime + elapsedTime;

    let milliseconds = currentTime % 1000;
    let seconds = Math.floor(currentTime / 1000) % 60;
    let minutes = Math.floor(currentTime / 60000) % 60;
    let hours = Math.floor(currentTime / 3600000);

    display.textContent =
        String(hours).padStart(2, '0') + ":" +
        String(minutes).padStart(2, '0') + ":" +
        String(seconds).padStart(2, '0') + ":" +
        String(milliseconds).padStart(3, '0');
}

document.getElementById("start").addEventListener("click", () => {

    if(!running){

        startTime = Date.now();

        timerInterval = setInterval(updateTime, 10);

        running = true;
    }
});

document.getElementById("pause").addEventListener("click", () => {

    if(running){

        clearInterval(timerInterval);

        elapsedTime += Date.now() - startTime;

        running = false;
    }
});

document.getElementById("reset").addEventListener("click", () => {

    clearInterval(timerInterval);

    startTime = 0;
    elapsedTime = 0;
    running = false;

    display.textContent = "00:00:00:000";

    laps.innerHTML = "";
});

document.getElementById("lap").addEventListener("click", () => {

    if(running){

        const lapItem = document.createElement("li");

        lapItem.textContent =
            "Lap " +
            (laps.children.length + 1) +
            " - " +
            display.textContent;

        laps.prepend(lapItem);
    }
});