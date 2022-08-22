debugFlag = window.location.href.split('#')[1] == "debug";
codeFlag = window.location.href.split('#')[1] == "code";
girlFlag = window.location.href.split('#')[1] == "girl";

imgURL = "/static/game/img/chapter6_2/";

var code_save

// Editor ---------------------------------------------------------------------------

var editor = ace.edit("editor");
editor.setTheme("ace/theme/monokai");
editor.session.setMode("ace/mode/python");
var Range = ace.require("ace/range").Range
// Canvas ---------------------------------------------------------------------------
var canvasTop = document.getElementById("canvasTop");
var canvasBottom = document.getElementById("canvasBottom");
var contextTop = canvasTop.getContext("2d");
var contextBottom = canvasBottom.getContext("2d");
var marker = document.getElementById('marker');
var r = -1;
var c = -1;
var squarecontainer = [];
var squarecontainerBottom = [];

var execute = true;

// coins and switchs

var coinCollected = 0
var noOfCoins = 3;
var noOfSwitchOn = 0;
var noOfSwitch = 3;

var heroImageUp = new Image();
var heroImageDown = new Image();
var heroImageLeft = new Image();
var heroImageRight = new Image();
var heroImageWin = new Image();

heroImageUp.onload = function () {
    heroImageUpReady = true;
}
heroImageDown.onload = function () {
    heroImageDownReady = true;
}
heroImageLeft.onload = function () {
    heroImageLeftReady = true;
}
heroImageRight.onload = function () {
    heroImageRightReady = true;
}
heroImageWin.onload = function () {
    heroImageWinReady = true;
}

if (girlFlag) {
    heroImageUp.src = imgURL + "assets/hero/girl/up.png";
    heroImageDown.src = imgURL + "assets/hero/girl/down.png";
    heroImageLeft.src = imgURL + "assets/hero/girl/left.png";
    heroImageRight.src = imgURL + "assets/hero/girl/right.png";
    heroImageWin.src = imgURL + "assets/hero/girl/win.png";
}
else {
    heroImageUp.src = imgURL + "assets/hero/boy/up.png";
    heroImageDown.src = imgURL + "assets/hero/boy/down.png";
    heroImageLeft.src = imgURL + "assets/hero/boy/left.png";
    heroImageRight.src = imgURL + "assets/hero/boy/right.png";
    heroImageWin.src = imgURL + "assets/hero/boy/win.png";
}


var grassImage = new Image();
grassImage.onload = function () {
    grassImageReady = true;
}
grassImage.src = imgURL + "assets/background/green_grass.png";

var roadImage = new Image();
roadImage.onload = function () {
    roadImageReady = true;
}
roadImage.src = imgURL + "assets/background/road.png";

var groundImage = new Image();
groundImage.onload = function () {
    groundImageReady = true;
}
groundImage.src = imgURL + "assets/background/green_ground.png";

var waterImage = new Image();
waterImage.onload = function () {
    waterImageReady = true;
}
waterImage.src = imgURL + "assets/background/water.png";

var waterRightEdgeImage = new Image();
waterRightEdgeImage.onload = function () {
    waterRightEdgeImageReady = true;
}
waterRightEdgeImage.src = imgURL + "assets/background/water_edge_right.png";

var waterLeftEdgeImage = new Image();
waterLeftEdgeImage.onload = function () {
    waterLeftEdgeImageReady = true;
}
waterLeftEdgeImage.src = imgURL + "assets/background/water_edge_left.png";

var fenceImage = new Image();
fenceImage.onload = function () {
    fenceImageReady = true;
}
fenceImage.src = imgURL + "assets/background/fence.png";

var flowerImage = new Image();
flowerImage.onload = function () {
    flowerImageReady = true;
}
flowerImage.src = imgURL + "assets/background/flowers.png";

var bridge1Image = new Image();
bridge1Image.onload = function () {
    bridge1ImageReady = true;
}
bridge1Image.src = imgURL + "assets/background/bridge.png";

var bridge2Image = new Image();
bridge2Image.onload = function () {
    bridge2ImageReady = true;
}
bridge2Image.src = imgURL + "assets/background/bridge.png";

