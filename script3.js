// script.js

const cells = document.querySelectorAll('.cell');
const statusText = document.getElementById('status-text');
const resetButton = document.getElementById('reset');
let currentPlayer = 'X'; // Start with Player X
let gameBoard = ['', '', '', '', '', '', '', '', '']; // Array to track game state

// Add event listener to each cell
cells.forEach(cell => {
    cell.addEventListener('click', handleCellClick);
});

// Handle cell clicks
function handleCellClick(event) {
    const cellIndex = event.target.getAttribute('data-cell-index');
    if (gameBoard[cellIndex] !== '') return; // If the cell is already taken, do nothing

    // Mark the cell with the current player's symbol
    gameBoard[cellIndex] = currentPlayer;
    event.target.textContent = currentPlayer;
    event.target.classList.add('taken');

    // Check for a winner
    if (checkWinner()) {
        statusText.textContent = `${currentPlayer} Wins!`;
        cells.forEach(cell => cell.removeEventListener('click', handleCellClick)); // Disable further clicks
        return;
    }

    // Check for a draw
    if (gameBoard.every(cell => cell !== '')) {
        statusText.textContent = 'It\'s a Draw!';
        return;
    }

    // Switch player turn
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    statusText.textContent = `Player ${currentPlayer}'s Turn`;
}

// Check for winning combinations
function checkWinner() {
    const winPatterns = [
        [0, 1, 2], // Top row
        [3, 4, 5], // Middle row
        [6, 7, 8], // Bottom row
        [0, 3, 6], // Left column
        [1, 4, 7], // Center column
        [2, 5, 8], // Right column
        [0, 4, 8], // Diagonal from top-left to bottom-right
        [2, 4, 6]  // Diagonal from top-right to bottom-left
    ];

    return winPatterns.some(pattern => {
        const [a, b, c] = pattern;
        return gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c];
    });
}

// Reset the game when the reset button is clicked
resetButton.addEventListener('click', resetGame);

function resetGame() {
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('taken');
    });
    currentPlayer = 'X';
    statusText.textContent = `Player ${currentPlayer}'s Turn`;
    cells.forEach(cell => cell.addEventListener('click', handleCellClick));
}
