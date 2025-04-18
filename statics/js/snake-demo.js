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

        // Calculate distances considering screen wrapping
        const directXDistance = Math.abs(head.x - food.x);
        const wrappedXDistance = canvas.width - directXDistance;
        const directYDistance = Math.abs(head.y - food.y);
        const wrappedYDistance = canvas.height - directYDistance;

        // Determine X direction (left or right)
        let xDirection;
        if (directXDistance <= wrappedXDistance) {
            // Direct path is shorter or equal
            xDirection = head.x < food.x ? 'right' : (head.x > food.x ? 'left' : null);
        } else {
            // Wrapped path is shorter
            xDirection = head.x < food.x ? 'left' : 'right';
        }

        // Determine Y direction (up or down)
        let yDirection;
        if (directYDistance <= wrappedYDistance) {
            // Direct path is shorter or equal
            yDirection = head.y < food.y ? 'down' : (head.y > food.y ? 'up' : null);
        } else {
            // Wrapped path is shorter
            yDirection = head.y < food.y ? 'up' : 'down';
        }

        // Decide whether to move horizontally or vertically
        // Prioritize movement with greater distance to cover
        if (xDirection === null) {
            direction = yDirection;
        } else if (yDirection === null) {
            direction = xDirection;
        } else {
            // Choose the axis with greater distance to cover (adjusted for wrapping)
            const effectiveXDistance = Math.min(directXDistance, wrappedXDistance);
            const effectiveYDistance = Math.min(directYDistance, wrappedYDistance);
            
            direction = effectiveXDistance > effectiveYDistance ? xDirection : yDirection;
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

// Also need to update this function to use the new logic
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
