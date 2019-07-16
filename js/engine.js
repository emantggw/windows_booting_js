/*




			



							++==	+==	   ==+	===+  ++===+    |
							||__	|  \  /	 |	 __|  ||   |  __+__		 
							||		|	\/	 |	|  |  ||   |	|
							++==	|		 |	+==+  ||   |	|___

									Created at 2019/7/16
										Windows Booting Animation








*/
var canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;


var c = canvas.getContext('2d');

function range(min, max) {
	return Math.floor(Math.random() * (max - min + 1) + min);
}
var mouse = {
	x: undefined,
	y: undefined
};
window.addEventListener('mousemove', function (e) {
	mouse.x = e.x;
	mouse.y = e.y;
});


var pointer = 1;
function Ball(x, y, r, rd) {
	this.radius = r;
	this.x = x;
	this.y = y;
	this.fill = 'white';
	this.gap = 70;
	this.radian = rd;
	this.speed = 0.005;
	this.by = pointer / 100;
	pointer++;

	this.update = () => {
		if ((this.radian - rd) <= Math.PI * 2) {
			this.by += 0.000020
			this.speed += this.by;
			this.radian += this.speed;
			this.x += Math.cos(this.radian) * this.gap * this.speed;
			this.y += Math.sin(this.radian) * this.gap * this.speed;
		} else {
			this.radian = rd;
			this.x = x;
			this.y = y;
			this.speed = 0.005;
			this.by = 0.0000;

		}
		this.draw();
	};

	this.draw = () => {


		c.beginPath();
		c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
		c.fillStyle = this.fill;
		c.fill();
		c.closePath();
	}
}


var balls;
function init() {
	balls = [];

	const radius = 10;
	const gap = 30;
	var radian = 0.0;
	var x = innerWidth / 2;
	var y = innerHeight / 4;

	balls.push(new Ball(x, y, radius, 0));

	while (radian < Math.PI / 2) {
		radian += 0.5;
		x += Math.cos(radian) * 35;
		y += Math.sin(radian) * 35;
		balls.push(new Ball(x, y, radius, radian));
	}

	var temp = { x: balls[0].x, y: balls[0].y, rd: balls[0].radian };
	balls[0].x = balls[balls.length - 1].x;
	balls[0].y = balls[balls.length - 1].y;
	balls[0].radian = balls[balls.length - 1].radian;


	balls[balls.length - 1].x = temp.x;
	balls[balls.length - 1].y = temp.y;
	balls[balls.length - 1].radian = temp.rd;


}

function animate() {
	requestAnimationFrame(animate);
	c.fillStyle = 'rgba(0,0,0,0.009)';
	c.clearRect(0, 0, innerWidth, innerHeight);

	balls.forEach(ball => {
		ball.update();
	});

}

init();
animate();