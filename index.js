const boardSize = 15;
const cellSize = 30;
let board = [];
let currentPlayer = 'black';
let gameOver = false;

const boardElement = document.getElementById('board');
const statusElement = document.getElementById('status');
const restartButton = document.getElementById('restart');

//初始化棋盘
initBoard();
//开始游戏
boardElement.addEventListener('click', play);
//重开游戏
restartButton.addEventListener('click', initBoard);


//初始化棋盘
function initBoard() {
    board = Array(boardSize).fill(null).map(() => Array(boardSize).fill(null));
    boardElement.innerHTML = '';  
    currentPlayer = 'black';
    gameOver = false;
    statusElement.textContent = '轮到黑棋';
}

//开始游戏
function play(e) {
    if (gameOver) 
        return;
    //计算下棋的位置
    const rect = boardElement.getBoundingClientRect(); 
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const col = Math.round(x / cellSize); 
    const row = Math.round(y / cellSize);
    console.log(row, col)

    if (board[row][col] !== null) 
        return;
    //落子
    board[row][col] = currentPlayer;
    placePiece(row, col, currentPlayer);


    if (checkWinner(row, col)) {
        statusElement.textContent = `${currentPlayer === 'black' ? '黑棋' : '白棋'}获胜！！`;
        gameOver = true;
    } else {
        currentPlayer = currentPlayer === 'black' ? 'white' : 'black';
        statusElement.textContent = `轮到${currentPlayer === 'black' ? '黑棋' : '白棋'}`;
    }
}

//落子
function placePiece(row, col, player) {
    const piece = document.createElement('div');
    piece.classList.add('piece', player);
    piece.style.top = `${row * cellSize - 13}px`;
    piece.style.left = `${col * cellSize - 13}px`;
    console.log(piece.style.top,piece.style.left)
    boardElement.appendChild(piece);
}

//判断赢
function checkWinner(row, col) {
    const directions = [
        { x: 0, y: 1 }, { x: 1, y: 0 }, { x: 1, y: 1 }, { x: 1, y: -1 }  //横竖\/
    ];
    for (const {x, y} of directions) {
        let count = 1;
        count += countInDirection(row, col, x, y);
        count += countInDirection(row, col, -x, -y);

        if (count >= 5) return true;
    }
    return false;
}

//指定方向上连续的相同棋子数
function countInDirection(row, col, xStep, yStep) {
    let count = 0;
    const player = board[row][col];
    for (let i = 1; i < 5; i++) {
        const newRow = row + i * xStep;
        const newCol = col + i * yStep;
        if (newRow < 0 || newRow >= boardSize || newCol < 0 || newCol >= boardSize || board[newRow][newCol] !== player) {
            break;
        }
        count++;
    }
    return count;
}