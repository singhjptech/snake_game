const grid = document.querySelector('.grid')
const startButton = document.getElementById('start')
const score = document.getElementById('score')
let squares = []
let currentSnake = [12, 11, 10]
let direction = 1

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

//let timerId = setInterval(move, 1000)