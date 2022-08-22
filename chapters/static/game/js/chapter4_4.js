debugFlag = window.location.href.split('#')[1] == "debug";
codeFlag = window.location.href.split('#')[1] == "code";
girlFlag = window.location.href.split('#')[1] == "girl";

imgURL = "/static/game/img/chapter4_4/";

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

backgroundContainer = [];


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

var portal = new Image();
portal.onload = function () {
    portalImageReady = true;
}
portal.src = imgURL + "assets/background/portal.png";

var roadImage = new Image();
roadImage.onload = function () {
    roadImageReady = true;
}
roadImage.src = imgURL + "assets/background/road.png";

var groundImage = new Image();
groundImage.onload = function () {
    groundImageReady = true;
}
groundImage.src = imgURL + "assets/background/pond_center.png";

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

var notice = new Image();
notice.onload = function () {
    noticeReady = true;
}
notice.src = imgURL + "assets/background/notice.png";

var heroImage = heroImageDown;



var correctSquares = [];
correctSquares.push({ x: 7, y: 2 });
correctSquares.push({ x: 6, y: 2 });
correctSquares.push({ x: 6, y: 3 });
correctSquares.push({ x: 5, y: 3 });
correctSquares.push({ x: 5, y: 4 });
correctSquares.push({ x: 4, y: 4 });
correctSquares.push({ x: 4, y: 5 });
correctSquares.push({ x: 3, y: 5 });
correctSquares.push({ x: 3, y: 6 });
correctSquares.push({ x: 2, y: 6 });
correctSquares.push({ x: 2, y: 7 });


winningSquare = { x: 2, y: 7 };

var water_loc = [];
water_loc.push({ x: 1, y: 6 });
water_loc.push({ x: 1, y: 7 });
water_loc.push({ x: 7, y: 1 });
water_loc.push({ x: 6, y: 1 });
water_loc.push({ x: 2, y: 4 });
water_loc.push({ x: 2, y: 5 });
water_loc.push({ x: 3, y: 3 });
water_loc.push({ x: 3, y: 4 });
water_loc.push({ x: 4, y: 2 });
water_loc.push({ x: 4, y: 3 });
water_loc.push({ x: 3, y: 7 });
water_loc.push({ x: 4, y: 6 });
water_loc.push({ x: 4, y: 7 });
water_loc.push({ x: 5, y: 2 });
water_loc.push({ x: 5, y: 5 });
water_loc.push({ x: 5, y: 6 });
water_loc.push({ x: 5, y: 7 });
water_loc.push({ x: 6, y: 4 });
water_loc.push({ x: 6, y: 5 });
water_loc.push({ x: 6, y: 6 });
water_loc.push({ x: 7, y: 3 });
water_loc.push({ x: 7, y: 4 });
water_loc.push({ x: 7, y: 5 });

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}
let a = getRandomInt(4) + 3


var roadSquares = [];
roadSquares.push({ x: 7, y: 2 });
roadSquares.push({ x: 6, y: 2 });
roadSquares.push({ x: 6, y: 3 });
roadSquares.push({ x: 5, y: 3 });
roadSquares.push({ x: 5, y: 4 });
roadSquares.push({ x: 4, y: 4 });
roadSquares.push({ x: 4, y: 5 });
roadSquares.push({ x: 3, y: 5 });
roadSquares.push({ x: 3, y: 6 });
roadSquares.push({ x: 2, y: 6 });
roadSquares.push({ x: 2, y: 7 });

roadSquares.push({ x: 2, y: 2 });
roadSquares.push({ x: 2, y: 3 });
roadSquares.push({ x: 3, y: 2 });

roadSquares.push({ x: 6, y: 7 });
roadSquares.push({ x: 7, y: 7 });
roadSquares.push({ x: 7, y: 6 });


var bridgeSquares = [];
var bridgeBottomSquares = [];
var grassSquares = [];
var figureTopSquares = [];
// figureTopSquares.push({ x: 5, y: 6 });

var figureBottomSquares = [];

