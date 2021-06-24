const grid = document.querySelector(".gridContainer");
const startbtn = document.querySelector("#startbtn");
let userScores = document.querySelector("#scores");
const gameOver = document.getElementById("gameOver");
const allbtn = document.getElementById("allbtn");
let sqaureArrays = [];
let currentSnake = [2, 1, 0];
let direction = 1;
const width = 10;
let appleIndex = 0;
let score = 0;
let intervalTime = 1000;
let speed = 0.9;
let timerId = 0;

function createGrid() {
    for (let i = 0; i < width * width; i++) {
        let boxes = document.createElement("div");
        boxes.classList.add("innerGrids");
        grid.appendChild(boxes);
        sqaureArrays.push(boxes);
    }
    currentSnake.forEach((index) => sqaureArrays[index].classList.add("snake"));
}

createGrid();

function startGame() {
    currentSnake.forEach((index) =>
        sqaureArrays[index].classList.remove("snake")
    );
    currentSnake = [2, 1, 0];
    currentSnake.forEach((index) => sqaureArrays[index].classList.add("snake"));
    score = 0;
    direction = 1;
    userScores.textContent = score;
    sqaureArrays[appleIndex].classList.remove("apple");
    randomApple();
    clearInterval(timerId);
    intervalTime = 1000;
    timerId = setInterval(moveSnake, intervalTime);
    allbtn.style.display = "block";
    startbtn.style.display = "none";
    gameOver.style.display = "none";
}

function randomApple() {
    do {
        appleIndex = Math.floor(Math.random() * sqaureArrays.length);
    } while (
        (sqaureArrays[appleIndex].classList.contains("snake"),
            sqaureArrays[appleIndex].classList.add("apple"))
    );
}
randomApple();

function moveSnake() {
    if (
        (currentSnake[0] + width >= width * width && direction === width) ||
        (currentSnake[0] - width < 0 && direction === -width) ||
        (currentSnake[0] % width == 0 && direction === -1) ||
        (currentSnake[0] % width == width - 1 && direction === 1) ||
        sqaureArrays[currentSnake[0] + direction].classList.contains("snake")
    )
        return (
            clearInterval(timerId),
            (gameOver.style.display = "block"),
            (allbtn.style.display = "none"),
            (startbtn.style.display = "flex")
        );

    let lastSnakeArray = currentSnake.pop();
    sqaureArrays[lastSnakeArray].classList.remove("snake");
    currentSnake.unshift(currentSnake[0] + direction);
    console.log(currentSnake);
    sqaureArrays[currentSnake[0]].classList.add("snake");

    if (sqaureArrays[currentSnake[0]].classList.contains("apple")) {
        sqaureArrays[lastSnakeArray].classList.add("snake");
        sqaureArrays[appleIndex].classList.remove("apple");
        randomApple();
        currentSnake.push(lastSnakeArray);
        score++;
        userScores.textContent = score;
        clearInterval(timerId);
        intervalTime = intervalTime * speed;
        timerId = setInterval(moveSnake, intervalTime);
    }
}

document.getElementById("navdown").addEventListener("click", () => {
    direction = width;
});

document.getElementById("navup").addEventListener("click", () => {
    direction = -width;
});

document.getElementById("navleft").addEventListener("click", () => {
    direction = -1;
});

document.getElementById("navright").addEventListener("click", () => {
    direction = 1;
});

function control(e) {
    if (e.keyCode === 39) {
        direction = +1;
    } else if (e.keyCode === 38) {
        direction = -width;
    } else if (e.keyCode === 37) {
        direction = -1;
    } else if (e.keyCode === 40) {
        direction = +width;
    }
}

document.addEventListener("keyup", control);

startbtn.addEventListener("click", startGame);