debugFlag = window.location.href.split('#')[1] == "debug";
codeFlag = window.location.href.split('#')[1] == "code";
girlFlag = window.location.href.split('#')[1] == "girl";

imgURL = "/static/game/img/chapter7_2/";

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

// coins and switchs

var coinCollected = 0
var noOfCoins = 5;


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


var woodPathTImage = new Image();
woodPathTImage.onload = function () {
    woodPathTImageReady = true;
}
woodPathTImage.src = imgURL + "assets/background/woodPathT.png";

var woodPathLImage = new Image();
woodPathLImage.onload = function () {
    woodPathLImageReady = true;
}
woodPathLImage.src = imgURL + "assets/background/woodPathL.png";

var woodPathRImage = new Image();
woodPathRImage.onload = function () {
    woodPathRImageReady = true;
}
woodPathRImage.src = imgURL + "assets/background/woodPathR.png";

var woodPathTLImage = new Image();
woodPathTLImage.onload = function () {
    woodPathTLImageReady = true;
}
woodPathTLImage.src = imgURL + "assets/background/woodPathTL.png";

var woodPathTRImage = new Image();
woodPathTRImage.onload = function () {
    woodPathTRImageReady = true;
}
woodPathTRImage.src = imgURL + "assets/background/woodPathTR.png";

var woodPathBRImage = new Image();
woodPathBRImage.onload = function () {
    woodPathBRImageReady = true;
}
woodPathBRImage.src = imgURL + "assets/background/woodPathBR.png";

var woodPathBLImage = new Image();
woodPathBLImage.onload = function () {
    woodPathBLImageReady = true;
}
woodPathBLImage.src = imgURL + "assets/background/woodPathBL.png";

var holeImg = new Image();
holeImg.onload = function () {
    holeImageReady = true;
}
holeImg.src = imgURL + "assets/background/holeLadder.png";

var coinImg = new Image();
coinImg.onload = function () {
    coinImageReady = true;
}
coinImg.src = imgURL + "assets/background/roadGem.png";

var coinNImg = new Image();
coinNImg.onload = function () {
    coinNImageReady = true;
}
coinNImg.src = imgURL + "assets/background/road.png";


var heroImage = heroImageUp;



var correctSquares = [];
correctSquares.push({ x: 1, y: 1 });
correctSquares.push({ x: 2, y: 1 });
correctSquares.push({ x: 3, y: 1 });
correctSquares.push({ x: 4, y: 1 });
correctSquares.push({ x: 5, y: 1 });
correctSquares.push({ x: 6, y: 1 });
correctSquares.push({ x: 7, y: 1 });
correctSquares.push({ x: 1, y: 1 });
correctSquares.push({ x: 1, y: 2 });
correctSquares.push({ x: 1, y: 3 });
correctSquares.push({ x: 1, y: 4 });
correctSquares.push({ x: 0, y: 4 });


correctSquares.push({ x: 1, y: 8 });
correctSquares.push({ x: 2, y: 8 });
correctSquares.push({ x: 3, y: 8 });
correctSquares.push({ x: 4, y: 8 });
correctSquares.push({ x: 5, y: 8 });
correctSquares.push({ x: 6, y: 8 });
correctSquares.push({ x: 7, y: 8 });
correctSquares.push({ x: 8, y: 8 });
correctSquares.push({ x: 8, y: 7 });
correctSquares.push({ x: 8, y: 6 });
correctSquares.push({ x: 8, y: 5 });




var roadSquares = [];
roadSquares.push({ x: 1, y: 1 });
roadSquares.push({ x: 2, y: 1 });
roadSquares.push({ x: 3, y: 1 });
roadSquares.push({ x: 4, y: 1 });
roadSquares.push({ x: 5, y: 1 });
roadSquares.push({ x: 6, y: 1 });
roadSquares.push({ x: 7, y: 1 });
roadSquares.push({ x: 1, y: 1 });
roadSquares.push({ x: 1, y: 2 });
roadSquares.push({ x: 1, y: 3 });
roadSquares.push({ x: 1, y: 4 });


roadSquares.push({ x: 1, y: 8 });
roadSquares.push({ x: 2, y: 8 });
roadSquares.push({ x: 3, y: 8 });
roadSquares.push({ x: 4, y: 8 });
roadSquares.push({ x: 5, y: 8 });
roadSquares.push({ x: 6, y: 8 });
roadSquares.push({ x: 7, y: 8 });
roadSquares.push({ x: 8, y: 8 });
roadSquares.push({ x: 8, y: 7 });
roadSquares.push({ x: 8, y: 6 });
roadSquares.push({ x: 8, y: 5 });


