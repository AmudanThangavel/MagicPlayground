//Class to Draw image or fill color to the canvas
class Square {
    constructor(canvas, x, y, side, image = null) {
        this.canvas = canvas;
        this.canvasContext = this.canvas.getContext('2d');
        this.x = x;
        this.y = y;
        this.side = side;
        this.color = 'lightgrey';
        this.textColor = "grey";
        this.image = image;
    }
    draw() {
        if (this.image == null) {
            this.drawColor();
        }
        else {
            this.drawImage();
        }
    }
    drawColor() {
        this.canvasContext.beginPath();
        this.canvasContext.rect(this.x, this.y, this.side, this.side);
        this.canvasContext.fillStyle = this.color;
        this.canvasContext.fill();
        if (debugFlag == true) {
            this.canvasContext.font = "15px Comic Sans MS";
            this.canvasContext.fillStyle = this.textColor;
            this.canvasContext.textAlign = "center";
            this.canvasContext.fillText((this.y / this.side + "," + this.x / this.side), (this.x + (this.side / 2)), (this.y + (this.side / 2)));
            // Example => this.canvasContext.fillText(this.x/50+","+this.y/50,this.x+25, this.y+25);
        }
        this.canvasContext.strokeStyle = "black";
        this.canvasContext.lineWidth = 1
        this.canvasContext.stroke();
    }
    drawImage() {
        this.canvasContext.beginPath();
        this.canvasContext.drawImage(this.image, this.x, this.y);
        this.canvasContext.fillStyle = this.color;
        this.canvasContext.fill();
        if (debugFlag == true) {
            this.canvasContext.font = "15px Comic Sans MS";
            this.canvasContext.fillStyle = this.textColor;
            this.canvasContext.textAlign = "center";
            this.canvasContext.fillText((this.y / this.side + "," + this.x / this.side), (this.x + (this.side / 2)), (this.y + (this.side / 2)));
            // Example => this.canvasContext.fillText(this.x/50+","+this.y/50,this.x+25, this.y+25);
        }
        this.canvasContext.strokeStyle = "black";
        this.canvasContext.lineWidth = 1
        this.canvasContext.stroke();
    }

}
//Function to draw top Canvas
function topDrawGrid() {
    r = -1;
    for (j = 0; j < 500; j = j + 50) {
        r++;
        c = -1;
        squarecontainer.push([]);
        for (i = 0; i < 500; i = i + 50) {
            c++;
            var a = new Square(canvasTop, i, j, 50);
            //a.draw();
            squarecontainer[r].push({ square: a, x: i, y: j, side: 50, row: r, col: c });

        }
    }
}
//Function to draw Bottom Canvas
function bottomDrawGrid() {
    r = -1;
    for (j = 0; j < 500; j = j + 50) {
        r++;
        c = -1;
        squarecontainerBottom.push([]);
        for (i = 0; i < 500; i = i + 50) {
            c++;
            var a = new Square(canvasBottom, i, j, 50, groundImage);
            a.draw();
            squarecontainerBottom[r].push({ square: a, x: i, y: j, side: 50, row: r, col: c });
        }
    }
}
//Function to draw Background of Bottom Canvas
function bottomDrawBackground() {
    for (i = 0; i < backgroundContainer.length; i++) {
        for (j = 0; j < backgroundContainer[i].squares.length; j++) {
            // console.log(backgroundContainer[i].squares);
            squarecontainerBottom[backgroundContainer[i].squares[j].x][backgroundContainer[i].squares[j].y].square.image = backgroundContainer[i].image;
            squarecontainerBottom[backgroundContainer[i].squares[j].x][backgroundContainer[i].squares[j].y].square.draw();
        }
    }
}
//Function to Redraw Bottom Canvas
function bottomReDrawCanvas() {
    contextBottom.clearRect(0, 0, canvasBottom.width, canvasBottom.height);
    for (i = 0; i < squarecontainerBottom.length; i++) {
        for (j = 0; j < squarecontainerBottom[i].length; j++) {
            squarecontainerBottom[i][j].square.draw();
        }
    }
}