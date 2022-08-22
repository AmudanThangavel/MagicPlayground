debugFlag = window.location.href.split('#')[1] == "debug";
codeFlag = window.location.href.split('#')[1] == "code";
girlFlag = window.location.href.split('#')[1] == "girl";

imgURL = "/static/game/img/chapter6_3/";

var code_save

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
var execute = true;
var basket_conter = 0;
var noOfBaskets = 4;


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
grassImage.src = imgURL + "assets/background/green_grass.png";


var groundImage = new Image();
groundImage.onload = function () {
    groundImageReady = true;
}
groundImage.src = imgURL + "assets/background/green_ground.png";

var boundary1 = new Image();
boundary1.onload = function () {
    boundary1Ready = true;
}
boundary1.src = imgURL + "assets/background/boundary1.png";

var boundary2 = new Image();
boundary2.onload = function () {
    boundary2Ready = true;
}
boundary2.src = imgURL + "assets/background/boundary2.png";

var boundary3 = new Image();
boundary3.onload = function () {
    boundary3Ready = true;
}
boundary3.src = imgURL + "assets/background/boundary3.png";

var boundary4 = new Image();
boundary4.onload = function () {
    boundary4Ready = true;
}
boundary4.src = imgURL + "assets/background/boundary4.png";

var boundary5 = new Image();
boundary5.onload = function () {
    boundary5Ready = true;
}
boundary5.src = imgURL + "assets/background/boundary5.png";

var boundary6 = new Image();
boundary6.onload = function () {
    boundary6Ready = true;
}
boundary6.src = imgURL + "assets/background/boundary6.png";

var boundary7 = new Image();
boundary7.onload = function () {
    boundary7Ready = true;
}
boundary7.src = imgURL + "assets/background/boundary7.png";

var wooden_path = new Image();
wooden_path.onload = function () {
    wooden_pathReady = true;
}
wooden_path.src = imgURL + "assets/background/wooden_path.png";

var fruit_basket = new Image();
fruit_basket.onload = function () {
    fruit_basketReady = true;
}
fruit_basket.src = imgURL + "assets/background/fruit_basket.png";

var tree1 = new Image();
tree1.onload = function () {
    tree1Ready = true;
}
tree1.src = imgURL + "assets/background/tree1.png";

var tree2 = new Image();
tree2.onload = function () {
    tree2Ready = true;
}
tree2.src = imgURL + "assets/background/tree2.png";

var tree3 = new Image();
tree3.onload = function () {
    tree3hReady = true;
}
tree3.src = imgURL + "assets/background/tree3.png";

var tree4 = new Image();
tree4.onload = function () {
    tree4Ready = true;
}
tree4.src = imgURL + "assets/background/tree4.png";

var tree5 = new Image();
tree5.onload = function () {
    tree5Ready = true;
}
tree5.src = imgURL + "assets/background/tree5.png";

var tree6 = new Image();
tree6.onload = function () {
    tree6Ready = true;
}
tree6.src = imgURL + "assets/background/tree6.png";

var t1 = []
t1.push({ x: 3, y: 1 });
t1.push({ x: 6, y: 7 });

var t2 = []
t2.push({ x: 3, y: 2 });
t2.push({ x: 6, y: 8 });

var t3 = []
t3.push({ x: 4, y: 1 });
t3.push({ x: 7, y: 7 });

var t4 = []
t4.push({ x: 4, y: 2 });
t4.push({ x: 7, y: 8 });

var t5 = []
t5.push({ x: 5, y: 1 });
t5.push({ x: 8, y: 7 });

var t6 = []
t6.push({ x: 5, y: 2 });
t6.push({ x: 8, y: 8 });

bound1 = [];
bound1.push({ x: 0, y: 0 });

