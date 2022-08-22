debugFlag = window.location.href.split('#')[1] == "debug";
codeFlag = window.location.href.split('#')[1] == "code";
girlFlag = window.location.href.split('#')[1] == "girl";

imgURL = "/static/game/img/chapter1_5/";

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

backgroundContainer = [];

var heroImageUp = new Image();
var heroImageDown = new Image();
var heroImageLeft = new Image();
var heroImageRight = new Image();
var heroImageWin = new Image();

var count = 0;

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

var singleTree = new Image();
singleTree.onload = function () {
    singleTreeReady = true;
}
singleTree.src = imgURL + "assets/background/soloTree.png";


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

var potImage = new Image();
potImage.onload = function () {
    potImageReady = true;
}
potImage.src = imgURL + "assets/background/pot.png";

//pond------------------------------------------------
var pondlt = new Image();
pondlt.onload = function () {
    pondltReady = true;
}
pondlt.src = imgURL + "assets/background/pond_tl.png";
var ptl = [];
ptl.push({ x: 3, y: 2 });
ptl.push({ x: 2, y: 3 });
backgroundContainer.push({ image: pondlt, squares: ptl });

var pondrt = new Image();
pondrt.onload = function () {
    pondrtReady = true;
}
pondrt.src = imgURL + "assets/background/pond_tr.png";
var ptr = [];
ptr.push({ x: 2, y: 7 });
backgroundContainer.push({ image: pondrt, squares: ptr });

var pondlb = new Image();
pondlb.onload = function () {
    pondlbReady = true;
}
pondlb.src = imgURL + "assets/background/pond_bl.png";
var pbl = [];
pbl.push({ x: 7, y: 2 });
backgroundContainer.push({ image: pondlb, squares: pbl });

var pondrb = new Image();
pondrb.onload = function () {
    pondrbReady = true;
}
pondrb.src = imgURL + "assets/background/pond_br.png";
var pbr = [];
pbr.push({ x: 7, y: 5 });
pbr.push({ x: 3, y: 7 });
backgroundContainer.push({ image: pondrb, squares: pbr });

var pondl = new Image();
pondl.onload = function () {
    pondlReady = true;
}
pondl.src = imgURL + "assets/background/pond_left.png";
var pl = [];
pl.push({ x: 5, y: 2 });
pl.push({ x: 6, y: 2 });
pl.push({ x: 4, y: 2 });
backgroundContainer.push({ image: pondl, squares: pl });

var pondr = new Image();
pondr.onload = function () {
    pondrReady = true;
}
pondr.src = imgURL + "assets/background/pond_right.png";
var pr = [];
pr.push({ x: 5, y: 5 });
pr.push({ x: 4, y: 5 });
pr.push({ x: 6, y: 5 });
backgroundContainer.push({ image: pondr, squares: pr });

var pondt = new Image();
pondt.onload = function () {
    pondtReady = true;
}
pondt.src = imgURL + "assets/background/pond_top.png";
var pt = [];
pt.push({ x: 2, y: 6 });
pt.push({ x: 2, y: 4 });
pt.push({ x: 2, y: 5 });
backgroundContainer.push({ image: pondt, squares: pt });

var pondb = new Image();
pondb.onload = function () {
    pondbReady = true;
}
pondb.src = imgURL + "assets/background/pond_bottom.png";
var pb = [];
pb.push({ x: 7, y: 3 });
pb.push({ x: 3, y: 6 });
pb.push({ x: 7, y: 4 });
backgroundContainer.push({ image: pondb, squares: pb });

var pondm = new Image();
pondm.onload = function () {
    pondmReady = true;
}
pondm.src = imgURL + "assets/background/pond_center.png";
var p = [];
p.push({ x: 5, y: 3 });
p.push({ x: 6, y: 3 });
p.push({ x: 5, y: 4 });
p.push({ x: 6, y: 4 });
p.push({ x: 6, y: 4 });
p.push({ x: 4, y: 4 });
p.push({ x: 4, y: 3 });
p.push({ x: 3, y: 5 });
p.push({ x: 3, y: 3 });
p.push({ x: 3, y: 4 });
backgroundContainer.push({ image: pondm, squares: p });
//------------------------------------------------------

