const boxes = Array.from(document.querySelectorAll('.position'));
const currentPlayerDisplay = document.querySelector('.x-o');
const resetBtn = document.querySelector('.reset-btn');
const winner = document.querySelector('.winner-text');

let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let gameActive = true;

const PLAYERX_WON = 'PLAYERX_WON';
const PLAYERO_WON = 'PLAYERO_WON';
const TIE = 'TIE';

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

const resultCheck = () => {
  let roundWon = false;
  for (let i = 0; i < winningConditions.length; i++) {
    const winning = winningConditions[i];
    const a = board[winning[0]];
    const b = board[winning[1]];
    const c = board[winning[2]];

    if (a === '' && b === '' && c === '') {
      continue;
    }
    if (a === b && b === c) {
      roundWon = true;
      break;
    }
  }
  if (roundWon) {
    overallWinner(currentPlayer === 'X' ? 'PLAYERX_WON' : 'PLAYERO_WON');
    gameActive = false;
    return;
  }
  if (!board.includes('')) {
    overallWinner('TIE');
  }
};
const overallWinner = (win) => {
  switch (win) {
    case PLAYERO_WON:
      winner.innerHTML = `player <span class = "playerO"> O </span> won`;
      break;
    case PLAYERX_WON:
      winner.innerHTML = `player <span class = "playerX"> X </span> won`;
      break;
    case TIE:
      winner.innerHTML = 'Tie Game';
    default:
      break;
  }
  winner.classList.remove('hide');
};

const validAction = (xyz) => {
  if (xyz.innerText === 'X' || xyz.innerText === 'O') {
    return false;
  }
  return true;
};

const updateBoard = (i) => {
  board[i] = currentPlayer;
};
const changePlayer = () => {
  currentPlayerDisplay.classList.remove(`player${currentPlayer}`);
  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  currentPlayerDisplay.innerText = currentPlayer;
  currentPlayerDisplay.classList.add(`player${currentPlayer}`);
};

const userAction = (x, y) => {
  if (validAction(x) && gameActive) {
    x.innerText = currentPlayer;
    x.classList.add(`player${currentPlayer}`);
    updateBoard(y);
    resultCheck();
    changePlayer();
  }
};

boxes.forEach((box, index) => {
  box.addEventListener('click', () => userAction(box, index));
});

const resetBoard = () => {
  board = ['', '', '', '', '', '', '', '', ''];
  gameActive = true;
  if (currentPlayer === 'O') {
    changePlayer();
  }
  boxes.forEach((box) => {
    box.innerText = '';
    box.classList.remove('playerX');
    box.classList.remove('playerO');
  });
};

resetBtn.addEventListener('click', resetBoard);
