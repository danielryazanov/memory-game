let cardsData = [
    { index: 1, src: "./images/cardFace23.jpg", alt: "samurai cat" },
    { index: 2, src: "./images/cardFace5.jpg", alt: "samurai cat" },
    { index: 3, src: "./images/cardFace3.jpg", alt: "samurai cat" },
    { index: 4, src: "./images/cardFace4.jpg", alt: "samurai cat" },
    { index: 5, src: "./images/cardFace10.jpg", alt: "samurai cat" },
    { index: 6, src: "./images/cardFace17.jpg", alt: "samurai cat" },
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
