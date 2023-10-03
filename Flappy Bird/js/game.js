let cvs = document.getElementById("canvas");
let ctx = cvs.getContext("2d");

let bird = new Image();
let bg = new Image();
let fg = new Image();
let pipeUp = new Image();
let pipeBtm = new Image();

bird.src = "img/bird.png";
bg.src = "img/bg.png";
fg.src = "img/fg.png";
pipeUp.src = "img/pipeUp.png";
pipeBtm.src = "img/pipeBtm.png";

let fly = new Audio();
let score_audio = new Audio();

fly.src = "audio/fly.mp3";
score_audio.src = "audio/score.mp3";

let gap = 90;

let pipe = [];

pipe[0] = {
    x: cvs.width,
    y: 0
};

// bird move
document.addEventListener("keydown", moveUp);

function moveUp() {
    yPos -= 25;
    fly.play();
}

let score = 0;
// bird position
let xPos = 10;
let yPos = 150;
let grav = 1.5;

function draw() {
    ctx.drawImage(bg, 0, 0);

    for (let i = 0; i < pipe.length; i++) {
        ctx.drawImage(pipeUp, pipe[i].x, pipe[i].y);
        ctx.drawImage(pipeBtm, pipe[i].x, pipe[i].y + pipeUp.height + gap);

        pipe[i].x--;

        // new pipes
        if(pipe[i].x === 125) {
            pipe.push({
                x: cvs.width,
                y: Math.floor( (Math.random() - 1) * pipeUp.height )
            })
        }

        // pipe touch check
        if(
            xPos + bird.width >= pipe[i].x
            && xPos <= pipe[i].x + pipeUp.width
            && (yPos <= pipe[i].y + pipeUp.height
                || yPos + bird.height >= pipe[i].y + pipeUp.height + gap)
            || yPos + bird.height >= cvs.height - fg.height
        ) {
            startGame();
        }

        if(pipe[i].x === 5) {
            score++;
            score_audio.play();
        }
    }

    ctx.drawImage(fg, 0, cvs.height - fg.height);
    ctx.drawImage(bird, xPos, yPos);

    ctx.fillStyle = "#000";
    ctx.font = "24px Verdana";
    ctx.fillText("Score: " + score, 10, cvs.height - 20);

    yPos += grav;
    requestAnimationFrame(draw);
}

function startGame() {
    if(window.confirm("GAME OVER.\nYour score: " + score + "\n\nRestart?")) {
        location.reload();
    }
}

pipeBtm.onload = draw;