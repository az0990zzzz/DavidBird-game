const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Загрузка кастомных изображений
const bird = new Image();
const bg = new Image();
const ground = new Image();
const pipeUp = new Image();
const pipeDown = new Image();

bird.src = "bird.png";
bg.src = "background.png";
ground.src = "ground.png";
pipeUp.src = "pipeUp.png";
pipeDown.src = "pipeDown.png";

// Позиция птицы
let x = 50, y = 150, gravity = 0.4, velocity = 0, lift = -8;
let gameStarted = false, countdown = 3;
let pipes = [], pipeGap = 90, score = 0;

function jump() {
    if (gameStarted) {
        velocity = lift;
    }
}

document.addEventListener("keydown", jump);
canvas.addEventListener("click", jump);

function spawnPipe() {
    let pipeY = Math.random() * 200 - 200;
    pipes.push({ x: canvas.width, y: pipeY });
}

function draw() {
    ctx.drawImage(bg, 0, 0, canvas.width, canvas.height);
    pipes.forEach((pipe, index) => {
        ctx.drawImage(pipeUp, pipe.x, pipe.y);
        ctx.drawImage(pipeDown, pipe.x, pipe.y + pipeUp.height + pipeGap);
        pipe.x -= 2;

        if (pipe.x + pipeUp.width < 0) {
            pipes.splice(index, 1);
            score++;
        }

        if (x + bird.width >= pipe.x && x <= pipe.x + pipeUp.width &&
            (y <= pipe.y + pipeUp.height || y + bird.height >= pipe.y + pipeUp.height + pipeGap)) {
            resetGame();
        }
    });

    if (pipes.length === 0 || pipes[pipes.length - 1].x < canvas.width - 200) {
        spawnPipe();
    }

    ctx.drawImage(ground, 0, canvas.height - ground.height);
    ctx.drawImage(bird, x, y);

    if (gameStarted) {
        velocity += gravity;
        y += velocity;
        if (y + bird.height >= canvas.height - ground.height) resetGame();
        ctx.fillStyle = "#000";
        ctx.font = "30px Arial";
        ctx.fillText("Score: " + score, 10, 40);
    }
    requestAnimationFrame(draw);
}

function startCountdown() {
    if (countdown > 0) {
        ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "white";
        ctx.font = "50px Arial";
        ctx.fillText(countdown, canvas.width / 2 - 15, canvas.height / 2);
        countdown--;
        setTimeout(startCountdown, 1000);
    } else {
        gameStarted = true;
        draw();
    }
}

function resetGame() {
    location.reload();
}

// Кнопка Start
const startButton = document.createElement("button");
startButton.innerText = "Start";
startButton.style.position = "absolute";
startButton.style.top = "50%";
startButton.style.left = "50%";
startButton.style.transform = "translate(-50%, -50%)";
startButton.style.background = "yellow";
startButton.style.color = "black";
startButton.style.fontSize = "24px";
startButton.style.padding = "15px 30px";
startButton.style.border = "3px solid black";
startButton.style.borderRadius = "10px";
startButton.style.boxShadow = "3px 3px 10px rgba(0,0,0,0.3)";
startButton.style.cursor = "pointer";
startButton.onclick = function() {
    document.body.removeChild(startButton);
    startCountdown();
};
document.body.appendChild(startButton);
