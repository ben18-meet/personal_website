function startGame() {
    myGameArea.start();
    player = new component(30, 30, "black", 230,235);
    console.log("Created player")
    

}
var playerBullets = [];


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

function moveLeft() {
	player.x -=5;
}

function moveRight() {
	player.x +=5;
}

function bullet(I) {
	//making bullet
	
  I.active = true;

 
  I.width = 3;
  I.height = 3;
  I.color = "#000";

  /*I.inBounds = function() {
    return I.x >= 0 && I.x <= CANVAS_WIDTH &&
      I.y >= 0 && I.y <= CANVAS_HEIGHT;
  };*/

  I.draw = function() {
    myGameArea.fillStyle = this.color;
    myGameArea.fillRect(this.x, this.y, this.width, this.height);
  };

  I.update = function() {
    I.x += I.xVelocity;
    I.y += I.yVelocity;

    I.active = I.active && I.inBounds();
  };

  return I;
}
	

shoot = function() {
  var bulletPosition = (player.x,player.y)

  playerBullets.push(bullet({
    speed: 5,
    x: bulletPosition.x,
    y: bulletPosition.y
  }));
  console.log(bulletPosition.x);
  bullet.update();
};


	


function checkKey(e) {

    e = e || window.event;

    if (e.keyCode == '37') {
    	// left arrow
    	moveLeft();
    }
    else if (e.keyCode == '39') {
       // right arrow
       moveRight();
	}
	else if (e.keyCode == '32') {
		// space
		shoot();
		console.log("Bam! " + playerBullets);

	}
}

function updateGameArea() {
	myGameArea.clear();
	player.update();

	
}




























              