// tree -----------------------------------------------
var t1 = new Image();
t1.onload = function () {
    t1Ready = true;
}
t1.src = imgURL + "assets/background/tree1.png";
var tr1 = [];
tr1.push({ x: 5, y: 7 });
backgroundContainer.push({ image: t1, squares: tr1 });

var t2 = new Image();
t2.onload = function () {
    t2Ready = true;
}
t2.src = imgURL + "assets/background/tree2.png";
var tr2 = [];
tr2.push({ x: 5, y: 8 });
backgroundContainer.push({ image: t2, squares: tr2 });

var t3 = new Image();
t3.onload = function () {
    t3Ready = true;
}
t3.src = imgURL + "assets/background/tree3.png";
var tr3 = [];
tr3.push({ x: 6, y: 7 });
backgroundContainer.push({ image: t3, squares: tr3 });

var t4 = new Image();
t4.onload = function () {
    t4Ready = true;
}
t4.src = imgURL + "assets/background/tree4.png";
var tr4 = [];
tr4.push({ x: 6, y: 8 });
backgroundContainer.push({ image: t4, squares: tr4 });

var t5 = new Image();
t5.onload = function () {
    t5Ready = true;
}
t5.src = imgURL + "assets/background/tree5.png";
var tr5 = [];
tr5.push({ x: 7, y: 7 });
backgroundContainer.push({ image: t5, squares: tr5 });

var t6 = new Image();
t6.onload = function () {
    t6Ready = true;
}
t6.src = imgURL + "assets/background/tree6.png";
var tr6 = [];
tr6.push({ x: 7, y: 8 });
backgroundContainer.push({ image: t6, squares: tr6 });

//-----------------------------------------------------

// flowers -------------------------------------------
var flowerImage = new Image();
flowerImage.onload = function () {
    flowerImageReady = true;
}
flowerImage.src = imgURL + "assets/background/flowers.png";
// ----------------------------------------------------


var heroImage = heroImageDown;



var Tree = []
Tree.push({ x: 0, y: 0 });
Tree.push({ x: 0, y: 1 });
Tree.push({ x: 0, y: 2 });
Tree.push({ x: 0, y: 3 });
Tree.push({ x: 0, y: 4 });
Tree.push({ x: 0, y: 5 });
Tree.push({ x: 0, y: 6 });
Tree.push({ x: 0, y: 7 });
Tree.push({ x: 0, y: 8 });
Tree.push({ x: 0, y: 9 });
Tree.push({ x: 1, y: 1 })
Tree.push({ y: 0, x: 0 });
Tree.push({ y: 0, x: 1 });
Tree.push({ y: 0, x: 2 });
Tree.push({ y: 0, x: 3 });
Tree.push({ y: 0, x: 4 });
Tree.push({ y: 0, x: 5 });
Tree.push({ y: 0, x: 6 });
Tree.push({ y: 0, x: 7 });
Tree.push({ y: 0, x: 8 });
Tree.push({ x: 1, y: 9 });
Tree.push({ x: 2, y: 9 });
Tree.push({ x: 3, y: 9 });
Tree.push({ x: 4, y: 9 });
Tree.push({ x: 5, y: 9 });
Tree.push({ x: 6, y: 9 });
Tree.push({ x: 7, y: 9 });
Tree.push({ x: 8, y: 9 });
Tree.push({ x: 9, y: 9 });
Tree.push({ y: 0, x: 9 });
Tree.push({ y: 1, x: 9 });
Tree.push({ y: 2, x: 9 });
Tree.push({ y: 3, x: 9 });
Tree.push({ y: 4, x: 9 });
Tree.push({ y: 5, x: 9 });
Tree.push({ y: 6, x: 9 });
Tree.push({ y: 7, x: 9 });
Tree.push({ y: 8, x: 9 });
Tree.push({ y: 9, x: 9 });



