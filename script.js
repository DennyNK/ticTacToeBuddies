const markers = [
    'images/denise.png',
    'images/krisi.png',
    'images/evie.png',
    'images/titi.png',
    'images/denny.png',
    'images/yan.png',
    'images/dimi.png',
    'images/ani.png',
    'images/aya.png',
    'images/laura.png',
    'images/nada.png',
    'images/peter.png',
    'images/radost.png',
    'images/vanessa.png'

];

let playerMarkers = [];
let currentPlayer = 0; // Track which player's turn it is (0 or 1)
let board = ["", "", "", "", "", "", "", "", ""];
let gameActive = true;

const statusDisplay = document.getElementById('status');
const gameBoard = document.querySelectorAll('.cell');
const resetButton = document.getElementById('reset');

// Winning combinations (rows, columns, diagonals)
const winningConditions = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
];

function startGame() {
    // Randomly pick two different markers for player 1 and player 2
    let marker1 = markers[Math.floor(Math.random() * markers.length)];
    let marker2;
    
    do {
        marker2 = markers[Math.floor(Math.random() * markers.length)];
    } while (marker1 === marker2); // Ensure the two markers are different

    playerMarkers = [marker1, marker2]; // Player 1 gets marker1, Player 2 gets marker2
    statusDisplay.textContent = "Player 1's turn!";
    currentPlayer = 0; // Player 1 starts
    board = ["", "", "", "", "", "", "", "", ""];
    gameBoard.forEach(cell => cell.textContent = ''); // Clear the board

    gameActive = true; // Activate the game
}

gameBoard.forEach(cell => {
    cell.addEventListener('click', handleCellClick);
});

resetButton.addEventListener('click', startGame);

function handleCellClick(e) {
    const clickedCellIndex = e.target.getAttribute('data-index');
    
    if (board[clickedCellIndex] !== "" || !gameActive) {
        return; // Cell already filled or game is over
    }

    updateCell(e.target, clickedCellIndex);
    checkWinner();
}

function updateCell(cell, index) {
    board[index] = currentPlayer; // Store the player's index (0 or 1)
    
    // Create an img element to display the player's marker
    const img = document.createElement('img');
    img.src = playerMarkers[currentPlayer]; // Use the current player's marker
    img.style.width = '80px'; // Adjust size if necessary
    img.style.height = '80px';
    cell.appendChild(img); // Append image to the cell
}

function switchPlayer() {
    currentPlayer = currentPlayer === 0 ? 1 : 0; // Switch between 0 and 1
    statusDisplay.textContent = `Player ${currentPlayer + 1}'s turn!`;
}

function checkWinner() {
    let roundWon = false;

    for (let i = 0; i < winningConditions.length; i++) {
        const winCondition = winningConditions[i];
        let a = board[winCondition[0]];
        let b = board[winCondition[1]];
        let c = board[winCondition[2]];

        if (a === "" || b === "" || c === "") {
            continue; // Empty cells can't be a win
        }

        if (a === b && b === c) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        statusDisplay.textContent = `Player ${currentPlayer + 1} wins!`;
        gameActive = false;
        return;
    }

    if (!board.includes("")) {
        statusDisplay.textContent = "It's a draw!";
        gameActive = false;
        return;
    }

    switchPlayer(); // Switch to the other player if no win
}

    startGame();