var potSquares = [];
potSquares.push({ x: 2, y: 7 });

var fenceSquares = [];

var flowerSquares = [];

var waterSquares = [];


var waterLeftEdgeSquares = [];
var waterRightEdgeSquares = [];

// pond -------------------------
var edgesImg = new Image();
edgesImg.onload = function () {
    edgesImgReady = true;
}
edgesImg.src = imgURL + "assets/background/green_ground.png";
var p1 = []
p1.push({ x: 0, y: 1 });
p1.push({ x: 0, y: 2 });
p1.push({ x: 0, y: 3 });
p1.push({ x: 0, y: 4 });
p1.push({ x: 0, y: 5 });
p1.push({ x: 0, y: 6 });
p1.push({ x: 0, y: 7 });
p1.push({ x: 0, y: 8 });
p1.push({ x: 0, y: 9 });
p1.push({ x: 0, y: 0 });

p1.push({ x: 9, y: 1 });
p1.push({ x: 9, y: 2 });
p1.push({ x: 9, y: 3 });
p1.push({ x: 9, y: 4 });
p1.push({ x: 9, y: 5 });
p1.push({ x: 9, y: 6 });
p1.push({ x: 9, y: 7 });
p1.push({ x: 9, y: 8 });
p1.push({ x: 9, y: 9 });
p1.push({ x: 9, y: 0 });

p1.push({ y: 0, x: 1 });
p1.push({ y: 0, x: 2 });
p1.push({ y: 0, x: 3 });
p1.push({ y: 0, x: 4 });
p1.push({ y: 0, x: 5 });
p1.push({ y: 0, x: 6 });
p1.push({ y: 0, x: 7 });
p1.push({ y: 0, x: 8 });
p1.push({ y: 0, x: 9 });
p1.push({ y: 0, x: 0 });

p1.push({ y: 9, x: 1 });
p1.push({ y: 9, x: 2 });
p1.push({ y: 9, x: 3 });
p1.push({ y: 9, x: 4 });
p1.push({ y: 9, x: 5 });
p1.push({ y: 9, x: 6 });
p1.push({ y: 9, x: 7 });
p1.push({ y: 9, x: 8 });
p1.push({ y: 9, x: 9 });
p1.push({ y: 9, x: 0 });
backgroundContainer.push({ image: edgesImg, squares: p1 });


var pond_top = new Image();
pond_top.onload = function () {
    pond_topReady = true;
}
pond_top.src = imgURL + "assets/background/pond_top.png";
var p2 = []
p2.push({ x: 1, y: 2 });
p2.push({ x: 1, y: 3 });
p2.push({ x: 1, y: 4 });
p2.push({ x: 1, y: 5 });
p2.push({ x: 1, y: 6 });
p2.push({ x: 1, y: 7 });
// p2.push({ x: 4, y: 5 });
// p2.push({ x: 4, y: 6 });
backgroundContainer.push({ image: pond_top, squares: p2 });


var pond_bottom = new Image();
pond_bottom.onload = function () {
    pond_bottomReady = true;
}
pond_bottom.src = imgURL + "assets/background/pond_bottom.png";
var p3 = []
p3.push({ x: 8, y: 2 });
p3.push({ x: 8, y: 3 });
p3.push({ x: 8, y: 4 });
p3.push({ x: 8, y: 5 });
p3.push({ x: 8, y: 6 });
p3.push({ x: 8, y: 7 });
backgroundContainer.push({ image: pond_bottom, squares: p3 });


var pond_left = new Image();
pond_left.onload = function () {
    pond_leftReady = true;
}
pond_left.src = imgURL + "assets/background/pond_left.png";
var p4 = []
p4.push({ y: 1, x: 2 });
p4.push({ y: 1, x: 3 });
p4.push({ y: 1, x: 4 });
p4.push({ y: 1, x: 5 });
p4.push({ y: 1, x: 6 });
p4.push({ y: 1, x: 7 });
backgroundContainer.push({ image: pond_left, squares: p4 });

