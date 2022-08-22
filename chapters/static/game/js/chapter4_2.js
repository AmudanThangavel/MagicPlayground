debugFlag = window.location.href.split('#')[1] == "debug";
codeFlag = window.location.href.split('#')[1] == "code";
girlFlag = window.location.href.split('#')[1] == "girl";

imgURL = "/static/game/img/chapter4_2/";

var code_save;

// Editor ---------------------------------------------------------------------------

var editor = ace.edit("editor");
editor.setTheme("ace/theme/monokai");
editor.session.setMode("ace/mode/python");
var Range = ace.require("ace/range").Range
var isCoin = false;
// Canvas ---------------------------------------------------------------------------
var canvasTop = document.getElementById("canvasTop");
var canvasBottom = document.getElementById("canvasBottom");
var contextTop = canvasTop.getContext("2d");
var contextBottom = canvasBottom.getContext("2d");
var r = -1;
var c = -1;
var squarecontainer = [];
var squarecontainerBottom = [];
var noOfCoins = 8;
var coin_counter = 0;

var heroImage = new Image();
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
//default
heroImage.src = heroImageUp.src;


var grassImage = new Image();
grassImage.onload = function () {
    grassImageReady = true;
}
grassImage.src = imgURL + "assets/background/dark_green_grass.png";

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

// var potImage = new Image();
// potImage.onload = function () {
//     potImageReady = true;
// }
// potImage.src = "assets/pot.png";


var bridgeImage = new Image();
bridgeImage.onload = function () {
    bridgeImageReady = true;
}
bridgeImage.src = imgURL + "assets/background/bridge.png";

var coinImage = new Image();
coinImage.onload = function () {
    coinImageReady = true;
}
coinImage.src = imgURL + "assets/background/coin.png";


var coin1Image = new Image();
coin1Image.onload = function () {
    coin1ImageReady = true;
}
coin1Image.src = imgURL + "assets/background/coin1.png";





var correctSquares = [];
correctSquares.push({ x: 9, y: 5 });
correctSquares.push({ x: 8, y: 5 });
correctSquares.push({ x: 7, y: 5 });
correctSquares.push({ x: 6, y: 5 });
correctSquares.push({ x: 5, y: 5 });
correctSquares.push({ x: 4, y: 5 });
correctSquares.push({ x: 3, y: 5 });
correctSquares.push({ x: 2, y: 5 });
correctSquares.push({ x: 1, y: 5 });
correctSquares.push({ x: 0, y: 5 });
correctSquares.push({ x: 9, y: 4 });
correctSquares.push({ x: 8, y: 4 });
correctSquares.push({ x: 7, y: 4 });
correctSquares.push({ x: 6, y: 4 });
correctSquares.push({ x: 5, y: 4 });
correctSquares.push({ x: 4, y: 4 });
correctSquares.push({ x: 3, y: 4 });
correctSquares.push({ x: 2, y: 4 });
correctSquares.push({ x: 1, y: 4 });
correctSquares.push({ x: 0, y: 4 });




var roadSquares = [];
roadSquares.push({ x: 9, y: 5 });
roadSquares.push({ x: 9, y: 4 });
roadSquares.push({ x: 8, y: 5 });
roadSquares.push({ x: 8, y: 4 });
roadSquares.push({ x: 7, y: 5 });
roadSquares.push({ x: 6, y: 5 });
roadSquares.push({ x: 6, y: 4 });
roadSquares.push({ x: 2, y: 5 });
roadSquares.push({ x: 1, y: 5 });
roadSquares.push({ x: 1, y: 4 });
roadSquares.push({ x: 2, y: 4 });
roadSquares.push({ x: 0, y: 5 });
roadSquares.push({ x: 0, y: 4 });
roadSquares.push({ x: 7, y: 4 });
roadSquares.push({ x: 3, y: 4 });
roadSquares.push({ x: 4, y: 4 });
roadSquares.push({ x: 3, y: 5 });
roadSquares.push({ x: 4, y: 5 });
roadSquares.push({ x: 5, y: 4 });
roadSquares.push({ x: 5, y: 5 });










