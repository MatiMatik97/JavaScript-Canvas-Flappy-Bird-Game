class Bird {
	
	constructor() {
		this.size = 30;
		this.x = canvas.width / 4;
		this.y = canvas.height / 2 - this.size / 2;
		this.grav = 0.3;
		this.vel = 2;
		this.collectedCoin = false;
	}
	
	update() {
		if(this.y + this.size >= canvas.height) {
			this.y = canvas.height - this.size;
		}
		
		if(this.y <= 0) {
			this.y = 0;
		}
		
		this.y += this.grav;
		this.y += this.vel;
		if(this.vel < 2) {
			this.vel += this.grav;
		}
	}
	
	show() {
		ctx.drawImage(Img.bird, 0, 0, Img.bird.width, Img.bird.height, this.x, this.y, this.size, this.size);
	}
	
	showTextOnCollectedCoin() {
		if(this.collectedCoin) {
			ctx.textAlign = "center";
			ctx.fillStyle = "#000000";
			ctx.font = "15px Arial";
			ctx.fillText("COIN!", bird.x - 5, bird.y - 15);
			ctx.font = "10px Arial";
			ctx.textAlign = "start";
		}
	}
	
}