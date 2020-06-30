/*jshint esversion: 6 */
const buttonColors = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];
let firstPress = true;
let level = 0;
let buttons = document.querySelectorAll(".btn");
document.addEventListener("keypress", isFirstPress);
document.getElementById("level-title").addEventListener("click", isFirstPress);

buttons.forEach((btn) => {
  btn.addEventListener("click", (event) => {
    userClickedPattern.push(btn.id);
    animateButton(btn);
    playSound(btn.id);
    checkAnswer(userClickedPattern.length - 1);
  });
});

function isFirstPress() {
  if (firstPress) {
    nextSequence();
    firstPress = false;
  }
}

function nextSequence() {
  userClickedPattern = [];
  level++;
  document.getElementById("level-title").innerHTML = `Level: ${level}`;
  let randomNumber = Math.floor(Math.random() * 4);
  let randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);
  let currentBTN = document.getElementById(randomChosenColor);
  animateButton(currentBTN);
  playSound(randomChosenColor);
}

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    console.log("that is correct");
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    console.log("that is incorrect");
    document.getElementById("body").classList.add("game-over");
    let audio = new Audio(`./sounds/wrong.mp3`);
    audio.play();
    setTimeout(function () {
      document.getElementById("body").classList.remove("game-over");
    }, 200);
    document.getElementById(
      "level-title"
    ).innerHTML = `Game Over, Press any key to start again.`;
    startOver();
  }
}

function startOver() {
  level = 0;
  gamePattern = [];
  firstPress = true;
}

function playSound(name) {
  let audio = new Audio(`./sounds/${name}.mp3`);
  audio.play();
}

function animateButton(btn) {
  btn.classList.add("pressed");
  setTimeout(function () {
    btn.classList.remove("pressed");
  }, 100);
}
