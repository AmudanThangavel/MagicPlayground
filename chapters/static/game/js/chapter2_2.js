debugFlag = window.location.href.split('#')[1] == "debug";
codeFlag = window.location.href.split('#')[1] == "code";
girlFlag = window.location.href.split('#')[1] == "girl";

imgURL = "/static/game/img/chapter2_2/";

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

// boundry wall img ----------------------------------------------------

var bound1 = new Image();
bound1.onload = function () {
    bound1 = true;
}
bound1.src = imgURL + "assets/boundary14.png";

var bound2 = new Image();
bound2.onload = function () {
    bound2 = true;
}
bound2.src = imgURL + "assets/boundary2.png";

var bound3 = new Image();
bound3.onload = function () {
    bound3 = true;
}
bound3.src = imgURL + "assets/boundary3.png";

var bound4 = new Image();
bound4.onload = function () {
    bound4 = true;
}
bound4.src = imgURL + "assets/boundary15.png";

var bound5 = new Image();
bound5.onload = function () {
    bound5 = true;
}
bound5.src = imgURL + "assets/boundary6.png";

var bound6 = new Image();
bound6.onload = function () {
    bound6 = true;
}
bound6.src = imgURL + "assets/boundary7.png";

var bound7 = new Image();
bound7.onload = function () {
    bound7 = true;
}
bound7.src = imgURL + "assets/boundary8.png";

var bound8 = new Image();
bound8.onload = function () {
    bound8 = true;
}
bound8.src = imgURL + "assets/boundary9.png";

var bound9 = new Image();
bound9.onload = function () {
    bound9 = true;
}
bound9.src = imgURL + "assets/boundary10.png";

var bound10 = new Image();
bound10.onload = function () {
    bound10 = true;
}
bound10.src = imgURL + "assets/boundary13.png";

// wood path img -----------------------------------------------------------

var path = new Image();
path.onload = function () {
    bound9 = true;
}
path.src = imgURL + "assets/background/path.png";

// ground img

var groundImage = new Image();
groundImage.onload = function () {
    groundImageReady = true;
}
groundImage.src = imgURL + "assets/boundary12.png";

var holeL = new Image();
holeL.onload = function () {
    holeLImageReady = true;
}
holeL.src = imgURL + "assets/background/holeLadder.png";

var wellImg = new Image();
wellImg.onload = function () {
    wellImageReady = true;
}
wellImg.src = imgURL + "assets/background/well.png";

var bushImg = new Image();
bushImg.onload = function () {
    bushImageReady = true;
}
bushImg.src = imgURL + "assets/background/bush.png";

var bBoxImg = new Image();
bBoxImg.onload = function () {
    bBoxImageReady = true;
}
bBoxImg.src = imgURL + "assets/background/bBox.png";

var WboardImg = new Image();
WboardImg.onload = function () {
    WboardImageReady = true;
}
WboardImg.src = imgURL + "assets/background/Wboard.png";

var woodLImg = new Image();
woodLImg.onload = function () {
    woodLImageReady = true;
}
woodLImg.src = imgURL + "assets/background/woodL.png";

var woodRImg = new Image();
woodRImg.onload = function () {
    woodRImageReady = true;
}
woodRImg.src = imgURL + "assets/background/woodR.png";




var heroImage = heroImageRight;


var correctSquares = [];
correctSquares.push({ x: 8, y: 0 });
correctSquares.push({ x: 8, y: 1 });
correctSquares.push({ x: 8, y: 2 });
correctSquares.push({ x: 7, y: 2 });
correctSquares.push({ x: 6, y: 2 });
correctSquares.push({ x: 6, y: 3 });
correctSquares.push({ x: 6, y: 4 });
correctSquares.push({ x: 5, y: 4 });
correctSquares.push({ x: 4, y: 4 });
correctSquares.push({ x: 4, y: 5 });
correctSquares.push({ x: 4, y: 6 });
correctSquares.push({ x: 3, y: 6 });
correctSquares.push({ x: 2, y: 6 });
correctSquares.push({ x: 2, y: 7 });
correctSquares.push({ x: 2, y: 8 });
correctSquares.push({ x: 2, y: 9 });

winningSquare = { x: 2, y: 9 };


var roadSquares = [];
/// roadSquares.push({ x: 5, y: 0 });

var bridgeSquares = [];
// bridgeSquares.push({ x: 6, y: 1 });

var bridgeBottomSquares = [];
// bridgeBottomSquares.push({ x: 7, y: 1 });

var grassSquares = [];
// grassSquares.push({ x: 5, y: 5 });

var figureTopSquares = [];
// figureTopSquares.push({ x: 4, y: 3 });
// figureTopSquares.push({ x: 2, y: 5 });
// figureTopSquares.push({ x: 6, y: 1 });

var figureBottomSquares = [];
// figureBottomSquares.push({ x: 5, y: 3 });
// figureBottomSquares.push({ x: 3, y: 5 });
// figureBottomSquares.push({ x: 7, y: 1 });

var potSquares = [];
// potSquares.push({ x: 4, y: 8 });

var fenceSquares = [];
// fenceSquares.push({ x: 3, y: 8 });

var flowerSquares = [];
// flowerSquares.push({ x: 0, y: 4 });

var waterSquares = [];

var waterLeftEdgeSquares = [];
var waterRightEdgeSquares = [];

// wood way -------------------------------------------------------------

