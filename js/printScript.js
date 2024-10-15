import getRandomIndex from './random';
import showResult from './showResult';
import anime from './anime.es';

anime({
    targets: ".anime-elem",
    translateX: [-50, 50],
    easing: 'linear',
    direction: 'alternate',
    duration: 1000,
    loop: true
});

let colors = ["is-info","is-success","is-warning","is-danger","is-link"];
let sings = ["j","f","k","d"," "];


StartGame("Enter");
getData();



async function readData(information) {
    console.table(information);
    console.log(information.singsColors);
    let numberOfLevel = 0;
    let errorSound = Audio("sounds/error_sound.wav");
    let failSound = Audio("sounds/fail_sound.wav");
    let pressSound = Audio("sounds/press_sound.wav");
    let successSound = Audio("sounds/success_sound.wav");

    let modal = document.querySelector(".modal");
    let targetError = document.querySelector(".target-error");
    let errorPanel = document.querySelector(".error-panel");
    let promo = document.querySelector(".promo");
    let begin = document.querySelector(".begin");
    let progress = document.getElementById("prog");
    let buttons = document.querySelector(".buttons");
    let nameLevel = document.querySelector(".name-level");
    let modalClose = document.querySelector(".modal-close");

    document.addEventListener('keydown', StartGame, {
        once: true
    });

    function StartGame(keyCode) {
        if(keyCode.key == "Enter") {
            errorPanel.classList.remove("is-hidden");
            pressSound.play();
            begin.remove()
            runningGame();
        }
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

    function runningGame(){
        paintBoard(information);
        document.addEventListener('keydown', press);
    }

    let allTry = 0;
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
                progress.value = 0;
                let fail = alert("Тест слишком плох.Страница будет перезагружена.");
                document.location.reload();
            }
        }
        if(countRight == 20){
            countRight = 0;
            numberOfLevel++;



            if(numberOfLevel == 3){
                alert("Игра окончена.");
                modal.classList.add("is-active");
                showResult(targetError, errorsCount);
                modalClose.onclick = function () {
                    modal.classList.remove("is-active");
                    window.location.reload();
                }
            }
            
            runningGame();
        }
    }
}

function getData() {
    fetch('https://gist.githubusercontent.com/isakura313/b705fd423e996a56b35b18b876458f18/raw/48023a7ffa598585f80303557e68b2011f776849/main.json')
        .then(res => res.json())
        .then(data => {
            readData(data);
        })
        .catch(err => {
            console.warn("произошла ошибка");
            console.warn(err.name);
        })
}