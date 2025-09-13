let gameSeq = [];
let userSeq = [];

let level = 0;
let highScore = 0;

let h2 = document.querySelector("h2");
let hh2 = document.querySelector("h3");
let startbtn = document.querySelector("#start");
let quitbtn = document.querySelector("#quit");

let btns = ["c1", "c2", "c3", "c4"];

//Start Button 
startbtn.addEventListener("click", function () {
  reset();
  levelUp();
});

//Quit Button
quitbtn.addEventListener("click", function () {
  if (confirm("Do you want to QUIT?")) {
    reset();
  }
});

//Flash Effect 
function btnFlash(btn) {
  btn.classList.add("flash");
  setTimeout(function () {
    btn.classList.remove("flash");
  }, 200);
}

//Level Up
function levelUp() {
  userSeq = []; 
  level++;
  hh2.innerText = `Level ${level}`;

  let randIdx = Math.floor(Math.random() * 4);
  let randColor = btns[randIdx];
  let randBtn = document.querySelector(`.${randColor}`);
  gameSeq.push(randColor);
  btnFlash(randBtn);
}

//Compare Answers
function checkAns(idx) {
  if (userSeq[idx] === gameSeq[idx]) {
    if (userSeq.length === gameSeq.length) {
      setTimeout(levelUp, 1000);
    }
  } else {
    if (level > highScore) {
      highScore = level;
    }

    h2.innerHTML = `Game Over! Your score was <b>${level}</b> | High Score: <b>${highScore}</b>`;
    document.body.style.backgroundColor = "red";
    setTimeout(function () {
      document.body.style.backgroundColor = "white";
    }, 200);
    reset(false); // don't overwrite high score on reset
  }
}

//Player Button Press
function btnPress() {
  let btn = this;
  btnFlash(btn);

  let userColor = btn.classList[0];  // first class = c1/c2/c3/c4
  userSeq.push(userColor);

  checkAns(userSeq.length - 1);
}

//Attach Listeners
let allBtns = document.querySelectorAll(".box");
for (let btn of allBtns) {
  btn.addEventListener("click", btnPress);
}

//Reset
function reset(showMsg = true) {
  gameSeq = [];
  userSeq = [];
  level = 0;
  if (showMsg) {
    h2.innerText = "Game Start!";
  }
  hh2.innerText = "Level";
}
