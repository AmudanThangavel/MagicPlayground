debugFlag = window.location.href.split('#')[1] == "debug";
codeFlag = window.location.href.split('#')[1] == "code";
girlFlag = window.location.href.split('#')[1] == "girl";

imgURL = "/static/game/img/chapter2_4/";

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
heroImage.src = heroImageLeft.src;

var groundImage = new Image();
groundImage.onload = function () {
    groundImageReady = true;
}
groundImage.src = imgURL + "assets/background/ground.png";

var bound1 = new Image();
bound1.onload = function () {
    bound1Ready = true;
}
bound1.src = imgURL + "assets/background//bound1.png";

var bound2 = new Image();
bound2.onload = function () {
    bound2Ready = true;
}
bound2.src = imgURL + "assets/background//bound2.png";

var bound3 = new Image();
bound3.onload = function () {
    bound3Ready = true;
}
bound3.src = imgURL + "assets/background//bound3.png";

var path = new Image();
path.onload = function () {
    pathReady = true;
}
path.src = imgURL + "assets/background//path.png";

var clue = new Image();
clue.onload = function () {
    clueReady = true;
}
clue.src = imgURL + "assets/background//clue.png";

var clue_1 = new Image();
clue_1.onload = function () {
    clue_1Ready = true;
}
clue_1.src = imgURL + "assets/background//clue_1.png";

var treasure = new Image();
treasure.onload = function () {
    treasureReady = true;
}
treasure.src = imgURL + "assets/background//treasure.png";

var boundary1 = []
boundary1.push({ x: 0, y: 0 });
boundary1.push({ x: 0, y: 1 });
boundary1.push({ x: 0, y: 2 });
boundary1.push({ x: 0, y: 3 });
boundary1.push({ x: 0, y: 4 });
boundary1.push({ x: 0, y: 5 });
boundary1.push({ x: 0, y: 6 });
boundary1.push({ x: 0, y: 7 });
boundary1.push({ x: 0, y: 8 });
boundary1.push({ x: 0, y: 9 });
boundary1.push({ x: 9, y: 0 });
boundary1.push({ x: 9, y: 1 });
boundary1.push({ x: 9, y: 2 });
boundary1.push({ x: 9, y: 3 });
boundary1.push({ x: 9, y: 4 });
boundary1.push({ x: 9, y: 5 });
boundary1.push({ x: 9, y: 6 });
boundary1.push({ x: 9, y: 7 });
boundary1.push({ x: 9, y: 8 });
boundary1.push({ x: 9, y: 9 });
boundary1.push({ x: 4, y: 0 });
boundary1.push({ x: 4, y: 1 });
boundary1.push({ x: 4, y: 2 });
boundary1.push({ x: 4, y: 3 });
boundary1.push({ x: 4, y: 4 });
boundary1.push({ x: 4, y: 5 });
boundary1.push({ x: 4, y: 6 });
boundary1.push({ x: 4, y: 7 });
boundary1.push({ x: 4, y: 8 });
boundary1.push({ x: 4, y: 9 });
boundary1.push({ x: 5, y: 0 });
boundary1.push({ x: 5, y: 1 });
boundary1.push({ x: 5, y: 2 });
boundary1.push({ x: 5, y: 3 });
boundary1.push({ x: 5, y: 4 });
boundary1.push({ x: 5, y: 5 });
boundary1.push({ x: 5, y: 6 });
boundary1.push({ x: 5, y: 7 });
boundary1.push({ x: 5, y: 8 });
boundary1.push({ x: 5, y: 9 });



var boundary2 = []
boundary2.push({ x: 1, y: 0 });
boundary2.push({ x: 2, y: 0 });
boundary2.push({ x: 3, y: 0 });
//boundary2.push({x:4,y:1});
//boundary2.push({x:5,y:1});
boundary2.push({ x: 6, y: 0 });
boundary2.push({ x: 7, y: 0 });
boundary2.push({ x: 8, y: 0 });
boundary2.push({ x: 1, y: 5 });
boundary2.push({ x: 2, y: 5 });
boundary2.push({ x: 3, y: 5 });
boundary2.push({ x: 6, y: 5 });
boundary2.push({ x: 7, y: 5 });
boundary2.push({ x: 8, y: 5 });
//boundary2.push({x:3,y:5});

var boundary3 = []
boundary3.push({ x: 1, y: 9 });
boundary3.push({ x: 2, y: 9 });
boundary3.push({ x: 1, y: 4 });
boundary3.push({ x: 2, y: 4 });
boundary3.push({ x: 6, y: 4 });
boundary3.push({ x: 7, y: 4 });
boundary3.push({ x: 6, y: 9 });
boundary3.push({ x: 7, y: 9 });
//boundary3.push({x:8,y:8});


