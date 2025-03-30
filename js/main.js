var canvas = document.getElementById("gameBoard");
var ctx = canvas.getContext("2d");

var running = false; // til ad stoppa og starta game state
var dx = 5;
var dy = 8;
var yObstacle = - 200; // start y hnit a hindrunum
var gamePoints = 0; // stiga teljari
//var gameTime = 0; // tekur tima a leik
//var interval = 200; // timi milli hindrana

// --- Veg linur ---
// Vinstri veglinur
var xLineLeft = 296; // Vinstri x hnit midjusettar veglinur
var wLineLeft = 8;
var hLineLeft = 30;
// Hægri veglinur
var xLineRight = 532; // Hægri x hnit midjusettar veglinur
var wLineRight = 8;
var hLineRight = 30;
// Badar linur
var yVegLina = 20; // start y hnit a veglinum

var row1A = true;
var row1B = true;
var row2A = true;
var row2B = true;
var row3A = true;
var row3B = true;
var row4A = true;
var row4B = true;

var flag = true;

var currentObstacle = []; // fylki fyrir hindranir sem eru i notkun
var roadLineLeftStorage = []; //
var roadLineRightStorage = [];

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
    x: 400,
    y: 680,
    width: 70,
    height: 117
}

// --- Teikna leikmann ---
/* function drawPlayer() {
    ctx.drawImage(playerImg, player.x, player.y, player.width, player.height);
} */

// --- Grass Obstacles ---
const treeImg1 = new Image();
treeImg1.src = 'assets/world/tree1.png' // Komið
const treeImg2 = new Image();
treeImg2.src = 'assets/world/tree2.png' // Komið
const treeImg3 = new Image();
treeImg3.src = 'assets/world/tree3.png' // Komið
const rockImg1 = new Image();
/* rockImg1.src = 'assets/world/rock1.png' // komið
const rockImg2 = new Image();
rockImg2.src = 'assets/world/rock2.png' // komið
const rockImg3 = new Image();
rockImg3.src = 'assets/world/rock3.png' // komið */


// --- Road Obstacles ---
// Vinstri
const taxiLeftImg = new Image(); // Taxi abandoned down
taxiLeftImg.src = 'assets/carWreck/taxi/taxiDown.png'
const sedanLeftImg = new Image(); // Sedan abandoned down
sedanLeftImg.src = 'assets/carWreck/sedan/sedanDown.png'
const policeLeftImg = new Image(); // Police abandoned down
policeLeftImg.src = 'assets/carWreck/police/policeDown.png'
const wagonLeftImg = new Image(); // Wagon abandoned down
wagonLeftImg.src = 'assets/carWreck/wagon/wagonDown.png'
const wagonBurnLeftImg = new Image(); // Wagon Burned down
wagonBurnLeftImg.src = 'assets/carBurn/wagonBurn/wagonBurnDown.png'
const civicBurnLeftImg = new Image(); // Civic Burned down
civicBurnLeftImg.src = 'assets/carBurn/civicBurn/civicBurnDown.png'

// Hægri
const taxiRightImg = new Image(); // Taxi abandoned up
taxiRightImg.src = 'assets/carWreck/taxi/taxiUp.png'
const sedanRightImg = new Image(); // Sedan abandoned up
sedanRightImg.src = 'assets/carWreck/sedan/sedanUp.png'
const policeRightImg = new Image(); // Police abandoned up
policeRightImg.src = 'assets/carWreck/police/policeUp.png'
const wagonRightImg = new Image(); // Wagon abandoned up
wagonRightImg.src = 'assets/carWreck/wagon/wagonUp.png'
const wagonBurnRightImg = new Image(); // Wagon Burned up
wagonBurnRightImg.src = 'assets/carBurn/wagonBurn/wagonBurnUp.png'
const civicBurnRightImg = new Image(); // Civic Burned up
civicBurnRightImg.src = 'assets/carBurn/civicBurn/civicBurnUp.png'


// --- Fylki fyrir myndir af hindrunum ---
var grassObstacles = [treeImg1, treeImg2, treeImg3];
var leftRoadObstacles = [taxiLeftImg, sedanLeftImg, policeLeftImg, wagonLeftImg, wagonBurnLeftImg, civicBurnLeftImg];
var rightRoadObstacles = [taxiRightImg, sedanRightImg, policeRightImg, wagonRightImg, wagonBurnRightImg, civicBurnRightImg];
// --- Sækir random mynd sem er a grasinu ---
function getGrassImg() {
    let number = Math.floor(Math.random() * 3); // tolur fra 0 magn i gras fylki
    return grassObstacles[number]
}