var grassSquares = [];
grassSquares.push({ x: 7, y: 0 });
grassSquares.push({ x: 8, y: 1 });
grassSquares.push({ x: 9, y: 2 });
grassSquares.push({ x: 7, y: 6 });
grassSquares.push({ x: 9, y: 7 });
grassSquares.push({ x: 7, y: 9 });
grassSquares.push({ x: 0, y: 1 });

var figureTopSquares = [];
figureTopSquares.push({ x: 0, y: 6 });
figureTopSquares.push({ x: 0, y: 3 });

var figureBottomSquares = [];
figureBottomSquares.push({ x: 1, y: 6 });
figureBottomSquares.push({ x: 1, y: 3 });



var fenceSquares = [];
fenceSquares.push({ x: 2, y: 0 });
fenceSquares.push({ x: 2, y: 1 });
fenceSquares.push({ x: 2, y: 2 });
fenceSquares.push({ x: 2, y: 3 });
//fenceSquares.push({ x: 2, y: 4 });
fenceSquares.push({ x: 2, y: 6 });
fenceSquares.push({ x: 2, y: 7 });
fenceSquares.push({ x: 2, y: 8 });
fenceSquares.push({ x: 2, y: 9 });


// x = 6

fenceSquares.push({ x: 6, y: 0 });
fenceSquares.push({ x: 6, y: 1 });
fenceSquares.push({ x: 6, y: 2 });
fenceSquares.push({ x: 6, y: 3 });
fenceSquares.push({ x: 6, y: 6 });
fenceSquares.push({ x: 6, y: 7 });
fenceSquares.push({ x: 6, y: 8 });
fenceSquares.push({ x: 6, y: 9 });


var flowerSquares = [];
flowerSquares.push({ x: 7, y: 2 });
flowerSquares.push({ x: 8, y: 3 });
//flowerSquares.push({ x: 1, y: 4 });
flowerSquares.push({ x: 0, y: 2 });





var coinSquares1 = [];
coinSquares1.push({ x: 8, y: 5 });
coinSquares1.push({ x: 7, y: 5 });
coinSquares1.push({ x: 6, y: 5 });
coinSquares1.push({ x: 5, y: 5 });
coinSquares1.push({ x: 4, y: 5 });
coinSquares1.push({ x: 3, y: 5 });
coinSquares1.push({ x: 2, y: 5 });
coinSquares1.push({ x: 1, y: 5 });




var coinSquares2 = [];
coinSquares2.push({ x: 8, y: 4 });
coinSquares2.push({ x: 7, y: 4 });
coinSquares2.push({ x: 6, y: 4 });
coinSquares2.push({ x: 5, y: 4 });
coinSquares2.push({ x: 4, y: 4 });
coinSquares2.push({ x: 3, y: 4 });
coinSquares2.push({ x: 2, y: 4 });
coinSquares2.push({ x: 1, y: 4 });


var path = [];
path.push({ x: 8, y: 5 });
path.push({ x: 7, y: 5 });
path.push({ x: 6, y: 4 });
path.push({ x: 5, y: 5 });
path.push({ x: 4, y: 5 });
path.push({ x: 3, y: 4 });
path.push({ x: 2, y: 5 });
path.push({ x: 1, y: 5 });

if (codeFlag == true) {
    console.log("for (var i = 0; i < 8; i++) {\nmoveUp();\nif (!isCoin) {\nmoveLeft();\ncollectCoin();\nmoveRight(); } \nelse{ \ncollectCoin();}\n} \nmoveUp();")
}



// to generate random coin

var coinPath = [];

var cc = 0
for (var i = 0; i < 8; i++) {
    if (randomNumber(0, 2) === 0) {
        coinPath[i] = coinSquares1[i];
    } else {
        coinPath[i] = coinSquares2[i];
    }
}

