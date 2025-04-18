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

        if (head.x < food.x) {
            direction = 'right';
        } else if (head.x > food.x) {
            direction = 'left';
        } else if (head.y < food.y) {
            direction = 'down';
        } else if (head.y > food.y) {
            direction = 'up';
        }

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
        demoInterval = setInterval(() => {
            if (score >= 1000) {
                clearInterval(demoInterval);
                showDemoPopup();
                return;
            }

            const head = { ...snake[0] };

            if (head.x < food.x) {
                direction = 'right';
            } else if (head.x > food.x) {
                direction = 'left';
            } else if (head.y < food.y) {
                direction = 'down';
            } else if (head.y > food.y) {
                direction = 'up';
            }

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
