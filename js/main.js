var canvas = document.getElementById("gameBoard");
var ctx = canvas.getContext("2d");

var running = false; // til ad stoppa og starta game state
var dx = 5;
var dy = 5;
var yObstacle = 40; // start y hnit a hindrunum
var yVegLina = 20; // start y hnit a veglinum
var xVegLina = 294; // x hnit midjusettar veglinur
var gamePoints = 0; // stiga teljari
var gameTime = 0; // tekur tima a leik
var interval = 200; // timi milli hindrana

var currentObstacle = []; // fylki fyrir hindranir sem eru i notkun
var vegaLinuGeymsla = []; // 

// --- player ---
const playerImg = new Image();
playerImg.src = 'assets/player/playerMain.png'

// // player turn left
// const playerLeft = new Image();
// playerLeft.src = '/assets/player/playerTurnL.png'

// // player turn right
// const playerRight = new Image();
// playerRight.src = '/assets/player/playerTurnR.png'

let player = {
    x: 280,
    y: 680,
    width: 60,
    height: 80
}

// --- tree obstacles ---
const treeImg1 = new Image();
treeImg1.src = 'assets/world/tree1.png' // Komið

const treeImg2 = new Image();
treeImg2.src = 'assets/world/tree2.png' // Komið

const treeImg3 = new Image();
treeImg3.src = 'assets/world/tree3.png' // Komið

const treeImg4 = new Image();
treeImg4.src = 'assets/world/tree4.png' // Komið

// --- rock obstacles ---
const rockImg1 = new Image();
rockImg1.src = 'assets/world/rock1.png' // komið

const rockImg2 = new Image();
rockImg2.src = 'assets/world/rock3.png' // komið

// --- car obstacles ---
const taxiImg1 = new Image(); // Taxi
taxiImg1.src = 'assets/cars/taxi/taxiSideA.png' // Komið

const minivanImg1 = new Image(); // Minivan
minivanImg1.src = 'assets/cars/minivan/minivanSideA.png' // Komið


// --- Fylki fyrir myndir af hindrunum ---
var roadObstacles = [taxiImg1, minivanImg1, taxiImg1, minivanImg1, taxiImg1, minivanImg1];
var grassObstacles = [treeImg1, treeImg2, treeImg3, treeImg4, rockImg1, rockImg2];


// --- Velur hvaða rás hindun kemur ---
function pickRow() {
    rowPickerinn = Math.floor((Math.random() * 8) + 1)
    if (rowPickerinn == 1) {
        drawRow1A()
    }
    if (rowPickerinn == 2) {
        drawRow1B()
    }
    if (rowPickerinn == 3) {
        drawRow2A()
    }
    if (rowPickerinn == 4) {
        drawRow2B()
    }
    if (rowPickerinn == 5) {
        drawRow3A()
    }
    if (rowPickerinn == 6) {
        drawRow3B()
    }
    if (rowPickerinn == 7) {
        drawRow4A()
    }
    if (rowPickerinn == 8) {
        drawRow4B()
    }
}

// --- Sækir random mynd sem er a grasinu ---
function getGrassImg() {
    let number = Math.floor(Math.random() * 6);
    return grassObstacles[number]
}

// --- Sækir randim mynd sem er á veginum ---
function getRoadImg() {
    let number = Math.floor(Math.random() * 6);
    return roadObstacles[number]
}

// --- Föll fyrir teiknun hindrana á hverri rás ---
function drawRow1A() {
    let img1 = getGrassImg()
    tester1 = new obstacleTester(img1, 85, yObstacle, 20, 20)
    currentObstacle.push(tester1)
}
function drawRow1B() {
    let img2 = getGrassImg()
    tester2 = new obstacleTester(img2, 170, yObstacle, 20, 20)
    currentObstacle.push(tester2)
}
function drawRow2A() {
    let img3 = getRoadImg()
    tester3 = new obstacleTester(img3, 255, yObstacle, 20, 20)
    currentObstacle.push(tester3)
}
function drawRow2B() {
    let img4 = getRoadImg()
    tester4 = new obstacleTester(img4, 340, yObstacle, 20, 20)
    currentObstacle.push(tester4)
}
function drawRow3A() {
    let img5 = getRoadImg()
    tester5 = new obstacleTester(img5, 375, yObstacle, 20, 20)
    currentObstacle.push(tester5)
}
function drawRow3B() {
    let img6 = getRoadImg()
    tester6 = new obstacleTester(img6, 425, yObstacle, 20, 20)
    currentObstacle.push(tester6)
}
function drawRow4A() {
    let img7 = getGrassImg()
    tester7 = new obstacleTester(img7, 510, yObstacle, 20, 20)
    currentObstacle.push(tester7)
}
function drawRow4B() {
    let img8 = getGrassImg()
    tester8 = new obstacleTester(img8, 595, yObstacle, 20, 20)
    currentObstacle.push(tester8)
}

