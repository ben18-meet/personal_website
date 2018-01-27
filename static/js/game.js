var player;
var obstacles = [];
var userScore;
var background;
var explosionSound;
var backgroundMusic

/*function welcomeState() {
	var welcomeArea = {
		canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.width = 550;
        this.canvas.height = 400;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);

    },
	}
}
*/

function startGame() {
    background = new component(1280,720,"../img/starfield.jpg", 0, 0, "image")
    player = new component(80,60,"../img/spaceship.gif", 20,120, "image");    
    userScore = new component("30px", "Consolas", "yellow", 280, 40, "text");
    explosionSound = new sound("../img/explosion.mp3");
    backgroundMusic = new sound("../img/background.mp3");
    backgroundMusic.play();
	gameArea.start();

}

var gameArea = {
    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.width = 480;
        this.canvas.height = 400;
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
		gameArea.clear();
		background.update();		
		var ctx = this.canvas.getContext("2d");
		ctx.font = "30px Arial";
		ctx.fillText("Your Score is: " + gameArea.frameNo,this.canvas.width / 2 -155,this.canvas.height/2 - 40);
		console.log(gameArea.frameNo);
		/*ctx.font="16px Arial";
		ctx.fillText("Your Score: " + userScore, gameArea.width / 2, gameArea.height/2);
		*/



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
		this.switch();
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
    this.switch = function(){
		var canvasBottom = gameArea.canvas.height - this.height;
		var canvasTop = 0;
		if (this.y-this.height > canvasBottom){
			this.y = canvasTop;
		}
		if (this.y + this.height < canvasTop){
			this.y = canvasBottom;
		} 

}
}


function sound(src) {
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    document.body.appendChild(this.sound);
    this.play = function(){
        this.sound.play();
    }
    this.stop = function(){
        this.sound.pause();
    }
}

function jump(){
	player.speedY -= 0.5;
}

document.onkeydown = checkKey;


function checkKey(e) {

    e = e || window.event;

    if (e.keyCode == '32') {
    	//space
    	jump();
    	console.log("jump")
    }

    if (e.keyCode == '13') {
    	//enter
    	startGame();
    	console.log("Let the games begin!")
    }
}    

function updateGameArea() {
	
	var x, y;
    for (i = 0; i < obstacles.length; i += 1) {
        if (player.collide(obstacles[i])) {
        	backgroundMusic.stop();
        	explosionSound.play();
            gameArea.gameOver();
            return;
        } 
    }
    gameArea.clear();
    background.update();

    gameArea.frameNo += 1;
    if (gameArea.frameNo == 1 || everyinterval(150)) {
        x = gameArea.canvas.width;
        minHeight = 20;
        maxHeight = 340;
        height = Math.floor(Math.random()*(maxHeight-minHeight+1)+minHeight);
        
        obstacles.push(new component(50, 50, "../img/astroid2.gif", x, height, "image"));
    }
    for (i = 0; i < obstacles.length; i += 1) {
        obstacles[i].x += -1;
        obstacles[i].update();
    }
    userScore.text="SCORE: " + (gameArea.frameNo);
    userScore.update();
    player.newPos();
    player.update();
}

