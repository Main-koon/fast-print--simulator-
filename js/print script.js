let colors = ["is-info","is-success","is-warning","is-danger","is-link"];
let sings = ["j","f","k","d"," "];

let begin = document.querySelector(".begin");
let progress = document.getElementById("prog");
let buttons = document.querySelector(".buttons");


function getRandomIndex(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

function paintBoard() {
    for(let i = 0; i < 20; i++) {
        let rand = getRandomIndex(sings.length);
        if (rand == 4){
            buttons.insertAdjacentHTML("afterbegin",`<button class = 'game-buttons button is-large ${colors[rand]}' id='${sings[rand]}'>Space </button>`);
        } else {
            buttons.insertAdjacentHTML("afterbegin",`<button class = 'game-buttons button is-large ${colors[rand]}' id='${sings[rand]}'>${sings[rand]} </button>`);
        }
    }
}

StartGame("Enter");

document.addEventListener('keydown', StartGame, {
    once: true
});

function StartGame(keyCode) {
    if(keyCode.key == "Enter") {
        paintBoard();
        begin.style.display = "none";
        runningGame();
    }
}

function runningGame(){
    document.addEventListener('keydown', press);
}

let countRight = 0;
let errorsCount = 0;

function press(keyCode) {
    let symbolButtons = document.querySelectorAll(".game-buttons")
    if (keyCode.key == symbolButtons[0].id) {
        symbolButtons[0].remove();
        countRight++;
    } else {
        errorsCount++;
        progress.value = errorsCount;
        if (errorsCount > 20) {
            let fail = alert("Тест слишком плох.Страница будет перезагружена.");
                document.location.reload();
        }
    }
    if(countRight == 20){
        if(errorsCount == 0){
            alert("Тест пройден без ошибак!");
        } else {
            alert("Тест пройден. Допущено " + errorsCount + " ошибок.");
        }
        
        let restart = alert("Страница будет перезагружена.");

        document.location.reload();
    }
}
