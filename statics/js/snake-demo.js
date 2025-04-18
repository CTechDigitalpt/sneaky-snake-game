let demoInterval;
let demoSpeed = 100;
let isDemoRunning = false;

function runSnakeDemo() {
    isDemoRunning = true;
    resetDemo();
    demoInterval = setInterval(() => {
        if (score >= 1000) {
            clearInterval(demoInterval);
            showDemoPopup();
            return;
        }

        const head = { ...snake[0] };

        // Calculate shortest distances considering wrapping
        const xDistance = (head.x - food.x + canvas.width) % canvas.width;
        const yDistance = (head.y - food.y + canvas.height) % canvas.height;

        const shortestXDistance = xDistance <= canvas.width / 2 ? xDistance : xDistance - canvas.width;
        const shortestYDistance = yDistance <= canvas.height / 2 ? yDistance : yDistance - canvas.height;

        // Determine X direction (left or right)
        let xDirection = null;
        if (shortestXDistance < 0) {
            xDirection = 'right';
        } else if (shortestXDistance > 0) {
            xDirection = 'left';
        }

        // Determine Y direction (up or down)
        let yDirection = null;
        if (shortestYDistance < 0) {
            yDirection = 'down';
        } else if (shortestYDistance > 0) {
            yDirection = 'up';
        }

        // Decide whether to move horizontally or vertically
        if (xDirection === null) {
            direction = yDirection;
        } else if (yDirection === null) {
            direction = xDirection;
        } else {
            direction = Math.abs(shortestXDistance) > Math.abs(shortestYDistance) ? xDirection : yDirection;
        }

        // Move the snake in the chosen direction
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

        drawSnake();
    }, demoSpeed);
}

function updateDemoSpeed() {
    const speedInput = document.getElementById('demo-speed');
    demoSpeed = parseInt(speedInput.value, 10);

    if (demoInterval) {
        clearInterval(demoInterval);
        runSnakeDemo();
    }
}

function resetDemo() {
    clearInterval(demoInterval);
    isDemoRunning = false;
    snake = [{ x: 10, y: 10 }];
    direction = 'right';
    score = 0;
    level = 1;
    initializeGame();
}
