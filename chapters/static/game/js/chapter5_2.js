debugFlag = window.location.href.split('#')[1] == "debug";
codeFlag = window.location.href.split('#')[1] == "code";
girlFlag = window.location.href.split('#')[1] == "girl";

imgURL = "/static/game/img/chapter5_2/";

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
noOfCoins = 6;


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
heroImage.src = heroImageRight.src;


var groundImage = new Image();
groundImage.onload = function () {
    groundImageReady = true;
}
groundImage.src = imgURL + "assets/background/ground.png";

var bound1 = new Image();
bound1.onload = function () {
    bound1Ready = true;
}
bound1.src = imgURL + "assets/background/bound1.png";

var bound2 = new Image();
bound2.onload = function () {
    bound2Ready = true;
}
bound2.src = imgURL + "assets/background/bound2.png";

var bound3 = new Image();
bound3.onload = function () {
    bound3Ready = true;
}
bound3.src = imgURL + "assets/background/bound3.png";

var path = new Image();
path.onload = function () {
    pathReady = true;
}
path.src = imgURL + "assets/background/path.png";

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

var tree7 = new Image();
tree7.onload = function () {
    tree7Ready = true;
}
tree7.src = imgURL + "assets/background/tree7.png";

var tree8 = new Image();
tree8.onload = function () {
    tree8Ready = true;
}
tree8.src = imgURL + "assets/background/tree8.png";

var tree9 = new Image();
tree9.onload = function () {
    tree9Ready = true;
}
tree9.src = imgURL + "assets/background/tree9.png";

var tree10 = new Image();
tree10.onload = function () {
    tree10Ready = true;
}
tree10.src = imgURL + "assets/background/tree10.png";

var tree11 = new Image();
tree11.onload = function () {
    tree11Ready = true;
}
tree11.src = imgURL + "assets/background/tree11.png";

var tree12 = new Image();
tree12.onload = function () {
    tree12Ready = true;
}
tree12.src = imgURL + "assets/background/tree12.png";

var tree2_1 = new Image();
tree2_1.onload = function () {
    tree2_1Ready = true;
}
tree2_1.src = imgURL + "assets/background/tree2_1.png";

var tree2_2 = new Image();
tree2_2.onload = function () {
    tree2_2Ready = true;
}
tree2_2.src = imgURL + "assets/background/tree2_2.png";

var tree2_3 = new Image();
tree2_3.onload = function () {
    tree2_3hReady = true;
}
tree2_3.src = imgURL + "assets/background/tree2_3.png";

var tree2_4 = new Image();
tree2_4.onload = function () {
    tree2_4Ready = true;
}
tree2_4.src = imgURL + "assets/background/tree2_4.png";

var tree2_5 = new Image();
tree2_5.onload = function () {
    tree2_5Ready = true;
}
tree2_5.src = imgURL + "assets/background/tree2_5.png";

var tree2_6 = new Image();
tree2_6.onload = function () {
    tree2_6Ready = true;
}
tree2_6.src = imgURL + "assets/background/tree2_6.png";

var tree2_7 = new Image();
tree2_7.onload = function () {
    tree2_7Ready = true;
}
tree2_7.src = imgURL + "assets/background/tree2_7.png";

var tree2_8 = new Image();
tree2_8.onload = function () {
    tree2_8Ready = true;
}
tree2_8.src = imgURL + "assets/background/tree2_8.png";

var tree2_9 = new Image();
tree2_9.onload = function () {
    tree2_9Ready = true;
}
tree2_9.src = imgURL + "assets/background/tree2_9.png";

var tree2_10 = new Image();
tree2_10.onload = function () {
    tree2_10Ready = true;
}
tree2_10.src = imgURL + "assets/background/tree2_10.png";

var tree2_11 = new Image();
tree2_11.onload = function () {
    tree2_11Ready = true;
}
tree2_11.src = imgURL + "assets/background/tree2_11.png";

var tree2_12 = new Image();
tree2_12.onload = function () {
    tree2_12Ready = true;
}
tree2_12.src = imgURL + "assets/background/tree2_12.png";

var coin_image = new Image();
coin_image.onload = function () {
    coin_imageReady = true;
}
coin_image.src = imgURL + "assets/background/coin.png";



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


