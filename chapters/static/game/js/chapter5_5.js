debugFlag = window.location.href.split('#')[1] == "debug";
codeFlag = window.location.href.split('#')[1] == "code";
girlFlag = window.location.href.split('#')[1] == "girl";

imgURL = "/static/game/img/chapter5_5/";

var code_save

// Editor
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
var gemCounter = 0;
var coinCounter = 0;
var noOfGems = 3;
var noOfCoins = 2;
var isCoin = false;



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


var path = new Image();
path.onload = function () {
    pathReady = true;
}
path.src = imgURL + "assets/background/path.png";


var gem = new Image();
gem.onload = function () {
    gemReady = true;
}
gem.src = imgURL + "assets/background/gem.png";

var coin = new Image();
coin.onload = function () {
    coinReady = true;
}
coin.src = imgURL + "assets/background/coin.png";

var clue = new Image();
clue.onload = function () {
    clueReady = true;
}
clue.src = imgURL + "assets/background/clue.png";

var clue_1 = new Image();
clue_1.onload = function () {
    clue_1Ready = true;
}
clue_1.src = imgURL + "assets/background/clue_1.png";

var statue_top = new Image();
statue_top.onload = function () {
    statue_topReady = true;
}
statue_top.src = imgURL + "assets/background/statue_top.png";

var statue_bottom = new Image();
statue_bottom.onload = function () {
    statue_bottomReady = true;
}
statue_bottom.src = imgURL + "assets/background/statue_bottom.png";





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

way = [];
way.push({ x: 8, y: 1 });
way.push({ x: 7, y: 1 });
way.push({ x: 6, y: 1 });
way.push({ x: 2, y: 3 });
way.push({ x: 3, y: 3 });
way.push({ x: 7, y: 5 });
way.push({ x: 6, y: 5 });
way.push({ x: 3, y: 7 });
way.push({ x: 2, y: 7 });
way.push({ x: 1, y: 7 });
way.push({ x: 5, y: 1 });

way.push({ x: 5, y: 5 });
way.push({ x: 4, y: 3 });
way.push({ x: 4, y: 7 });
way.push({ x: 4, y: 1 });
way.push({ x: 5, y: 3 });
way.push({ x: 4, y: 5 });
way.push({ x: 5, y: 7 });


ladder_start = [];
ladder_start.push({ x: 3, y: 1 });
ladder_start.push({ x: 1, y: 3 });
ladder_start.push({ x: 3, y: 5 });

ladder_stop = [];
ladder_stop.push({ x: 6, y: 3 });
ladder_stop.push({ x: 8, y: 5 });
ladder_stop.push({ x: 6, y: 7 });

statuetop = [];
statuetop.push({ x: 3, y: 2 });
statuetop.push({ x: 5, y: 4 });
statuetop.push({ x: 3, y: 6 });
statuetop.push({ x: 5, y: 8 });

statuebottom = [];
statuebottom.push({ x: 4, y: 2 });
statuebottom.push({ x: 6, y: 4 });
statuebottom.push({ x: 4, y: 6 });
statuebottom.push({ x: 6, y: 8 });

var gemSquares1 = [];
gemSquares1.push({ x: 7, y: 1 });
gemSquares1.push({ x: 3, y: 3 });
gemSquares1.push({ x: 5, y: 5 });
gemSquares1.push({ x: 2, y: 7 });



var gemSquares2 = [];
gemSquares2.push({ x: 5, y: 1 });
gemSquares2.push({ x: 4, y: 3 });
gemSquares2.push({ x: 6, y: 5 });
gemSquares2.push({ x: 3, y: 7 });


var coinSquares1 = [];
coinSquares1.push({ x: 6, y: 1 });
coinSquares1.push({ x: 2, y: 3 });
coinSquares1.push({ x: 4, y: 5 });
coinSquares1.push({ x: 4, y: 7 });


var coinSquares2 = [];
coinSquares2.push({ x: 4, y: 1 });
coinSquares2.push({ x: 5, y: 3 });
coinSquares2.push({ x: 7, y: 5 });
coinSquares2.push({ x: 5, y: 7 });


