let boardSpace = [];
let firstPlayer , secondPlayer ;
let WhoRound  = true;
let ticTacToeWining = [
  [0,1,2],
  [3,4,5],
  [6,7,8],
  [0,3,6],
  [1,4,7],
  [2,5,8],
  [0,4,8],
  [2,4,6],
];
let boardPlay = document.querySelectorAll(".board > div div");
// Start Play
popupShow();
newBoard();
// Popup Function And Chose The First Player O Or X 
function popupShow() {
  let parentPopup = document.createElement("div");
  parentPopup.className = 'popup';
  let spanSinglePlayer = document.createElement("span");
  spanSinglePlayer.className = 'O';
  spanSinglePlayer.innerHTML = 'First Player <img src="./football-svgrepo-com.svg" alt="football" />'
  parentPopup.append(spanSinglePlayer)
  let spanPlayers = document.createElement("span");
  spanPlayers.className = "X";
  spanPlayers.innerHTML = 'First Player <img src="./basketball-svgrepo-com.svg" alt="basketball" />'
  parentPopup.append(spanPlayers);
  function removeElement(element) {
    element.remove();
  };
  parentPopup.addEventListener("click" , element => {
    if (element.target.className == "X") {
      firstPlayer = "X";
      secondPlayer = "O";
      removeElement(parentPopup);
      whoTurnIsIt("X");
      clickBoard(boardPlay);
    } else if (element.target.className == "O") {
      firstPlayer = "O";
      secondPlayer = "X";
      removeElement(parentPopup);
      whoTurnIsIt("O");
      clickBoard(boardPlay);
    };
  });
  document.querySelector(".container").prepend(parentPopup);
};
// New End Cleaner All The Came
function newBoard() {
  WhoRound = true;
  boardSpace = Array.from(Array(9).keys());
  boardPlay.forEach(element => {
    element.innerHTML = "";
  });
  
};
// Remove All Background Color
function removeColor() {
  boardPlay.forEach((element) => {
    element.style.backgroundColor = "transparent";
    element.style.pointerEvents = "auto";
  });
};
// Click Element New Game Effect And Make New Board
document.querySelector(".newGame").addEventListener("click", () => {
  newBoard();
  popupShow();
  addNumberForWinner(null);
  removeColor() 
});
// Start Anther Play In The Same Game 
document.querySelector(".playAgen").addEventListener("click", () => {
  newBoard() 
  whoTurnIsIt(firstPlayer);
  removeColor();
});
// Add +1 For winner Game 
function addNumberForWinner(won) {
  let divResultOf_O = document.querySelector(".result div:first-child");
  let divResultOf_X = document.querySelector(".result div:last-child");
  function addZeroToNumber(num) {
    return num > 9 ? num : "0" + num;
  }
  if (won == "O") {
    divResultOf_O.children[1].innerHTML =  addZeroToNumber(++divResultOf_O.dataset.wonO);
  } else if (won == "X") {
    divResultOf_X.children[1].innerHTML = addZeroToNumber(++divResultOf_X.dataset.wonX);
  } else {
    divResultOf_X.dataset.wonX = 0;
    divResultOf_X.children[1].innerHTML = divResultOf_X.dataset.wonX;
    divResultOf_O.dataset.wonO = 0;
    divResultOf_O.children[1].innerHTML = divResultOf_O.dataset.wonO;
  };
};
// The Basket and Foot Ball Function
function theBasketAndFootBall(player) {
  return player == 'X' ? `<img class="basketball" src="./basketball-svgrepo-com.svg"  data-player="X" />` : `<img class="football" src="./football-svgrepo-com.svg" data-player="O"/>`;
};
// Background Color For The Page 
let backgroundColor = (turn) => {setTimeout( () => {
  if (turn == "X") {
    document.querySelector(".container").style.background = "linear-gradient(0deg, #D84315 0% 15%, #212121 100% 50%)";
  } else if(turn == "O") {
    document.querySelector(".container").style.background = "linear-gradient(0deg, #FAFAFA 0% 15%, #212121 100% 50%)";
  }
},150);};
// The Turn for Now Player
function whoTurnIsIt(turn) {
  document.querySelector(".whoTurn").innerHTML = theBasketAndFootBall(turn);
  backgroundColor(turn);
};
// For Winner Effect
function forWinner(arr) {
  boardPlay.forEach(element => {
    arr.forEach(number => {
      if(number == element.id) {
        element.style.backgroundColor = "#c62828";
        boardPlay.forEach(div => div.style.pointerEvents = "none");
      };
    });
  });
};
// Search If There Is some one won
function checkWinner(player,index) {
  boardSpace[index] = player;
  for(let arr of ticTacToeWining) {
    if(arr.some(e => e == index)) {
      if(arr.every(e => boardSpace[e] === player)) {
        addNumberForWinner(player);
        backgroundColor(player);
        forWinner(arr);
        return true;
      };
    };
  };
  return false;
};
// Check if The board Is Full
function boardIfFull() {
  return boardSpace.every(element => isNaN(element));
};
// Check If There is No Winner
function forNoWinner() {
  if(boardIfFull()) {
    boardPlay.forEach(element => {
      element.style.backgroundColor = "#000";
    });
  };
};
// Check Is There Is Winner Or No Winner 
function playerCheck(bool,otherPlayer,player,element) {
  WhoRound = bool;
  whoTurnIsIt(otherPlayer) 
  element.innerHTML = theBasketAndFootBall(player);
  checkWinner(element.children[0].dataset.player,element.id);
  forNoWinner();
}
// Show How Turn Img Is in Element 
function show(element) {
  element.addEventListener('mouseover', () => { 
    element.className = document.querySelector(".whoTurn").children[0].className;
  });
};
// Click Play And change Board
function clickBoard(boardPlay) {
  boardPlay.forEach(element => {
    show(element)
    element.addEventListener('click', () => {
      if(WhoRound && element.innerHTML == "") {
        playerCheck(false,secondPlayer,firstPlayer,element);
      } else if(element.innerHTML == "" ) {
        playerCheck(true,firstPlayer,secondPlayer,element);
      };
      setTimeout(function() {
        element.children[0].style.transform = "scale(1)";
      },150);
    });
  });
};