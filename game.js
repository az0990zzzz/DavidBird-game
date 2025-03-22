const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Загрузка изображений
const bird = new Image();
const bg = new Image();
const fg = new Image();
const pipeUp = new Image();
const pipeDown = new Image();
bird.src = "bird.png";
bg.src = "bg.png";
fg.src = "fg.png";
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

function draw() {
    ctx.drawImage(bg, 0, 0);
    pipes.forEach(pipe => {
        ctx.drawImage(pipeUp, pipe.x, pipe.y);
        ctx.drawImage(pipeDown, pipe.x, pipe.y + pipeUp.height + pipeGap);
        pipe.x -= 2;

        // Проверка столкновений
        if (x + bird.width >= pipe.x && x <= pipe.x + pipeUp.width &&
            (y <= pipe.y + pipeUp.height || y + bird.height >= pipe.y + pipeUp.height + pipeGap)) {
            location.reload();
        }

        if (pipe.x === 125) {
            pipes.push({ x: canvas.width, y: Math.random() * 200 - 200 });
        }
    });

    ctx.drawImage(fg, 0, canvas.height - fg.height);
    ctx.drawImage(bird, x, y);
    velocity += gravity;
    y += velocity;

    if (y + bird.height >= canvas.height - fg.height) location.reload();
    requestAnimationFrame(draw);
}

pipeDown.onload = draw;
