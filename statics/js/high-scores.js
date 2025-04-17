const HIGH_SCORES_KEY = "highScores";
const MAX_HIGH_SCORES = 10;

// Load high scores from local storage or initialize an empty array
function loadHighScores() {
    const highScores = JSON.parse(localStorage.getItem(HIGH_SCORES_KEY)) || [];
    return highScores;
}

// Save high scores to local storage
function saveHighScores(highScores) {
    localStorage.setItem(HIGH_SCORES_KEY, JSON.stringify(highScores));
}

// Update the high scores list if the current score qualifies
function updateHighScores(score) {
    const highScores = loadHighScores();
    highScores.push(score);
    highScores.sort((a, b) => b - a); // Sort scores in descending order
    if (highScores.length > MAX_HIGH_SCORES) {
        highScores.pop(); // Remove the lowest score if there are more than 10
    }
    saveHighScores(highScores);
    displayHighScores();
}

// Display the high scores in the high scores container
function displayHighScores() {
    const highScores = loadHighScores();
    const highScoresList = document.getElementById("high-scores-list");
    
    // Use an ordered list with simple list items (let the browser handle numbering)
    highScoresList.innerHTML = highScores
        .map(score => `<li>${score}</li>`)
        .join("");
}

// Call this function to initialize the high scores display
displayHighScores();