var figureTopImage = new Image();
figureTopImage.onload = function () {
    figureTopImageReady = true;
}
figureTopImage.src = imgURL + "assets/background/figure_top.png";

var figureBottomImage = new Image();
figureBottomImage.onload = function () {
    figureBottomImageReady = true;
}
figureBottomImage.src = imgURL + "assets/background/figure_bottom.png";

var potImage = new Image();
potImage.onload = function () {
    potImageReady = true;
}
potImage.src = imgURL + "assets/background/pot.png";

var switchOffImg = new Image();
switchOffImg.onload = function () {
    switchOffImgReady = true;
}
switchOffImg.src = imgURL + "assets/background/switchOff.png";

var switchOnImg = new Image();
switchOnImg.onload = function () {
    switchOnImgReady = true;
}
switchOnImg.src = imgURL + "assets/background/switchOn.png";

var holeImg = new Image();
holeImg.onload = function () {
    holeImageReady = true;
}
holeImg.src = imgURL + "assets/background/holeLadder.png";

var coinImg = new Image();
coinImg.onload = function () {
    coinImgReady = true;
}
coinImg.src = imgURL + "assets/background/coin.png";


var heroImage = heroImageRight;



var correctSquares = [];

correctSquares.push({ x: 1, y: 1 });
correctSquares.push({ x: 1, y: 2 });
correctSquares.push({ x: 0, y: 2 });
correctSquares.push({ x: 1, y: 3 });
correctSquares.push({ x: 1, y: 4 });
correctSquares.push({ x: 0, y: 4 });


correctSquares.push({ x: 4, y: 2 });
correctSquares.push({ x: 4, y: 3 });
correctSquares.push({ x: 3, y: 3 });
correctSquares.push({ x: 3, y: 4 });
correctSquares.push({ x: 2, y: 5 });
correctSquares.push({ x: 3, y: 5 });
correctSquares.push({ x: 3, y: 6 });
correctSquares.push({ x: 3, y: 7 });
correctSquares.push({ x: 2, y: 7 });

correctSquares.push({ x: 7, y: 3 });
correctSquares.push({ x: 7, y: 4 });
correctSquares.push({ x: 7, y: 5 });
correctSquares.push({ x: 6, y: 5 });
correctSquares.push({ x: 7, y: 6 });
correctSquares.push({ x: 7, y: 7 });





var roadSquares = [];
roadSquares.push({ x: 1, y: 1 });
roadSquares.push({ x: 1, y: 2 });
roadSquares.push({ x: 1, y: 3 });
roadSquares.push({ x: 1, y: 4 });

roadSquares.push({ x: 4, y: 2 });
roadSquares.push({ x: 4, y: 3 });
roadSquares.push({ x: 3, y: 3 });
roadSquares.push({ x: 3, y: 4 });
roadSquares.push({ x: 3, y: 5 });
roadSquares.push({ x: 3, y: 6 });
roadSquares.push({ x: 3, y: 7 });

roadSquares.push({ x: 7, y: 3 });
roadSquares.push({ x: 7, y: 4 });
roadSquares.push({ x: 7, y: 5 });
roadSquares.push({ x: 7, y: 6 });
roadSquares.push({ x: 7, y: 7 });





var bridge1Squares = [];

var bridge2Squares = [];
// bridge2Squares.push({ x: 3, y: 5 });

var bridgeBottomSquares = [];
// bridgeBottomSquares.push({ x: 7, y: 1 });

var grassSquares = [];
grassSquares.push({ x: 5, y: 0 });
grassSquares.push({ x: 1, y: 9 });
// grassSquares.push({ x: 2, y: 0 });
grassSquares.push({ x: 8, y: 9 });

var figureTopSquares = [];
figureTopSquares.push({ x: 0, y: 5 });
figureTopSquares.push({ x: 2, y: 8 });
figureTopSquares.push({ x: 6, y: 8 });

var figureBottomSquares = [];
figureBottomSquares.push({ x: 1, y: 5 });
figureBottomSquares.push({ x: 3, y: 8 });
figureBottomSquares.push({ x: 7, y: 8 });

