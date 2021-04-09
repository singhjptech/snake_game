const grid = document.querySelector('.grid')
const startButton = document.getElementById('start')
const score = document.getElementById('score')
let squares = []
let currentSnake = [2,1,0]
let direction = 1
let width = 10

function createGrid() {
    //creating 100 grid squares
    for (let i = 0; i < 100; i++) {
        const square = document.createElement('div')
        square.classList.add('square')
        grid.appendChild(square)
        squares.push(square)
    }  
}
createGrid()

currentSnake.forEach(i => squares[i].classList.add('snake'))

function move() {
    //movement by poping & unshifting snake from squares
    const tail = currentSnake.pop()
    squares[tail].classList.remove('snake')
    currentSnake.unshift(currentSnake[0] + direction)
    squares[currentSnake[0]].classList.add('snake')
}
move()

let timerId = setInterval(move, 1000)

// 39 is right arrow
// 38 is for the up arrow
// 37 is for the left arrow
// 40 is for the down arrow

function control(e) {
    if (e.keyCode === 39) {        
        direction = 1
    } else if (e.keyCode === 38) {        
        direction = -width
    } else if (e.keyCode === 37) {        
        direction = -1
    } else if (e.keyCode === 40) {        
        direction = +width
    }
}
document.addEventListener('keyup', control)