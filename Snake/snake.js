//Global Variables ------------------------------------------
const gameBoard = $('#game-board');

let gameState = {
    player: {
        name:'',
        points: 0,
    }
}

let grid_size = 21;
let gameOver = false;

const snakeBody = [
    { x:10 , y:10 }  
];
let newSnakeElements = 0;

let food = { x:10, y:1 };
const expansionRate = 1;

let lastRenderTime = 0;
let Snake_Speed = 10;

let inputDirection = { x:0, y:0 };
let lastInputDirection = { x:0, y:0 };

//Start Game ------------------------------------------


//Requests player's name upon starting the game
//Allows user to start game upon entering their name
function requestPlayerName() {

    //User Name Form
    const playerNameForm = $(`
    <form id="player-name-form">
        <input id="player-name-input" type="text" />
        <button>Start Game</button>
    </form>`);

    const playerNameElement = $('#player-name')
    playerNameElement.append(playerNameForm)
    
    //User Name Input
    $('#app').on('input', '#player-name-input', function(event) {
        event.preventDefault();
        let name = $('#player-name-input').val();
        gameState.player.name = name;
    })

    //User Name Submit
    $('#app').on('submit', '#player-name-form', function(event) {
        event.preventDefault();
        if(gameState.player.name !== ""){
        $('#player-name-input').remove();
        playerNameElement.text(`${gameState.player.name}`)
        startGame()
        }
    })

};

requestPlayerName();

//Starts game once called -- called in requestPlayerName()
function startGame() {
    window.requestAnimationFrame(main);
}

//Main Tick Function ------------------------------------------

// Creates game tick function
function main(currentTime) {
   
    if(gameOver) {
        alert(`Game Over ${gameState.player.name}! Your score is ${gameState.player.points}. Refresh browser to play again!`)
    }


//Adjust render speed
    window.requestAnimationFrame(main);
    const secondsSinceLastRender = (currentTime - lastRenderTime) / 1000;
    if (secondsSinceLastRender < 1 / Snake_Speed) return
    

    lastRenderTime = currentTime

//Call on each render
    update()
    draw()
}


//Main Calling Functions ------------------------------------------

// Main function that calls to update our page, snake body, food placement, etc
function update() {
    updateSnake();
    updateFood();
    onSnake(food);
    randomGridPosition();
    snakeDeath();
}

// Main function that calls our snake body and food creation
function draw() {
    $('#game-board').empty();
    drawSnake(gameBoard);
    drawFood(gameBoard);
    getSnakeHead();
    snakeIntersection();
    
}

// Kills the snake :( -- Calls gameOver
function snakeDeath() {
    gameOver = outsideGrid(getSnakeHead()) || snakeIntersection()
}

//Snake ------------------------------------------


function updateSnake() {

    //Adds newSnakeElements when snake eats food. Appends to snake body.
    addSegments();

    //Connects our key input direction to control snake
    const inputDirection = getInputDirection();

    //For loop grabs the second to last snakeElement in our snake and moves 
    //it to previous snakeElement location, eliminating the end tail piece.
    //[i] = second to last snakeElement & [i + 1] = is our last snakeElement
    //{...snakeBody[i]} = duplicate of snakeBody[i + 1] and places that 
    //duplicate snakeElement in snakeBody[i + 1]'s place
    //{...snakeBody[i]} = current snakeElement moving forward
    //snakeBody[i + 1] = previous snakeElement that has dissapeared
    for(let i = snakeBody.length - 2; i >=0; i--) {
        snakeBody[i + 1] = { ...snakeBody[i] }
    };

    //Snake Head
    //Snake input direction connected to snake head
    snakeBody[0].x += inputDirection.x
    snakeBody[0].y += inputDirection.y
};

//Creates our Initial Snake Body
function drawSnake(gameBoard) {
    //Creates our initial body element(s) for the snake
    snakeBody.forEach(function(segment){
     const snakeElement = document.createElement('div');
     snakeElement.style.gridRowStart = segment.y;
     snakeElement.style.gridColumnStart = segment.x;
     snakeElement.classList.add('snake');
     $('#game-board').append(snakeElement);
    })
};


//Input Information ------------------------------------------

//Switches key directions while ensuring snake does not back-in to itself
window.addEventListener('keydown', function(event){
    switch (event.key) {
        case 'ArrowUp':
            if(lastInputDirection.y !== 0) break
            inputDirection = { x:0, y:-1 }
            break
        case 'ArrowDown':
            if(lastInputDirection.y !== 0) break
            inputDirection = { x:0, y:1 }
            break
        case 'ArrowLeft':
            if(lastInputDirection.x !== 0) break
            inputDirection = { x:-1, y:0 }
            break
        case 'ArrowRight':
            if(lastInputDirection.x !== 0) break
            inputDirection = { x:1, y:0 }
            break
    }
} )

// Calls previous key direction to new inputDirection, returing the function above
function getInputDirection() {
    lastInputDirection = inputDirection
    return inputDirection
}

//Food ------------------------------------------

//Helper Function for when food is onSnake, it calls expandSnake function while 
//calling on placing the food to a random location
function updateFood() {
    if(onSnake(food)) {
    expandSnake(expansionRate)
    food = getRandomFoodPosition();
    gameState.player.points++
    $('#score').text(gameState.player.points)
}
}

//Creates our Food Element
function drawFood(gameBoard) {
    
     const foodElement = document.createElement('div');
     foodElement.style.gridRowStart = food.y;
     foodElement.style.gridColumnStart = food.x;
     foodElement.classList.add('food');
     $('#game-board').append(foodElement);
};

//Snake body and Food Interaction -------------------------------

//Function that expands our snake's body as it eats foodElement
function expandSnake(amount) {
    newSnakeElements += amount
};

//If Food is on snakeBody, this will return True
//If snakeHead touches snakeBody, this will return True (see snakeIntersection)
function onSnake(position, { ignoreHead = false } = {}) {
    return snakeBody.some((segment, index) =>{
        if(ignoreHead && index === 0) return false
        return equalPositions(segment, position)
    })
}

//SnakeHead's position
function getSnakeHead() {
    return snakeBody[0]
}

//Snake head touches snake body (true)
function snakeIntersection() {
    return onSnake(snakeBody[0], { ignoreHead: true })
}

//If our snakeHead and Food are on equal positions, this will return True
function equalPositions(pos1, pos2) {
    return pos1.x === pos2.x && pos1.y === pos2.y
}

//Appends newSnakeElement onto snakeBody
function addSegments() {
    for (let i=0; i < newSnakeElements; i++) {
        snakeBody.push({ ...snakeBody[snakeBody.length - 1]})
    }

    newSnakeElements = 0;
}

//Randomizes food positioning throughout game-board
//Everytime a newFoodPosition is called, it will loop 
//through and place a newGridPosition for the foodElement
function getRandomFoodPosition() {
    let newFoodPosition

    //Makes sure that the newFoodPosition is never onSnake
    while(newFoodPosition == null || onSnake(newFoodPosition)) {
        newFoodPosition = randomGridPosition()
    }
    return newFoodPosition
}

//Grid --------------------------------------------


function randomGridPosition() {
    return {
        x: Math.floor(Math.random() * grid_size) + 1,
        y: Math.floor(Math.random() * grid_size) + 1,
    }
}

function outsideGrid(position) {
    return (
        position.x < 1 || position.x > grid_size || 
        position.y < 1 || position.y > grid_size 
    )
}