var correctSquares = [];
correctSquares.push({ x: 8, y: 1 });
correctSquares.push({ x: 7, y: 1 });
correctSquares.push({ x: 6, y: 1 });
correctSquares.push({ x: 5, y: 1 });
correctSquares.push({ x: 4, y: 1 });
correctSquares.push({ x: 3, y: 1 });
correctSquares.push({ x: 6, y: 3 });
correctSquares.push({ x: 5, y: 3 });
correctSquares.push({ x: 4, y: 3 });
correctSquares.push({ x: 3, y: 3 });
correctSquares.push({ x: 2, y: 3 });
correctSquares.push({ x: 1, y: 3 });
correctSquares.push({ x: 8, y: 5 });
correctSquares.push({ x: 7, y: 5 });
correctSquares.push({ x: 6, y: 5 });
correctSquares.push({ x: 5, y: 5 });
correctSquares.push({ x: 4, y: 5 });
correctSquares.push({ x: 3, y: 5 });
correctSquares.push({ x: 6, y: 7 });
correctSquares.push({ x: 5, y: 7 });
correctSquares.push({ x: 4, y: 7 });
correctSquares.push({ x: 3, y: 7 });
correctSquares.push({ x: 2, y: 7 });
correctSquares.push({ x: 1, y: 7 });


if (codeFlag == true) {
    console.log("var gemCounter=0;\nvar coinCounter=0;\n function navigate(){\nfor(let i=0;i<5;i++){\nmoveUp();\nif(gemCounter<3 && isGem){\n collectGem();\ngemCounter=gemCounter+1;\n}\n if(coinCounter<2 && isCoin){\n collectCoin();\ncoinCounter=coinCounter+1;\n } } } \nnavigate();\n jump();\nnavigate();\njump(); \nnavigate(); \njump(); \nnavigate();")
}
// random coin

var coin_counter = 0;
var gem_counter = 0;
//display coin_status
function drawCoinCount() {
    contextTop.font = "25px Courier New";
    contextTop.fillStyle = "black";
    contextTop.fillText("Coin: " + coin_counter, 40, 70);
}

//display coin_status
function drawGemCount() {
    contextTop.font = "25px Courier New";
    contextTop.fillStyle = "black";
    contextTop.fillText("Gem : " + gem_counter, 40, 90);
}

// Random number

function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}



var coinPath = [];

var cc = 0
for (var i = 0; i < 4; i++) {
    if (randomNumber(0, 2) === 0) {
        coinPath[i] = coinSquares1[i];
    } else {
        coinPath[i] = coinSquares2[i];
    }
}

console.log(coinPath);

// To remove "undefined" in coinPath Array

coinPath = coinPath.filter(function (element) {
    return element !== undefined;
});
coinCollectPath = [];

console.log(coinPath);

// random gem

var gemPath = [];

var cc = 0
for (var i = 0; i < 4; i++) {
    if (randomNumber(0, 2) === 0) {
        gemPath[i] = gemSquares1[i];
    } else {
        gemPath[i] = gemSquares2[i];
    }
}

console.log(gemPath);

// To remove "undefined" in coinPath Array

gemPath = gemPath.filter(function (element) {
    return element !== undefined;
});
gemCollectPath = [];

console.log(gemPath);




backgroundContainer = [];
gemCollectPath = [];
coinCollectPath = [];
backgroundContainer.push({ image: boundary1, squares: bound1 });
backgroundContainer.push({ image: boundary2, squares: bound2 });
backgroundContainer.push({ image: boundary3, squares: bound3 });
backgroundContainer.push({ image: boundary4, squares: bound4 });
backgroundContainer.push({ image: boundary5, squares: bound5 });
backgroundContainer.push({ image: boundary6, squares: bound6 });
backgroundContainer.push({ image: boundary7, squares: bound7 });
backgroundContainer.push({ image: path, squares: way });
backgroundContainer.push({ image: clue, squares: ladder_start });
backgroundContainer.push({ image: clue_1, squares: ladder_stop });
backgroundContainer.push({ image: statue_top, squares: statuetop });
backgroundContainer.push({ image: statue_bottom, squares: statuebottom });
backgroundContainer.push({ image: gem, squares: gemPath });
backgroundContainer.push({ image: coin, squares: coinPath });
backgroundContainer.push({ image: path, squares: gemCollectPath });
backgroundContainer.push({ image: path, squares: coinCollectPath });

