var canvas = document.querySelector('canvas');
canvas.width=window.innerWidth;
canvas.height=window.innerHeight;

var c = canvas.getContext('2d');

//rectangles
// c.fillStyle = 'rgba(255, 0, 0, 0.5)'
// c.fillRect(100, 100, 100, 100);
// c.fillStyle = 'rgba(0, 0, 255, 0.5)'
// c.fillRect(300, 200, 100, 100);

//lines
// c.beginPath();
// c.moveTo(50, 300);
// c.lineTo(300, 100);
// c.lineTo(400, 300);
// c.strokeStyle = "#348900";
// c.stroke();

//arc / circle
//c.arc(x: Int, y: Int, radius: Int, startAngle: Float, endAngle: Float, drawCounterClockwise: Bool (false));
// c.beginPath();
// c.arc(500, 500 , 30, 0, Math.PI * 2, false);
// c.strokeStyle="#0000ff";
// c.stroke();

//using for loop to draw arc or circle 
// for(var i=0; i<1000; i++){
// 	var x = Math.random() * window.innerWidth;
// 	var y = Math.random() * window.innerHeight;
// 	c.beginPath();
// 	c.arc(x, y , 30, 0, Math.PI * 2, false);
// 	c.strokeStyle="#0000ff";
// 	c.stroke();
// 	}
//Using setInterval to draw
// setInterval(function drawCircle(){
// 	for(var i=0; i<5000; i++){
// 	var x = Math.random() * window.innerWidth;
// 	var y = Math.random() * window.innerHeight;
// 	c.beginPath();
// 	c.arc(x, y , 30, 0, Math.PI * 2, false);
// 	c.strokeStyle="#0000ff";
// 	c.stroke();
// 	}
// },200);

var mouse = {
	x: undefined,
	y: undefined
}

var maxRadius = 40;
var minRadius = 2;

var colorArray = [
	'#88BFB0',
	'#E8D5C3',
	'#D7B983',
	'#BF5D39',
	'#9B2E23'
];

window.addEventListener('mousemove', 
	function(event){
		mouse.x = event.x;
		mouse.y = event.y;
});

window.addEventListener('resize', 
	function(){
		canvas.width=window.innerWidth;
		canvas.height=window.innerHeight;
		init();
});

function Circle(x, y, dx, dy, radius){
	this.x = x;
	this.y = y;
	this.dx = dx;
	this.dy = dy;
	this.radius = radius;
	this.minRadius = radius;
	this.color = colorArray[Math.floor(Math.random() * colorArray.length)];

	this.draw = function(){
		c.beginPath();
		c.arc(this.x, this.y , this.radius, 0, Math.PI * 2, false);
		// c.strokeStyle="#0000ff";
		// c.stroke();
		c.fillStyle= this.color
		c.fill();

	}

	this.update = function(){
		if(this.x + this.radius>innerWidth || this.x - this.radius < 0){
		this.dx = -this.dx;
		}
		if(this.y + this.radius>innerHeight || this.y - this.radius < 0){
			this.dy = -this.dy;
		}
		this.x += this.dx;
		this.y += this.dy

		//intervactivity
		if(mouse.x - this.x < 50 && mouse.x - this.x >-50 && mouse.y - this.y < 50 && mouse.y - this.y > -50){
			if(this.radius < maxRadius){
				this.radius +=1;
			}
		}else if(this.radius > this.minRadius){
			this.radius -=1;
		}

		this.draw();
	}
}

var circleArray = [];

function init(){
	circleArray = [];
	for(var i = 0; i<1000; i++){
		var radius = Math.random() * 5 + 1 ;
		var x = Math.random() * (innerWidth - radius * 2) + radius;
		var y = Math.random() * (innerHeight - radius *2) + radius;
		var dx = (Math.random() - 0.5) * 5;
		var dy = (Math.random() - 0.5) * 5;
		circleArray.push(new Circle(x, y, dx, dy, radius));
	}

}

function animate(){
	requestAnimationFrame(animate);
	c.clearRect(0, 0, innerWidth, innerHeight);
	for (var i = 0; i < circleArray.length; i++) {
		circleArray[i].update();
	}
}		

animate();
init();