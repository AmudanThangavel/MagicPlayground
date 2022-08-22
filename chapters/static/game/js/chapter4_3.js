debugFlag = window.location.href.split('#')[1] == "debug";
codeFlag = window.location.href.split('#')[1] == "code";
girlFlag = window.location.href.split('#')[1] == "girl";

imgURL = "/static/game/img/chapter4_3/";

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
var noOfCoins = 3;
var noOfSwitchOn = 0;
var noOfSwitch = 3;
var coin = "no";
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

var wallImg = new Image();
wallImg.onload = function () {
    wallImageReady = true;
}
wallImg.src = imgURL + "assets/background/wall.png";

var doorCloseImg = new Image();
doorCloseImg.onload = function () {
    doorCloseImageReady = true;
}
doorCloseImg.src = imgURL + "assets/background/doorClose.png";

var doorOImg = new Image();
doorOImg.onload = function () {
    doorOImageReady = true;
}
doorOImg.src = imgURL + "assets/background/doorOpen.png";

var coinImg = new Image();
coinImg.onload = function () {
    coinImageReady = true;
}
coinImg.src = imgURL + "assets/background/coin.png";

var coinNImg = new Image();
coinNImg.onload = function () {
    coinNImageReady = true;
}
coinNImg.src = imgURL + "assets/background/road.png";


var switchImg = new Image();
switchImg.onload = function () {
    switchImageReady = true;
}
switchImg.src = imgURL + "assets/background/switchOff.png";

var switchOnImg = new Image();
switchOnImg.onload = function () {
    switchOnImageReady = true;
}
switchOnImg.src = imgURL + "assets/background/switchOn.png";

var holeImg = new Image();
holeImg.onload = function () {
    holeImageReady = true;
}
holeImg.src = imgURL + "assets/background/holeLadder.png";

var heroImage = heroImageUp;

var canvasTop = document.getElementById("canvasTop");
var canvasBottom = document.getElementById("canvasBottom");
var contextTop = canvasTop.getContext("2d");
var contextBottom = canvasBottom.getContext("2d");
var r = -1;
var c = -1;
var squarecontainer = [];
var squarecontainerBottom = [];

var correctSquares = [];
correctSquares.push({ x: 9, y: 2 });
correctSquares.push({ x: 8, y: 2 });
correctSquares.push({ x: 7, y: 2 });
correctSquares.push({ x: 7, y: 1 });
correctSquares.push({ x: 7, y: 3 });
correctSquares.push({ x: 2, y: 5 });
correctSquares.push({ x: 3, y: 5 });
correctSquares.push({ x: 6, y: 1 });
correctSquares.push({ x: 2, y: 1 });
correctSquares.push({ x: 6, y: 1 });



var roadSquares = [];

// y = 2

roadSquares.push({ x: 9, y: 2 });
roadSquares.push({ x: 8, y: 2 });
roadSquares.push({ x: 7, y: 2 });
roadSquares.push({ x: 7, y: 3 });
roadSquares.push({ x: 7, y: 1 });
roadSquares.push({ x: 6, y: 2 });
roadSquares.push({ x: 5, y: 2 });
roadSquares.push({ x: 4, y: 2 });
roadSquares.push({ x: 3, y: 2 });
roadSquares.push({ x: 3, y: 3 });
roadSquares.push({ x: 3, y: 1 });
roadSquares.push({ x: 2, y: 2 });
roadSquares.push({ x: 1, y: 2 });
roadSquares.push({ x: 0, y: 2 });

// y = 6

roadSquares.push({ x: 9, y: 6 });
roadSquares.push({ x: 8, y: 6 });
roadSquares.push({ x: 7, y: 6 });
roadSquares.push({ x: 7, y: 5 });
// roadSquares.push({ x: 7, y: 7 });
roadSquares.push({ x: 6, y: 6 });
roadSquares.push({ x: 5, y: 6 });
roadSquares.push({ x: 4, y: 6 });
roadSquares.push({ x: 3, y: 6 });
roadSquares.push({ x: 3, y: 5 });
roadSquares.push({ x: 3, y: 7 });
roadSquares.push({ x: 2, y: 6 });
roadSquares.push({ x: 1, y: 6 });
roadSquares.push({ x: 0, y: 6 });


