const canvas = document.getElementById('game');

const ctx = canvas.getContext('2d');

class snakePart{
	constructor(x, y){
		this.x = x;
		this.y = y;
	}
}

let speed = 10;

let tileCount = 20;
let tileSize = canvas.width / tileCount - 2;
let headX = 10;
let headY = 10;
const snakeParts = [];
let tailLength = 2;

let appleX = 5;
let appleY = 5;

let xVelocity = 0;
let yVelocity = 0;

let score = 0;

//const gulpSound = new Audio("apple-bite.mp3");
const gameOverSound = new Audio("game-over.mov");




//game loop
function drawGame(){	
	changeSnakePosition();
	let result = isGameOver();
	
	if(result){
		return;
	}
	
	clearScreen();
	
	checkAppleCollision();
	drawApple();
	drawSnake();
	drawScore();
	
	setTimeout(drawGame, 1000 / speed);
}

function isGameOver(){
	let gameOver = false;
	
	if(xVelocity === 0 && yVelocity ===0){
		return false;
	}
	
	//walls
	if(headX < 0){
		gameOver = true;
	}
	
	if(headX === tileCount){
		gameOver = true;
	}
	
	if(headY < 0){
		gameOver = true;
	}
	
	if(headY === tileCount){
		gameOver = true;
	}
	
	for(let i = 0; i < snakePart.length; i++){
		let part = snakeParts[i];
		if(part.x === headX && part.y === headY){
			gameOver = true;
			break;
		}
	}
	
	if(gameOver){
		ctx.fillStyle = 'white';
		ctx.font = '50px Arial';
		ctx.fillText("GAME OVER!", canvas.width / 10,canvas.height / 2);
		gameOverSound.play();
	}
	
	return gameOver;
}

function drawScore(){
	ctx.fillStyle = 'white';
	ctx.font = '10px Arial';
	ctx.fillText("Score " + score,canvas.width-50,20)
}

function clearScreen(){
	ctx.fillStyle = '#201E60';
	ctx.fillRect(0,0,canvas.width,canvas.height);
}

function drawSnake(){	
	ctx.fillStyle = '#29AED6';
	for(let i = 0; i < snakeParts.length; i++){
		let part = snakeParts[i];
		ctx.fillRect(part.x * tileCount,part.y * tileCount,tileSize,tileSize);
	}
	
	//Put an item at the end of the list
	snakeParts.push(new snakePart(headX, headY));
	while(snakeParts.length > tailLength){
		//Remove the furthest item from the snake part if we have more than our tail size
		snakeParts.shift();
	}
	
	ctx.fillStyle = '#29AED6';
	ctx.fillRect(headX * tileCount, headY * tileCount, tileSize, tileSize);
}

function changeSnakePosition(){
	headX = headX + xVelocity;
	headY = headY + yVelocity;
}

function checkAppleCollision(){
	if(appleX === headX && appleY === headY){
		appleX = Math.floor(Math.random() * tileCount);
		appleY = Math.floor(Math.random() * tileCount);
		tailLength++;
		score++;
		//gulpSound.play();
	}
}

function drawApple(){
	ctx.fillStyle = '#29AED6';
	ctx.fillRect(appleX * tileCount,appleY * tileCount,tileSize,tileSize);
}

document.body.addEventListener('keydown', keyDown);

function keyDown(event){
	//up
	if(event.keyCode == 38){
		if(yVelocity == 1){
			return;
		}
		xVelocity = 0;
		yVelocity = -1;
	}
	
	//down
	if(event.keyCode == 40){
		if(yVelocity == -1){
			return;
		}
		xVelocity = 0;
		yVelocity = 1;
	}
	
	//left
	if(event.keyCode == 37){
		if(xVelocity == 1){
			return;
		}
		xVelocity = -1;
		yVelocity = 0;
	}
	
	//right
	if(event.keyCode == 39){
		if(xVelocity == -1){
			return;
		}
		xVelocity = 1;
		yVelocity = 0;
	}
}

drawGame();