var bridgeSquares = [];
// bridgeSquares.push({ x: 6, y: 1 });

var bridgeBottomSquares = [];
// bridgeBottomSquares.push({ x: 7, y: 1 });

var grassSquares = [];
// grassSquares.push({ x: 5, y: 5 });

var figureTopSquares = [];
figureTopSquares.push({ x: 5, y: 6 });
figureTopSquares.push({ x: 3, y: 3 });

var figureBottomSquares = [];
figureBottomSquares.push({ x: 6, y: 6 });
figureBottomSquares.push({ x: 4, y: 3 });

var potSquares = [];
potSquares.push({ x: 1, y: 8 });

var fenceSquares = [];
// fenceSquares.push({ x: 3, y: 8 });

var flowerSquares = [];
// flowerSquares.push({ x: 0, y: 4 });

var waterSquares = [];
// waterSquares.push({ x: 0, y: 2 });

var waterLeftEdgeSquares = [];
// waterLeftEdgeSquares.push({ x: 0, y: 1 });

var waterRightEdgeSquares = [];
// waterRightEdgeSquares.push({ x: 0, y: 3 });

var woodTPath = [];
woodTPath.push({ x: 0, y: 8 });
woodTPath.push({ x: 0, y: 4 });
woodTPath.push({ x: 0, y: 3 });
woodTPath.push({ x: 0, y: 2 });
woodTPath.push({ x: 0, y: 1 });
woodTPath.push({ x: 7, y: 6 });
woodTPath.push({ x: 7, y: 5 });
woodTPath.push({ x: 9, y: 5 });
woodTPath.push({ x: 9, y: 6 });
woodTPath.push({ x: 9, y: 7 });
woodTPath.push({ x: 9, y: 8 });
woodTPath.push({ x: 7, y: 7 });

woodTPath.push({ x: 8, y: 1 });

woodTPath.push({ x: 2, y: 3 });
woodTPath.push({ x: 2, y: 4 });



var woodLPath = [];
woodLPath.push({ x: 1, y: 0 });
woodLPath.push({ x: 2, y: 0 });
woodLPath.push({ x: 3, y: 0 });
woodLPath.push({ x: 4, y: 0 });
woodLPath.push({ x: 5, y: 0 });
woodLPath.push({ x: 6, y: 0 });
woodLPath.push({ x: 7, y: 0 });

woodLPath.push({ x: 1, y: 7 });
woodLPath.push({ x: 2, y: 7 });
woodLPath.push({ x: 3, y: 7 });
woodLPath.push({ x: 4, y: 7 });
woodLPath.push({ x: 5, y: 7 });
woodLPath.push({ x: 6, y: 7 });
woodLPath.push({ x: 7, y: 7 });

woodLPath.push({ x: 8, y: 4 });






var woodRPath = [];
woodRPath.push({ x: 1, y: 9 });
woodRPath.push({ x: 2, y: 9 });
woodRPath.push({ x: 3, y: 9 });
woodRPath.push({ x: 4, y: 9 });
woodRPath.push({ x: 5, y: 9 });
woodRPath.push({ x: 6, y: 9 });
woodRPath.push({ x: 7, y: 9 });
woodRPath.push({ x: 8, y: 9 });

woodRPath.push({ x: 1, y: 7 });
woodRPath.push({ x: 2, y: 7 });
woodRPath.push({ x: 3, y: 7 });
woodRPath.push({ x: 4, y: 7 });
woodRPath.push({ x: 5, y: 7 });
woodRPath.push({ x: 6, y: 7 });

woodRPath.push({ x: 2, y: 2 });
woodRPath.push({ x: 3, y: 2 });
woodRPath.push({ x: 4, y: 2 });
woodRPath.push({ x: 5, y: 2 });
woodRPath.push({ x: 6, y: 2 });
woodRPath.push({ x: 7, y: 2 });

woodRPath.push({ x: 1, y: 5 });


var woodTRPath = [];
woodTRPath.push({ x: 0, y: 9 });
woodTRPath.push({ x: 0, y: 9 });
woodTRPath.push({ x: 0, y: 5 });


var woodTLPath = [];
woodTLPath.push({ x: 0, y: 7 });
woodTLPath.push({ x: 0, y: 0 });
woodTLPath.push({ x: 7, y: 4 });

var woodBRPath = [];
woodBRPath.push({ x: 9, y: 9 });
woodBRPath.push({ x: 8, y: 2 });
woodBRPath.push({ x: 2, y: 5 });

