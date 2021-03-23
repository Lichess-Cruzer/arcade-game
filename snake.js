// Our Initial State
let gameState = {
    canvas: $('#canvas')
};

let snakeBody = [
        [10, 11],
        [11, 11],
        [12, 11], 
    ]    

let nextDirection = { x: 0, y:0 };
let lastInputDirection = { x: 0, y:0 };

let food = { x:10, y:1 };
// const EXPANSION_RATE = 1;
// let newSegments = 0;

// Calls main renderState and buildSnake functions upon loading
function buildInitialState() {
    renderState()
    // buildSnake()
}

//RenderState function provides constant updating for our game
function renderState() {
    const canvasElement = $('#canvas')
    canvasElement.empty()
    // gameState.canvas.forEach(function (row, rowIndex) {
    //     row.forEach(function (segment, segmentIndex) {
    //         const segmentElement = $(`<div class="segment" data-x="${rowIndex}" data-y="${segmentIndex}" ></div>`)
    //         canvasElement.append(segmentElement)
    //     })
    // })
}

//onBoardClick function allows us to call multiple helper functions to execute upon click
function onBoardClick() {

        renderState(); 
    }

    // Once clicked, this click helper function calls the interval(speed) of game
    $(".board").on("click", onBoardClick); 
    setInterval(tick, 400)

    //Call to buildSnake with each tick update
    function tick() {
        console.log('tick')
    //   buildSnake();
}

buildInitialState()

//Updates page per Loop -- calls helper functions
function update() {
    updateSnake();
    // updateSnakeFood();
    // expandSnake();
    // onSnake();
    // equalPositions();
}

//Draws per Loop -- calls helper functions
function draw() {
    canvas.innerHTML = '';
    drawSnake(canvas);
    drawFood(canvas)
}

//Builds our Snake
function drawSnake(canvas) {

    let idCounter = 0;

    snakeBody.forEach(function(segment) {
        const snakeElement = document.createElement('div')
        jQuery(snakeElement).attr("id", `${idCounter}`);
        snakeElement.style.gridRowStart = segment[1];
        snakeElement.style.gridColumnStart = segment[0];
        snakeElement.classList.add('snake');
        gameState.canvas.append(snakeElement);
        idCounter++;
        console.log(snakeElement)
    })
}

// Render new body parts on Snake
function updateSnake() {
    const inputDirection = getNextDirection();
    console.log(inputDirection)
    for(let i = snakeBody.length - 1; i >= 0; i--) {
        // snakeBody[i + 1] = snakeBody.push(snakeBody[i])
        // // console.log({ ...snakeBody[i] }) snakeBody.push(snakeBody[i])
        // // console.log(snakeBody[i + 1], 'this is snakeBody i+1')
        // console.log(snakeBody, 'this is from the forLoop')
        let partOfSnake = snakeBody[i];
        partOfSnake[0]++
        let htmlSnakeBody = document.getElementById(i)
        htmlSnakeBody.style.gridRowStart = partOfSnake;
        htmlSnakeBody.style.gridColumnStart = partOfSnake;
        htmlSnakeBody.classList.add('snake');
        gameState.canvas.append();
    };
    //Head
    // snakeBody[0].x += 1;
    // console.log(snakeBody[0].x += inputDirection.x)
    // snakeBody[0].y += 0;
    console.log(snakeBody, 'this is from the updateSnake function')
}

// Move Snake's Direction
window.addEventListener('keydown', function(event) {
    switch (event.key) {
        case 'ArrowUp':
            if(lastInputDirection.y !== 0) break
            nextDirection = { x:0, y:-1}
            break
        case 'ArrowDown':
            if(lastInputDirection.y !== 0) break
            nextDirection = { x:0, y:1}
            break
        case 'ArrowLeft':
            if(lastInputDirection.x !== 0) break
            nextDirection = { x:-1, y:0}
            break
        case 'ArrowRight':
            if(lastInputDirection.x !== 0) break
            nextDirection = { x:1, y:0}
            break
    }
} )

//Calls Snake's direction
function getNextDirection(){
    lastInputDirection = nextDirection
    return nextDirection;
}

//Food Render Function
function drawFood(canvas) {
        const foodElement = document.createElement('div')
        foodElement.style.gridRowStart = food.y;
        foodElement.style.gridColumnStart = food.x;
        foodElement.classList.add('food');
        gameState.canvas.append(foodElement);
}

//UpdateSnakeFood





draw()
update()
// updateSnake()