// --- Sækir random mynd sem er á veginum ---
// Vinstri
function getLeftRoadImg() {
    let number = Math.floor(Math.random() * 5); // tolur fra 0 magn i vinstri vegar fylki
    return leftRoadObstacles[number]
}
// Hægri
function getRightRoadImg() {
    let number = Math.floor(Math.random() * 5); // tolur fra 0 magn i hægri vegar fylki
    return rightRoadObstacles[number]
}

// --- Velur hvaða rás hindun kemur ---
function pickRow() {
    rowPickerinn = Math.floor((Math.random() * 8) + 1)
    if (rowPickerinn == 1 && (row1A)) {
        drawRow1A()
        row1A = false;
    }
    if (rowPickerinn == 2 && (row1B)) {
        drawRow1B()
        row1B = false;
    }
    if (rowPickerinn == 3 && (row2A)) {
        drawRow2A()
        row2A = false;
    }
    if (rowPickerinn == 4 && (row2B)) {
        drawRow2B()
        row2B = false;
    }
    if (rowPickerinn == 5 && (row3A)) {
        drawRow3A()
        row3A = false;
    }
    if (rowPickerinn == 6 && (row3B)) {
        drawRow3B()
        row3B = false;
    }
    if (rowPickerinn == 7 && (row4A)) {
        drawRow4A()
        row4A = false;
    }
    if (rowPickerinn == 8 && (row4B)) {
        drawRow4B()
        row4B = false;
    }
}

// --- Föll fyrir teiknun hindrana á hverri rás ---
function drawRow1A() {
    let img1 = getGrassImg()
    tester1 = new obstacleTester(img1, 0, yObstacle, img1.width, img1.height)
    currentObstacle.push(tester1)
}
function drawRow1B() {
    let img2 = getGrassImg()
    tester2 = new obstacleTester(img2, 100, yObstacle, img2.width, img2.height)
    currentObstacle.push(tester2)
}
function drawRow2A() {
    let img3 = getLeftRoadImg()
    tester3 = new obstacleTester(img3, 200, yObstacle, img3.width, img3.height)
    currentObstacle.push(tester3)
}
function drawRow2B() {
    let img4 = getLeftRoadImg()
    tester4 = new obstacleTester(img4, 304, yObstacle, img4.width, img4.height)
    currentObstacle.push(tester4)
}
function drawRow3A() {
    let img5 = getRightRoadImg()
    tester5 = new obstacleTester(img5, 440, yObstacle, img5.width, img5.height)
    currentObstacle.push(tester5)
}
function drawRow3B() {
    let img6 = getRightRoadImg()
    tester6 = new obstacleTester(img6, 538, yObstacle, img6.width, img6.height)
    currentObstacle.push(tester6)
}
function drawRow4A() {
    let img7 = getGrassImg()
    tester7 = new obstacleTester(img7, 640, yObstacle, img7.width, img7.height)
    currentObstacle.push(tester7)
}
function drawRow4B() {
    let img8 = getGrassImg()
    tester8 = new obstacleTester(img8, 738, yObstacle, img8.width, img8.height)
    currentObstacle.push(tester8)
}

// --- Veglinu klasi ---
// Vinstri
class roadLineLeft { //Klasi sem við réttum ctx og yhnitið á veglínunni
    constructor(ctx, x, y, w, h) {
        this.ctx = ctx;
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
    }
    //Notum ctx og hnitið til að teikna línuna
    drawVegLina() {
        this.ctx.fillStyle = "white";
        this.ctx.fillRect(this.x, this.y, this.w, this.h)
        this.y += dy / 2;
    }
}
// Hægri
class roadLineRight { //Klasi sem við réttum ctx og yhnitið á veglínunni
    constructor(ctx, x, y, w, h) {
        this.ctx = ctx;
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
    }
    //Notum ctx og hnitið til að teikna línuna
    drawVegLina() {
        this.ctx.fillStyle = "white";
        this.ctx.fillRect(this.x, this.y, this.w, this.h)
        this.y += dy / 2;
    }
}


