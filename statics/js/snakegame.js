let snake = [{ x: 10, y: 10 }];
let direction = 'right';
let food = { x: 0, y: 0 };
let score = 0;
let level = 1;
let snakeColor = "red";
let isPaused = false;
let foodColor = "green";

const gridSize = 10;
const foodSize = 10;

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

if (!ctx) {
    console.error("Canvas not supported. Please use a different browser.");
} else {
    document.getElementById('game-container').appendChild(canvas);
}

canvas.width = 400;
canvas.height = 350;

function initializeGame() {
    spawnFood();
}

function moveSnake() {
    if (!isPaused) {
        const head = { ...snake[0] };

        switch (direction) {
            case 'up':
                head.y = (head.y - gridSize + canvas.height) % canvas.height;
                break;
            case 'down':
                head.y = (head.y + gridSize) % canvas.height;
                break;
            case 'left':
                head.x = (head.x - gridSize + canvas.width) % canvas.width;
                break;
            case 'right':
                head.x = (head.x + gridSize) % canvas.width;
                break;
        }

        snake.unshift(head);

        if (head.x === food.x && head.y === food.y) {
            score += 10;
            spawnFood();
        } else {
            snake.pop();
        }

        checkCollision();
    }
}

function drawSnake() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = snakeColor;

    snake.forEach(segment => {
        ctx.fillRect(segment.x, segment.y, gridSize, gridSize);
    });

    drawSpawnFood();
    document.getElementById('score').textContent = `Score: ${score}`;
    document.getElementById('level').textContent = `Level: ${level}`;
}

function spawnFood() {
    const maxX = (canvas.width / gridSize) - 1;
    const maxY = (canvas.height / gridSize) - 1;
    do {
        food = {
            x: Math.floor(Math.random() * maxX) * gridSize,
            y: Math.floor(Math.random() * maxY) * gridSize
        };
    } while (snake.some(segment => segment.x === food.x && segment.y === food.y));
}

function drawSpawnFood() {
    ctx.fillStyle = foodColor;
    ctx.fillRect(food.x, food.y, foodSize, foodSize);
}

function checkCollision() {
    const head = snake[0];
    for (let i = 1; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) {
            gameOver();
            return;
        }
    }
}

function updateScore() {
    const newLevel = Math.floor(score / 100) + 1;
    if (newLevel > level) {
        level = newLevel;
        if (!isDemoRunning) {
            showPopupMessage("Level up! Keep Going!");
        }
    }
}

function showPopupMessage(message) {
    let popup = document.querySelector('.popup-message');
    if (!popup) {
        popup = document.createElement('div');
        popup.classList.add('popup-message');
        document.body.appendChild(popup);
    }
    popup.textContent = message;
    popup.style.display = 'flex';

    setTimeout(() => {
        popup.style.display = 'none';
    }, 3000);
}

function handleKeyPress(event) {
    switch (event.key) {
        case 'ArrowUp':
            if (direction !== 'down') direction = 'up';
            break;
        case 'ArrowDown':
            if (direction !== 'up') direction = 'down';
            break;
        case 'ArrowLeft':
            if (direction !== 'right') direction = 'left';
            break;
        case 'ArrowRight':
            if (direction !== 'left') direction = 'right';
            break;
    }
}

function changeFoodColor() {
    const allowedColors = ["green", "blue", "yellow", "purple", "red"];
    const currentColorIndex = allowedColors.indexOf(foodColor);
    foodColor = allowedColors[(currentColorIndex + 1) % allowedColors.length];
}

function gameLoop() {
    moveSnake();
    drawSnake();
    updateScore();
}

function gameOver() {
    const collisionMessages = [
        "Oh No! You had a collision!",
        "Oops! Snakey met its tail!",
        "Game Over! Snakey got bit!",
        "Yikes! Watch out for yourself next time!",
        "Snake says: 'Why did you let me eat myself?'"
    ];

    const randomMessage = collisionMessages[Math.floor(Math.random() * collisionMessages.length)];

    showPopupMessage(randomMessage);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#000';
    ctx.font = '20px Arial';
    ctx.fillText('Game Over!', canvas.width / 2 - 70, canvas.height / 2 - 10);
    ctx.fillText(`Score: ${score}`, canvas.width / 2 - 40, canvas.height / 2 + 20);
    clearInterval(gameInterval);

    const popup = document.querySelector('.popup-message');
    if (popup) {
        popup.onclick = null;
    }

    const finalScore = score; // Retrieve the player's final score
    updateHighScores(finalScore); // Update high scores
    alert(`Game Over! Your score: ${finalScore}`);
}

function toggleBackground() {
    document.body.classList.toggle('dark-mode');
    document.getElementById('game-container').classList.toggle('dark-mode');
}

function changeSnakeColor() {
    const allowedColors = ["green", "blue", "yellow", "purple", "red"];
    let currentColorIndex = allowedColors.indexOf(snakeColor);

    currentColorIndex = (currentColorIndex + 1) % allowedColors.length;
    snakeColor = allowedColors[currentColorIndex];
}

function restartGame() {
    snake = [{ x: 10, y: 10 }];
    direction = 'right';
    score = 0;
    level = 1;
    isPaused = false;
    initializeGame();
}

function togglePause() {
    isPaused = !isPaused;
    if (isPaused) {
        showPopupMessage("Game Paused");
    } else {
        const pauseMessage = document.querySelector('.popup-message');
        if (pauseMessage) {
            pauseMessage.style.display = 'none';
        }
    }
}

function startDemo() {
    isPaused = true;
    document.getElementById('demo-popup').style.display = 'none';
    document.getElementById('demo-speed-container').style.display = 'block'; 
    runSnakeDemo(); 
}

function showDemoPopup() {
    const demoPopup = document.getElementById('demo-popup');
    demoPopup.style.display = 'flex';
}

function restartDemo() {
    const demoPopup = document.getElementById('demo-popup');
    demoPopup.style.display = 'none';
    runSnakeDemo();
}

function closeDemoPopup() {
    const demoPopup = document.getElementById('demo-popup');
    demoPopup.style.display = 'none';
    document.getElementById('demo-speed-container').style.display = 'none';
    restartGame(); 
}

document.addEventListener('keydown', handleKeyPress);

initializeGame();

const gameInterval = setInterval(gameLoop, 100);
