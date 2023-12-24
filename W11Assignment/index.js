
const statusDisplay = document.querySelector('.gameStatus');
   //refers to html class gameStatus header3 to put the status information on the page

let gameActive = true;

let currentPlayer = "X";
   //first player begins as X

let gameState = ["", "", "", "", "", "", "", "", ""];

const winningMessage = () => alert(`${currentPlayer} has won!`);
const drawMessage = () => alert(`Game ended in a draw. No winners`);
const currentPlayerTurn = () => `It's ${currentPlayer}'s turn`;
   //group of messages to display in the gameStatus header3

statusDisplay.innerHTML = currentPlayerTurn();
   //uses innerHTML to use the entire element H3 to display the current player's turn

document.querySelectorAll(".cell").forEach(cell => cell.addEventListener("click", cellClick));
document.querySelector(".gameRestart").addEventListener("click", restartGame);
   //each cell uses addEventListener to save information after each click.
   //the button restart uses the same addEventListener to get the click and call on the restart function

function cellClick(clickedCellEvent) {
   const clickedCell = clickedCellEvent.target;
   const clickedCellIndex = parseInt(
      clickedCell.getAttribute("data-cell-index")
   );

   if(gameState[clickedCellIndex] != "" || !gameActive) {
      return;
   }

   cellPlayed(clickedCell, clickedCellIndex);
   resultValidation();
}
   //first function uses event target poperty to delegate turns and log results

function cellPlayed(clickedCell, clickedCellIndex) {
   gameState[clickedCellIndex] = currentPlayer;
   clickedCell.innerHTML = currentPlayer;
}
   //second function calls on constants to assign cell to the current player

   function resultValidation() { //third function to determine if there are three X or O in a row
      let roundWon = false;

      const winningConditions = [
         [0, 1, 2],
         [3, 4, 5],
         [6, 7, 8],
         [0, 3, 6],
         [1, 4, 7],
         [2, 5, 8],
         [0, 4, 8],
         [2, 4, 6],
      ];
         //assigns previous const winningConditions the boxes that need to be filled
         //with the same letter  to win

      for (let i=0; i<= 7; i++) {
         const winCondition = winningConditions[i];
         let a = gameState[winCondition[0]];
         let b = gameState[winCondition[1]];
         let c = gameState[winCondition[2]];
         if (a==="" || b==="" || c==="") {
            continue;
         } //if space is empty, continue game
         if (a===b && b===c) {
            roundWon = true;
            break
         } //if the three spaces in winningConditions are the same letter, player wins
      }
      if (roundWon) {
         statusDisplay.innerHTML = winningMessage();
         gameActive = false;
         return;
      } //if a player wins (if roundWon is true), game is not longer active and 
         //the display will display the winningMessage

      let roundDraw = !gameState.includes("");
      if (roundDraw) {
         statusDisplay.innerHTML = drawMessage ();
         gameActive = false;
         return;
      } //if the game is a draw, the display will display the drawMessage
         //and the game will be not active

      playerChange(); //calls on the function to change player turn
   }

function playerChange() {
   currentPlayer = currentPlayer === "X" ? "O" : "X";
   statusDisplay.innerHTML = currentPlayerTurn();
}
   //fourth function to change the player's turn, called upon earlier

function restartGame() {
   gameActive = true;
   currentPlayer = "X";
   gameState = ["", "", "", "", "", "", "", "", ""];
   statusDisplay.innerHTML = currentPlayerTurn();
   document.querySelectorAll(".cell")
         .forEach (cell => cell.innerHTML ="");
} //fifth function restarts game when button is selected