var potSquares = [];
potSquares.push({ x: 7, y: 7 });

var fenceSquares = [];
fenceSquares.push({ x: 0, y: 0 });
fenceSquares.push({ x: 0, y: 1 });
fenceSquares.push({ x: 0, y: 2 });
fenceSquares.push({ x: 0, y: 3 });
fenceSquares.push({ x: 0, y: 4 });
fenceSquares.push({ x: 0, y: 6 });
fenceSquares.push({ x: 0, y: 7 });
fenceSquares.push({ x: 0, y: 8 });
fenceSquares.push({ x: 0, y: 9 });

fenceSquares.push({ x: 9, y: 0 });
fenceSquares.push({ x: 9, y: 1 });
fenceSquares.push({ x: 9, y: 2 });
fenceSquares.push({ x: 9, y: 3 });
fenceSquares.push({ x: 9, y: 4 });
fenceSquares.push({ x: 9, y: 5 });
fenceSquares.push({ x: 9, y: 6 });
fenceSquares.push({ x: 9, y: 7 });
fenceSquares.push({ x: 9, y: 8 });
fenceSquares.push({ x: 9, y: 9 });

var flowerSquares = [];
// flowerSquares.push({ x: 3, y: 2 });
flowerSquares.push({ x: 5, y: 5 });
flowerSquares.push({ x: 6, y: 3 });
flowerSquares.push({ x: 8, y: 5 });
flowerSquares.push({ x: 8, y: 0 });

var waterSquares = [];
// waterSquares.push({ x: 0, y: 2 });

var waterLeftEdgeSquares = [];
// waterLeftEdgeSquares.push({ x: 7, y: 0 });

var waterRightEdgeSquares = [];
// waterRightEdgeSquares.push({ x: 6, y: 0 });

var holePath = [];
holePath.push({ x: 1, y: 4 });
holePath.push({ x: 3, y: 7 });
holePath.push({ x: 4, y: 2 });
holePath.push({ x: 7, y: 3 });

var switchOffPath = [];
switchOffPath.push({ x: 1, y: 2 });
switchOffPath.push({ x: 3, y: 5 });
switchOffPath.push({ x: 7, y: 5 });

var switchOnPath = [];
// switchOnPath.push({ x: 8, y: 4 });

var coinPath = [];
coinPath.push({ x: 1, y: 3 });
coinPath.push({ x: 3, y: 6 });
coinPath.push({ x: 7, y: 6 });

coinCollectPath = [];

backgroundContainer = [];
backgroundContainer.push({ image: figureTopImage, squares: figureTopSquares });
backgroundContainer.push({ image: figureBottomImage, squares: figureBottomSquares });
backgroundContainer.push({ image: roadImage, squares: roadSquares });
backgroundContainer.push({ image: fenceImage, squares: fenceSquares });
backgroundContainer.push({ image: flowerImage, squares: flowerSquares });
backgroundContainer.push({ image: grassImage, squares: grassSquares });
backgroundContainer.push({ image: waterRightEdgeImage, squares: waterRightEdgeSquares });
backgroundContainer.push({ image: waterImage, squares: waterSquares });
backgroundContainer.push({ image: waterLeftEdgeImage, squares: waterLeftEdgeSquares });
backgroundContainer.push({ image: potImage, squares: potSquares });
backgroundContainer.push({ image: holeImg, squares: holePath });
backgroundContainer.push({ image: switchOffImg, squares: switchOffPath });
backgroundContainer.push({ image: switchOnImg, squares: switchOnPath });
backgroundContainer.push({ image: coinImg, squares: coinPath });
backgroundContainer.push({ image: roadImage, squares: coinCollectPath });

characterPosition = { x: 1, y: 1 };

//Function to display coin count on top canvas
function drawCoinCount() {
    contextTop.font = "25px Courier New";
    contextTop.fillStyle = "black";
    contextTop.fillText("Coin: " + coinCollected + "/" + noOfCoins, 10, 120);
    contextTop.fillText("Switch: " + noOfSwitchOn + "/" + noOfSwitch, 10, 150);
}

