//Getting the canvas and its context
var canvas = document.getElementById("MainCanvas");
context = canvas.getContext('2d');

//Setting the backgounrd image in the canvas
/*
texture = new Image();
//texture.src = 'bonus/Texture/snow1_s.jpg';
texture.onload = () => {
	
	for(i =0; i< 800; i+=10){
		for(j=0; j<600; j+=10){
		context.drawImage(texture, i , j, 10, 10);		
		}	
	}
}
*/
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


var sapins=[];
var seconds = new Date().getTime();

var counter=function incrementSeconds(seconds) {
	seconds += 1;
	console.log(seconds);
	if(seconds%10==0){
		console.log("entrou");
		//generate sapin
		var x=Math.floor((Math.random()*780)+1);
		var y=Math.floor((Math.random()*580)+1);
		
		var n= Math.floor(Math.random());
		var seconds =(n>0.7) ? 10 : 20;		
		
		s = new Sapin(seconds,x, y);
		sapins.push(s);
		
		
		//remove sapin non decore
		
		drawSapin(s);
	}
	else if(seconds%20 == 0){
		//remove decoree
	}	
}
setInterval(counter, 1000);

//var sapins=[new Sapin(10, 0, 0)];
sapain_image = new Image();
sapain_image.src = 'ressources/tree.png';
function drawSapin(s){
		//console.log(sapin)
		//sapin.draw(context);
		pos = s.getPos();
		context.drawImage(sapain_image, 290, 200, 60, 90, pos[0], pos[1], 25, 25);
}
//drawSapins();

//sapin= new Sapin(10, 10,10);
//sapin.draw(context);