var grassSquares = [];
// grassSquares.push({ x: 5, y: 5 });
// grassSquares.push({ x: 6, y: 5 });

var figureTopSquares = [];
// figureTopSquares.push({ x: 2, y: 0 });

var figureBottomSquares = [];
// figureBottomSquares.push({ x: 3, y: 0 });

var potSquares = [];
potSquares.push({ x: 0, y: 6 });

var fenceSquares = [];
// fenceSquares.push({ x: 6, y: 0 });
// fenceSquares.push({ x: 6, y: 1 });


var flowerSquares = [];
// flowerSquares.push({ x: 0, y: 4 });
// flowerSquares.push({ x: 1, y: 4 });

var wallPath = [];
wallPath.push({ x: 6, y: 0 });
wallPath.push({ x: 6, y: 1 });
// wallPath.push({ x: 6, y: 2 });
wallPath.push({ x: 6, y: 3 });
wallPath.push({ x: 6, y: 4 });
wallPath.push({ x: 6, y: 5 });
// wallPath.push({ x: 6, y: 6 });
wallPath.push({ x: 6, y: 7 });
wallPath.push({ x: 6, y: 8 });
wallPath.push({ x: 6, y: 9 });

// x = 2

wallPath.push({ x: 2, y: 0 });
wallPath.push({ x: 2, y: 1 });
// wallPath.push({ x: 2, y: 2 });
wallPath.push({ x: 2, y: 3 });
wallPath.push({ x: 2, y: 4 });
wallPath.push({ x: 2, y: 5 });
// wallPath.push({ x: 2, y: 6 });
wallPath.push({ x: 2, y: 7 });
wallPath.push({ x: 2, y: 8 });
wallPath.push({ x: 2, y: 9 });

var doorPath = [];
doorPath.push({ x: 6, y: 2 });
doorPath.push({ x: 2, y: 2 });
// doorPath.push({ x: 6, y: 6 });
doorPath.push({ x: 2, y: 6 });

var doorOPath = [];
doorOPath.push({ x: 6, y: 6 });

var coinPath = [];
coinPath.push({ x: 7, y: 3 });
coinPath.push({ x: 3, y: 3 });
coinPath.push({ x: 3, y: 7 });

var coinNPath = [];


var switchPath = [];
switchPath.push({ x: 7, y: 1 });
switchPath.push({ x: 3, y: 1 });
switchPath.push({ x: 3, y: 5 });

var switchOPath = [];
switchOPath.push({ x: 7, y: 5 });


var holePath = [];
holePath.push({ x: 0, y: 2 });
holePath.push({ x: 9, y: 6 });

backgroundContainer = [];
backgroundContainer.push({ image: figureTopImage, squares: figureTopSquares });
backgroundContainer.push({ image: figureBottomImage, squares: figureBottomSquares });
backgroundContainer.push({ image: roadImage, squares: roadSquares });
backgroundContainer.push({ image: fenceImage, squares: fenceSquares });
backgroundContainer.push({ image: flowerImage, squares: flowerSquares });
backgroundContainer.push({ image: grassImage, squares: grassSquares });
backgroundContainer.push({ image: potImage, squares: potSquares });
backgroundContainer.push({ image: wallImg, squares: wallPath });
backgroundContainer.push({ image: doorCloseImg, squares: doorPath });
backgroundContainer.push({ image: doorOImg, squares: doorOPath });
backgroundContainer.push({ image: holeImg, squares: holePath });
backgroundContainer.push({ image: coinImg, squares: coinPath });
backgroundContainer.push({ image: coinNImg, squares: coinNPath });
backgroundContainer.push({ image: switchImg, squares: switchPath });
backgroundContainer.push({ image: switchOnImg, squares: switchOPath });

