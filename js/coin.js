class Coin {
	
	constructor(x, y, size, speed) {
		this.x = x;
		this.y = y;
		this.size = size;
		this.speed = speed;
	}
	
	update() {
		this.x -= this.speed;
	}
	
	collect(bird) {
		return (bird.x + bird.size >= this.x && bird.x <= this.x + this.size && bird.y + bird.size >= this.y && bird.y <= this.y + this.size);
	}
	
	offScreen() {
		return (this.x + this.size < 0);
	}
	
	show() {
		ctx.drawImage(Img.coin, 0, 0, Img.coin.width, Img.coin.height, this.x, this.y, this.size, this.size);
	}
	
}
