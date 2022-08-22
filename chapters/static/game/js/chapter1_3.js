debugFlag = window.location.href.split('#')[1] == "debug";
codeFlag = window.location.href.split('#')[1] == "code";
girlFlag = window.location.href.split('#')[1] == "girl";
// Editor ---------------------------------------------------------------------------

var code_save;

imgURL = "/static/game/img/chapter1_3/";

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

var leverOffImage = new Image();
leverOffImage.onload = function () {
    leverOffImageReady = true;
}
leverOffImage.src = imgURL + "assets/background/leverOff.png";

var leverOnImage = new Image();
leverOnImage.onload = function () {
    leverOnImageReady = true;
}
leverOnImage.src = imgURL + "assets/background/leverOn.png";

var heroImage = heroImageUp;


var correctSquares = [];
correctSquares.push({ x: 9, y: 5 });
correctSquares.push({ x: 8, y: 5 });
correctSquares.push({ x: 7, y: 5 });
correctSquares.push({ x: 6, y: 5 });
correctSquares.push({ x: 6, y: 4 });
// correctSquares.push({ x: 5, y: 5 });
// correctSquares.push({ x: 4, y: 5 });
// correctSquares.push({ x: 3, y: 5 });
// correctSquares.push({ x: 2, y: 5 });
// correctSquares.push({ x: 1, y: 5 });
// correctSquares.push({ x: 0, y: 5 });





var roadSquares = [];
roadSquares.push({ x: 9, y: 5 });
roadSquares.push({ x: 8, y: 5 });
roadSquares.push({ x: 7, y: 5 });
roadSquares.push({ x: 6, y: 5 });
// roadSquares.push({ x: 6, y: 4 });
roadSquares.push({ x: 2, y: 5 });
roadSquares.push({ x: 1, y: 5 });
roadSquares.push({ x: 0, y: 5 });


var bridgeSquares = [];

var bridgeBottomSquares = [];
// bridgeBottomSquares.push({ x: 7, y: 1 });
// bridgeBottomSquares.push({ x: 7, y: 2 });
// bridgeBottomSquares.push({ x: 7, y: 3 });

var grassSquares = [];
grassSquares.push({ x: 7, y: 0 });
grassSquares.push({ x: 8, y: 1 });
grassSquares.push({ x: 9, y: 2 });
grassSquares.push({ x: 7, y: 3 });
grassSquares.push({ x: 7, y: 6 });
grassSquares.push({ x: 9, y: 7 });
grassSquares.push({ x: 7, y: 9 });
grassSquares.push({ x: 0, y: 1 });

var figureTopSquares = [];
figureTopSquares.push({ x: 0, y: 6 });

var figureBottomSquares = [];
figureBottomSquares.push({ x: 1, y: 6 });

var potSquares = [];
potSquares.push({ x: 0, y: 5 });

var fenceSquares = [];
fenceSquares.push({ x: 2, y: 0 });
fenceSquares.push({ x: 2, y: 1 });
fenceSquares.push({ x: 2, y: 2 });
fenceSquares.push({ x: 2, y: 3 });
fenceSquares.push({ x: 2, y: 4 });
fenceSquares.push({ x: 2, y: 6 });
fenceSquares.push({ x: 2, y: 7 });
fenceSquares.push({ x: 2, y: 8 });
fenceSquares.push({ x: 2, y: 9 });

// x = 6

fenceSquares.push({ x: 6, y: 0 });
fenceSquares.push({ x: 6, y: 1 });
fenceSquares.push({ x: 6, y: 2 });
fenceSquares.push({ x: 6, y: 3 });
// fenceSquares.push({ x: 6, y: 4 });
fenceSquares.push({ x: 6, y: 6 });
fenceSquares.push({ x: 6, y: 7 });
fenceSquares.push({ x: 6, y: 8 });
fenceSquares.push({ x: 6, y: 9 });





var flowerSquares = [];
flowerSquares.push({ x: 7, y: 2 });
flowerSquares.push({ x: 8, y: 3 });
flowerSquares.push({ x: 1, y: 4 });
flowerSquares.push({ x: 0, y: 2 });
// flowerSquares.push({ x: 0, y: 1 });

