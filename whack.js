//Global Variables -------------------------

let gameState = {
    player: {
        name:'',
        points: 0,
    }
}

const holes = $('.hole');
const scoreBoard = $('.score');
const moles = document.querySelectorAll('.mole');
let lastHole;
let timeUp = false;
let score = 0;

//Start Game ---------------------------------

// function requestPlayerName() {

//     //User Name Form
//     const playerNameForm = $(`
//     <form id="player-name-form">
//         <input id="player-name-input" type="text" />
//         <button>Start Game</button>
//     </form>`);

//     const playerNameElement = $('#player-name')
//     playerNameElement.append(playerNameForm)
    
//     //User Name Input
//     $('#app').on('input', '#player-name-input', function(event) {
//         event.preventDefault();
//         let name = $('#player-name-input').val();
//         gameState.player.name = name;
//     })

//     //User Name Submit
//     $('#app').on('submit', '#player-name-form', function(event) {
//         event.preventDefault();
//         if(gameState.player.name !== ""){
//         $('#player-name-input').remove();
//         playerNameElement.text(`${gameState.player.name}`)
//         startGame()
//         }
//     })

// };


function startGame() {
    scoreBoard.textContent = 0;
    timeUp = false;
    score = 0;

    moleUp();

    setTimeout(() => timeUp = true, 10000)
  }



//Main Tick Function -------------------------

function randomTime(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}


//Random Holes assigning to moles -------------------------

function randomHole(holes){
    const holeIndex = Math.floor(Math.random() * (holes.length));
    const hole = holes[holeIndex];

    if(hole === lastHole) {
        return randomHole(holes)
    }

    lastHole = hole;
    return hole;
}

//Mole Appear Function -------------------------

function moleUp() {
    const time = randomTime (200, 2000);
    const hole = randomHole(holes);
    hole.classList.add('up');

    setTimeout(() => {
        hole.classList.remove('up');
        if(timeUp !== true) {
            moleUp()
        }    
    }, time);
}


//Bonk Function -------------------------

function bonk(event) {
    if(!event.isTrusted) return; // cheater!
    score++;
    $(this).remove('up');
    let score = scoreBoard.textContent()
    console.log('bonk!')
  }
    
moles.forEach(mole => mole.addEventListener('click', bonk));
startGame()