//Klasi sem við réttum ctx og yhnitið á veglínunni
class vegaLinuKlassi {
    constructor(ctx, yHnit) {
        this.ctx = ctx;
        this.yHnit = yHnit;
    }
    //Notum ctx og hnitið til að teikna línuna
    drawVegLina() {
        this.ctx.fillStyle = "white";
        this.ctx.fillRect(394, this.yHnit, 12, 35)
        this.yHnit += dy / 2;
    }
}


class obstacleTester {
    constructor(img, x, y, w, h) {
        this.img = img;
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
    }
    drawTester() {
        ctx.drawImage(this.img, this.x, this.y)
        this.y += dy / 2
    }
}

function pointDisplay() {
    ctx.font = "20px Arial";
    ctx.fillStyle = "#fff";
    ctx.fillText(gamePoints, 50, 50);
}

function collision(obj1, obj2) {
    if (obj1.x + obj1.width > obj2.x && obj1.x <= obj2.x + obj2.w) {
        if (obj1.y + obj1.height > obj2.y && obj1.y <= obj2.y + obj2.h) {
            return true;
        }
    }
    return false;
}

function draw() {
    // --- gras ---
    ctx.beginPath();
    ctx.fillStyle = "#40b84e";
    ctx.fillRect(0, 0, 800, 800);
    ctx.fillRect(0, 0, 800, 800);
    ctx.closePath();

    // --- vegur ---
    ctx.beginPath();
    ctx.fillStyle = "black";
    ctx.fillRect(275, 0, 250, 800);
    ctx.closePath();

    // --- veg linur ---
    for (let i = 0; i < vegaLinuGeymsla.length; i++) {
        vegaLinuGeymsla[i].drawVegLina();
        //Gáir hvort línan sé komin af canvasinum
        if (vegaLinuGeymsla[i].yHnit > canvas.height) {
            //Lét línuna byrja 2x ofar og þá hvarf skrítna bilið!!!
            vegaLinuGeymsla[i].yHnit = -70;
        }
    }

    for (let j = 0; j < currentObstacle.length; j++) {
        currentObstacle[j].drawTester()
        if (currentObstacle[j].y > canvas.height - 100) {
            currentObstacle = [];
            generateObstacles()
        }
    }

    for (let k = 0; k < currentObstacle.length; k++) {
        // athugum hvort óvinur rakst á hetju
        if (collision(player, currentObstacle[k])) {
            stopGame();
        }
    }


    /// !!! obstacles + interval !!!

    /* gameTime++;
    if (gameTime >= interval) {
        ctx.beginPath();
        drawRow1A(grassObstacles[2]);
        ctx.closePath();
        gameTime = 0;
    } */



    // --- teikna leikmann ---
    ctx.drawImage(playerImg, player.x, player.y, player.width, player.height)
    //ctx.fillStyle = player.color
    //ctx.fillRect(player.x, player.y, player.width, player.height);


    pointDisplay();
}

// --- veg linur ---
for (let i = 0; i < 11; i++) { //Búum til 11 línur til að byrja og fyllum fylkið
    vegaLinuGeymsla.push(new vegaLinuKlassi(ctx, i * 80)); //Notum síðan þessar línu í draw() þar sem þær ferðast niður
}

// --- keyboard controls ---

// vantar ad retta bil af þegar takka er sleppt
/* document.addEventListener("keyup", keyUpHandler, false);
function keyUpHandler(e) {
    if (e.keyCode == null) {
        playerImg.src = '/assets/player/playerMain.png';
    }
} */

// !!! þarf að bæta við að bill beygi !!!
document.addEventListener("keydown", keyDownHandler, false);
function keyDownHandler(e) {
    if (e.keyCode == 39) {
        player.x += dx + 20; //right
        if (player.x > 740) {
            player.x = 740;
            // playerImg.src = './assets/player/playerTurnR';
        }
    }
    if (e.keyCode == 37) {
        player.x -= dx + 20;
        if (player.x < 0) {
            player.x = 0;
            // playerImg.src = './assets/player/playerTurnL';
        }
    }
}

//Tengjum startGame() playAgain() og stopGame() við menuið
document.getElementById("stop").addEventListener("click", stopGame)
function startGame() {
    closeMenu();
    running = true;
    animate();
}
function playAgain() {
    currentObstacle = []
    dy = 5;
    generateObstacles();
    gamePoints = 0;
    closeGameOver();
    running = true;
    animate();
}
function stopGame() {
    running = false;
    openGameOver();
}


// Hindranir
function generateObstacles() {
    for (let i = 0; i < 5; i++) {
        dy += 0.05;
        gamePoints += 1;
        pickRow()
    }
}
for (let i = 0; i < 5; i++) {
    pickRow()
}


//menu popup
function openMenu() {
    document.getElementById("menu-form").style.display = "block";
}

function closeMenu() {
    document.getElementById("menu-form").style.display = "none";
}

function openGameOver() {
    document.getElementById("gameOver-form").style.display = "block";
}

function closeGameOver() {
    document.getElementById("gameOver-form").style.display = "none";
}


// animation loop
function animate() {
    //Ef running er false þá skilar animate() engu og stoppar
    if (running == false) return;
    draw();
    requestAnimationFrame(animate);
}

// start game loop
animate()