var way = []
way.push({ x: 8, y: 0 });
way.push({ x: 8, y: 1 });
way.push({ x: 8, y: 2 });
way.push({ x: 7, y: 2 });
way.push({ x: 6, y: 2 });
way.push({ x: 6, y: 3 });
way.push({ x: 6, y: 4 });
way.push({ x: 5, y: 4 });
way.push({ x: 4, y: 4 });
way.push({ x: 4, y: 5 });
way.push({ x: 4, y: 6 });
way.push({ x: 3, y: 6 });
way.push({ x: 2, y: 6 });
way.push({ x: 2, y: 7 });
way.push({ x: 2, y: 8 });
way.push({ x: 2, y: 9 });


var wellPath = [];
wellPath.push({ x: 8, y: 8 });

var bushPath = [];
bushPath.push({ x: 2, y: 2 });
bushPath.push({ x: 2, y: 3 });

var bBoxPath = [];
bBoxPath.push({ x: 3, y: 2 });
bBoxPath.push({ x: 7, y: 1 });

var WboardPath = [];
WboardPath.push({ x: 5, y: 3 });
WboardPath.push({ x: 3, y: 5 });

var woodLPath = [];
woodLPath.push({ x: 6, y: 6 });
woodLPath.push({ x: 7, y: 5 });

var woodRPath = [];
woodRPath.push({ x: 6, y: 7 });
woodRPath.push({ x: 7, y: 6 });

// Border wall -----------------------------------------------------------------

var boundary1 = []
boundary1.push({ x: 0, y: 0 });
var boundary2 = []
boundary2.push({ x: 0, y: 1 });
var boundary3 = []
boundary3.push({ x: 0, y: 2 });
boundary3.push({ x: 0, y: 3 });
boundary3.push({ x: 0, y: 4 });
boundary3.push({ x: 0, y: 5 });
boundary3.push({ x: 0, y: 6 });
boundary3.push({ x: 0, y: 7 });
boundary3.push({ x: 0, y: 8 });
var boundary4 = []
boundary4.push({ x: 0, y: 9 });
var boundary5 = []
boundary5.push({ x: 1, y: 0 });
boundary5.push({ x: 2, y: 0 });
boundary5.push({ x: 3, y: 0 });
boundary5.push({ x: 4, y: 0 });
boundary5.push({ x: 5, y: 0 });
boundary5.push({ x: 6, y: 0 });
boundary5.push({ x: 7, y: 0 });
// boundary5.push({ x: 8, y: 0 });
var boundary6 = []
boundary6.push({ x: 9, y: 0 });
var boundary7 = []
boundary7.push({ x: 9, y: 1 });
boundary7.push({ x: 9, y: 2 });
boundary7.push({ x: 9, y: 3 });
boundary7.push({ x: 9, y: 4 });
boundary7.push({ x: 9, y: 5 });
boundary7.push({ x: 9, y: 6 });
boundary7.push({ x: 9, y: 7 });
boundary7.push({ x: 9, y: 8 });
var boundary8 = []
boundary8.push({ x: 9, y: 9 });
var boundary9 = []
boundary9.push({ x: 1, y: 9 });
boundary9.push({ x: 2, y: 9 });
boundary9.push({ x: 3, y: 9 });
boundary9.push({ x: 4, y: 9 });
boundary9.push({ x: 5, y: 9 });
boundary9.push({ x: 6, y: 9 });
boundary9.push({ x: 7, y: 9 });
boundary9.push({ x: 8, y: 9 });
var boundary10 = []
//boundary10.push({x:0,y:0});
boundary10.push({ x: 0, y: 1 });
boundary10.push({ x: 0, y: 2 });
boundary10.push({ x: 0, y: 3 });
boundary10.push({ x: 0, y: 4 });
boundary10.push({ x: 0, y: 5 });
boundary10.push({ x: 0, y: 6 });
boundary10.push({ x: 0, y: 7 });
boundary10.push({ x: 0, y: 8 });

var holeLPose = [];
holeLPose.push({ x: 2, y: 9 });
holeLPose.push({ x: 2, y: 9 });

// end of Border wall --------------------------------------------------------


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
backgroundContainer.push({ image: bound1, squares: boundary1 });
backgroundContainer.push({ image: bound2, squares: boundary2 });
backgroundContainer.push({ image: bound3, squares: boundary3 });
backgroundContainer.push({ image: bound4, squares: boundary4 });
backgroundContainer.push({ image: bound5, squares: boundary5 });
backgroundContainer.push({ image: bound6, squares: boundary6 });
backgroundContainer.push({ image: bound7, squares: boundary7 });
backgroundContainer.push({ image: bound8, squares: boundary8 });
backgroundContainer.push({ image: bound9, squares: boundary9 });
backgroundContainer.push({ image: bound10, squares: boundary10 });
backgroundContainer.push({ image: path, squares: way });
backgroundContainer.push({ image: holeL, squares: holeLPose });
backgroundContainer.push({ image: wellImg, squares: wellPath });
backgroundContainer.push({ image: bushImg, squares: bushPath });
backgroundContainer.push({ image: bBoxImg, squares: bBoxPath });
backgroundContainer.push({ image: WboardImg, squares: WboardPath });
backgroundContainer.push({ image: woodLImg, squares: woodLPath });
backgroundContainer.push({ image: woodRImg, squares: woodRPath });

characterPosition = { x: 8, y: 0 };




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

function openholeL() {
    holeL.src = holeLO.src;
    bottomDrawBackground();
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
winningSquare = { x: 2, y: 9 };
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