class Pipe {
	
	constructor(speed) {
		this.width = 40;
		this.x = canvas.width + this.width;
		this.height = random(100, 300);
		this.gap = random(60, 200);
		this.speed = speed;
		this.bottom = this.height + this.gap;
		this.hit = false;
	}
	
	update() {
		this.x -= this.speed;
	}
	
	offScreen() {
		return (this.x + this.width < 0);
	}
	
	collide(bird) {
		return ((bird.x + bird.size >= this.x && bird.x <= this.x + this.width && bird.y + bird.size >= 0 && bird.y <= this.height)
			|| (bird.x + bird.size >= this.x && bird.x <= this.x + this.width && bird.y + bird.size >= this.bottom && bird.y <= canvas.height));
	}
	
	checkCollision(x, y, size) {
		return ((x + size >= this.x && x <= this.x + this.width && y + size >= 0 && y <= this.height)
			|| (x + size >= this.x && x <= this.x + this.width && y + size >= this.bottom && y <= canvas.height));
	}
	
	show() {
		ctx.drawImage(Img.pipeDwn, 0, 0, Img.pipeDwn.width, Img.pipeDwn.height, this.x, 0, this.width, this.height);
		ctx.drawImage(Img.pipeUp, 0, 0, Img.pipeUp.width, Img.pipeUp.height, this.x, this.bottom, this.width, canvas.height);
	}
	
}