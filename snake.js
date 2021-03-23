//Global Variables ------------------------------------------

let lastRenderTime = 0;
let Snake_Speed = 1;

const snakeBody = [
    { x:10 , y:11 },
    { x:11 , y:11 },
    { x:12 , y:11 },
    { x:13 , y:11 },
    { x:14 , y:11 },
]

const gameBoard = document.getElementById('game-board')


//Main Tick Function ------------------------------------------

// Creates our tick function
function main(currentTime) {
    window.requestAnimationFrame(main);
    const secondsSinceLastRender = (currentTime - lastRenderTime) / 1000;
    if (secondsSinceLastRender < 1 / Snake_Speed) return
    

    lastRenderTime = currentTime

    update()
    draw()
}

window.requestAnimationFrame(main);

//Main Calling Functions ------------------------------------------

// Main function that calls to update our page, snake body, apple placement, etc
function update() {
    updateSnake();
}

// Main function that calls our snake body and apple creation
function draw() {
    gameBoard.innerHTML = '';
    drawSnake(gameBoard);
}

//Snake ------------------------------------------


function updateSnake() {
    //For loop grabs the second to last snakeElement in our snake and moves 
    //it to previous snakeElement location, eliminating the end tail piece.
    //[i] = second to last snakeElement & [i + 1] = is our last snakeElement
    //{...snakeBody[i]} = duplicate of snakeBody[i + 1] and places that 
    //duplicate snakeElement in snakeBody[i + 1]'s place
    //{...snakeBody[i]} = current snakeElement moving forward
    //snakeBody[i + 1] = represents previous snakeElement that has dissapeared
    for(let i = snakeBody.length - 2; i >=0; i--) {
        snakeBody[i + 1] = { ...snakeBody[i] }
    };

    //Snake Head
    snakeBody[0].x += 0;
    snakeBody[0].y += 1;
}

//Creates our Snake Body
function drawSnake(gameBoard) {
    //Creates our initial body element(s) for the snake
    snakeBody.forEach(function(segment){
     const snakeElement = document.createElement('div');
     snakeElement.style.gridRowStart = segment.y;
     snakeElement.style.gridColumnStart = segment.x;
     snakeElement.classList.add('snake');
     gameBoard.appendChild(snakeElement);
    })
}

