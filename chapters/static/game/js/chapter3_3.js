debugFlag = window.location.href.split('#')[1] == "debug";
codeFlag = window.location.href.split('#')[1] == "code";
girlFlag = window.location.href.split('#')[1] == "girl";

imgURL = "/static/game/img/chapter3_3/";

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

var front_step_has_road = true;
var left_step_has_road = false;
var right_step_has_road = false;

backgroundContainer = [];

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

var notice = new Image();
notice.onload = function () {
    noticeReady = true;
}
notice.src = imgURL + "assets/background/notice.png";

var heroImage = heroImageDown;



var correctSquares = [];
correctSquares.push({ x: 7, y: 5 });
correctSquares.push({ x: 7, y: 4 });
correctSquares.push({ x: 7, y: 3 });
correctSquares.push({ x: 6, y: 5 });
correctSquares.push({ x: 5, y: 5 });
correctSquares.push({ x: 4, y: 5 });
correctSquares.push({ x: 4, y: 4 });
correctSquares.push({ x: 3, y: 4 });
correctSquares.push({ x: 2, y: 4 });
correctSquares.push({ x: 7, y: 2 });
correctSquares.push({ x: 2, y: 7 });
correctSquares.push({ x: 2, y: 5 });
correctSquares.push({ x: 2, y: 6 });



var water_loc = [];

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}
let a = getRandomInt(4) + 3

var roadSquares = [];
roadSquares.push({ x: 7, y: 5 });
roadSquares.push({ x: 7, y: 4 });
roadSquares.push({ x: 7, y: 3 });
roadSquares.push({ x: 6, y: 5 });
roadSquares.push({ x: 5, y: 5 });
roadSquares.push({ x: 4, y: 5 });
roadSquares.push({ x: 4, y: 4 });
roadSquares.push({ x: 3, y: 4 });
roadSquares.push({ x: 2, y: 4 });
roadSquares.push({ x: 7, y: 2 });
roadSquares.push({ x: 2, y: 5 });
roadSquares.push({ x: 2, y: 6 });
roadSquares.push({ x: 2, y: 7 });


var bridgeSquares = [];
var bridgeBottomSquares = [];

var grassSquares = [];
grassSquares.push({ x: 5, y: 3 });
grassSquares.push({ x: 5, y: 2 });
grassSquares.push({ x: 6, y: 2 });
grassSquares.push({ x: 6, y: 3 });
grassSquares.push({ x: 5, y: 4 });
grassSquares.push({ x: 6, y: 4 });
grassSquares.push({ x: 3, y: 5 });
grassSquares.push({ x: 3, y: 6 });
grassSquares.push({ x: 4, y: 6 });
grassSquares.push({ x: 3, y: 7 });
grassSquares.push({ x: 4, y: 7 });
backgroundContainer.push({ image: grassImage, squares: grassSquares });

var figureTopSquares = [];
// figureTopSquares.push({ x: 5, y: 6 });

var figureBottomSquares = [];

var potSquares = [];
potSquares.push({ x: 2, y: 7 });


//pond------------------------------------------------
var pondlt = new Image();
pondlt.onload = function () {
    pondltReady = true;
}
pondlt.src = imgURL + "assets/background/pond_tl.png";
var ptl = [];

backgroundContainer.push({ image: pondlt, squares: ptl });

var pondrt = new Image();
pondrt.onload = function () {
    pondrtReady = true;
}
pondrt.src = imgURL + "assets/background/pond_tr.png";
var ptr = [];

backgroundContainer.push({ image: pondrt, squares: ptr });

var pondlb = new Image();
pondlb.onload = function () {
    pondlbReady = true;
}
pondlb.src = imgURL + "assets/background/pond_bl.png";
var pbl = [];

backgroundContainer.push({ image: pondlb, squares: pbl });

var pondrb = new Image();
pondrb.onload = function () {
    pondrbReady = true;
}
pondrb.src = imgURL + "assets/background/pond_br.png";
var pbr = [];

backgroundContainer.push({ image: pondrb, squares: pbr });

var pondl = new Image();
pondl.onload = function () {
    pondlReady = true;
}
pondl.src = imgURL + "assets/background/pond_left.png";
var pl = [];
pl.push({ y: 9, x: 1 });
pl.push({ y: 9, x: 2 });
pl.push({ y: 9, x: 3 });
pl.push({ y: 9, x: 4 });
pl.push({ y: 9, x: 5 });
pl.push({ y: 9, x: 6 });
pl.push({ y: 9, x: 7 });
pl.push({ y: 9, x: 8 });
pl.push({ y: 9, x: 9 });
backgroundContainer.push({ image: pondl, squares: pl });

var pondr = new Image();
pondr.onload = function () {
    pondrReady = true;
}
pondr.src = imgURL + "assets/background/pond_right.png";
var pr = [];
pr.push({ y: 0, x: 1 });
pr.push({ y: 0, x: 2 });
pr.push({ y: 0, x: 3 });
pr.push({ y: 0, x: 4 });
pr.push({ y: 0, x: 5 });
pr.push({ y: 0, x: 6 });
pr.push({ y: 0, x: 7 });
pr.push({ y: 0, x: 8 });
pr.push({ y: 0, x: 9 });
backgroundContainer.push({ image: pondr, squares: pr });

var pondt = new Image();
pondt.onload = function () {
    pondtReady = true;
}
pondt.src = imgURL + "assets/background/pond_top.png";
var pt = [];
pt.push({ x: 9, y: 1 });
pt.push({ x: 9, y: 2 });
pt.push({ x: 9, y: 3 });
pt.push({ x: 9, y: 4 });
pt.push({ x: 9, y: 5 });
pt.push({ x: 9, y: 6 });
pt.push({ x: 9, y: 7 });
pt.push({ x: 9, y: 8 });
pt.push({ x: 9, y: 9 });
backgroundContainer.push({ image: pondt, squares: pt });

