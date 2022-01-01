function setEl(type) {
    let flipNode = document.querySelector(`.countdown-${type}`);
    flipNode.card = flipNode.querySelector(".card");
    flipNode.CardFaces = flipNode.querySelectorAll(".card-face");
    flipNode.digit = flipNode.querySelector(".digit");
    flipNode.cardFaceFront = flipNode.querySelector(".card-face-front");
    flipNode.cardFaceBack = flipNode.querySelector(".card-face-back");


    //timer
    let now = new Date().getTime();
    let endDate = new Date("January 02, 2022 11:30:00");
    let diff = endDate - now;

    let s = 1000;
    let m = s * 60;
    let h = m * 60;
    let d = h * 24;

    let days = Math.floor(diff / d);
    let hours = Math.floor((diff % d) / h);
    let minutes = Math.floor((diff % h) / m);
    let seconds = Math.floor((diff % m) / s);


    let curr = null;


    //Check if the countdown is over
    if (diff < 0) {
        return
    }

    if (type === "seconds") {
        curr = seconds;
        if (days !== 0 || hours !== 0 || minutes !== 0) {
            flipNode.card.classList.add("active");
        }
    } else if (type === "minutes") {
        curr = minutes;
        if (seconds === 0) {
            if (days !== 0 || hours !== 0) {
                flipNode.card.classList.add("active");
            }
        }
    } else if (type === "hours") {
        curr = hours;
        if (minutes === 0 && seconds === 0) {

            flipNode.card.classList.add("active");
        }
    } else if (type === "days") {
        curr = days;
        if (hours === 0 && minutes === 0 && seconds === 0) {
            flipNode.card.classList.add("active");
        }
    }

    flipNode.digit.dataset.digitBefore = curr < 10 ? "0" + curr : curr;
    flipNode.cardFaceFront.innerText = flipNode.digit.dataset.digitBefore;

    if (curr === 0) {
        if (type === "hours") {
            flipNode.digit.dataset.digitAfter = 23;
        } else {
            flipNode.digit.dataset.digitAfter = 59;
        }
        flipNode.cardFaceBack.innerText = flipNode.digit.dataset.digitAfter;
    } else {
        flipNode.digit.dataset.digitAfter = (curr - 1) < 10 ? "0" + (curr - 1) : curr - 1;
        flipNode.cardFaceBack.innerText = flipNode.digit.dataset.digitAfter;
    }

    flipNode.card.addEventListener("transitionend", function () {

        if (curr === 0) {
            if (type === "hours") {
                flipNode.digit.dataset.digitBefore = 23;
            } else {
                flipNode.digit.dataset.digitBefore = 59;
            }

        } else {
            flipNode.digit.dataset.digitBefore = (curr - 1) < 10 ? "0" + (curr - 1) : curr - 1;
        }

        flipNode.cardFaceFront.innerText = flipNode.digit.dataset.digitBefore;

        //cone the node and replace it to have a new animation
        let newFlipCard = flipNode.card.cloneNode(true);
        newFlipCard.classList.remove("active");
        flipNode.digit.replaceChild(newFlipCard, flipNode.card);
        flipNode.card = newFlipCard;


        //The var need to be reassigned or they will point out the old node and not the new one
        flipNode.cardFaces = flipNode.querySelectorAll(".card-face");
        flipNode.cardFaceFront = flipNode.cardFaces[0];
        flipNode.cardFaceBack = flipNode.cardFaces[1];


        flipNode.digit.dataset.digitAfter = (curr - 1) < 10 ? "0" + (curr - 1) : curr - 1;
        flipNode.cardFaceBack.innerText = flipNode.digit.dataset.digitAfter;

    });
}

function countdown() {
    setEl("seconds");
    setEl("minutes");
    setEl("hours");
    setEl("days");
}

countdown();

setInterval(() => {
    countdown();
}, 1000);
