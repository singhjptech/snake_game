const grid = document.querySelector('.grid')
const startButton = document.getElementById('start')
const scoreDisplay = document.getElementById('score')
let squares = []
let currentSnake = [2,1,0]
let direction = 1
const width = 10
let appleIndex = 0
let score = 0
let intervalTime = 1000
let speed = 0.9

function createGrid() {
    //creating 100 grid squares
    for (let i = 0; i < width*width; i++) {
        const square = document.createElement('div')
        square.classList.add('square')
        grid.appendChild(square)
        squares.push(square)
    }  
}
createGrid()

currentSnake.forEach(i => squares[i].classList.add('snake'))

function move() {
    if (
        (currentSnake[0] + width >= width*width && direction === width) || //if snake has hit bottom
        (currentSnake[0] % width === 9 && direction === 1) || //if snake has hit right wall
        (currentSnake[0] % width === 0 && direction === -1) || //if snake has hit left wall
        (currentSnake[0] - width < 0 && direction === -width) || //if snake has hit top
        squares[currentSnake[0] + direction].classList.contains('snake')
    )
    return clearInterval(timerId)

    //movement by poping & unshifting snake from squares
    const tail = currentSnake.pop()
    squares[tail].classList.remove('snake')
    currentSnake.unshift(currentSnake[0] + direction)

    //when snake head hits the apple
    if (squares[currentSnake[0]].classList.contains('apple')) {
        //remove the class of apple
        squares[currentSnake[0]].classList.remove('apple')
        //grow our snake by adding class of snake to it
        squares[tail].classList.add('snake')        
        //grow our snake array
        currentSnake.push(tail)        
        //generate new apple
        generateApples()
        //add one to the score
        score++        
        //display our score
        scoreDisplay.textContent = score   
        //speed up our snake
        clearInterval(timerId)
        intervalTime = intervalTime * speed
        timerId = setInterval(move, intervalTime)
    }

    squares[currentSnake[0]].classList.add('snake')
}
move()

let timerId = setInterval(move, intervalTime)

function generateApples() {
    do {
        appleIndex = Math.floor(Math.random() * squares.length)
    } while (squares[appleIndex].classList.contains('snake'))
    squares[appleIndex].classList.add('apple')
}
generateApples()

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