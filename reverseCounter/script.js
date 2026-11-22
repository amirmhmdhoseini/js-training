
let counter = 120;
let startCounting = null;

let minutes = document.getElementById("minutes");
let seconds = document.getElementById("seconds");
let start = document.getElementById("start");
let resetButton = document.getElementById("reset");

function updateCounter() {
    let min;
    let sec;

    if (counter === 120) {
        min = 2;
        sec = 0;
    }
    else if (counter >= 60 && counter < 120) {
        min = 1;
        sec = counter % 60;
    }
    else {
        min = 0;
        sec = counter;
    }

    minutes.textContent = String(min).padStart(2, "0");
    seconds.textContent = String(sec).padStart(2, "0");
}

function startCounter() {
    if (startCounting !== null) {
        return;
    }

    if (counter === 0) {
        return;
    }

    startCounting = setInterval(() => {
        counter--;

        updateCounter();

        if (counter === 0) {
            clearInterval(startCounting);
            startCounting = null;
        }
    }, 1000);
}

function reset() {
    clearInterval(startCounting);
    startCounting = null;

    counter = 120;
    updateCounter();
}

start.addEventListener("click", startCounter);
resetButton.addEventListener("click", reset);

updateCounter();
