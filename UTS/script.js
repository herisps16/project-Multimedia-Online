var canvas = document.querySelector('canvas');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
console.log(canvas);

var context = canvas.getContext('2d');

var mouse = {
	x: 1166,
	y: undefined
}

var maxRad = 45;

var colorArray = [
	'#FFFFFF',
];

window.addEventListener('mousemove', function(event)
	{
	mouse.x = event.x;
	mouse.y = event.y;
})

window.addEventListener('resize', function()
	{
		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;

		init();
})

function Circle(x, y, dx, dy, radius){
	this.x = x;
	this.y = y;
	this.dx = dx;
	this.dy = dy;
	this.radius = radius;
	this.minRad = radius;
	this.color = colorArray[Math.floor(Math.random() * colorArray.length)];

	this.draw =  function(){
		context.beginPath();
		context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
		context.fillStyle = this.color;
		context.fill();
	}

	this.update = function(){
		if (this.x + this.radius > innerWidth || this.x - this.radius < 0){
			this.dx = -this.dx;
		}

		if(this.y + this.radius > innerHeight || this.y - this.radius < 0){
			this.dy = -this.dy;
		}

		this.x += this.dx;
		this.y += this.dy;

		//interactivity
		if(mouse.x - this.x < 50 && mouse.x - this.x > -50 && mouse.y - this.y < 50 && mouse.y - this.y > -50){
			if(this.radius < maxRad){
				this.radius += 1;
			}
		}else if(this.radius > this.minRad){
			this.radius -= 1;
		}

		this.draw();
	}
}


var circleArray = [];




function init(){

	circleArray = [];

	for (var i = 0; i < 1000; i++){
		var radius = Math.random() * 3 + 1;
		var x = Math.random() * (innerWidth - radius * 2) + radius;
		var y = Math.random() * (innerHeight - radius * 2) + radius;
		var dx = (Math.random() - 0.5);
		var dy = (Math.random() - 0.5);
		

		circleArray.push(new Circle(x, y, dx, dy, radius));
	}

}

function animate(){
	requestAnimationFrame(animate);
	context.clearRect(0, 0, innerWidth, innerHeight);

	for(var i = 0; i < circleArray.length; i++){
		circleArray[i].update();
	}

}

animate();
init();