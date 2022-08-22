debugFlag = window.location.href.split('#')[1] == "debug";
codeFlag = window.location.href.split('#')[1] == "code";
girlFlag = window.location.href.split('#')[1] == "girl";

imgURL = "/static/game/img/chapter2_3/";

var code_save;

// Editor ---------------------------------------------------------------------------

var editor = ace.edit("editor");
editor.setTheme("ace/theme/monokai");
editor.session.setMode("ace/mode/python");
var Range = ace.require("ace/range").Range
editor.focus();
// Canvas ---------------------------------------------------------------------------
var canvasTop = document.getElementById("canvasTop");
var canvasBottom = document.getElementById("canvasBottom");
var contextTop = canvasTop.getContext("2d");
var contextBottom = canvasBottom.getContext("2d");
var r = -1;
var c = -1;
var squarecontainer = [];
var squarecontainerBottom = [];
noOfSwords = 4;
sword_counter = 0;

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
groundImage.src = imgURL + "assets/background/boundary12.png";

var bound1 = new Image();
bound1.onload = function () {
    bound1 = true;
}
bound1.src = imgURL + "assets/background/boundary14.png";

var bound2 = new Image();
bound2.onload = function () {
    bound2 = true;
}
bound2.src = imgURL + "assets/background/boundary2.png";

var bound3 = new Image();
bound3.onload = function () {
    bound3 = true;
}
bound3.src = imgURL + "assets/background/boundary3.png";

var bound4 = new Image();
bound4.onload = function () {
    bound4 = true;
}
bound4.src = imgURL + "assets/background/boundary15.png";

var bound5 = new Image();
bound5.onload = function () {
    bound5 = true;
}
bound5.src = imgURL + "assets/background/boundary6.png";

var bound6 = new Image();
bound6.onload = function () {
    bound6 = true;
}
bound6.src = imgURL + "assets/background/boundary7.png";

var bound7 = new Image();
bound7.onload = function () {
    bound7 = true;
}
bound7.src = imgURL + "assets/background/boundary8.png";

var bound8 = new Image();
bound8.onload = function () {
    bound8 = true;
}
bound8.src = imgURL + "assets/background/boundary9.png";

var bound9 = new Image();
bound9.onload = function () {
    bound9 = true;
}
bound9.src = imgURL + "assets/background/boundary10.png";

var bound10 = new Image();
bound10.onload = function () {
    bound10 = true;
}
bound10.src = imgURL + "assets/background/boundary13.png";

var path = new Image();
path.onload = function () {
    bound9 = true;
}
path.src = imgURL + "assets/background/path.png";

var loc1 = new Image();
loc1.onload = function () {
    loc1 = true;
}
loc1.src = imgURL + "assets/background/location11.png";

var loc2 = new Image();
loc2.onload = function () {
    loc2 = true;
}
loc2.src = imgURL + "assets/background/location22.png";

var loc3 = new Image();
loc3.onload = function () {
    loc3 = true;
}
loc3.src = imgURL + "assets/background/location33.png";

var loc4 = new Image();
loc4.onload = function () {
    loc4 = true;
}
loc4.src = imgURL + "assets/background/location44.png";
var plate = new Image();
plate.onload = function () {
    plate = true;
}
plate.src = imgURL + "assets/background/plate.png";

var loc5_5 = new Image();
// loc5.onload = function() {
//     loc5 = true;
// }
loc5_5.src = imgURL + "assets/background/dstn1.png";

var loc5 = new Image();
loc5.onload = function () {
    loc5 = true;
}
loc5.src = imgURL + "assets/background/dstn1_1.png";

var lower = new Image();
lower.onload = function () {
    lower = true;
}
lower.src = imgURL + "assets/background/lower.png";

var higher = new Image();
higher.onload = function () {
    higher = true;
}
higher.src = imgURL + "assets/background/higher.png";

var pond1 = new Image();
pond1.onload = function () {
    pond1 = true;
}
pond1.src = imgURL + "assets/background/pond1.png";

var pond2 = new Image();
pond2.onload = function () {
    pond2 = true;
}
pond2.src = imgURL + "assets/background/pond2.png";

var pond3 = new Image();
pond3.onload = function () {
    pond3 = true;
}
pond3.src = imgURL + "assets/background/pond3.png";

var pond4 = new Image();
pond4.onload = function () {
    pond4 = true;
}
pond4.src = imgURL + "assets/background/pond4.png";

var grass = new Image();
grass.onload = function () {
    grass = true;
}
grass.src = imgURL + "assets/background/grass.png";







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
boundary5.push({ x: 8, y: 0 });
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
//boundary10.push({x:0,y:9});
var way = []
way.push({ x: 7, y: 4 });
way.push({ x: 6, y: 4 });
way.push({ x: 6, y: 3 });
way.push({ x: 6, y: 2 });
way.push({ x: 5, y: 4 });
way.push({ x: 5, y: 5 });
way.push({ x: 5, y: 6 });
way.push({ x: 5, y: 7 });
way.push({ x: 4, y: 4 });
way.push({ x: 3, y: 4 });
way.push({ x: 3, y: 3 });
way.push({ x: 3, y: 2 });
way.push({ x: 2, y: 4 });
way.push({ x: 2, y: 5 });
way.push({ x: 2, y: 6 });
way.push({ x: 2, y: 7 });
var location1 = []
location1.push({ x: 6, y: 1 });
var location2 = []
location2.push({ x: 5, y: 8 });
var location3 = []
location3.push({ x: 3, y: 1 });
var location4 = []
location4.push({ x: 2, y: 8 });
var location4 = []
location4.push({ x: 2, y: 8 });