var woodBLPath = [];
woodBLPath.push({ x: 8, y: 0 });
woodBLPath.push({ x: 9, y: 4 });

var holePath = [];
holePath.push({ x: 1, y: 4 });
holePath.push({ x: 8, y: 5 });

// Coin 

var coinPathRef1 = [];
coinPathRef1.push({ x: 2, y: 1 });
coinPathRef1.push({ x: 3, y: 1 });
coinPathRef1.push({ x: 4, y: 1 });
coinPathRef1.push({ x: 5, y: 1 });
coinPathRef1.push({ x: 6, y: 1 });

var coinPathRef2 = [];
coinPathRef2.push({ x: 2, y: 8 });
coinPathRef2.push({ x: 3, y: 8 });
coinPathRef2.push({ x: 4, y: 8 });
coinPathRef2.push({ x: 5, y: 8 });
coinPathRef2.push({ x: 6, y: 8 });
// coinPathRef2.push({ x: 7, y: 8 });

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
backgroundContainer.push({ image: woodPathTImage, squares: woodTPath });
backgroundContainer.push({ image: woodPathRImage, squares: woodRPath });
backgroundContainer.push({ image: woodPathLImage, squares: woodLPath });
backgroundContainer.push({ image: woodPathTLImage, squares: woodTLPath });
backgroundContainer.push({ image: woodPathTRImage, squares: woodTRPath });
backgroundContainer.push({ image: woodPathBLImage, squares: woodBLPath });
backgroundContainer.push({ image: woodPathBRImage, squares: woodBRPath });
backgroundContainer.push({ image: holeImg, squares: holePath });
backgroundContainer.push({ image: coinImg, squares: coinPath });
backgroundContainer.push({ image: roadImage, squares: coinCollectPath });

characterPosition = { x: 7, y: 1 };


//Function to display coin count on top canvas
function drawCoinCount() {
    contextTop.font = "25px Courier New";
    contextTop.fillStyle = "black";
    contextTop.fillText("Gem: " + coinCollected + "/" + noOfCoins, 20, 480);
}


//Function to draw character
function topDrawCharacter() {
    contextTop.clearRect(0, 0, canvasTop.width, canvasTop.height);
    squarecontainer[characterPosition.x][characterPosition.y].square.image = heroImage;
    squarecontainer[characterPosition.x][characterPosition.y].square.draw();
    topCheckPath();
    drawCoinCount();
}

// Random number

function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}


var gem = "no";
//Function to check whether gem is present at the position
function gameCoin() {
    var found = "no";
    for (var i = 0; i < coinPath.length; i++) {
        if (coinPath[i].y == characterPosition.y) {
            if (coinPath[i].x === characterPosition.x) {
                found = "yes";
            }
        }
    }

    return found;
}
//Function to collect gem
function collectGem() {

    if (gem === "yes") {
        coinCollected += 1;
        coinCollectPath.push({ x: characterPosition.x, y: characterPosition.y });
        bottomDrawBackground();
        console.log("Coin collected");

    } else {
        console.log(gem);
        alert("There is no coin to colect!!!");
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
    gem = gameCoin();
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
    gem = gameCoin();
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
    gem = gameCoin();
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
        await sleep(400);
        squarecontainer[characterPosition.x][characterPosition.y].square.color = "lightgrey";
        characterPosition.x -= 1;
        heroImage = heroImageUp;
        topDrawCharacter();
        await sleep(200);
        squarecontainer[characterPosition.x][characterPosition.y].square.color = "lightgrey";
        characterPosition.x = 8;
        characterPosition.y = 5;
        heroImage = heroImageUp;
        topDrawCharacter();
        gem = gameCoin();
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
        location.reload();
    }
    topCheckWin();
}
//Function to check whether character has reached final position
winningSquare = { x: 1, y: 8 };
function topCheckWin() {
    if (characterPosition.x == winningSquare.x && characterPosition.y == winningSquare.y) {
        if (coinCollected === noOfCoins) {
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
            alert("Collect all the coins!!!");
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
    code = code.replace('def', 'async def');
    code = code.replace('navigate', 'navChange');
    code = code.replaceAll('navigate', 'await navigate');
    code = code.replace('navChange', 'navigate');
    code_splits = code.split("\n");
    var str = "async def main(): \n";
    code_splits.forEach(element => {
        str += "\t" + element + "\n";
    });

    str += "aio.run(main())";
    console.log(str);

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