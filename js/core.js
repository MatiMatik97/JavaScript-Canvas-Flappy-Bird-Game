////////////		CANVAS		////////////
var canvas = document.getElementById("canvas");
canvas.width = canvas.clientWidth;
canvas.height = canvas.clientHeight;
var ctx = canvas.getContext("2d");

////////////		GAME VARIABLES		////////////
var bird;
var frameRate = 1;
var pipes = [];
var start;
var pause;
var gameLoop = false;
var gameEnded = false;
var score = 0;

////////////		IMG VARIABLES		////////////
var Img = {};
Img.map = new Image();
Img.bird = new Image();
Img.pipeUp = new Image();
Img.pipeDwn = new Image();

////////////		CANVAS VARIaBLES		////////////
var xMap = 0;

////////////		GAME LOOP FUNCTION		////////////
function game() {
	////////////		CANVAS FRAME		////////////
	window.requestAnimationFrame(game);
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	
	////////////		MAP		////////////
	ctx.save();
	drawMap(xMap);
	ctx.restore();
	
	////////////		PER FRAME		////////////
	if(gameLoop) {
		frameRate += 1;
		//frameRate %= 59;
		
		xMap -= 1;
		if(xMap <= -canvas.width) {
			xMap = 0;
		}
		
		if(frameRate % 10 == 0) {
			score += 1;
		}
	}
	
	////////////		PAUSED		////////////
	if(!gameLoop && !gameEnded && score > 0) {
		ctx.textAlign = "center";
		ctx.fillStyle = "#000000";
		ctx.font = "45px Arial";
		ctx.fillText("PAUSED!", canvas.width / 2, canvas.height / 2);
	}
	
	////////////		PIPES		////////////
	for(var i = pipes.length - 1; i >= 0; i--) {
		if(gameLoop) {
			pipes[i].update();
		}
		pipes[i].show();
		
		if(pipes[i].collide(bird)) {
			ctx.textAlign = "center";
			
			ctx.fillStyle = "#000000";
			ctx.font = "15px Arial";
			ctx.fillText("HIT!", bird.x - 5, bird.y - 20);
			
			ctx.font = "10px Arial";
			ctx.textAlign = "start"; 
			
			if(!pipes[i].hit) {
				score -= 100;
				pipes[i].hit = true;
			}
		}
		
		if(pipes[i].offScreen()) {
			pipes.splice(i, 1);
		}
	}
	
	////////////		NEW PIPES EVERY 200 FRAMES		////////////
	if(frameRate % 200 == 0) {
		pipes.push(new Pipe());
	}
	
	////////////		BUTTONS		////////////
	start.show();
	pause.show();
	
	////////////		BIRD		////////////
	if(gameLoop) {
		bird.update();
	}
	bird.show();
	
	////////////		MAP		////////////
	ctx.save();
	drawScore(score);
	ctx.restore();
	
	////////////		START GAME		////////////
	if(score == 0) {
		textDisplayOnCenter("MATI BIRD!");
	}
	
	////////////		END GAME		////////////
	if(score < 0) {
		gameLoop = false;
		gameEnded = true;
		textDisplayOnCenter("YOU LOST!");
	}
	
}

function textDisplayOnCenter(text) {
	ctx.textAlign = "center";
	ctx.fillStyle = "#000000";
	ctx.font = "45px Arial";
	ctx.fillText(text, canvas.width / 2, canvas.height / 2);
	ctx.font = "15px Arial";
	ctx.fillText("Click start to start a new game!", canvas.width / 2, canvas.height / 2 + 25);
}

window.addEventListener('load', function() {
	//console.log('All assets are loaded');
	Img.map.src = "img/background.png";
	Img.bird.src = "img/bird.png";
	Img.pipeUp.src = "img/pipeUp.png";
	Img.pipeDwn.src = "img/pipeDwn.png";
});

document.addEventListener('keypress', keypress);

function keypress(e) {
	if(e.code == "Space") {
		if(gameLoop) {
			bird.vel -= 6;
		}
	}
}

var mouseX;
var mouseY;

document.addEventListener('mousemove', function(e) {
	mouseX = e.pageX - canvas.getBoundingClientRect().left;
	mouseY = e.pageY - canvas.getBoundingClientRect().top;
		
	if(start.onButton(mouseX, mouseY) || pause.onButton(mouseX, mouseY)) {
		canvas.style.cursor = "pointer";
	} else {
		canvas.style.cursor = "default";
	}
	
	//console.log(mouseX + " " + mouseY);
}, false);

document.onclick = function(mouse) {
	if(start.onButton(mouseX, mouseY) && (gameEnded || score == 0)) {
		gameLoop = true;
		startNewGame();
	}
	
	if(start.onButton(mouseX, mouseY)) {
		gameLoop = true;
		//console.log("start");
	}
	
	if(pause.onButton(mouseX, mouseY)) {
		gameLoop = false;
		//console.log("pause");
	}
}

function drawMap(x) {
	ctx.drawImage(Img.map, 0, 0, Img.map.width, Img.map.height, x, 0, canvas.width, canvas.height);
	ctx.drawImage(Img.map, 0, 0, Img.map.width, Img.map.height, canvas.width + x, 0, canvas.width, canvas.height);
}

function drawScore(x) {
	ctx.fillStyle = "#000000";
	ctx.font = "30px Arial";
	ctx.fillText("Score: " + score, 10, 30);
	
	ctx.font = "10px Arial";
}

function init() {
	////////////		BUTTONS		////////////
	var x = 10;
	var width = 75;
	var height = 25;
	var y = canvas.height - height - 10;
	var text = "START";
	var font = "15px Arial";
	var color = "#15d315";
	
	start = new Button(x, y, width, height, text, font, color);
	
	x += width + x;
	var color = "#fc320a";
	var text = "PAUSE";
	pause = new Button(x, y, width, height, text, font, color);
	
	////////////		BIRD		////////////
	bird = new Bird();
}

function startNewGame() {
	score = 1;
	frameRate = 1;
	pipes = [];
	xMap = 0;
	gameEnded = false;
	
	init();
}

function random(min, max) {
	return Math.floor(Math.random() * (max - min) ) + min;
}

startNewGame();
score = 0;
game();


























////////////////////////////////////////////////////////////////////