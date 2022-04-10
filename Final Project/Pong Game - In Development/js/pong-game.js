const canvas = document.getElementById("pong");
const context = canvas.getContext("2d");

context.fillStyle = "black";
context.fillRect(100, 200, 50, 75);
context.fillStyle = "red";
context.beginPath();
context.arc(300, 350, 100, 0, Math.PI * 2, false);
context.closePath();
context.fill();

function drawRect(x, y, w, h, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, w, h);
}

function drawCircle(x, y, r, color) {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2, false);
    ctx.closePath();
    ctx.fill();
}

function drawText(text, x, y, color) {
    ctx.fillStyle = color;
    ctx.font = "75px fantasy";
    ctx.fillText(text, x, y);
}

drawRect(x, y, w, h, color)

drawRect(100, 100, 100, 100, "red");
drawRect(0, 0, 600, 400, "black");
drawRect(300, 100, 100, 100, "red");
drawRect(0, 0, 600, 400, "black");
drawRect(500, 100, 100, 100, "red");
drawRect(0, 0, 600, 400, "black");
drawRect(700, 100, 100, 100, "red");

let rectX = 0;

function render() {
    drawRect(0, 0, 600, 400, "black");
    drawRect(rectX, 100, 100, 100, "red");
    rectX = rectX + 100;
}

setInterval(render, 1000);

const user = {
    x : 0,
    y : canvas.height/2 - 100/2,
    width : 10,
    height : 100,
    color : "WHITE",
    score : 0
}

const com = {
    x : canvas.width - 10,
    y : canvas.height/2 - 100/2,
    width : 10,
    height : 100,
    color : "WHITE",
    score : 0
}

drawRect(user.x, user.y, user.width, user.height, user.color);
drawRect(com.x, com.y, com.width, com.height, com.color);

const net = {
    x : canvas.width/2 - 2/2,
    y : 0,
    width : 2,
    height : 10,
    color : "WHITE",
}

function drawNet() {
    for(let i = 0; i <= canvas.height; i += 15) {
        drawRect(net.x, net.y + i, net.width, net.height, net.color);
    }
}

const ball = {
    x : canvas.width/2,
    y : canvas.height/2,
    radius : 10,
    speed : 5,
    velocityX : 5,
    velocityY : 5,
    color : "WHITE"
}

drawCircle(ball.x, ball.y, ball.r, ball.color);
drawText(user.score, canvas.width/4, canvas.height/5, "WHITE");
drawText(com.score, 3 * canvas.width/4, canvas.height/5, "WHITE");

function render() {
    drawRect(0, 0, canvas.width, canvas.height, "BLACK");
    drawText(user.score, canvas.width/4, canvas.height/5, "WHITE");
    drawText(com.score, 3 * canvas.width/4, canvas.height/5, "WHITE");
    drawNet();
    drawRect(user.x, user.y, user.width, user.height, user.color);
    drawRect(com.x, com.y, com.width, com.height, com.color);
    drawCircle(ball.x, ball.y, ball.radius, ball.color);
}

function game() {
    update();
    render();
}

const framePerSecond = 50;
setInterval(game, 1000/framePerSecond);

function update() {
    ball.x += velocityX; 
    ball.y += velocityY; 
    if(ball.y + ball.radius > canvas.height || ball.y - ball.radius < 0) {
        velocityY = - velocityY;
    }
    let player = (ball.x < canvas.width/2) ? user : com;
    if(collision(ball, player)) {
        let collidePoint = (ball.y - (player.y + player.height/2));
        collidePoint = collidePoint / (player.height/2);
        let angleRad = (Math.PI/4) * collidePoint;
        let direction = (ball.x < canvas.width/2) ? 1 : -1;
        ball.velocityX = direction * ball.speed * Math.cos(angleRad);
        ball.velocityY = ball.speed * Math.sin(angleRad);
        ball.speed += 0.1;
    }
}

function collision(b, p) {
    p.top = p.y;
    p.bottom = p.y + p.height;
    p.left = p.x;
    p.right = p.x + p.width;

    b.top = b.y - b.radius;
    b.bottom = b.y + b.radius;
    b.left = b.x - b.radius;
    b.right = b.x + b.radius;

    return b.right > p.left && b.btop < p.bottom && b.left < p.right && b.bottom > p.top;
}

function resetBall() {
    ball.x = canvas.width/2;
    ball.y = canvas.height/2;
    ball.speed = 5;
    ball.velocityX = -ball.velocityX;
}

function update() {
    if(ball.x - ball.radius < 0) {
        com.score++;
        resetBall();
    }else if(ball.x + ball.radius > canvas.width) {
        user.score++;
    }
}

canvas.addEventListener("mousemove", movePaddle);

function movePaddle(evt) {
    let rect = canvas.getBoundingClientRect();
    user.y = evt.clientY - rect.top - user.height/2;
}

let computerLevel = 0.1;
com.y += (ball.y - (com.y + com.height/2)) * computerLevel;