var boundary2 = []
boundary2.push({ x: 1, y: 0 });
boundary2.push({ x: 2, y: 0 });
boundary2.push({ x: 3, y: 0 });
boundary2.push({ x: 4, y: 0 });
boundary2.push({ x: 5, y: 0 });
boundary2.push({ x: 6, y: 0 });
boundary2.push({ x: 7, y: 0 });
boundary2.push({ x: 8, y: 0 });


var boundary3 = []
boundary3.push({ x: 1, y: 9 });
boundary3.push({ x: 2, y: 9 });
boundary3.push({ x: 3, y: 9 });
boundary3.push({ x: 4, y: 9 });
boundary3.push({ x: 5, y: 9 });
boundary3.push({ x: 6, y: 9 });
boundary3.push({ x: 7, y: 9 });
boundary3.push({ x: 8, y: 9 });

var way = []

way.push({ x: 8, y: 9 });
way.push({ x: 8, y: 8 });
way.push({ x: 8, y: 7 });
way.push({ x: 6, y: 6 });
way.push({ x: 7, y: 7 });
way.push({ x: 6, y: 7 });
way.push({ x: 5, y: 5 });
way.push({ x: 4, y: 5 });
way.push({ x: 6, y: 5 });
way.push({ x: 4, y: 3 });
way.push({ x: 3, y: 3 });
way.push({ x: 4, y: 4 });
way.push({ x: 2, y: 2 });
way.push({ x: 2, y: 3 });
way.push({ x: 2, y: 1 });
way.push({ x: 2, y: 0 });


var t1 = []
t1.push({ x: 5, y: 1 });

var t2 = []
t2.push({ x: 5, y: 2 });

var t3 = []
t3.push({ x: 5, y: 3 });

var t4 = []
t4.push({ x: 6, y: 1 });

var t5 = []
t5.push({ x: 6, y: 2 });

var t6 = []
t6.push({ x: 6, y: 3 });

var t7 = []
t7.push({ x: 7, y: 1 });

var t8 = []
t8.push({ x: 7, y: 2 });

var t9 = []
t9.push({ x: 7, y: 3 });

var t10 = []
t10.push({ x: 8, y: 1 });

var t11 = []
t11.push({ x: 8, y: 2 });

var t12 = []
t12.push({ x: 8, y: 3 });

// var t2_1=[]
// t2_1.push({x:1,y:6});

var t2_2 = []
t2_2.push({ x: 1, y: 7 });

var t2_3 = []
t2_3.push({ x: 1, y: 8 });

// var t2_4=[]
// t2_4.push({x:2,y:6});

var t2_5 = []
t2_5.push({ x: 2, y: 7 });

var t2_6 = []
t2_6.push({ x: 2, y: 8 });

// var t2_7=[]
// t2_7.push({x:3,y:6});

var t2_8 = []
t2_8.push({ x: 3, y: 7 });

var t2_9 = []
t2_9.push({ x: 3, y: 8 });

// var t2_10=[]
// t2_10.push({x:4,y:6});

// var t2_11=[]
// t2_11.push({x:4,y:7});

// var t2_12=[]
// t2_12.push({x:4,y:8});

var coin = []
coin.push({ x: 2, y: 3 });
coin.push({ x: 4, y: 3 });
coin.push({ x: 4, y: 5 });
coin.push({ x: 6, y: 5 });
coin.push({ x: 6, y: 7 });
coin.push({ x: 8, y: 7 });

var correctSquares = [];
correctSquares.push({ x: 8, y: 7 });
correctSquares.push({ x: 7, y: 7 });
correctSquares.push({ x: 6, y: 7 });
correctSquares.push({ x: 6, y: 6 });
correctSquares.push({ x: 6, y: 5 });
correctSquares.push({ x: 5, y: 5 });
correctSquares.push({ x: 4, y: 5 });
correctSquares.push({ x: 4, y: 4 });
correctSquares.push({ x: 4, y: 3 });
correctSquares.push({ x: 3, y: 3 });
correctSquares.push({ x: 2, y: 3 });
correctSquares.push({ x: 2, y: 2 });
correctSquares.push({ x: 2, y: 1 });




