const form = document.querySelector("form");
const newRow = document.querySelector("#row_size");
const newColmn= document.querySelector("#column_size");

const mainTable = document.querySelector("#main_table")

const gameResult = document.querySelector("#game_result")
const player = document.querySelector("#player")
const won = document.querySelector("#won")

rows = 6
columns = 7
let board = [];
let currPlayer = 1;
let gameOver = 0;

// Creates Array of the grid and sets all cells to 0
function createGridArray(){
  for (let r = 0; r < rows; r++) {
    board.push([])
    for (let row = 0; row < columns; row++) {
      board[r].push(0);
    }
  }
}

function createCircle(){
  let circle = document.createElement("div")
  circle.classList.add("circle")
  circle.classList.add(`player${currPlayer}`)
  return circle
}

function clearTable(){
  for (let o = 0; 0 < mainTable.childElementCount; o++){
    mainTable.firstElementChild.remove()
  }
}

function createTable() {
  //Actions with the top row, creates top "tr", creates "TH's", add class "board_top", add class current player, 
  //add ids based on column number
  const trElementFirstRow = document.createElement("tr");
  for (let row = 0; row < columns; row++) {
    
    const thElement = document.createElement("th");
    thElement.classList.add("board_top");
    thElement.classList.add(`player${currPlayer}`);
    thElement.innerText = "click here"
    thElement.setAttribute("id", row);//

    trElementFirstRow.append(thElement)
    mainTable.append(trElementFirstRow)
  }

  //Actions with all other rows, creates "tr's", creates "th's", creates "td's", add class "board" and id's based on the row and column numbers
  for (let row = 0; row < rows; row++) {
    const trElement = document.createElement("tr");
    for (let column = 0; column < columns; column++) {

      const tdElement = document.createElement("td");
      tdElement.setAttribute("class", "board");
      tdElement.setAttribute("id", row + "," + column);

      trElement.append(tdElement)
      mainTable.append(trElement)
    }
  }
}


document.querySelector("#main_table").addEventListener("click", function (event) {
  let columnNumber = event.target.id //Gets column number of the clicked element
  for (let row = rows - 1; row >= 0; row--) {
    //If the row and column not 0 and clicked element equal "th" and gameOver not 1 then continue
    if (board[row][columnNumber] === 0 && event.target.localName === "th" && gameOver != 1) {
      
      //Removes color of the current player on the top row
      const topElements = document.querySelectorAll(".board_top")
      for (let topElement of topElements) {
        topElement.classList.remove(`player${currPlayer}`)
      }//

      //Gets element where the circle needs to be inserted and inserts it
      let cell = document.getElementById(`${row},${columnNumber}`)
      cell.append(createCircle())//

      board[row][columnNumber] = currPlayer; //Sets the cell of the board Array to the current player number (1 or 2)
      
      if (checkForWin()) {
        gameOver = 1;

        player.innerText = "Player"
        won.innerText = "Won!"
        if(gameResult.firstElementChild){
          gameResult.firstElementChild.remove()
        }
        gameResult.append(createCircle()) //Shows the winner at the bottom
      }

      currPlayer = (currPlayer === 1) ? 2 : 1; //Changes number of the current player

      //Set color of the new current player on the top row
      for (let topElement of topElements) {
        topElement.classList.add(`player${currPlayer}`)
      }//

      break
    }
  }
});


function checkForWin() {
  function _win(cells) {
    // Check four cells to see if they're all color of current player
    //  - cells: list of four (y, x) cells
    //  - returns true if all are legal coordinates & all match currPlayer
    return cells.every(
      ([y, x]) =>
        y >= 0 &&
        y < rows &&
        x >= 0 &&
        x < columns &&
        board[y][x] === currPlayer
    );
  }

  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < columns; x++) {
      let horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];
      let vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]];
      let diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]];
      let diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]];

      if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
        return true;
      }
    }
  }
}

form.addEventListener("submit", function(event) {
  event.preventDefault();
  
  clearTable()
  
  board = [] //clear array
  gameOver = 0 //set to initial value

  rows = (newRow.value === "") ? rows : newRow.value
  columns = (newColmn.value === "") ? columns : newColmn.value

  createGridArray()
  createTable()
  form.reset()
});

createGridArray()
createTable()