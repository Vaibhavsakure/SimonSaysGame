let gameseq = [];
let userseq = [];

let btn = ["yellow", "red", "purple", "green"];

let started = false;
let level = 0;
let highScore = localStorage.getItem("highScore") || 0; // Load highest score from localStorage

let h2 = document.querySelector("h2");

document.addEventListener("keypress", function () {
    if (!started) {
        console.log("Game started!");
        started = true;
        gameseq = [];  // Reset game sequence
        userseq = [];  // Reset user sequence
        level = 0;  // Reset level
        levelup();
    }
});

function gameflash(btn) {
    btn.classList.add("flash");
    setTimeout(function () {
        btn.classList.remove("flash");
    }, 250);
}

function userflash(btn) {
    btn.classList.add("userflash");
    setTimeout(function () {
        btn.classList.remove("userflash");
    }, 250);
}

function levelup() {
    level++;
    h2.innerText = `Level ${level} | Highest Score: ${highScore}`; // Display highest score

    userseq = []; // Reset user sequence for the new level

    let randIdx = Math.floor(Math.random() * btn.length);
    let randColor = btn[randIdx];
    let randbtn = document.querySelector(`.${randColor}`);

    gameseq.push(randColor);
    console.log("Game Sequence: ", gameseq);

    setTimeout(() => {
        gameflash(randbtn);
    }, 500);
}

function checkans(idx) {
    if (userseq[idx] === gameseq[idx]) {
        if (userseq.length === gameseq.length) {
            setTimeout(levelup, 1000);
        }
    } else {
        if (level > highScore) {
            highScore = level; // Update highest score
            localStorage.setItem("highScore", highScore); // Save it to localStorage
        }

        h2.innerHTML = `Game Over! YOUR SCORE WAS <b>${level}</b> <br> Highest Score: <b>${highScore}</b> <br> Press any key to start`;

        // Flash red background
        document.querySelector("body").style.backgroundColor = "red";
        setTimeout(function () {
            document.querySelector("body").style.backgroundColor = "white";
        }, 150);

        reset(); // Reset the game
    }
}

function btnPress() {
    let btn = this;
    userflash(btn);

    let usercolor = btn.getAttribute("id");
    userseq.push(usercolor);
    
    console.log("User Sequence: ", userseq);

    checkans(userseq.length - 1);
}

let allbtns = document.querySelectorAll(".btn");
for (let btn of allbtns) {
    btn.addEventListener("click", btnPress);
}

function reset(){
    started = false;
    gameseq = [];
    userseq = [];
    level = 0;
}