characterPosition = { x: 9, y: 2 };

//Function to display coin count
function drawCoinCount() {
    contextTop.font = "25px Courier New";
    contextTop.fillStyle = "black";
    contextTop.fillText("Coin: " + coinCollected + "/" + noOfCoins, 330, 20);
    contextTop.fillText("Switch: " + noOfSwitchOn + "/" + noOfSwitch, 330, 50);
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
function randomNumber(maxNum, minNum) {
    return Math.floor(Math.random() * (maxNum - minNum)) + minNum;
}

var doorAr = ["open", "close"];

var door = door;

var doorNo = 0;



var i = 0;
//Function to toggle switch
async function toggleSwitch() {
    if (characterPosition.y === 1 && characterPosition.x === 7) {
        // Jump 
        // moveUp
        squarecontainer[characterPosition.x][characterPosition.y].square.color = "lightgrey";
        characterPosition.x -= 1;
        heroImage = heroImageUp;
        topDrawCharacter();

        await sleep(100);

        //moveDown
        squarecontainer[characterPosition.x][characterPosition.y].square.color = "lightgrey";
        characterPosition.x += 1;
        heroImage = heroImageLeft;
        topDrawCharacter();

        doorOPath.push({ x: 6, y: 2 });
        switchOPath.push({ x: 7, y: 1 });

        correctSquares.push({ x: 6, y: 2 });
        correctSquares.push({ x: 5, y: 2 });
        correctSquares.push({ x: 4, y: 2 });
        correctSquares.push({ x: 3, y: 2 });
        correctSquares.push({ x: 3, y: 1 });
        correctSquares.push({ x: 3, y: 3 });

        bottomDrawBackground();

        gameVar();

        noOfSwitchOn += 1;

        doorNo = 1;
    } else if (characterPosition.x === 3 && characterPosition.y === 1) {

        // Jump 
        // moveUp
        squarecontainer[characterPosition.x][characterPosition.y].square.color = "lightgrey";
        characterPosition.x -= 1;
        heroImage = heroImageUp;
        topDrawCharacter();

        await sleep(100);

        //moveDown
        squarecontainer[characterPosition.x][characterPosition.y].square.color = "lightgrey";
        characterPosition.x += 1;
        heroImage = heroImageUp;
        topDrawCharacter();

        doorOPath.push({ x: 2, y: 2 });
        switchOPath.push({ x: 3, y: 1 });

        correctSquares.push({ x: 2, y: 2 });
        correctSquares.push({ x: 1, y: 2 });
        correctSquares.push({ x: 0, y: 2 });
        correctSquares.push({ x: 9, y: 6 });
        correctSquares.push({ x: 8, y: 6 });
        correctSquares.push({ x: 7, y: 6 });
        correctSquares.push({ x: 7, y: 5 });
        correctSquares.push({ x: 6, y: 6 });
        correctSquares.push({ x: 5, y: 6 });
        correctSquares.push({ x: 4, y: 6 });
        correctSquares.push({ x: 3, y: 6 });
        correctSquares.push({ x: 3, y: 5 });
        correctSquares.push({ x: 3, y: 7 });

        bottomDrawBackground();

        doorNo = 2;

        noOfSwitchOn += 1;

        gameVar();

    } else if (characterPosition.x === 3 && characterPosition.y === 5) {

        // Jump 
        // moveUp
        squarecontainer[characterPosition.x][characterPosition.y].square.color = "lightgrey";
        characterPosition.x -= 1;
        heroImage = heroImageUp;
        topDrawCharacter();

        await sleep(100);

        //moveDown
        squarecontainer[characterPosition.x][characterPosition.y].square.color = "lightgrey";
        characterPosition.x += 1;
        heroImage = heroImageUp;
        topDrawCharacter();

        doorOPath.push({ x: 2, y: 6 });
        switchOPath.push({ x: 3, y: 5 });

        correctSquares.push({ x: 2, y: 6 });
        correctSquares.push({ x: 1, y: 6 });
        correctSquares.push({ x: 0, y: 6 });

        bottomDrawBackground();

        gameVar();

        noOfSwitchOn += 1;

        doorNo = 3;
    } else {
        alert("There is no switch or the door is already open!!!");
    }
}

function gameVar() {
    if (characterPosition.x === 7 && characterPosition.y === 2) {
        if (doorNo === 0) {
            door = "close";
            coin = "yes";
        } else {
            coin = "no"
            door = "open";
        }
    } else if (characterPosition.x === 3 && characterPosition.y === 2) {
        if (doorNo === 1) {
            door = "close";
            coin = "yes";
        } else {
            coin = "no"
            door = "open";
        }
    } else if (characterPosition.x === 3 && characterPosition.y === 6) {
        if (doorNo === 2) {
            door = "close";
            coin = "yes";
        } else {
            coin = "no"
            door = "open";
        }
    } else {
        coin = "no";
        door = "open";
    }
    console.log(door);
    console.log(coin);
}
//Function to move character upwards
async function moveUp() {
    if (characterPosition.x == 0) {
        alert("Cannot go outside canvas");
        return;
    }
    if (characterPosition.x === 1 && characterPosition.y === 2) {
        squarecontainer[characterPosition.x][characterPosition.y].square.color = "lightgrey";
        characterPosition.x -= 1;
        heroImage = heroImageUp;
        topDrawCharacter();
        await sleep(100);
        squarecontainer[characterPosition.x][characterPosition.y].square.color = "lightgrey";
        characterPosition.x = 9;
        characterPosition.y = 6;
        heroImage = heroImageUp;
        topDrawCharacter();
        await sleep(100);
    }



    squarecontainer[characterPosition.x][characterPosition.y].square.color = "lightgrey";
    characterPosition.x -= 1;
    heroImage = heroImageUp;
    topDrawCharacter();
    gameVar();


}
//Function to collect coin
function collectCoin() {
    if (characterPosition.x === 7 && characterPosition.y === 3) {

        coinNPath.push({ x: 7, y: 3 });

        bottomDrawBackground();

        coinCollected += 1;
    } else if (characterPosition.x === 3 && characterPosition.y === 3) {

        coinNPath.push({ x: 3, y: 3 });

        bottomDrawBackground();
        coinCollected += 1;

    } else if (characterPosition.x === 3 && characterPosition.y === 7) {
        coinNPath.push({ x: 3, y: 7 });

        bottomDrawBackground();

        coinCollected += 1;
    } else {
        alert("There is no Coin to collect!!!");
    }
}
//Function to move character downwards
function moveDown() {
    if (characterPosition.x == 9) {
        alert("Cannot go outside canvas");
        return;
    }
    squarecontainer[characterPosition.x][characterPosition.y].square.color = "lightgrey";
    characterPosition.x += 1;
    heroImage = heroImageDown;
    topDrawCharacter();
}
//Function to move character towards left
function moveLeft() {
    if (characterPosition.y == 0) {
        alert("Cannot go outside canvas");
        return;
    }
    squarecontainer[characterPosition.x][characterPosition.y].square.color = "lightgrey";
    characterPosition.y -= 1;
    heroImage = heroImageLeft;
    topDrawCharacter();
}
//Function to move character towards right
function moveRight() {
    if (characterPosition.y == 9) {
        alert("Cannot go outside canvas");
        return;
    }
    squarecontainer[characterPosition.x][characterPosition.y].square.color = "lightgrey";
    characterPosition.y += 1;
    heroImage = heroImageRight;
    topDrawCharacter();
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
winningSquare = { x: 0, y: 6 };
function topCheckWin() {
    if (characterPosition.x == winningSquare.x && characterPosition.y == winningSquare.y) {
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
    code = code.replaceAll('toggle', 'await toggle')
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