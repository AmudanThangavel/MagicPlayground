debugFlag = window.location.href.split('#')[1] == "debug";
codeFlag = window.location.href.split('#')[1] == "code";
girlFlag = window.location.href.split('#')[1] == "girl";
// Editor ---------------------------------------------------------------------------

var code_save;

imgURL = "/static/game/img/chapter1_4/";

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


var groundImage = new Image();
groundImage.onload = function () {
    groundImageReady = true;
}
groundImage.src = imgURL + "assets/background/ground.jpg";
var bush = new Image();
bush.onload = function () {
    bush = true;
}
bush.src = imgURL + "assets/background/bush.jpg";
var h_bush = new Image();
h_bush.onload = function () {
    h_bush = true;
}
h_bush.src = imgURL + "assets/background/h_bush.png";
var r_bush = new Image();
r_bush.onload = function () {
    r_bush = true;
}
r_bush.src = imgURL + "assets/background/r_bush.png";
var l_bush = new Image();
l_bush.onload = function () {
    l_bush = true;
}
l_bush.src = imgURL + "assets/background/l_bush.png";
var i_bush = new Image();
i_bush.onload = function () {
    i_bush = true;
}
i_bush.src = imgURL + "assets/background/i_bush.png";

var h_bush_i = new Image();
h_bush_i.onload = function () {
    h_bush_i = true;
}
h_bush_i.src = imgURL + "assets/background/h_bush_i.png";
var fence = new Image();
fence.onload = function () {
    fence = true;
}
fence.src = imgURL + "assets/background/fence.png";
var fence_b = new Image();
fence_b.onload = function () {
    fence_b = true;
}
fence_b.src = imgURL + "assets/background/fence_b.png";
var fence_f = new Image();
fence_f.onload = function () {
    fence_f = true;
}
fence_f.src = imgURL + "assets/background/fence_f.png";
var dead = new Image();
dead.onload = function () {
    dead = true;
}
dead.src = imgURL + "assets/background/dead.png";
var dead_end = new Image();
dead_end.onload = function () {
    dead_end = true;
}
dead_end.src = imgURL + "assets/background/dead_end.png";

var tree = new Image();
tree.onload = function () {
    tree = true;
}
tree.src = imgURL + "assets/background/stone.png";
var pond_c = new Image();
pond_c.onload = function () {
    pond_c = true;
}
pond_c.src = imgURL + "assets/background/pond_c.png";
var pond_r = new Image();
pond_r.onload = function () {
    pond_r = true;
}
pond_r.src = imgURL + "assets/background/pond_r.png";
var pond_s = new Image();
pond_s.onload = function () {
    pond_s = true;
}
pond_s.src = imgURL + "assets/background/pond_s.png";
var pond_u = new Image();
pond_u.onload = function () {
    pond_u = true;
}
pond_u.src = imgURL + "assets/background/pond_u.png";
var treasure = new Image();
treasure.onload = function () {
    treasure = true;
}
treasure.src = imgURL + "assets/background/treasure.png";
var end = new Image();
end.onload = function () {
    end = true;
}
end.src = imgURL + "assets/background/end.png";
var boundary = [];

boundary.push({ x: 1, y: 0 });
boundary.push({ x: 4, y: 0 });
boundary.push({ x: 5, y: 0 });
boundary.push({ x: 6, y: 0 });
boundary.push({ x: 7, y: 0 });
boundary.push({ x: 4, y: 2 });
boundary.push({ x: 1, y: 9 });
boundary.push({ x: 2, y: 9 });
boundary.push({ x: 2, y: 2 });
boundary.push({ x: 3, y: 2 });
boundary.push({ x: 3, y: 9 });
boundary.push({ x: 4, y: 9 });
boundary.push({ x: 5, y: 9 });


var h_boundary = [];
h_boundary.push({ x: 5, y: 1 });
h_boundary.push({ x: 9, y: 2 });
h_boundary.push({ x: 9, y: 3 });
h_boundary.push({ x: 9, y: 4 });
h_boundary.push({ x: 9, y: 5 });
h_boundary.push({ x: 9, y: 6 });
h_boundary.push({ x: 9, y: 7 });
h_boundary.push({ x: 9, y: 8 });
h_boundary.push({ x: 0, y: 1 });
h_boundary.push({ x: 0, y: 2 });
h_boundary.push({ x: 0, y: 3 });
h_boundary.push({ x: 0, y: 4 });
h_boundary.push({ x: 0, y: 5 });
h_boundary.push({ x: 0, y: 6 });
h_boundary.push({ x: 0, y: 7 });
h_boundary.push({ x: 0, y: 8 });
h_boundary.push({ x: 2, y: 5 });
h_boundary.push({ x: 2, y: 6 });
h_boundary.push({ x: 2, y: 7 });
h_boundary.push({ x: 2, y: 8 });
h_boundary.push({ x: 8, y: 3 });
h_boundary.push({ x: 8, y: 4 });
h_boundary.push({ x: 8, y: 5 });
h_boundary.push({ x: 8, y: 6 });


var h_boundary_i = [];
h_boundary_i.push({ x: 0, y: 0 });
h_boundary_i.push({ x: 2, y: 4 });

var r_boundary = [];
r_boundary.push({ x: 0, y: 9 });


var i_boundary = [];
i_boundary.push({ x: 7, y: 0 });
i_boundary.push({ x: 2, y: 0 });
i_boundary.push({ x: 6, y: 9 });
i_boundary.push({ x: 5, y: 2 });