var pondb = new Image();
pondb.onload = function () {
    pondbReady = true;
}
pondb.src = imgURL + "assets/background/pond_bottom.png";
var pb = [];
pb.push({ x: 0, y: 1 });
pb.push({ x: 0, y: 2 });
pb.push({ x: 0, y: 3 });
pb.push({ x: 0, y: 4 });
pb.push({ x: 0, y: 5 });
pb.push({ x: 0, y: 6 });
pb.push({ x: 0, y: 7 });
pb.push({ x: 0, y: 8 });
pb.push({ x: 0, y: 9 });

backgroundContainer.push({ image: pondb, squares: pb });

var pondm = new Image();
pondm.onload = function () {
    pondmReady = true;
}
pondm.src = imgURL + "assets/background/pond_center.png";
var p = [];
p.push({ x: 0, y: 0 });
p.push({ x: 9, y: 0 });
p.push({ x: 9, y: 9 });
p.push({ x: 0, y: 9 });
backgroundContainer.push({ image: pondm, squares: p });
//------------------------------------------------------


var fenceSquares = [];

var flowerSquares = [];

var waterSquares = [];


// tree -----------------------------------------------
var t1 = new Image();
t1.onload = function () {
    t1Ready = true;
}
t1.src = imgURL + "assets/background/tree1.png";
var tr1 = [];
tr1.push({ x: 5, y: 6 });
tr1.push({ x: 2, y: 2 });
backgroundContainer.push({ image: t1, squares: tr1 });

var t2 = new Image();
t2.onload = function () {
    t2Ready = true;
}
t2.src = imgURL + "assets/background/tree2.png";
var tr2 = [];
tr2.push({ x: 5, y: 7 });
tr2.push({ x: 2, y: 3 });
backgroundContainer.push({ image: t2, squares: tr2 });

var t3 = new Image();
t3.onload = function () {
    t3Ready = true;
}
t3.src = imgURL + "assets/background/tree3.png";
var tr3 = [];
tr3.push({ x: 6, y: 6 });
tr3.push({ x: 3, y: 2 });
backgroundContainer.push({ image: t3, squares: tr3 });

var t4 = new Image();
t4.onload = function () {
    t4Ready = true;
}
t4.src = imgURL + "assets/background/tree4.png";
var tr4 = [];
tr4.push({ x: 6, y: 7 });
tr4.push({ x: 3, y: 3 });
backgroundContainer.push({ image: t4, squares: tr4 });

var t5 = new Image();
t5.onload = function () {
    t5Ready = true;
}
t5.src = imgURL + "assets/background/tree5.png";
var tr5 = [];
tr5.push({ x: 7, y: 6 });
tr5.push({ x: 4, y: 2 });
backgroundContainer.push({ image: t5, squares: tr5 });

var t6 = new Image();
t6.onload = function () {
    t6Ready = true;
}
t6.src = imgURL + "assets/background/tree6.png";
var tr6 = [];
tr6.push({ x: 7, y: 7 });
tr6.push({ x: 4, y: 3 });
backgroundContainer.push({ image: t6, squares: tr6 });

//-----------------------------------------------------


var waterLeftEdgeSquares = [];
var waterRightEdgeSquares = [];
// -------------------------------

backgroundContainer.push({ image: roadImage, squares: roadSquares });
backgroundContainer.push({ image: waterRightEdgeImage, squares: waterRightEdgeSquares });
backgroundContainer.push({ image: waterImage, squares: waterSquares });
backgroundContainer.push({ image: waterLeftEdgeImage, squares: waterLeftEdgeSquares });
backgroundContainer.push({ image: potImage, squares: potSquares });

characterPosition = { x: 7, y: 2 };

//Function to draw character
function topDrawCharacter() {
    contextTop.clearRect(0, 0, canvasTop.width, canvasTop.height);
    squarecontainer[characterPosition.x][characterPosition.y].square.image = heroImage;
    squarecontainer[characterPosition.x][characterPosition.y].square.draw();
    topCheckPath();
}


function set_var() {

    front_step_has_road = false;
    left_step_has_road = false;
    right_step_has_road = false;

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
    // ------- left_step_has_road ------
    a = characterPosition.x;
    b = characterPosition.y;
    b = characterPosition.y - 1;

    for (i = 0; i < roadSquares.length; i++) {
        if (a == roadSquares[i].x && b == roadSquares[i].y) {
            left_step_has_road = true;
        }
    }

    // ------- right_step_has_road -----
    a = characterPosition.x;
    b = characterPosition.y;
    b = characterPosition.y + 1;

    for (i = 0; i < roadSquares.length; i++) {
        if (a == roadSquares[i].x && b == roadSquares[i].y) {
            right_step_has_road = true;
        }
    }
}
//Function to move character upwards
async function moveUp() {
    if (characterPosition.x == 0) {
        alert("Cannot go outside canvas");
        return;
    }
    set_var();
    squarecontainer[characterPosition.x][characterPosition.y].square.color = "lightgrey";
    characterPosition.x -= 1;
    heroImage = heroImageUp;
    topDrawCharacter();
    await sleep(1000);
    topCheckPath();
}
//Function to teleport character
function teleport() {
    set_var();
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
    set_var();
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
    set_var();
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
    set_var();
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
winningSquare = { x: 2, y: 7 };
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
    set_var();
    topDrawGrid();
    bottomDrawGrid();
    bottomDrawBackground();
    bottomReDrawCanvas();
    topDrawCharacter();
    brython();
}