const board = document.getElementById('board');
const statusDisplay = document.getElementById('status');
const cells = document.querySelectorAll('.cell');
const resetButton = document.getElementById('resetBtn');

let currentPlayer = 'X';
let gameActive = true;
let boardState = Array(9).fill(null);

const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function handleClick(event) {
    const index = event.target.getAttribute('data-index');
    
    if (boardState[index] || !gameActive) return;

    boardState[index] = currentPlayer;
    event.target.classList.add(currentPlayer);
    checkWin();
    checkDraw();
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    statusDisplay.textContent = `Player ${currentPlayer}'s turn`;
}

function checkWin() {
    for (const condition of winConditions) {
        const [a, b, c] = condition;
        if (boardState[a] && boardState[a] === boardState[b] && boardState[a] === boardState[c]) {
            gameActive = false;
            statusDisplay.textContent = `Player ${currentPlayer} wins!`;
            return;
        }
    }
}

function checkDraw() {
    if (!boardState.includes(null)) {
        gameActive = false;
        statusDisplay.textContent = 'It\'s a draw!';
    }
}

function resetGame() {
    boardState = Array(9).fill(null);
    gameActive = true;
    statusDisplay.textContent = `Player X's turn`;
    cells.forEach(cell => cell.classList.remove('X', 'O'));
}

board.addEventListener('click', handleClick);
resetButton.addEventListener('click', resetGame);
