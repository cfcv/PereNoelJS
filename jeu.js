//Getting the canvas and its context
var canvas = document.getElementById("MainCanvas");
context = canvas.getContext('2d');

//defining position of the time in canvas
time_posx = 200
time_posy = 10

//Setting the background image in the canvas
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
let position=[0, 60];

//Setting the initial santa claus
pereNoel = new Image();
pereNoel.src = 'ressources/santa.png';
pereNoel.onload = () => {
    context.drawImage(pereNoel, 70, 110, 70, 100, position[0], position[1], 20, 20);
}

let directions={
	
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

let drawSapin = function (s){
	console.log(s)
	//sapin.draw(context);
	s.image.src = 'ressources/tree.png';
	s.image.onload = function(){
		pos = s.getPos();
		context.drawImage(s.image, 290, 200, 60, 90, pos[0], pos[1], 25, 25);
	}
}

let sapins=[];
let seconds = 0;
let counter = setInterval(function(){
	console.log(++seconds);
	//context.clearRect(time_posx,time_posy, 100, 100);
	//context.fillText('Time: '+seconds, time_posx, time_posy);
  	if(seconds%10 == 0){
		//generate sapin
		console.log("entrou");
		//let x=Math.floor((Math.random()*780)+1);
		let x=Math.floor((Math.random()*280)+1);
		//let y=Math.floor((Math.random()*580)+1);
		let y=Math.floor((Math.random()*130)+1);
		
 		let n= Math.floor(Math.random());
 		let lifetime =(n<0.7) ? 10 : 20;		
		
		s = new Sapin(lifetime,x, y);
		drawSapin(s);
	  }
},1000);



// let counter=function incrementSeconds(seconds) {
// 	seconds += 1;
// 	console.log(seconds);
// 	if(seconds%10==0){
// 		console.log("entrou");
// 		generate sapin
// 		let x=Math.floor((Math.random()*780)+1);
// 		let y=Math.floor((Math.random()*580)+1);
		
// 		let n= Math.floor(Math.random());
// 		let seconds =(n>0.7) ? 10 : 20;		
		
// 		s = new Sapin(seconds,x, y);
// 		sapins.push(s);
		
		
// 		remove sapin non decore
		
// 		drawSapin(s);
// 	}
// 	else if(seconds%20 == 0){
// 		remove decoree
// 	}	
// }
// setInterval(counter, 1000);

//let sapins=[new Sapin(10, 0, 0)];
//drawSapins();

//sapin= new Sapin(10, 10,10);
//sapin.draw(context);