//Function to draw character
function topDrawCharacter() {

    contextTop.clearRect(0, 0, canvasTop.width, canvasTop.height);
    squarecontainer[characterPosition.x][characterPosition.y].square.image = heroImage;
    squarecontainer[characterPosition.x][characterPosition.y].square.draw();
    topCheckPath();
    drawCoinCount();
}
//Function to check if switch is present at the position
function gameCoin() {
    var found = false;
    for (var i = 0; i < coinPath.length; i++) {
        if (coinPath[i].y == characterPosition.y) {
            if (coinPath[i].x === characterPosition.x) {
                found = true;
            }
        }
    }

    return found;
}
//Function to collect coin
function collectCoin() {

    if (gameCoin()) {
        coinCollected += 1;
        coinCollectPath.push({ x: characterPosition.x, y: characterPosition.y });
        bottomDrawBackground();

    } else {
        console.log(coin);
        alert("There is no coin to colect!!!");
    }
}
//Function to check if switch is present at the position
function gameSwitch() {
    var found = false;
    for (var i = 0; i < coinPath.length; i++) {
        if (switchOffPath[i].y == characterPosition.y) {
            if (switchOffPath[i].x === characterPosition.x) {
                found = true;
            }
        }
    }

    return found;
}
//Function to toggle the switch
async function toggleSwitch() {
    if (gameSwitch()) {

        // Jump 
        squarecontainer[characterPosition.x][characterPosition.y].square.color = "lightgrey";
        characterPosition.x -= 1;
        heroImage = heroImageRight;
        topDrawCharacter();
        await sleep(200);

        squarecontainer[characterPosition.x][characterPosition.y].square.color = "lightgrey";
        characterPosition.x += 1;
        heroImage = heroImageRight;
        topDrawCharacter();
        await sleep(50);

        switchOnPath.push({ x: characterPosition.x, y: characterPosition.y });
        bottomDrawBackground();
        await sleep(200);

        noOfSwitchOn += 1;

    } else {
        console.log(gem);
        alert("There is no switch to On!!!");
    }
}
//Function to move character upwards
async function moveUp() {
    if (characterPosition.x == 0) {
        alert("Cannot go outside canvas");
        return;
    }
    squarecontainer[characterPosition.x][characterPosition.y].square.color = "lightgrey";
    characterPosition.x -= 1;
    heroImage = heroImageUp;
    topDrawCharacter();
    await sleep(1000);
}
//Function to move character downwards
async function moveDown() {
    if (characterPosition.x == 9) {
        alert("Cannot go outside canvas");
        return;
    }
    squarecontainer[characterPosition.x][characterPosition.y].square.color = "lightgrey";
    characterPosition.x += 1;
    heroImage = heroImageDown;
    topDrawCharacter();
    await sleep(1000);
}
//Function to move character towards left
async function moveLeft() {
    if (characterPosition.y == 0) {
        alert("Cannot go outside canvas");
        return;
    }

    squarecontainer[characterPosition.x][characterPosition.y].square.color = "lightgrey";
    characterPosition.y -= 1;
    heroImage = heroImageLeft;
    topDrawCharacter();
    await sleep(1000);
}
//Function to move character towards right
async function moveRight() {
    if (characterPosition.y == 9) {
        alert("Cannot go outside canvas");
        return;
    }

    if (characterPosition.x === 1 && characterPosition.y === 3) {
        squarecontainer[characterPosition.x][characterPosition.y].square.color = "lightgrey";
        characterPosition.y += 1;
        heroImage = heroImageRight;
        topDrawCharacter();
        await sleep(300);
        squarecontainer[characterPosition.x][characterPosition.y].square.color = "lightgrey";
        characterPosition.x -= 1;
        heroImage = heroImageRight;
        topDrawCharacter();
        await sleep(200);
        squarecontainer[characterPosition.x][characterPosition.y].square.color = "lightgrey";
        characterPosition.x += 1;
        heroImage = heroImageRight;
        topDrawCharacter();
        await sleep(200);
        squarecontainer[characterPosition.x][characterPosition.y].square.color = "lightgrey";
        characterPosition.x = 4;
        characterPosition.y = 2;
        heroImage = heroImageRight;
        topDrawCharacter();
        await sleep(200);
    }

    if (characterPosition.x === 3 && characterPosition.y === 6) {
        squarecontainer[characterPosition.x][characterPosition.y].square.color = "lightgrey";
        characterPosition.y += 1;
        heroImage = heroImageRight;
        topDrawCharacter();
        await sleep(300);
        squarecontainer[characterPosition.x][characterPosition.y].square.color = "lightgrey";
        characterPosition.x -= 1;
        heroImage = heroImageRight;
        topDrawCharacter();
        await sleep(200);
        squarecontainer[characterPosition.x][characterPosition.y].square.color = "lightgrey";
        characterPosition.x += 1;
        heroImage = heroImageRight;
        topDrawCharacter();
        await sleep(200);
        squarecontainer[characterPosition.x][characterPosition.y].square.color = "lightgrey";
        characterPosition.x = 7;
        characterPosition.y = 3;
        heroImage = heroImageRight;
        topDrawCharacter();
        await sleep(200);
    }

    squarecontainer[characterPosition.x][characterPosition.y].square.color = "lightgrey";
    characterPosition.y += 1;
    heroImage = heroImageRight;
    topDrawCharacter();
    await sleep(1000);
}
//Function to check whether character is following the desired path
function topCheckPath() {
    flag = false;
    for (i = 0; i < correctSquares.length; i++) {
        if (characterPosition.x == correctSquares[i].x && characterPosition.y == correctSquares[i].y) {
            flag = true;
        }
    }
    if (flag == false) {
        contextTop.clearRect(0, 0, canvasTop.width, canvasTop.height);
        squarecontainer[characterPosition.x][characterPosition.y].square.color = "red";
        squarecontainer[characterPosition.x][characterPosition.y].square.draw();
        alert("Game over :(\nYou went outside the designated path !");
        window.reload();
    }
    topCheckWin();
}//Function to check whether character has reached final position
winningSquare = { x: 7, y: 7 };
function topCheckWin() {
    if (characterPosition.x == winningSquare.x && characterPosition.y == winningSquare.y) {
        if (coinCollected === noOfCoins) {
            if (noOfSwitch === noOfSwitchOn) {
                contextTop.clearRect(0, 0, canvasTop.width, canvasTop.height);
                squarecontainer[characterPosition.x][characterPosition.y].square.image = heroImageWin;
                squarecontainer[characterPosition.x][characterPosition.y].square.draw();
                // tries api
                var tries = document.getElementById("tries").innerHTML;
                tries = parseInt(tries);
                tries += 1;
                saveCode(code_save, true, 0, tries);
                alert("Congratulation:)\nYou successfully completed this assignment !");
            } else {
                alert("Toggle all the switches !!!");
                location.reload();
            }
        } else {
            alert("Collect all the coins !!!");
            location.reload();
        }
    }
}
//Function for introducing delay
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

document.getElementById('run').onclick = async function () {
    code = editor.getSession().getValue();
    code_save = code;
    // Tries api
    var tries = document.getElementById("tries").innerHTML;
    tries = parseInt(tries);
    tries += 1;
    saveCode(code_save, false, 0, tries);
    code = code.replace(new RegExp('move', 'g'), 'await move');
    code = code.replace('def', 'async def')
    code = code.replaceAll('toggle', 'await toggle');
    code = code.replaceAll('toggle', 'await toggle');
    code = code.replace('navigate', 'navChange')
    code = code.replaceAll('navigate', 'await navigate')
    code = code.replace('navChange', 'navigate')
    code_splits = code.split("\n")
    var str = "async def main(): \n"
    code_splits.forEach(element => {
        str += "\t" + element + "\n"
    });

    str += "aio.run(main())"
    console.log(str)

    eval("(async ()=>{" + __BRYTHON__.python_to_js(str) + "})()");

}



window.onload = function () {
    topDrawGrid();
    bottomDrawGrid();
    bottomDrawBackground();
    bottomReDrawCanvas();
    topDrawCharacter();
    brython();
}