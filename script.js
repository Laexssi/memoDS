//cards array
let card = document.getElementsByClassName("card");
let cards = [...card];
let highscore;
const endStats = document.querySelectorAll(".endstats");
const victoryModal = document.querySelector(".overlay-victory");
const lastGameHighscore = document.querySelector(".lastGameScore");
let localStore = localStorage.getItem("lastHighScore");
const highScoreList = document.querySelector(".highScoreList");
let highScoreRecord = localStorage.getItem("HighScore");
const scoreArr = [];




function setHighscore () {
  highScoreRecord === null
  ?  highScoreList.innerHTML = "Highscore: " 
  :  highScoreList.innerHTML = "Highscore: " + highScoreRecord
};


// Knuth shuffle
function shuffle(arr) {
  let currentIndex = arr.length,
    temp,
    randomIndex;
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temp = arr[currentIndex];
    arr[currentIndex] = arr[randomIndex];
    arr[randomIndex] = temp;
  }
  return arr;
}

//shuffle our deck
const deck = document.querySelector(".deck");
(function startGame() {
  const shuffledCards = shuffle(cards);
  setHighscore();
  shuffledCards.forEach(shuffledCard => deck.appendChild(shuffledCard));
  !localStore 
  ?lastGameHighscore.innerHTML ="Last score: "
  :lastGameHighscore.innerHTML ="Last score: " + localStore;
})();

//cards state
const displayCard = function() {
  
  this.classList.add("flip");
 
  this.classList.add("disabled");
  
  console.log(this);
};
cards.forEach(card => card.addEventListener("click", displayCard));
cards.forEach(card => card.addEventListener("click", cardOpen));
cards.forEach(card => card.addEventListener("click", victory));

//make array and match two opened cards
let openedCards = [];

const matchedCardHTML = document.getElementsByClassName("match");
const matchedCard = [...matchedCardHTML];
function cardOpen() {
  openedCards.push(this);
  console.log(openedCards);
  if (openedCards.length === 2) {
    
    openedCards[0].type === openedCards[1].type ? matched() : unmatched();
  }
  showMoves();
}

function matched() {
  
  openedCards[0].classList.add("matched");
  openedCards[1].classList.add("matched");
  openedCards[0].classList.add("disabled");
  openedCards[1].classList.add("disabled");
  matchedCard.push(openedCards[0]);
  matchedCard.push(openedCards[1]);
  openedCards = [];
 
  showEnemiesDefeated();
 
}

function unmatched() {
 
  openedCards[0].classList.add("unmatched");
  openedCards[1].classList.add("unmatched");
 
//   setTimeout(() => {openedCards[0].style = "background-color: #470516;";
//   openedCards[1].style = "background-color: #470516;";
// }, 500);
  

  disable();
  setTimeout(() => {
    openedCards[0].classList.remove("unmatched");
    openedCards[1].classList.remove("unmatched");
    openedCards[0].classList.remove("flip");
    openedCards[1].classList.remove("flip");
    // openedCards[0].style = "background-color: #282e3d;";
    // openedCards[1].style = "background-color: #282e3d;"
    enable();
    openedCards = [];
  }, 1500);
  showMistakes();
  hitHealthbar();
}

function disable() {
  cards.filter(card => card.classList.add("disabled"));
}
function enable() {
  cards.filter(card => card.classList.remove("disabled"));
  for (el of matchedCard) {
    el.classList.add("disabled");
  }
}

//timer
let second = 0, minute = 0, hour = 0;
let interval;
const timer = document.querySelector(".timer");
function startTimer() {
  interval = setInterval( () => {
      second++;
      if (second < 10) {
        second = "0"+second;
      }
      if (second > 59) {
        minute++;
        second=0;
      }
      if (minute == 10){
        second = "00";
        show(document.querySelector(".overlay-died"));
        endStats[0].innerHTML ="Your time is out";
        stopTimer();
      }
      timer.innerHTML = "Time: " + minute + ":" + second;
  }, 1000);
  };


function stopTimer() {
  clearInterval(interval);
}

//counters 

// function counter() {
//   let currentCounter = 0;
//   return function () {
//     return currentCounter++;
//   };
//  };



let steps = document.querySelector(".steps");
let moves = 0;
function showMoves() {
  moves++;
  steps.innerHTML = "Steps: " + moves;
  
  if (moves == 1) {
    second = 0;
    minute = 0;
    hour = 0;
    startTimer();
  }
};

let enemiesDefeated = document.querySelector(".enemies");
let rightMoves = 0;
function showEnemiesDefeated() {
 rightMoves++;
 enemiesDefeated.innerHTML = `Enemies defeated: ${rightMoves}/8`;
};

let mistakes = document.querySelector(".mistakes");
let fails = 0;
function showMistakes() {
  fails++;
  mistakes.innerHTML = "Mistakes: " + fails;
};

let hp = 100;
function hitHealthbar() {
  hp = hp - 10;
  $(".health-bar-text").html(Math.round(hp) + "%");
  $('.healthbar').css('width', hp + '%' );
  $('.healthbar-secondary').css('width', hp + '%');
  if (hp <= 0) {
    stopTimer();
    setTimeout(() => {show(document.querySelector(".overlay-died"))}, 1800);
  }
};

function show(modal) {
  modal.classList.add("show");
};

function refreshPage(){
  location.reload("true");
  console.log(this);
}

document.onclick = function(e) {
  console.log(e.target);
}

function victory() {
  if (matchedCard.length == 16) {
    
    highscore = Math.floor(1/((fails+0.01)*(minute+0.01)*(second/10))*10000);
    stopTimer();
    show(victoryModal);
    endStats[1].innerHTML = "Your score: " + highscore;
    if (highscore > localStore) {
      localStorage.setItem("HighScore", (highscore).toString(10));
    }
    localStorage.setItem("lastHighScore", (highscore).toString(10));
    console.log(matchedCard.length);
  }
}


