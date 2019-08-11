const bgColor = "#334200";
const snakeColor = "#b6c142";
const foodColor = "#707e00";

const tileCount = 15;
const tileSize = 35;

let snakeLength = 1;
let snakePath = [];

let directionX = 0;
let directionY = 0;

let headX = 5;
let headY = 5;

let foodX = 10;
let foodY = 5;

const changeDirection = event => {
	const key = event.key;

	if (key === 'ArrowUp' && directionY !== 1) {
		directionX = 0; directionY = -1;
	}
	if (key === 'ArrowDown' && directionY !== -1) {
		directionX = 0; directionY = 1;
	}
	if (key === 'ArrowLeft' && directionX !== 1) {
		directionX = -1; directionY = 0;
	}
	if (key === 'ArrowRight' && directionX !== -1) {
		directionX = 1; directionY = 0;
	}
};

const cycle = () => {
	headX += directionX;
	headY += directionY;

	if (headX < 0) {
		headX = tileCount - 1;
	}
	if (headX > tileCount - 1) {
		headX = 0;
	}
	if (headY < 0) {
		headY = tileCount - 1;
	}
	if (headY > tileCount - 1) {
		headY = 0;
	}

	context.fillStyle = bgColor;
	context.fillRect(0, 0, canvas.width, canvas.height);

	context.fillStyle = snakeColor;
	for (var i = 0; i < snakePath.length; i++) {
		context.fillRect(snakePath[i].x * tileSize, snakePath[i].y * tileSize, tileSize, tileSize);

		if (snakePath[i].x == headX && snakePath[i].y == headY) {
			snakeLength = 1;
		}
	}

	snakePath.push({ x: headX, y: headY });

	while (snakePath.length > snakeLength) {
		snakePath.shift();
	}

	if (foodX == headX && foodY == headY) {
		snakeLength++;
		foodX = Math.floor(Math.random() * tileCount);
		foodY = Math.floor(Math.random() * tileCount);
	}

	context.fillStyle = foodColor;
	context.fillRect(foodX * tileSize, foodY * tileSize, tileSize, tileSize);
};

window.onload = () => {
	const canvas = document.getElementById("canvas");
	context = canvas.getContext("2d");
	document.addEventListener("keydown", changeDirection);
	setInterval(cycle, 75);
};