console.log(coinPath);

// To remove "undefined" in coinPath Array

coinPath = coinPath.filter(function (element) {
    return element !== undefined;
});
coinCollectPath = [];

console.log(coinPath);

// Random number

function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}



backgroundContainer = [];
backgroundContainer.push({ image: figureTopImage, squares: figureTopSquares });
backgroundContainer.push({ image: figureBottomImage, squares: figureBottomSquares });
backgroundContainer.push({ image: roadImage, squares: roadSquares });
backgroundContainer.push({ image: fenceImage, squares: fenceSquares });
backgroundContainer.push({ image: flowerImage, squares: flowerSquares });
backgroundContainer.push({ image: grassImage, squares: grassSquares });
backgroundContainer.push({ image: coinImage, squares: coinPath });
backgroundContainer.push({ image: roadImage, squares: coinCollectPath });


characterPosition = { x: 9, y: 5 };

//Function to draw character
function topDrawCharacter() {
    topCheckPath();
    contextTop.clearRect(0, 0, canvasTop.width, canvasTop.height);
    squarecontainer[characterPosition.x][characterPosition.y].square.image = heroImage;
    squarecontainer[characterPosition.x][characterPosition.y].square.draw();
}

var found = false;
//Function to check whether coin is present at the position
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
async function collectCoin() {
    if (isCoin) {
        coinCollectPath.push({ x: characterPosition.x, y: characterPosition.y });
        bottomDrawBackground();

    } else {
        alert("There is no coin to colect!!!");
    }
    coin_counter += 1;
    await sleep(1000);
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
    isCoin = gameCoin();
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
    isCoin = gameCoin();
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
    isCoin = gameCoin();
    await sleep(1000);
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
    isCoin = gameCoin();
    await sleep(1000);
}
var winningSquare = [];
winningSquare.push({ x: 0, y: 5 });
winningSquare.push({ x: 0, y: 4 });
//Function to check whether character is following the desired path
function topCheckPath() {
    flag = false;
    console.log(characterPosition)

    for (i = 0; i < correctSquares.length; i++) {
        if (characterPosition.x == correctSquares[i].x && characterPosition.y == correctSquares[i].y) {
            flag = true;
        }

    }
    if (flag == false) {
        contextTop.clearRect(0, 0, canvasTop.width, canvasTop.height);
        squarecontainer[characterPosition.x][characterPosition.y].square.color = heroImage;
        squarecontainer[characterPosition.x][characterPosition.y].square.draw();
        alert("Game over :(\nYou went outside the designated path !");
        location.reload();
    }
    topCheckWin();
}
//Function to check whether character has reached final position
function topCheckWin() {
    for (i = 0; i < winningSquare.length; i++) {
        if (characterPosition.x == winningSquare[i].x && characterPosition.y == winningSquare[i].y) {
            if (coin_counter === noOfCoins) {
                contextTop.clearRect(0, 0, canvasTop.width, canvasTop.height);
                squarecontainer[characterPosition.x][characterPosition.y].square.image = heroImageWin;
                squarecontainer[characterPosition.x][characterPosition.y].square.draw();
                // tries api
                var tries = document.getElementById("tries").innerHTML;
                tries = parseInt(tries);
                tries += 1;
                saveCode(code_save, true, 0, tries);
                alert("Congratulation:)\nYou successfully completed this assignment !");
            }
            else {
                alert("Collect all the coins!!!");
                location.reload();
            }
        }
    }
}
//Function for introducing delay
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

document.getElementById('run').onclick = function () {
    code = editor.getSession().getValue();
    code_save = code;
    // Tries api
    var tries = document.getElementById("tries").innerHTML;
    tries = parseInt(tries);
    tries += 1;
    saveCode(code_save, false, 0, tries);
    code = code.replace(new RegExp('move', 'g'), 'await move');
    code = code.replaceAll('is_coin', 'window.isCoin');
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