var platePath = []
platePath.push({ x: 6, y: 1 });
platePath.push({ x: 5, y: 8 });
platePath.push({ x: 3, y: 1 });
platePath.push({ x: 2, y: 8 });

var location5 = []
location5.push({ x: 1, y: 4 });

var low = []
low.push({ x: 2, y: 1 });
var high = []
high.push({ x: 1, y: 1 });
var p1 = []
p1.push({ x: 7, y: 7 });
var p2 = []
p2.push({ x: 7, y: 8 });
var p3 = []
p3.push({ x: 8, y: 7 });
var p4 = []
p4.push({ x: 8, y: 8 });
var grasses = []
grasses.push({ x: 8, y: 1 });
grasses.push({ x: 8, y: 2 });
grasses.push({ x: 8, y: 3 });
grasses.push({ x: 8, y: 4 });
grasses.push({ x: 8, y: 5 });
grasses.push({ x: 8, y: 6 });

var correctSquares = [];
correctSquares.push({ x: 8, y: 4 });
correctSquares.push({ x: 7, y: 4 });
correctSquares.push({ x: 6, y: 4 });
correctSquares.push({ x: 6, y: 3 });
correctSquares.push({ x: 6, y: 2 });
correctSquares.push({ x: 5, y: 4 });
correctSquares.push({ x: 5, y: 5 });
correctSquares.push({ x: 5, y: 6 });
correctSquares.push({ x: 5, y: 7 });
correctSquares.push({ x: 4, y: 4 });
correctSquares.push({ x: 3, y: 4 });
correctSquares.push({ x: 3, y: 3 });
correctSquares.push({ x: 3, y: 2 });
correctSquares.push({ x: 2, y: 4 });
correctSquares.push({ x: 2, y: 5 });
correctSquares.push({ x: 2, y: 6 });
correctSquares.push({ x: 2, y: 7 });
correctSquares.push({ x: 1, y: 4 });




backgroundContainer = [];
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
backgroundContainer.push({ image: loc5, squares: location5 });
backgroundContainer.push({ image: loc1, squares: location1 });
backgroundContainer.push({ image: loc2, squares: location2 });
backgroundContainer.push({ image: loc3, squares: location3 });
backgroundContainer.push({ image: loc4, squares: location4 });

backgroundContainer.push({ image: lower, squares: low });
backgroundContainer.push({ image: higher, squares: high });
backgroundContainer.push({ image: pond1, squares: p1 });
backgroundContainer.push({ image: pond2, squares: p2 });
backgroundContainer.push({ image: pond3, squares: p3 });
backgroundContainer.push({ image: pond4, squares: p4 });
backgroundContainer.push({ image: grass, squares: grasses });

plateContainer = [];
plateContainer.push({ image: plate, squares: platePath });




if (codeFlag) {
    console.log("for(let i=0;i<2;i++){\nmoveUp();\nmoveUp();\nmoveLeft();\nmoveLeft();\ncollectSword();\nmoveRight();\nmoveRight();\nmoveUp();\nmoveRight();\nmoveRight();\nmoveRight();\ncollectSword();\nmoveLeft();\nmoveLeft();\nmoveLeft();  }\ndepositSwords();\nmoveUp();")
}




characterPosition = { x: 8, y: 4 };
//Function to draw character
function topDrawCharacter() {

    contextTop.clearRect(0, 0, canvasTop.width, canvasTop.height);
    squarecontainer[characterPosition.x][characterPosition.y].square.image = heroImage;
    squarecontainer[characterPosition.x][characterPosition.y].square.draw();
    topCheckPath();

}
//Function to draw plate which contains Swords
function drawPlate(j) {
    for (i = 0; i < plateContainer.length; i++) {
        // console.log(backgroundContainer[i].squares);
        squarecontainerBottom[plateContainer[i].squares[j].x][plateContainer[i].squares[j].y].square.image = plateContainer[i].image;
        squarecontainerBottom[plateContainer[i].squares[j].x][plateContainer[i].squares[j].y].square.draw();
    }
}
//Function to draw box which contains all swords
function drawBox() {

    squarecontainerBottom[1][4].square.image = loc5_5;

    squarecontainerBottom[1][4].square.draw();
}
//Function to collect Swords
var count = -1;
async function collectSword() {
    console.log("collectSword");
    sword_counter += 1;
    count += 1;
    if (count === 0) {
        loc1.src = plate.src;
        drawPlate(0);

        //     //  bottomDrawBackground();

    }
    else if (count === 1) {
        loc2.src = plate.src;
        drawPlate(1);

        //bottomDrawBackground();

    }
    else if (count === 2) {
        loc3.src = plate.src;
        drawPlate(2);

        //     bottomDrawBackground();

    }
    else if (count === 3) {
        loc4.src = plate.src;
        drawPlate(3);

        // bottomDrawBackground();

    }

}
//Function to deposit all swords
async function depositSwords() {
    heroImage.src = heroImageUp.src;
    topDrawCharacter();
    loc5.src = loc5_5.src;
    drawBox();

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
winningSquare = { x: 1, y: 4 };
function topCheckWin() {
    if (characterPosition.x == winningSquare.x && characterPosition.y == winningSquare.y) {
        if (sword_counter === noOfSwords) {
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
            alert("Collect all the Swords!!!");
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
    code = code.replace(new RegExp('collect', 'g'), 'await collect');
    code = code.replace(new RegExp('deposit', 'g'), 'await deposit');
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
    bottomDrawBackground()
    topDrawCharacter();
    bottomReDrawCanvas();
    brython();

}
