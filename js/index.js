function setEl(type) {
    let flipNode = document.querySelector(`.countdown-${type}`);
    flipNode.card = flipNode.querySelector(".card");
    flipNode.CardFaces = flipNode.querySelectorAll(".card-face");
    flipNode.digit = flipNode.querySelector(".digit");
    flipNode.cardFaceFront = flipNode.querySelector(".card-face-front");
    flipNode.cardFaceBack = flipNode.querySelector(".card-face-back");


    //timer
    let now = new Date().getTime();
    let endDate = new Date("January 27, 2022 00:00:00");
    let diff = endDate.getTime() - now;


    //get seconds, minutes, hours and days in milliseconds
    let s = 1000;
    let m = s * 60;
    let h = m * 60;
    let d = h * 24;

    //Check if the countdown is over and reset de countdown to 8 days
    if (diff < 0) {
        return

    }

    //get seconds, minutes, hours and days
    let days = Math.floor(diff / d);
    let hours = Math.floor((diff % d) / h);
    let minutes = Math.floor((diff % h) / m);
    let seconds = Math.floor((diff % m) / s);

    function addActiveClassWithDelay(){
        //the timeout add the class after 300 ms, in order to avoid an issue with transitionend on chrome and Safari
        setTimeout(()=>{
            flipNode.card.classList.add("active");
        },100)
    }

    let curr = null;

    if (type === "seconds") {
        curr = seconds;
        if (diff > 0) {
            addActiveClassWithDelay();
            
        }
    } else if (type === "minutes") {
        curr = minutes;
        if (seconds === 0) {
            if (days !== 0 || hours !== 0) {
                addActiveClassWithDelay();
            }
        }
    } else if (type === "hours") {
        curr = hours;
        if (minutes === 0 && seconds === 0) {
            addActiveClassWithDelay();
        }
    } else if (type === "days") {
        curr = days;
        if (hours === 0 && minutes === 0 && seconds === 0) {
            addActiveClassWithDelay();
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
        console.log("transitionend fired");
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

    }, { once: true });
}

function addDays(originalDate, days) {
    cloneDate = new Date(originalDate.valueOf());
    cloneDate.setDate(cloneDate.getDate() + days);
    return cloneDate;
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