bound2 = [];
bound2.push({ x: 0, y: 1 });
bound2.push({ x: 0, y: 2 });
bound2.push({ x: 0, y: 3 });
bound2.push({ x: 0, y: 4 });
bound2.push({ x: 0, y: 5 });
bound2.push({ x: 0, y: 6 });
bound2.push({ x: 0, y: 7 });
bound2.push({ x: 0, y: 8 });
bound2.push({ x: 9, y: 1 });
bound2.push({ x: 9, y: 2 });
bound2.push({ x: 9, y: 3 });
bound2.push({ x: 9, y: 4 });
bound2.push({ x: 9, y: 5 });
bound2.push({ x: 9, y: 6 });
bound2.push({ x: 9, y: 7 });
bound2.push({ x: 9, y: 8 });

bound3 = [];
bound3.push({ x: 0, y: 9 });

bound4 = [];
bound4.push({ x: 1, y: 0 });
bound4.push({ x: 2, y: 0 });
bound4.push({ x: 3, y: 0 });
bound4.push({ x: 4, y: 0 });
bound4.push({ x: 5, y: 0 });
bound4.push({ x: 6, y: 0 });
bound4.push({ x: 7, y: 0 });
bound4.push({ x: 8, y: 0 });


bound5 = [];
bound5.push({ x: 1, y: 9 });
bound5.push({ x: 2, y: 9 });
bound5.push({ x: 3, y: 9 });
bound5.push({ x: 4, y: 9 });
bound5.push({ x: 5, y: 9 });
bound5.push({ x: 6, y: 9 });
bound5.push({ x: 7, y: 9 });
bound5.push({ x: 8, y: 9 });

bound6 = [];
bound6.push({ x: 9, y: 0 });

bound7 = [];
bound7.push({ x: 9, y: 9 });

path = [];
path.push({ x: 8, y: 4 });
path.push({ x: 7, y: 4 });
path.push({ x: 6, y: 4 });
path.push({ x: 3, y: 5 });
path.push({ x: 5, y: 5 });
path.push({ x: 4, y: 5 });
path.push({ x: 5, y: 4 });
path.push({ x: 3, y: 4 });
path.push({ x: 2, y: 4 });
path.push({ x: 1, y: 4 });
path.push({ x: 4, y: 6 });
path.push({ x: 2, y: 3 });
path.push({ x: 2, y: 5 });
path.push({ x: 2, y: 6 });
path.push({ x: 6, y: 3 });
path.push({ x: 1, y: 5 });

basket = [];
basket.push({ x: 6, y: 2 });
basket.push({ x: 4, y: 7 });
basket.push({ x: 2, y: 2 });
basket.push({ x: 2, y: 7 });


var correctSquares = [];
correctSquares.push({ x: 8, y: 4 });
correctSquares.push({ x: 7, y: 4 });
correctSquares.push({ x: 5, y: 4 });
correctSquares.push({ x: 6, y: 4 });
correctSquares.push({ x: 6, y: 3 });
//correctSquares.push({ x: 6, y: 2 });
correctSquares.push({ x: 5, y: 4 });
correctSquares.push({ x: 5, y: 5 });
correctSquares.push({ x: 4, y: 5 });
correctSquares.push({ x: 4, y: 6 });
//correctSquares.push({ x: 4, y: 7 });
correctSquares.push({ x: 3, y: 5 });
correctSquares.push({ x: 3, y: 4 });
correctSquares.push({ x: 2, y: 4 });
correctSquares.push({ x: 2, y: 5 });
correctSquares.push({ x: 2, y: 6 });
correctSquares.push({ x: 2, y: 3 });
correctSquares.push({ x: 1, y: 5 });
correctSquares.push({ x: 1, y: 4 });