var waterSquares = [];
waterSquares.push({ x: 4, y: 0 });
waterSquares.push({ x: 4, y: 1 });
waterSquares.push({ x: 4, y: 2 });
waterSquares.push({ x: 4, y: 3 });
waterSquares.push({ x: 4, y: 4 });
waterSquares.push({ x: 4, y: 5 });
waterSquares.push({ x: 4, y: 6 });
waterSquares.push({ x: 4, y: 7 });
waterSquares.push({ x: 4, y: 8 });
waterSquares.push({ x: 4, y: 9 });

var waterLeftEdgeSquares = [];
waterLeftEdgeSquares.push({ x: 5, y: 0 });
waterLeftEdgeSquares.push({ x: 5, y: 1 });
waterLeftEdgeSquares.push({ x: 5, y: 2 });
waterLeftEdgeSquares.push({ x: 5, y: 3 });
waterLeftEdgeSquares.push({ x: 5, y: 4 });
waterLeftEdgeSquares.push({ x: 5, y: 5 });
waterLeftEdgeSquares.push({ x: 5, y: 6 });
waterLeftEdgeSquares.push({ x: 5, y: 7 });
waterLeftEdgeSquares.push({ x: 5, y: 8 });
waterLeftEdgeSquares.push({ x: 5, y: 9 });

var waterRightEdgeSquares = [];
waterRightEdgeSquares.push({ x: 3, y: 0 });
waterRightEdgeSquares.push({ x: 3, y: 1 });
waterRightEdgeSquares.push({ x: 3, y: 2 });
waterRightEdgeSquares.push({ x: 3, y: 3 });
waterRightEdgeSquares.push({ x: 3, y: 4 });
waterRightEdgeSquares.push({ x: 3, y: 5 });
waterRightEdgeSquares.push({ x: 3, y: 6 });
waterRightEdgeSquares.push({ x: 3, y: 7 });
waterRightEdgeSquares.push({ x: 3, y: 8 });
waterRightEdgeSquares.push({ x: 3, y: 9 });

var leverOffSquares = [];
leverOffSquares.push({ x: 6, y: 4 });

var leverOnSquares = [];

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
backgroundContainer.push({ image: leverOffImage, squares: leverOffSquares });
backgroundContainer.push({ image: leverOnImage, squares: leverOnSquares });
backgroundContainer.push({ image: bridgeImage, squares: bridgeSquares });


characterPosition = { x: 9, y: 5 };

//Function to draw character
function topDrawCharacter() {
    contextTop.clearRect(0, 0, canvasTop.width, canvasTop.height);
    squarecontainer[characterPosition.x][characterPosition.y].square.image = heroImage;
    squarecontainer[characterPosition.x][characterPosition.y].square.draw();
    topCheckPath();
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
}
// Function to toggle the switch
function toggleSwitch() {

    leverOnSquares.push({ x: 6, y: 4 });
    bridgeSquares.push({ x: 5, y: 5 });
    bridgeSquares.push({ x: 4, y: 5 });
    bridgeSquares.push({ x: 3, y: 5 });
    bottomDrawBackground();
    correctSquares.push({ x: 5, y: 5 });
    correctSquares.push({ x: 4, y: 5 });
    correctSquares.push({ x: 3, y: 5 });
    correctSquares.push({ x: 2, y: 5 });
    correctSquares.push({ x: 1, y: 5 });
    correctSquares.push({ x: 0, y: 5 });



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

        // tries api
        var tries = document.getElementById("tries").innerHTML;
        tries = parseInt(tries);
        tries += 1;
        saveCode(code, true, 0, tries);

        alert("Game over :(\nYou went outside the designated path !");
        location.reload();
    }
    topCheckWin();
}

//Function to check whether character has reached final position
winningSquare = { x: 0, y: 5 };
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





document.getElementById('run').onclick = async function () {

    code = editor.getSession().getValue();

    code_save = code;
    // Tries api
    var tries = document.getElementById("tries").innerHTML;
    tries = parseInt(tries);
    tries += 1;
    saveCode(code_save, false, 0, tries);

    code = code.replace(new RegExp('move', 'g'), 'await move');
    code = code.replace(new RegExp('toggle', 'g'), 'await toggle');

    code_splits = code.split("\n");
    var str = "async def main(): \n";
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