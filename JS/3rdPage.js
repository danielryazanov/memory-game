let cardsData = [
    { index: 1, src: "../Pics/cardFace23.jpg", alt: "samurai cat" },
    { index: 2, src: "../Pics/cardFace5.jpg", alt: "samurai cat" },
    { index: 3, src: "../Pics/cardFace3.jpg", alt: "samurai cat" },
    { index: 4, src: "../Pics/cardFace4.jpg", alt: "samurai cat" },
    { index: 5, src: "../Pics/cardFace10.jpg", alt: "samurai cat" },
    { index: 6, src: "../Pics/cardFace17.jpg", alt: "samurai cat" },
];

let shuffleCards = shuffle(cardsData);

let cards = document.getElementsByClassName("card");
let points = 0;
let scoreDiv = document.getElementById("points");

let firstCardFlipped = false;
let firstCardElement = false;

let firstIndex, secondIndex;

let j = 0;

for (let i = 0; i < cards.length; i++) {
    cards[i].addEventListener("click", flipCard);
    let img = cards[i].querySelector(".back-img");

    if (j === 6) {
        j = 0;
    }
    img.src = shuffleCards[j].src;
    img.alt = shuffleCards[j].alt;
    cards[i].setAttribute("data-index", shuffleCards[j].index);
    j++;
}

function flipAnimation(card) {
    if ((card.class = "card")) {
        if (card.style.transform == "rotateY(180deg)") {
            card.style.transform = "rotateY(0deg)";
        } else {
            card.style.transform = "rotateY(180deg)";
        }
    }
}

function addScore() {
    points++;
    scoreDiv.innerHTML = points;
}

function flipCard(event) {
    let card = event.currentTarget;
    if (firstCardElement && firstCardElement === card) return;
    if (!firstCardFlipped) {
        firstCardFlipped = true;
        firstCardElement = card;
        firstIndex = card.getAttribute("data-index");
        flipAnimation(card);
    } else {
        debugger;
        const secondIndex = card.getAttribute("data-index");
        if (secondIndex === firstIndex) {
            //equal cards
            firstCardElement.removeEventListener("click", flipCard);
            card.removeEventListener("click", flipCard);
            flipAnimation(card);
            firstCardFlipped = false;
            firstCardElement = false;
            addScore();
        } else {
            //not equal cards
            flipAnimation(card);
            setTimeout(() => {
                flipAnimation(firstCardElement);
                flipAnimation(card);
                firstCardFlipped = false;
                firstCardElement = false;
            }, 600);
        }
    }
}

function shuffle(array) {
    var currentIndex = array.length,
        randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex],
            array[currentIndex],
        ];
    }

    return array;
}



/*===stopWatch===*/

// Variables holding time integers:
let seconds = 0;
let minutes = 0;

// Variables holding the actual display value:
let seconds_display = 0;
let minutes_display = 0;

//variables to hold setInterval function and stopwatch status:
let start_timer = null;
let stopwatch_started = false;

// The main stopwatch function:
function stopWatch() {
    seconds++
    let display = document.getElementById('stopwatch');

// When to increment mins/hrs:
    if (seconds > 59) {
        seconds = 0
        minutes++
    }
    if (minutes == 59 && seconds == 59) {
      (() => {    
        alert('You ran out of time')
        clearInterval(start_timer);
        stopwatch_started = false;
  })()
    }

// When to display 0 before the number:
    if (seconds < 10) {
        seconds_display = '0' + seconds;
    } else {
        seconds_display = seconds
    }
    if (minutes < 10) {
        minutes_display = '0' + minutes;
    } else {
        minutes_display = minutes
    }    
    display.innerHTML = minutes_display + ':' + seconds_display;    
}


/*
// starting and stoping the stopwatch when clicking the start/stop button:
let start_stop = document.getElementById('start_stop');
  start_stop.addEventListener('click', (event) => {
    if (!stopwatch_started) {
      start_timer = window.setInterval(stopWatch, 1000); 
      stopwatch_started = true;
    } else {
      clearInterval(start_timer);
      stopwatch_started = false;
    }  
})  
*/


/*===user data=== */

//getting user data from url:
const urlSearchParams = new URLSearchParams(window.location.search);
const userDetails = Object.fromEntries(urlSearchParams.entries());
userDetails.fullName = (fname, lname) => {
    return fname + ' ' + lname
  }  
const { fname, lname, fullName } = userDetails;

//inserting user name to elements in page:
document.addEventListener("DOMContentLoaded", () => {
    let playerName = document.getElementById('player-name');
    playerName.innerText = fullName(fname, lname);
  });
  

// sending user details and game details in next page url:
let scoreTableLink = document.getElementById("score-table-link")
// storing the current values on click and changing the link accordingly:
scoreTableLink.addEventListener('click', (event) => {
  let userScore = document.getElementById('points').innerText;
  let userTime = document.getElementById('stopwatch').innerText;
  scoreTableLink.href = '../HTML/4thPage.html' + window.location.search + '&score=' + userScore + '&time=' + userTime
})

