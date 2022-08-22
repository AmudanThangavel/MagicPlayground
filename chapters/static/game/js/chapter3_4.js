debugFlag = window.location.href.split('#')[1] == "debug";
codeFlag = window.location.href.split('#')[1] == "code";
girlFlag = window.location.href.split('#')[1] == "girl";

imgURL = "/static/game/img/chapter3_4/";

var code_save;

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

debugFlag = window.location.href.split('#')[1] == "debug";
girlFlag = window.location.href.split('#')[1] == "girl";

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
} else {
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

var bridgeImage = new Image();
bridgeImage.onload = function () {
    bridgeImageReady = true;
}
bridgeImage.src = imgURL + "assets/background/bridge.png";

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

var coinImage = new Image();
coinImage.onload = function () {
    coinImageReady = true;
}
coinImage.src = imgURL + "assets/background/coin.png";

var ladderImage = new Image();
ladderImage.onload = function () {
    ladderImageReady = true;
}
ladderImage.src = imgURL + "assets/background/holeLadder.png";

var heroImage = heroImageDown;


var coin_count = 0;
var correctSquares = [];
correctSquares.push({ x: 1, y: 1 });
correctSquares.push({ x: 2, y: 1 });
correctSquares.push({ x: 3, y: 1 });
correctSquares.push({ x: 4, y: 1 });
correctSquares.push({ x: 5, y: 1 });
correctSquares.push({ x: 6, y: 1 });
correctSquares.push({ x: 7, y: 1 });
correctSquares.push({ x: 8, y: 1 });
correctSquares.push({ x: 1, y: 7 });
correctSquares.push({ x: 2, y: 7 });
correctSquares.push({ x: 3, y: 7 });
correctSquares.push({ x: 4, y: 7 });
correctSquares.push({ x: 5, y: 7 });
correctSquares.push({ x: 6, y: 7 });
correctSquares.push({ x: 7, y: 7 });
correctSquares.push({ x: 8, y: 7 });

winningSquare = { x: 1, y: 7 };


var roadSquares = [];
roadSquares.push({ x: 1, y: 1 });
roadSquares.push({ x: 2, y: 1 });
roadSquares.push({ x: 3, y: 1 });
roadSquares.push({ x: 4, y: 1 });
roadSquares.push({ x: 5, y: 1 });
roadSquares.push({ x: 6, y: 1 });
roadSquares.push({ x: 7, y: 1 });
roadSquares.push({ x: 8, y: 1 });
roadSquares.push({ x: 1, y: 7 });
roadSquares.push({ x: 2, y: 7 });
roadSquares.push({ x: 3, y: 7 });
roadSquares.push({ x: 4, y: 7 });
roadSquares.push({ x: 5, y: 7 });
roadSquares.push({ x: 6, y: 7 });
roadSquares.push({ x: 7, y: 7 });
roadSquares.push({ x: 8, y: 7 });

var bridgeSquares = [];
// var bridgeBottomSquares = [];

var grassSquares = [];
// grassSquares.push({ x: 3, y: 9 });
// grassSquares.push({ x: 6, y: 9 });


var figureTopSquares = [];
figureTopSquares.push({ x: 7, y: 9 });
figureTopSquares.push({ x: 4, y: 9 });
figureTopSquares.push({ x: 1, y: 9 });

var figureBottomSquares = [];
figureBottomSquares.push({ x: 8, y: 9 });
figureBottomSquares.push({ x: 5, y: 9 });
figureBottomSquares.push({ x: 2, y: 9 });

var potSquares = [];
potSquares.push({ x: 1, y: 7 });

var fenceSquares = [];
fenceSquares.push({ x: 0, y: 0 });
fenceSquares.push({ x: 0, y: 1 });
fenceSquares.push({ x: 0, y: 2 });
fenceSquares.push({ x: 0, y: 3 });
fenceSquares.push({ x: 0, y: 4 });
fenceSquares.push({ x: 0, y: 5 });
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

var waterSquares = [];
waterSquares.push({ x: 0, y: 4 });
waterSquares.push({ x: 1, y: 4 });
waterSquares.push({ x: 2, y: 4 });
waterSquares.push({ x: 3, y: 4 });
waterSquares.push({ x: 4, y: 4 });
waterSquares.push({ x: 5, y: 4 });
waterSquares.push({ x: 6, y: 4 });
waterSquares.push({ x: 7, y: 4 });
waterSquares.push({ x: 8, y: 4 });
waterSquares.push({ x: 9, y: 4 });

var waterLeftEdgeSquares = [];
waterLeftEdgeSquares.push({ x: 0, y: 3 });
waterLeftEdgeSquares.push({ x: 1, y: 3 });
waterLeftEdgeSquares.push({ x: 2, y: 3 });
waterLeftEdgeSquares.push({ x: 3, y: 3 });
waterLeftEdgeSquares.push({ x: 4, y: 3 });
waterLeftEdgeSquares.push({ x: 5, y: 3 });
waterLeftEdgeSquares.push({ x: 6, y: 3 });
waterLeftEdgeSquares.push({ x: 7, y: 3 });
waterLeftEdgeSquares.push({ x: 8, y: 3 });
waterLeftEdgeSquares.push({ x: 9, y: 3 });

var waterRightEdgeSquares = [];
waterRightEdgeSquares.push({ x: 0, y: 5 });
waterRightEdgeSquares.push({ x: 1, y: 5 });
waterRightEdgeSquares.push({ x: 2, y: 5 });
waterRightEdgeSquares.push({ x: 3, y: 5 });
waterRightEdgeSquares.push({ x: 4, y: 5 });
waterRightEdgeSquares.push({ x: 5, y: 5 });
waterRightEdgeSquares.push({ x: 6, y: 5 });
waterRightEdgeSquares.push({ x: 7, y: 5 });
waterRightEdgeSquares.push({ x: 8, y: 5 });
waterRightEdgeSquares.push({ x: 9, y: 5 });

ladderPath = [];
ladderPath.push({ x: 1, y: 1 });
ladderPath.push({ x: 8, y: 7 });

// Coin 

var coinPathRef1 = [];
coinPathRef1.push({ x: 3, y: 1 });
coinPathRef1.push({ x: 4, y: 1 });
coinPathRef1.push({ x: 5, y: 1 });
coinPathRef1.push({ x: 6, y: 1 });
coinPathRef1.push({ x: 7, y: 1 });

var coinPathRef2 = [];
coinPathRef2.push({ x: 2, y: 7 });
coinPathRef2.push({ x: 3, y: 7 });
coinPathRef2.push({ x: 4, y: 7 });
coinPathRef2.push({ x: 5, y: 7 });
coinPathRef2.push({ x: 6, y: 7 });

var coinPath = [];
var cc = 0
for (var i = 0; i < 11; i++) {
    if (randomNumber(0, 2) === 0) {
        coinPath[i] = coinPathRef1[i];
    } else {
        coinPath[i] = coinPathRef2[i];
    }
}

// To remove "undefined" in coinPath Array

coinPath = coinPath.filter(function (element) {
    return element !== undefined;
});

console.log(coinPath);

coinCollectPath = [];

backgroundContainer = [];
backgroundContainer.push({ image: figureTopImage, squares: figureTopSquares });
backgroundContainer.push({ image: figureBottomImage, squares: figureBottomSquares });
backgroundContainer.push({ image: roadImage, squares: roadSquares });
backgroundContainer.push({ image: bridgeImage, squares: bridgeSquares });
backgroundContainer.push({ image: fenceImage, squares: fenceSquares });
backgroundContainer.push({ image: flowerImage, squares: flowerSquares });
backgroundContainer.push({ image: grassImage, squares: grassSquares });
backgroundContainer.push({ image: waterRightEdgeImage, squares: waterRightEdgeSquares });
backgroundContainer.push({ image: waterImage, squares: waterSquares });
backgroundContainer.push({ image: waterLeftEdgeImage, squares: waterLeftEdgeSquares });
backgroundContainer.push({ image: potImage, squares: potSquares });
backgroundContainer.push({ image: coinImage, squares: coinPath });
backgroundContainer.push({ image: roadImage, squares: coinCollectPath });
backgroundContainer.push({ image: ladderImage, squares: ladderPath });


characterPosition = { x: 8, y: 1 };



//Function to draw character
function topDrawCharacter() {
    contextTop.clearRect(0, 0, canvasTop.width, canvasTop.height);
    squarecontainer[characterPosition.x][characterPosition.y].square.image = heroImage;
    squarecontainer[characterPosition.x][characterPosition.y].square.draw();
}

// Random number

function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

// Collect coin
//Function to check whether coin is present at the position
function checkCoin() {
    var found = false;
    for (var i = 0; i < coinPath.length; i++) {
        if (coinPath[i].y == characterPosition.y) {
            if (coinPath[i].x === characterPosition.x) {
                found = false;
            }
        }
    }
    console.log(found);
    if (found) {
        return true;
    } else {
        return false;
    }
}
//Function to check whether coin is present at the position
function gameCoin() {
    var found = "no";
    for (var i = 0; i < coinPath.length; i++) {
        if (coinPath[i].y == characterPosition.y) {
            if (coinPath[i].x === characterPosition.x) {
                found = "yes";
            }
        }
    }
    if (found === "yes") {
        return "yes";
    } else {
        return "no";
    }

}
//Function to collect coin
async function collectCoin() {
    if (coin === "yes") {
        coinCollectPath.push({ x: characterPosition.x, y: characterPosition.y });
        coin_count++;
        bottomDrawBackground();

    } else {
        alert("There is no coin to colect!!!");
    }

    await sleep(1000);
}

var coin = "no";
//Function to move character upwards
async function moveUp() {
    if (characterPosition.x == 0) {
        alert("Cannot go outside canvas");
        return;
    }

    if (characterPosition.x === 1 && characterPosition.y === 1) {
        squarecontainer[characterPosition.x][characterPosition.y].square.color = "lightgrey";
        await sleep(100);
        squarecontainer[characterPosition.x][characterPosition.y].square.color = "lightgrey";
        characterPosition.x = 8;
        characterPosition.y = 7;
        heroImage = heroImageUp;
        topDrawCharacter();
        await sleep(100);
        topCheckPath();
    }
    squarecontainer[characterPosition.x][characterPosition.y].square.color = "lightgrey";
    characterPosition.x -= 1;
    heroImage = heroImageUp;
    topDrawCharacter();
    coin = gameCoin();
    console.log(coin);
    await sleep(1000);
    topCheckPath();
}

port = [{ x: 1, y: 1 }];
port.push({ x: 7, y: 7 });
//Function to teleport character
function teleport() {
    if (characterPosition.x == port[0].x && characterPosition.y == port[0].y) {
        characterPosition.y = 7;
        characterPosition.x = 8;
        heroImage = heroImageUp;
        topDrawCharacter();

    }
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
    topCheckPath();
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
    topCheckPath();
}
//Function to move character towards right
async function moveRight() {
    if (characterPosition.y == 9) {
        alert("Cannot go outside canvas");
        return;
    }
    squarecontainer[characterPosition.x][characterPosition.y].square.color = "lightgrey";
    characterPosition.y += 1;
    heroImage = heroImageRight;
    topDrawCharacter();
    await sleep(1000);
    topCheckPath();
}
//Function to check whether character is following the desired path
function topCheckPath() {
    flag = false;
    console.log(characterPosition)
    console.log(111)
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
        location.reload();
    }
    topCheckWin();
}
//Function to check whether character has reached final position
function topCheckWin() {

    if (characterPosition.x == winningSquare.x && characterPosition.y == winningSquare.y && coin_count == 5) {
        contextTop.clearRect(0, 0, canvasTop.width, canvasTop.height);
        squarecontainer[characterPosition.x][characterPosition.y].square.image = heroImageWin;
        squarecontainer[characterPosition.x][characterPosition.y].square.draw();
        // tries api
        var tries = document.getElementById("tries").innerHTML;
        tries = parseInt(tries);
        tries += 1;
        saveCode(code_save, true, 0, tries);

        alert("Congratulation:)\nYou successfully completed this assignment !");
    } else if (characterPosition.x == winningSquare.x && characterPosition.y == winningSquare.y && coin_count != 5) {
        contextTop.clearRect(0, 0, canvasTop.width, canvasTop.height);
        squarecontainer[characterPosition.x][characterPosition.y].square.image = heroImageWin;
        squarecontainer[characterPosition.x][characterPosition.y].square.draw();
        alert("game over:)\n collect all the coins !");
        location.reload();    }
}

var line = 0;
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
    code = code.replaceAll('collect', 'await collect');
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