var correctSquares = [];
correctSquares.push({ x: 8, y: 1 });
correctSquares.push({ x: 7, y: 1 });
correctSquares.push({ x: 6, y: 1 });
correctSquares.push({ x: 5, y: 1 });
correctSquares.push({ x: 4, y: 1 });
correctSquares.push({ x: 3, y: 1 });
correctSquares.push({ x: 2, y: 1 });
correctSquares.push({ x: 4, y: 1 });
correctSquares.push({ x: 4, y: 1 });
correctSquares.push({ x: 2, y: 2 });
correctSquares.push({ x: 1, y: 2 });
correctSquares.push({ x: 1, y: 3 });
correctSquares.push({ x: 1, y: 4 });
correctSquares.push({ x: 1, y: 5 });
correctSquares.push({ x: 1, y: 6 });
correctSquares.push({ x: 1, y: 6 });
correctSquares.push({ x: 1, y: 7 });
correctSquares.push({ x: 1, y: 8 });
correctSquares.push({ x: 2, y: 8 });
correctSquares.push({ x: 3, y: 8 });
correctSquares.push({ x: 4, y: 6 });
correctSquares.push({ x: 4, y: 7 });
correctSquares.push({ x: 5, y: 6 });
correctSquares.push({ x: 6, y: 6 });
correctSquares.push({ x: 7, y: 6 });
correctSquares.push({ x: 8, y: 2 });
correctSquares.push({ x: 8, y: 3 });
correctSquares.push({ x: 8, y: 4 });
correctSquares.push({ x: 8, y: 5 });
correctSquares.push({ x: 8, y: 6 });
correctSquares.push({ x: 4, y: 8 });


var roadSquares = [];
roadSquares.push({ x: 4, y: 8 });
roadSquares.push({ x: 8, y: 1 });
roadSquares.push({ x: 7, y: 1 });
roadSquares.push({ x: 6, y: 1 });
roadSquares.push({ x: 5, y: 1 });
roadSquares.push({ x: 4, y: 1 });
roadSquares.push({ x: 3, y: 1 });
roadSquares.push({ x: 2, y: 1 });
roadSquares.push({ x: 4, y: 1 });
roadSquares.push({ x: 4, y: 1 });
roadSquares.push({ x: 2, y: 2 });
roadSquares.push({ x: 1, y: 2 });
roadSquares.push({ x: 1, y: 3 });
roadSquares.push({ x: 1, y: 4 });
roadSquares.push({ x: 1, y: 5 });
roadSquares.push({ x: 1, y: 6 });
roadSquares.push({ x: 1, y: 6 });
roadSquares.push({ x: 1, y: 7 });
roadSquares.push({ x: 1, y: 8 });
roadSquares.push({ x: 2, y: 8 });
roadSquares.push({ x: 3, y: 8 });
roadSquares.push({ x: 4, y: 6 });
roadSquares.push({ x: 4, y: 7 });
roadSquares.push({ x: 5, y: 6 });
roadSquares.push({ x: 6, y: 6 });
roadSquares.push({ x: 7, y: 6 });
roadSquares.push({ x: 8, y: 2 });
roadSquares.push({ x: 8, y: 3 });
roadSquares.push({ x: 8, y: 4 });
roadSquares.push({ x: 8, y: 5 });
roadSquares.push({ x: 8, y: 6 });

var potSquares = [];
potSquares.push({ x: 4, y: 8 });

var fenceSquares = [];
fenceSquares.push({ x: 9, y: 0 });
fenceSquares.push({ x: 9, y: 5 });
fenceSquares.push({ x: 9, y: 6 });
fenceSquares.push({ x: 9, y: 7 });
fenceSquares.push({ x: 9, y: 8 });
fenceSquares.push({ x: 9, y: 3 });
fenceSquares.push({ x: 9, y: 4 });
fenceSquares.push({ x: 9, y: 0 });
fenceSquares.push({ x: 9, y: 9 });
fenceSquares.push({ x: 9, y: 6 });
fenceSquares.push({ x: 9, y: 7 });
fenceSquares.push({ x: 9, y: 8 });
fenceSquares.push({ x: 9, y: 1 });
fenceSquares.push({ x: 9, y: 2 });