backgroundContainer = [];
backgroundContainer.push({ image: bound1, squares: boundary1 });
backgroundContainer.push({ image: bound2, squares: boundary2 });
backgroundContainer.push({ image: bound3, squares: boundary3 });
backgroundContainer.push({ image: path, squares: way });
backgroundContainer.push({ image: tree1, squares: t1 });
backgroundContainer.push({ image: tree2, squares: t2 });
backgroundContainer.push({ image: tree3, squares: t3 });
backgroundContainer.push({ image: tree4, squares: t4 });
backgroundContainer.push({ image: tree5, squares: t5 });
backgroundContainer.push({ image: tree6, squares: t6 });
backgroundContainer.push({ image: tree7, squares: t7 });
backgroundContainer.push({ image: tree8, squares: t8 });
backgroundContainer.push({ image: tree9, squares: t9 });
backgroundContainer.push({ image: tree10, squares: t10 });
backgroundContainer.push({ image: tree11, squares: t11 });
backgroundContainer.push({ image: tree12, squares: t12 });
// backgroundContainer.push({image:tree2_1,squares:t2_1});
backgroundContainer.push({ image: tree2_2, squares: t2_2 });
backgroundContainer.push({ image: tree2_3, squares: t2_3 });
// backgroundContainer.push({image:tree2_4,squares:t2_4});
backgroundContainer.push({ image: tree2_5, squares: t2_5 });
backgroundContainer.push({ image: tree2_6, squares: t2_6 });
// backgroundContainer.push({image:tree2_7,squares:t2_7});
backgroundContainer.push({ image: tree2_8, squares: t2_8 });
backgroundContainer.push({ image: tree2_9, squares: t2_9 });
// backgroundContainer.push({image:tree2_10,squares:t2_10});
// backgroundContainer.push({image:tree2_11,squares:t2_11});
// backgroundContainer.push({image:tree2_12,squares:t2_12});
backgroundContainer.push({ image: coin_image, squares: coin });

if (codeFlag == true) {
    console.log("var coin_counter=0\nfor(let i=0;i<3;i++)\n{moveRight();\ncollectCoin();\ncoin_counter=coin_counter+1\nmoveRight();\nmoveDown();\ncollectCoin();\ncoin_counter=coin_counter+1\nmoveDown();\n }")
}

//Function to display coin count
function drawCoinCount() {
    contextTop.font = "25px Courier New";
    contextTop.fillStyle = "black";
    contextTop.fillText("Coin: " + coin_counter, 80, 70);
}


characterPosition = { x: 2, y: 1 };
//Function to draw character
function topDrawCharacter() {
    topCheckPath();
    contextTop.clearRect(0, 0, canvasTop.width, canvasTop.height);
    squarecontainer[characterPosition.x][characterPosition.y].square.image = heroImage;
    squarecontainer[characterPosition.x][characterPosition.y].square.draw();
    drawCoinCount();
}
groundContainer = [];
groundContainer.push({ image: path, squares: coin });
//Function to draw ground image
function drawground(j) {


    for (i = 0; i < groundContainer.length; i++) {

        squarecontainerBottom[groundContainer[i].squares[j].x][groundContainer[i].squares[j].y].square.image = groundContainer[i].image;
        squarecontainerBottom[groundContainer[i].squares[j].x][groundContainer[i].squares[j].y].square.draw();

    }
}
var count = -1;
var coin_counter = 0;
//Function to collect coin
function collectCoin() {
    console.log("collectcoin");
    count += 1;

    for (var i = count; i < 6; i++) {
        if (count === i) {
            coin_counter = i + 1;
        }
    }




    if (count === 0) {
        coin_image.src = path.src;
        drawground(count);

    }
    else if (count === 1) {

        coin_image.src = path.src;
        drawground(count);

    }
    else if (count === 2) {

        coin_image.src = path.src;
        drawground(count);

    }
    else if (count === 3) {

        coin_image.src = path.src;
        drawground(count);

    }
    else if (count === 4) {

        coin_image.src = path.src;
        drawground(count);


    }
    else if (count === 5) {

        coin_image.src = path.src;
        drawground(count);


    }
    else if (count === 6) {

        coin_image.src = path.src;
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
//Function to check whether character has reached final position
winningSquare = { x: 8, y: 7 }
function topCheckWin() {
    if (characterPosition.x == winningSquare.x && characterPosition.y == winningSquare.y) {
        if (coin_counter === noOfCoins) {
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
            alert("Collect all the coins!!!");
            location.reload();
        }
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
    code = code.replace('navigate()', 'naviName()');
    code = code.replaceAll('navigate()', 'await navigate()');
    code = code.replace('naviName()', 'navigate()');
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
    topDrawGrid();
    bottomDrawGrid();
    bottomDrawBackground();
    topDrawCharacter();
    bottomReDrawCanvas();
    brython();
}