characterPosition = { x: 8, y: 1 };
//Function to draw character
function topDrawCharacter() {
    topCheckPath();
    contextTop.clearRect(0, 0, canvasTop.width, canvasTop.height);
    squarecontainer[characterPosition.x][characterPosition.y].square.image = heroImage;
    squarecontainer[characterPosition.x][characterPosition.y].square.draw();
    drawCoinCount();
    drawGemCount();
}
var found = false;
//Function to check whether gem is present at the position
function gameGem() {
    var found = false;
    for (var i = 0; i < gemPath.length; i++) {
        if (gemPath[i].y == characterPosition.y) {
            if (gemPath[i].x === characterPosition.x) {
                found = true;
            }
        }
    }

    return found;

}

//Function to collect gem
async function collectGem() {
    if (isGem) {

        gem_counter = gem_counter + 1;
        gemCollectPath.push({ x: characterPosition.x, y: characterPosition.y });
        bottomDrawBackground();

    } else {
        alert("There is no gem to colect!!!");
    }
    //drawGemCount();
    await sleep(1000);
}

var isGem = false;
var found = false;
//Function to check whether coin is present at the position
function gameCoin() {
    var found = false;
    for (var i = 0; i < coinPath.length; i++) {
        if (coinPath[i].y == characterPosition.y) {
            if (coinPath[i].x === characterPosition.x) {
                found = true;
            }
        }
    }

    return found;

}

//Function to collect coin
async function collectCoin() {
    if (isCoin) {
        coin_counter = coin_counter + 1;
        coinCollectPath.push({ x: characterPosition.x, y: characterPosition.y });
        bottomDrawBackground();

    } else {
        alert("There is no coin to colect!!!");
    }
    // drawCoinCount();
    await sleep(1000);
}
//Function for character to jump from one place to another
var count = 0;
async function jump() {
    heroImage.src = heroImageUp.src;
    count += 1;
    if (count === 1) {
        if (characterPosition = { x: 3, y: 1 }) {
            characterPosition = { x: 6, y: 3 };
            topDrawCharacter();
            await sleep(1000);
        }
        else {
            alert("Jump is not possible here")
        }
    }
    else if (count === 2) {
        if (characterPosition = { x: 1, y: 3 }) {
            characterPosition = { x: 8, y: 5 };
            topDrawCharacter();
            await sleep(1000);
        }
        else {
            alert("Jump is not possible here")
        }

    }
    else if (count === 3) {
        if (characterPosition = { x: 3, y: 2 }) {
            characterPosition = { x: 6, y: 7 };
            topDrawCharacter();
            await sleep(1000);
        }
        else {
            alert("Jump is not possible here")
        }

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
    isGem = gameGem();
    isCoin = gameCoin();
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
    isGem = gameGem();
    isCoin = gameCoin();
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
    isGem = gameGem();
    isCoin = gameCoin();
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
    isGem = gameGem();
    isCoin = gameCoin();
    await sleep(1000);
}

winningSquare = { x: 1, y: 7 };
//Function to check whether character is following the desired path
function topCheckPath() {
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
        if (coin_counter === noOfCoins && gem_counter === noOfGems) {
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
        else if (coin_counter < noOfCoins || gem_counter < noOfGems) {
            alert("Collect 3 gems and 2 coins!!!");
            location.reload();
        }
        else {
            alert("Collect only 3 gems and 2 coins!!!");
            location.reload();
        }
    }
}



//Function for introducing delay
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
//Function to replace word navigate with await navigate
var nav_i = 0
function nav_replace(code) {

    if (nav_i >= 1) {
        code = code.replace('navigate', 'await navigate');
    }
    i = i + 1;
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
    code = code.replaceAll('function', 'async function');
    code = code.replaceAll('jump', 'await jump');
    code = code.replaceAll('def', 'async def');
    code = code.replace('navigate', 'funcnav');
    code = code.replaceAll('navigate', 'await navigate');
    code = code.replace('funcnav', 'navigate');

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