fenceSquares.push({ x: 0, y: 0 });
fenceSquares.push({ x: 0, y: 5 });
fenceSquares.push({ x: 0, y: 6 });
fenceSquares.push({ x: 0, y: 7 });
fenceSquares.push({ x: 0, y: 8 });
fenceSquares.push({ x: 0, y: 3 });
fenceSquares.push({ x: 0, y: 4 });
fenceSquares.push({ x: 0, y: 0 });
fenceSquares.push({ x: 0, y: 9 });
fenceSquares.push({ x: 0, y: 6 });
fenceSquares.push({ x: 0, y: 7 });
fenceSquares.push({ x: 0, y: 8 });
fenceSquares.push({ x: 0, y: 1 });
fenceSquares.push({ x: 0, y: 2 });

backgroundContainer.push({ image: roadImage, squares: roadSquares });
backgroundContainer.push({ image: potImage, squares: potSquares });
backgroundContainer.push({ image: singleTree, squares: Tree });

characterPosition = { x: 6, y: 1 };


//Function to draw character
function topDrawCharacter() {
    contextTop.clearRect(0, 0, canvasTop.width, canvasTop.height);
    squarecontainer[characterPosition.x][characterPosition.y].square.image = heroImage;
    squarecontainer[characterPosition.x][characterPosition.y].square.draw();
    topCheckPath();
}

function test(fun) {
    console.log(fun);
    let promise = new Promise((resolve, reject) => {
        setTimeout(() => fun(), 1000)
    });
}

const moveForward = async () => {
    console.log(1);
    await sleep(1000);
    squarecontainer[characterPosition.x][characterPosition.y].square.color = "lightgrey";
    characterPosition.x -= 1;
    count++;
    heroImage = heroImageUp;
    topDrawCharacter();
}

//Function to move character upwards
async function moveUp() {
    let promise = new Promise((resolve, reject) => {
        setTimeout(() => resolve("done!"), 1000)
    });

    let result = promise.then(() => {
        squarecontainer[characterPosition.x][characterPosition.y].square.color = "lightgrey";
        characterPosition.x -= 1;
        count++;
        heroImage = heroImageUp;
        topDrawCharacter();
    });
    await new Promise(r => setTimeout(r, 1000));
}
//Function to move character downwards
function moveDown() {
    if (characterPosition.x == 9) {
        alert("Cannot go outside canvas");
        return;
    }
    squarecontainer[characterPosition.x][characterPosition.y].square.color = "lightgrey";
    characterPosition.x += 1;
    count++;
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
    count++;
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
    count++;
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
        count = count - 2;
        alert("Game over :(\nYou went outside the designated path !");
        location.reload();
    }
    topCheckWin();
}
//Function to check whether character has reached final position

winningSquare = { x: 4, y: 8 };
function topCheckWin() {
    if (characterPosition.x == winningSquare.x && characterPosition.y == winningSquare.y) {
        contextTop.clearRect(0, 0, canvasTop.width, canvasTop.height);
        squarecontainer[characterPosition.x][characterPosition.y].square.image = heroImageWin;
        squarecontainer[characterPosition.x][characterPosition.y].square.draw();
        if (count === 13) {
            // tries api
            var tries = document.getElementById("tries").innerHTML;
            tries = parseInt(tries);
            tries += 1;
            saveCode(code_save, true, 0, tries);
            alert("Congratulation:)\nYou successfully reached the destination in 13 steps !");
            return;
        }
        alert("a to reach the destination in 13 steps!");
        location.reload();
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
        str += "\t" + element + "\n" + "\t" + "\n"
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