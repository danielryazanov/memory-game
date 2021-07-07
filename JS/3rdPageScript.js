
/*===user data=== */

//getting user data from url:
const urlSearchParams = new URLSearchParams(window.location.search);
const userDetails = Object.fromEntries(urlSearchParams.entries());
userDetails.fullName = (fname, lname) => {
    return fname + ' ' + lname
  }  
const { fname, lname, fullName } = userDetails;


/*===game variables:=== */

// vars holding page elements:
const cards = document.getElementsByClassName("card");
const scoreDiv = document.getElementById("points");
const display = document.getElementById('stopwatch');
const start_stop = document.getElementById('start-stop');
const reset = document.getElementById('reset');
let scoreTableLink = document.getElementById("score-table-link")


// vars holding game state:
let firstCardFlipped = false;
let firstCardElement = false;
let lockBoard = false;
let points = 0;
let firstIndex, secondIndex;


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


/*=== game and buttons functions:*/

function flipCard(event) {  
    // dont flip if the board is locked:  
    if (lockBoard) return
    let card = event.currentTarget;
    // prevent double clicking:
    if (firstCardElement && firstCardElement === card) return;
    // game start:
    if (!firstCardFlipped) {
        firstCardFlipped = true;
        firstCardElement = card;
        firstIndex = card.getAttribute("data-index");
        flipAnimation(card);
    } else {
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
            lockBoard = true;
            //not equal cards
            flipAnimation(card);
            setTimeout(() => {
                flipAnimation(firstCardElement);
                flipAnimation(card);
                firstCardFlipped = false;
                firstCardElement = false;
                !stopwatch_started ? lockBoard = true : lockBoard = false                
            }, 1000);
        }
    }
    //start timer on first click:
    if (!stopwatch_started) {
        start_timer = window.setInterval(stopWatch, 1000); 
        stopwatch_started = true; 
    }

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

function shuffleCards() {    
    const conatiners = document.querySelectorAll('.container')
    conatiners.forEach(container => {
        let randomPosition = Math.floor(Math.random() *12)
        container.style.order = randomPosition
    })
}

function resetBoard() {
    for (let i = 0; i < cards.length; i++) {
        // flip cards back:
        cards[i].style.transform = "rotateY(0deg)"
        // restoring the cards event listeners:
        cards[i].addEventListener("click", flipCard); 
    }
    //reset points, timer, and vars holding card elements::
    [points, minutes, seconds] = [0, 0, 0];
    [stopwatch_started, firstCardElement, firstCardFlipped] = [false, false, false]
    clearInterval(start_timer);
    //reset display values:
    display.innerText = "00:00"
    scoreDiv.innerHTML = points;
    // wait for cards to flip then shuffle:
    setTimeout(shuffleCards, 500)     
}

function startOrStopGame() {
    if (!stopwatch_started) {
        start_timer = window.setInterval(stopWatch, 1000); 
        stopwatch_started = true;
        start_stop.innerText = "Stop";
        lockBoard = false;
      } else {
        clearInterval(start_timer);
        stopwatch_started = false;
        start_stop.innerText = "Start"
        lockBoard = true;
      }  
}


/*===event listeners:===*/

//calling shuffle function when page loaded:
document.addEventListener("DOMContentLoaded", () => {
    shuffleCards()
  });
  
//inserting user name to element in page:
document.addEventListener("DOMContentLoaded", () => {
    let playerName = document.getElementById('player-name');
    playerName.innerText = fullName(fname, lname);
  });
  
//event listener for card flipping:
  for (let i = 0; i < cards.length; i++) {
    cards[i].addEventListener("click", flipCard);
  }

// starting and stoping the game when clicking the start/stop button:
start_stop.addEventListener('click', (event) => {
    startOrStopGame()
})  

// reset game on reset button click:
reset.addEventListener('click', (event) => {
    resetBoard()    
})

// sending user details and game details in next page url:
scoreTableLink.addEventListener('click', (event) => {
    // storing the current values on click and changing the link accordingly:
    let userScore = document.getElementById('points').innerText;
    let userTime = document.getElementById('stopwatch').innerText;
    scoreTableLink.href = '../HTML/4thPage.html' + window.location.search + '&score=' + userScore + '&time=' + userTime
  })
  
  