var way = []

way.push({ x: 3, y: 3 });
way.push({ x: 3, y: 2 });
way.push({ x: 2, y: 2 });
way.push({ x: 8, y: 9 });
way.push({ x: 8, y: 8 });
way.push({ x: 8, y: 7 });
way.push({ x: 7, y: 7 });
// way.push({x:3,y:4});
// way.push({x:3,y:9});
way.push({ x: 3, y: 8 });
way.push({ x: 3, y: 7 });
way.push({ x: 2, y: 7 });
// way.push({x:8,y:4});
way.push({ x: 8, y: 3 });
way.push({ x: 8, y: 2 });
way.push({ x: 7, y: 2 });

var ladder = []
ladder.push({ x: 3, y: 4 });
ladder.push({ x: 3, y: 9 });
ladder.push({ x: 8, y: 4 });

var hints = []
hints.push({ x: 7, y: 7 });
hints.push({ x: 2, y: 7 });
hints.push({ x: 7, y: 2 });


var dstn = []
dstn.push({ x: 2, y: 2 });


var correctSquares = [];
correctSquares.push({ x: 8, y: 9 });
correctSquares.push({ x: 8, y: 8 });
correctSquares.push({ x: 8, y: 7 });
correctSquares.push({ x: 7, y: 7 });
correctSquares.push({ x: 8, y: 4 });
correctSquares.push({ x: 8, y: 3 });
correctSquares.push({ x: 8, y: 2 });
correctSquares.push({ x: 7, y: 2 });
correctSquares.push({ x: 3, y: 9 });
correctSquares.push({ x: 3, y: 8 });
correctSquares.push({ x: 3, y: 7 });
correctSquares.push({ x: 2, y: 7 });
correctSquares.push({ x: 3, y: 4 });
correctSquares.push({ x: 3, y: 3 });
correctSquares.push({ x: 3, y: 2 });
correctSquares.push({ x: 2, y: 2 });

backgroundContainer = [];
backgroundContainer.push({ image: bound1, squares: boundary1 });
backgroundContainer.push({ image: bound2, squares: boundary2 });
backgroundContainer.push({ image: bound3, squares: boundary3 });
backgroundContainer.push({ image: path, squares: way });
backgroundContainer.push({ image: clue, squares: hints });
backgroundContainer.push({ image: clue_1, squares: ladder });
backgroundContainer.push({ image: treasure, squares: dstn });
if (codeFlag == true) {
    console.log("for(let i=0;i<4;i++){\n moveLeft();\nmoveLeft();\n moveUp();\n jump();}")
}
characterPosition = { x: 8, y: 9 };
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


//Function to jump character from one position to another
var count = 0;
async function jump() {
    heroImage.src = heroImageUp.src;
    count += 1;
    if (count === 1) {
        if (characterPosition = { x: 7, y: 7 }) {
            characterPosition = { x: 8, y: 4 };
            topDrawCharacter();
            await sleep(1000);
        }
        else {
            alert("Jump is not possible here")
        }
    }
    else if (count === 2) {
        if (characterPosition = { x: 7, y: 2 }) {
            characterPosition = { x: 3, y: 9 };
            topDrawCharacter();
            await sleep(1000);
        }
        else {
            alert("Jump is not possible here")
        }

    }
    else if (count === 3) {
        if (characterPosition = { x: 2, y: 7 }) {
            characterPosition = { x: 3, y: 4 };
            topDrawCharacter();
            await sleep(1000);
        }
        else {
            alert("Jump is not possible here")
        }

    }
}


//Function to check whether character has reached final position     
winningSquare = { x: 2, y: 2 }
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
//Function to check whether character is following the desired path
function topCheckPath() {
    flag = false;
    for (i = 0; i < correctSquares.length; i++) {
        if (characterPosition.x == correctSquares[i].x && characterPosition.y == correctSquares[i].y) {
            flag = true;
        }
    }
    if (flag == false) {
        //topError();
        contextTop.clearRect(0, 0, canvasTop.width, canvasTop.height);
        squarecontainer[characterPosition.x][characterPosition.y].square.image = heroImage;
        squarecontainer[characterPosition.x][characterPosition.y].square.draw();

        alert("Game over :(\nYou went outside the designated path !");
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
    code = code.replace(new RegExp('jump', 'g'), 'await jump');
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