class obstacleTester {
    constructor(img, x, y, w, h) {
        this.img = img;
        this.x = x;
        this.y = y;
        this.w = 70;
        this.h = 117;
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
    ctx.fillRect(0, 0, 840, 800);
    ctx.closePath();
    // --- vegur ---
    ctx.beginPath();
    ctx.fillStyle = "black";
    ctx.fillRect(200, 0, 440, 800);
    ctx.closePath();
    // --- Vegaskiptir ---
    ctx.beginPath();
    ctx.fillStyle = "#403217";
    ctx.fillRect(400, 0, 40, 800);
    ctx.closePath();


    // --- Veg linur ---
    // Vinstri
    for (let i = 0; i < roadLineLeftStorage.length; i++) {
        roadLineLeftStorage[i].drawVegLina();
        //Gáir hvort línan sé komin af canvasinum
        if (roadLineLeftStorage[i].y > canvas.height) {
            roadLineLeftStorage[i].y = -70;
        }
    }
    // Hægri
    for (let i = 0; i < roadLineRightStorage.length; i++) {
        roadLineRightStorage[i].drawVegLina();
        //Gáir hvort línan sé komin af canvasinum
        if (roadLineRightStorage[i].y > canvas.height) {
            roadLineRightStorage[i].y = -70;
        }
    }

    // --- hindranir ---
    // Ef hindrun komin af mappi byr til nyjar hindranir
    for (let j = 0; j < currentObstacle.length; j++) {
        currentObstacle[j].drawTester()
        if (currentObstacle[j].y > canvas.height + 100) {
            currentObstacle = [];
            resetFlag()
            generateObstacles()
        }
    }
    for (let k = 0; k < currentObstacle.length; k++) {
        // athugum hvort óvinur rakst á hetju
        if (collision(player, currentObstacle[k])) {
            playExplosion();
            stopGame();
            playMetal(false);
        }
    }
    ctx.drawImage(playerImg, player.x, player.y, player.width, player.height)

    /// !!! obstacles + interval !!!

    /* gameTime++;
    if (gameTime >= interval) {
        ctx.beginPath();
        drawRow1A(grassObstacles[2]);
        ctx.closePath();
        gameTime = 0;
    } */



    // --- teikna leikmann ---

    //ctx.fillStyle = player.color
    //ctx.fillRect(player.x, player.y, player.width, player.height);
    pointDisplay();
} // -----draw end


// --- veg linur ---
// Vinstri
for (let i = 0; i < 11; i++) { //Búum til 11 línur til að byrja og fyllum fylkið
    roadLineLeftStorage.push(new roadLineLeft(ctx, xLineLeft, i * 80, wLineLeft, hLineLeft)); //Notum síðan þessar línu í draw() þar sem þær ferðast niður
}
// Hægri
for (let i = 0; i < 11; i++) { //Búum til 11 línur til að byrja og fyllum fylkið
    roadLineRightStorage.push(new roadLineRight(ctx, xLineRight, i * 80, wLineRight, hLineRight)); //Notum síðan þessar línu í draw() þar sem þær ferðast niður
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
        player.x -= dx + 20;//left
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
    //drawPlayer();
    running = true;
    controller = true;
    playMetal();
    animate();
}
function playAgain() {
    currentObstacle = []
    dy = 8;
    resetFlag()
    player.x = 400;
    generateObstacles();
    gamePoints = 0;
    closeGameOver();
    //drawPlayer();
    running = true;
    controller = true;
    playMetal();
    animate();
}
function stopGame() {
    running = false;
    openGameOver();
}

// --- Hindranir generate ---
function generateObstacles() {
    for (let i = 0; i < 5; i++) {
        dy += 0.03; // leikhradi eftir notandi fær stig
        gamePoints += 1;
        pickRow()
    }
}
// Velur ras a hindrunum
for (let i = 0; i < 5; i++) {
    pickRow()
}

var metal = new Audio('assets/audio/bilageddon.mp3');
var controller = true;
function playMetal() {
    if (controller) {
        metal.play();
        controller = false;
    }
    else {
        metal.pause()
    }
}




function playExplosion() {
    let explosion = new Audio('assets/audio/explosion.mp3');
    explosion.play();
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

function resetFlag() {
    row1A = true;
    row1b = true;
    row2A = true;
    row2B = true;
    row3A = true;
    row3B = true;
    row4A = true;
    row4B = true;
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