var player;
var obstacles = [];
var userScore
var background;


function startGame() {
    player = new component(100,50,"../img/spaceship.gif", 10,120, "image");    
    userScore = new component("30px", "Consolas", "yellow", 280, 40, "text");
    background = new component(1280,720,"../img/starfield.jpg", 0, 0, "image")
	gameArea.start();

}

var gameArea = {
    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.width = 480;
        this.canvas.height = 270;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.frameNo = 0;
        this.interval = setInterval(updateGameArea,20);
    },
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

},
	gameOver : function() {
		clearInterval(this.interval)
		console.log("Game Over!!")
	}
}
//count frames
function everyinterval(n) {
    if ((gameArea.frameNo / n) % 1 == 0) {return true;}
    return false;
}

//making a function that defines "class" 
function component(width, height, color, x, y, type) {
	this.type = type;
	if (type == "image") {
    this.image = new Image();
    this.image.src = color;
  }	
	this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.speedY = 0;
    this.speedX = 0.01; 
    this.gravity = 0.01;
    this.gravitySpeed = 0;
    this.update = function(){
    ctx = gameArea.context;
    if (this.type == "text") {
      ctx.font = this.width + " " + this.height;
      ctx.fillStyle = color;
      ctx.fillText(this.text, this.x, this.y);
  }
    if (type == "image" ) {
      ctx.drawImage(this.image, 
        this.x, 
        this.y,
        this.width, this.height);
    
}	
    else {
    ctx.fillStyle = color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
	}
}

	this.newPos = function() {
        this.gravitySpeed += this.gravity;
        this.x += this.speedX
        this.y += this.speedY + this.gravitySpeed;
        
}
    //Did 2 objects touch?
    this.collide = function(otherObj) {
    	var myleft = this.x;
        var myright = this.x + (this.width);
        var mytop = this.y;
        var mybottom = this.y + (this.height);
        var otherleft = otherObj.x;
        var otherright = otherObj.x + (otherObj.width);
        var othertop = otherObj.y;
        var otherbottom = otherObj.y + (otherObj.height);
        var collide = true;
        if ((mybottom < othertop) ||
               (mytop > otherbottom) ||
               (myright < otherleft) ||
               (myleft > otherright)) {
           collide = false;
        }
        return collide;


    }
   /* this.outOfBounds = function(){
	var canvasBottom = gameArea.canvas.height - this.height;
	var canvasTop = 0;
	if (this.y >canvasBottom || this.y < canvasTop){
		gameArea.gameOver();	
	}

}*/
}




function jump(){
	player.speedY -= 0.5;
}

document.onkeydown = checkKey;


function checkKey(e) {

    e = e || window.event;

    if (e.keyCode == '32') {
    	// left arrow
    	jump();
    	console.log("jump")
    }
}    

function updateGameArea() {

	var x, y;
    for (i = 0; i < obstacles.length; i += 1) {
        if (player.collide(obstacles[i])) {
            gameArea.gameOver();
            return;
        } 
    }
    gameArea.clear();
    gameArea.frameNo += 1;
    if (gameArea.frameNo == 1 || everyinterval(250)) {
        x = gameArea.canvas.width;
        minHeight = 20;
        maxHeight = 200;
        height = Math.floor(Math.random()*(maxHeight-minHeight+1)+minHeight);
        
        obstacles.push(new component(50, 50, "../img/astroid.gif", x, height, "image"));
    }
    for (i = 0; i < obstacles.length; i += 1) {
        obstacles[i].x += -1;
        obstacles[i].update();
    }
    background.newPos(); 
    background.update();
    userScore.text="SCORE: " + (gameArea.frameNo);
    userScore.update();
    player.newPos();
    player.update();
}