var f_boundary = [];
f_boundary.push({ x: 4, y: 4 });
f_boundary.push({ x: 4, y: 5 });
f_boundary.push({ x: 4, y: 6 });
f_boundary.push({ x: 6, y: 4 });
f_boundary.push({ x: 6, y: 5 });
f_boundary.push({ x: 6, y: 6 });
f_boundary.push({ x: 4, y: 3 });
f_boundary.push({ x: 4, y: 7 });
f_boundary.push({ x: 6, y: 3 });
f_boundary.push({ x: 6, y: 7 });


var b_fence = [];
b_fence.push({ x: 5, y: 3 });

var f_fence = [];
f_fence.push({ x: 5, y: 7 });

var center = [];
center.push({ x: 5, y: 5 });
center.push({ x: 1, y: 8 });

var corner = [];
corner.push({ x: 8, y: 7 });
corner.push({ x: 7, y: 1 });
corner.push({ x: 7, y: 9 });


var final = []
final.push({ x: 3, y: 0 });

var fake_final = []
fake_final.push({ x: 6, y: 1 });


var c_pond = [];
c_pond.push({ x: 9, y: 0 });

var s_pond = [];
s_pond.push({ x: 9, y: 1 });

var u_pond = [];
u_pond.push({ x: 8, y: 0 });

var r_pond = [];
r_pond.push({ x: 8, y: 1 });

var correctSquares = [];
correctSquares.push({ x: 9, y: 9 });
correctSquares.push({ x: 8, y: 9 });
correctSquares.push({ x: 8, y: 8 });
correctSquares.push({ x: 7, y: 8 });
correctSquares.push({ x: 6, y: 8 });
correctSquares.push({ x: 5, y: 8 });
correctSquares.push({ x: 4, y: 8 });
correctSquares.push({ x: 3, y: 8 });
correctSquares.push({ x: 3, y: 7 });
correctSquares.push({ x: 3, y: 6 });
correctSquares.push({ x: 3, y: 5 });
correctSquares.push({ x: 3, y: 4 });
correctSquares.push({ x: 3, y: 3 });
correctSquares.push({ x: 2, y: 3 });
correctSquares.push({ x: 1, y: 3 });
correctSquares.push({ x: 1, y: 2 });
correctSquares.push({ x: 1, y: 1 });
correctSquares.push({ x: 2, y: 1 });
correctSquares.push({ x: 3, y: 1 });
correctSquares.push({ x: 3, y: 0 });
correctSquares.push({ x: 7, y: 7 });
correctSquares.push({ x: 7, y: 6 });
correctSquares.push({ x: 7, y: 5 });
correctSquares.push({ x: 7, y: 4 });
correctSquares.push({ x: 7, y: 3 });
correctSquares.push({ x: 7, y: 2 });
correctSquares.push({ x: 6, y: 2 });


backgroundContainer = [];
backgroundContainer.push({ image: bush, squares: boundary });
backgroundContainer.push({ image: h_bush, squares: h_boundary });
backgroundContainer.push({ image: h_bush_i, squares: h_boundary_i });
backgroundContainer.push({ image: i_bush, squares: i_boundary });
backgroundContainer.push({ image: r_bush, squares: r_boundary });
backgroundContainer.push({ image: fence, squares: f_boundary });
backgroundContainer.push({ image: fence_b, squares: b_fence });
backgroundContainer.push({ image: fence_f, squares: f_fence });
backgroundContainer.push({ image: dead, squares: center });
backgroundContainer.push({ image: dead_end, squares: corner });
backgroundContainer.push({ image: pond_c, squares: c_pond });
backgroundContainer.push({ image: pond_s, squares: s_pond });
backgroundContainer.push({ image: pond_r, squares: r_pond });
backgroundContainer.push({ image: pond_u, squares: u_pond });
backgroundContainer.push({ image: treasure, squares: final });
backgroundContainer.push({ image: end, squares: fake_final });

if (codeFlag) {
    console.log("moveUp();\nmoveLeft();\nmoveUp();\nmoveUp();\nmoveUp();\nmoveUp();\nmoveUp();\nmoveLeft();\nmoveLeft();\nmoveLeft();\nmoveLeft();\nmoveLeft();\nmoveUp();\nmoveUp();\nmoveLeft();\nmoveLeft();\nmoveDown();\nmoveDown();\nmoveLeft();")
}


characterPosition = { x: 9, y: 9 };

//Function to draw character
function topDrawCharacter() {
    topCheckPath();
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
    squarecontainer[characterPosition.x][characterPosition.y].square.color = "lightgrey";
    characterPosition.y += 1;
    heroImage = heroImageRight;
    topDrawCharacter();
    await sleep(1000);
}


//Function to check whether character has reached final position
winningSquare = { x: 3, y: 0 }
function topCheckWin() {
    if (characterPosition.x == winningSquare.x && characterPosition.y == winningSquare.y) {
        contextTop.clearRect(0, 0, canvasTop.width, canvasTop.height);
        squarecontainer[characterPosition.x][characterPosition.y].square.image = heroImageWin;
        squarecontainer[characterPosition.x][characterPosition.y].square.draw();

        // tries api
        var tries = document.getElementById("tries").innerHTML;
        tries = parseInt(tries);
        tries += 1;
        saveCode(code, true, 0, tries);

        alert("Congratulation:)\nYou successfully completed this assignment !");
    }
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
        squarecontainer[characterPosition.x][characterPosition.y].square.color = heroImage;
        squarecontainer[characterPosition.x][characterPosition.y].square.draw();
        alert("Dead End!Check your code");
        location.reload();
    }
    topCheckWin();
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
    eval("(async ()=>{" + __BRYTHON__.python_to_js(str) + "})()");


}
window.onload = function () {
    topDrawGrid();
    bottomDrawGrid();
    bottomDrawBackground()
    topDrawCharacter();
    bottomReDrawCanvas();
    brython();
}

