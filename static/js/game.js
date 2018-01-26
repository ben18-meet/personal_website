function startGame() {
    myGameArea.start();
    player = new component(30, 30, "black", 20,135);
    console.log("Created player")
    



var myGameArea = {
    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.width = 480;
        this.canvas.height = 270;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.interval = setInterval(updateGameArea, 20);
    },
    clear :function(){
    	this.context.clearRect(0,0,this.canvas.width,this.canvas.height);
    }
}




function component(width, height, color, x, y) {
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.update = function(){; 
    	ctx = myGameArea.context;
    	ctx.fillStyle = color;
   		ctx.fillRect(this.x, this.y, this.width, this.height);
}
}

document.onkeydown = checkKey;

function moveDown() {
	player.y +=5;
}

function moveUp() {
	player.x -=5;
}

f
	


function checkKey(e) {

    e = e || window.event;

    if (e.keyCode == '40') {
    	// left arrow
    	moveDown();
    }
    else if (e.keyCode == '38') {
       // right arrow
       moveUp();
	}
	
	}

function updateGameArea() {
	myGameArea.clear();
	player.update();

}	
}