var pond_right = new Image();
pond_right.onload = function () {
    pond_rightReady = true;
}
pond_right.src = imgURL + "assets/background/pond_right.png";
var p5 = []
p5.push({ y: 8, x: 2 });
p5.push({ y: 8, x: 3 });
p5.push({ y: 8, x: 4 });
p5.push({ y: 8, x: 5 });
p5.push({ y: 8, x: 6 });
p5.push({ y: 8, x: 7 });
backgroundContainer.push({ image: pond_right, squares: p5 });


var pond_tl = new Image();
pond_tl.onload = function () {
    pond_tlReady = true;
}
pond_tl.src = imgURL + "assets/background/pond_tl.png";
var corner = [];
corner.push({ x: 1, y: 1 });
backgroundContainer.push({ image: pond_tl, squares: corner });

var pond_tr = new Image();
pond_tr.onload = function () {
    pond_trReady = true;
}
pond_tr.src = imgURL + "assets/background/pond_tr.png";
var corner = [];
corner.push({ x: 1, y: 8 });
backgroundContainer.push({ image: pond_tr, squares: corner });

var pond_bl = new Image();
pond_bl.onload = function () {
    pond_blReady = true;
}
pond_bl.src = imgURL + "assets/background/pond_bl.png";
var corner = [];
corner.push({ x: 8, y: 1 });
backgroundContainer.push({ image: pond_bl, squares: corner });

var pond_br = new Image();
pond_br.onload = function () {
    pond_brReady = true;
}
pond_br.src = imgURL + "assets/background/pond_br.png";
var corner = [];
corner.push({ x: 8, y: 8 });
backgroundContainer.push({ image: pond_br, squares: corner });
// -------------------------------

backgroundContainer.push({ image: roadImage, squares: roadSquares });
backgroundContainer.push({ image: waterRightEdgeImage, squares: waterRightEdgeSquares });
backgroundContainer.push({ image: waterImage, squares: waterSquares });
backgroundContainer.push({ image: waterLeftEdgeImage, squares: waterLeftEdgeSquares });
backgroundContainer.push({ image: potImage, squares: potSquares });

characterPosition = { x: 7, y: 2 };

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}


//Function to draw character
function topDrawCharacter() {
    contextTop.clearRect(0, 0, canvasTop.width, canvasTop.height);
    squarecontainer[characterPosition.x][characterPosition.y].square.image = heroImage;
    squarecontainer[characterPosition.x][characterPosition.y].square.draw();
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
    topCheckPath();
}
//Function to teleport character
function teleport() {
    if (characterPosition.x == port[0].x && characterPosition.y == port[0].y) {
        characterPosition.y += 6;
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
    set_var();
    flag = false;
    console.log(characterPosition)

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





function set_var() {

    front_step_has_road = false;
    left_step_has_water = true
    right_step_has_water = false

    a = characterPosition.x;
    b = characterPosition.y;

    // ------- front_step_has_road ------
    a = a - 1;

    for (i = 0; i < roadSquares.length; i++) {
        if (a == roadSquares[i].x && b == roadSquares[i].y) {
            console.log(a, b)
            front_step_has_road = true;
        }
    }
    // ------- left_step_has_water ------
    a = characterPosition.x;
    b = characterPosition.y;
    b = characterPosition.y - 1;

    for (i = 0; i < roadSquares.length; i++) {
        if (a == roadSquares[i].x && b == roadSquares[i].y) {
            left_step_has_water = false;
        }
    }

    // ------- right_step_has_water -----
    a = characterPosition.x;
    b = characterPosition.y;
    b = characterPosition.y + 1;

    for (i = 0; i < roadSquares.length; i++) {
        if (a == roadSquares[i].x && b == roadSquares[i].y) {
            right_step_has_water = false;
        }
    }
}

window.onload = function () {
    set_var();
    topDrawGrid();
    bottomDrawGrid();
    bottomDrawBackground();
    bottomReDrawCanvas();
    topDrawCharacter();
    brython();

}