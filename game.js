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
let x = 50, y = 150, gravity = 1.5, velocity = 0;
const jump = () => velocity = -8;

document.addEventListener("keydown", jump);
canvas.addEventListener("click", jump);

// Генерация труб
const pipes = [{ x: canvas.width, y: Math.random() * 200 - 200 }];
const pipeGap = 90;
let score = 0;

function draw() {
    ctx.drawImage(bg, 0, 0);
    
    pipes.forEach(pipe => {
        ctx.drawImage(pipeUp, pipe.x, pipe.y);
        ctx.drawImage(pipeDown, pipe.x, pipe.y + pipeUp.height + pipeGap);
        pipe.x -= 2;

        if (x + bird.width >= pipe.x && x <= pipe.x + pipeUp.width &&
            (y <= pipe.y + pipeUp.height || y + bird.height >= pipe.y + pipeUp.height + pipeGap)) {
            location.reload();
        }

        if (pipe.x === 125) {
            pipes.push({ x: canvas.width, y: Math.random() * 200 - 200 });
            score++;
        }
    });

    ctx.drawImage(ground, 0, canvas.height - ground.height);
    ctx.drawImage(bird, x, y);
    velocity += gravity;
    y += velocity;

    if (y + bird.height >= canvas.height - ground.height) location.reload();
    
    // Отрисовка счётчика
    ctx.fillStyle = "#000";
    ctx.font = "20px Arial";
    ctx.fillText("Score: " + score, 10, 30);

    requestAnimationFrame(draw);
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
startButton.style.fontSize = "20px";
startButton.style.padding = "10px 20px";
startButton.style.border = "none";
startButton.style.cursor = "pointer";
startButton.onclick = function() {
    document.body.removeChild(startButton);
    draw();
};
document.body.appendChild(startButton);
