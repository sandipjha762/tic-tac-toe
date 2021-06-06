let gameActive = true;
let currentPlayer = "X";
let gameState = ["", "", "", "", "", "", "", "", ""];
const stateDisplay = document.getElementById("game-state");
//console.log(stateDisplay);

function handleRestartGame() {
    gameActive = true;
    currentPlayer = "X";
    gameState = ["", "", "", "", "", "", "", "", ""];
    document.querySelectorAll(".cell").forEach(cell => cell.innerHTML = "");
    stateDisplay.innerHTML = `It's ${currentPlayer}'s turn`;
}

function handleClickEvent(clickedCellEvent) {
    const clickCell = clickedCellEvent.target;
    const clickedCellIndex = parseInt(clickCell.getAttribute('data-cell-index'));
    if (gameState[clickedCellIndex] != "" || !gameState)
        return;
    handleCellPlayed(clickCell, clickedCellIndex);
    handleResultValidation();
}

function handleCellPlayed(clickCell, clickedCellIndex) {
    gameState[clickedCellIndex] = currentPlayer;
    clickCell.innerHTML = currentPlayer;

}
const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function handleResultValidation() {
    let roundWin = false;
    for (let i = 0; i <= 7; i++) {
        const winConditions = winningConditions[i];
        let a = gameState[winConditions[0]];
        let b = gameState[winConditions[1]];
        let c = gameState[winConditions[2]];

        if (a === "", b === "", c === "") {
            continue;
        }
        if (a === b && b === c) {
            roundWin = true;
            break;

        }

    }
    if (roundWin) {

        stateDisplay.innerHTML = currentPlayer === "X" ? alert("Congratulations! Player1 wins") : alert("Congratulations! Player2 wins");
        gameActive = false;
        return;
    }
    let roundDraw = !gameState.includes("");
    if (roundDraw) {
        stateDisplay.innerHTML = alert("Draw!");
        gameActive = false;
        return;
    }
    handlePlayerChange();
}

function handlePlayerChange() {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    stateDisplay.innerHTML = `It's  ${currentPlayer}'s turn`
}

stateDisplay.innerHTML = `It's ${currentPlayer}'s turn`;
document.querySelector(".game-reset").addEventListener("click", handleRestartGame);
document.querySelectorAll('.cell').forEach(cell => cell.addEventListener("click", handleClickEvent));