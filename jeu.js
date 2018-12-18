//Getting the canvas and its context
var canvas = document.getElementById("MainCanvas");
context = canvas.getContext('2d');

//Setting the backgounrd image in the canvas
texture = new Image();
texture.src = 'bonus/Texture/snow1_s.jpg';
texture.onload = () => {
    context.drawImage(texture, 0 , 0, 800, 600);
}

var position=[0, 60];

//Setting the initial santa claus
pereNoel = new Image();
pereNoel.src = 'ressources/santa.png';
pereNoel.onload = () => {
    context.drawImage(pereNoel, 70, 110, 70, 100, position[0], position[1], 20, 20);
}

var directions={
	
	"ArrowRight": [140,110, 1.5, 0],
	"ArrowLeft": [0, 310, -1.5, 0],
	"ArrowUp": [0,10, 0, -1.5],
	"ArrowDown":  [0,210, 0, 1.5]
	
};




document.onkeydown=function(e){
	
	if (directions[e.key] === undefined) {
		return;
	}
	p=directions[e.key];	
	context.clearRect(position[0],position[1], 20, 20);
	position[0]+=p[2];
	position[1]+=p[3];
	context.drawImage(pereNoel, p[0], p[1], 70, 100, position[0], position[1], 20, 20);
	
}