backgroundContainer = [];
backgroundContainer.push({ image: boundary1, squares: bound1 });
backgroundContainer.push({ image: boundary2, squares: bound2 });
backgroundContainer.push({ image: boundary3, squares: bound3 });
backgroundContainer.push({ image: boundary4, squares: bound4 });
backgroundContainer.push({ image: boundary5, squares: bound5 });
backgroundContainer.push({ image: boundary6, squares: bound6 });
backgroundContainer.push({ image: boundary7, squares: bound7 });
backgroundContainer.push({ image: wooden_path, squares: path });
backgroundContainer.push({ image: fruit_basket, squares: basket });
backgroundContainer.push({ image: tree1, squares: t1 });
backgroundContainer.push({ image: tree2, squares: t2 });
backgroundContainer.push({ image: tree3, squares: t3 });
backgroundContainer.push({ image: tree4, squares: t4 });
backgroundContainer.push({ image: tree5, squares: t5 });
backgroundContainer.push({ image: tree6, squares: t6 });

if (codeFlag == true) {
    console.log("function leftPath(){\n moveLeft();\n collectBasket();\nmoveRight();}\nfunction rightPath(){\nmoveRight();\ncollectBasket();\nmoveLeft();  }\nfunction navigate(){\nmoveUp();\nmoveUp();\nleftPath();\nmoveUp();\nmoveRight();\nmoveUp();\nrightPath();\nmoveUp();\nmoveLeft();\nmoveUp();\nleftPath();\nmoveRight();\nrightPath();\nmoveUp();}\nnavigate();")
}


characterPosition = { x: 8, y: 4 };
//Function to draw character
function topDrawCharacter() {
    topCheckPath();
    contextTop.clearRect(0, 0, canvasTop.width, canvasTop.height);
    squarecontainer[characterPosition.x][characterPosition.y].square.image = heroImage;
    squarecontainer[characterPosition.x][characterPosition.y].square.draw();
}
groundContainer = [];
groundContainer.push({ image: groundImage, squares: basket });
//Function to draw ground as soon as the baskets are being collected
function drawground(j) {


    for (i = 0; i < groundContainer.length; i++) {

        squarecontainerBottom[groundContainer[i].squares[j].x][groundContainer[i].squares[j].y].square.image = groundContainer[i].image;
        squarecontainerBottom[groundContainer[i].squares[j].x][groundContainer[i].squares[j].y].square.draw();

    }
}
var count = -1;
//Function to collect basket    
function collectBasket() {
    count += 1;
    basket_conter += 1;
    if (count === 0) {
        fruit_basket.src = path.src;
        drawground(count);
    }
    else if (count === 1) {
        fruit_basket.src = path.src;
        drawground(count);

    }
    else if (count === 2) {
        fruit_basket.src = path.src;
        drawground(count);
    }
    else if (count === 3) {
        fruit_basket.src = path.src;
        drawground(count);
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

var winningSquare = [];
winningSquare.push({ x: 1, y: 5 });
winningSquare.push({ x: 1, y: 4 });
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
        alert("Game over :(\nYou went outside the designated path !");
        location.reload();
    }
    topCheckWin();
}
//Function to check whether character has reached final position
function topCheckWin() {
    for (var i = 0; i < winningSquare.length; i++) {
        if (characterPosition.x == winningSquare[i].x && characterPosition.y == winningSquare[i].y) {
            if (basket_conter === noOfBaskets) {
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
                alert("Collect all baskets");
                location.reload();
            }
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
    console.log(code);
    code = code.replace(new RegExp('move', 'g'), 'await move');
    code = code.replaceAll('collect', 'await collect');
    code = code.replaceAll('def', 'async def');
    code = code.replace('left_path', 'lefName');
    code = code.replace('right_path', 'rigName');
    code = code.replace('navigate()', 'naviName()');
    code = code.replaceAll('left_path()', 'await left_path()');
    code = code.replaceAll('right_path()', 'await right_path()');
    code = code.replaceAll('navigate()', 'await navigate()');
    code = code.replace('naviName()', 'navigate()');
    code = code.replace('lefName', 'left_path');
    code = code.replace('rigName', 'right_path');
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
    brython();
    topDrawGrid();
    bottomDrawGrid();
    bottomDrawBackground();
    bottomReDrawCanvas();
    topDrawCharacter();
}