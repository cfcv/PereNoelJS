//Getting the canvas and its context
var canvas = document.getElementById("MainCanvas");
context = canvas.getContext('2d');

//defining pos_pere_noel of the time in canvas
time_posx = 200
time_posy = 10

//Defining the pos_pere_noels of the decoreted and no decorated trees
pos_tree = []
pos_decorated_tree = [352, 290, 65, 90];
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
let pos_pere_noel=[0, 60];

//Setting the initial santa claus
pereNoel = new Image();
pereNoel.src = 'ressources/santa.png';
pereNoel.onload = () => {
    context.drawImage(pereNoel, 70, 110, 70, 100, pos_pere_noel[0], pos_pere_noel[1], 40, 40);
}

let directions={
	
	"ArrowRight": [140,110, 6, 0],
	"ArrowLeft": [0, 310, -6, 0],
	"ArrowUp": [0,10, 0, -6],
	"ArrowDown":  [0,210, 0, 6]
	
};




checkMove = function(){
	for(var i =0; i < sapins.length; i++){
		let centre_pere = [pos_pere_noel[0]+20, pos_pere_noel[1]+20];
		let centre_sapin = [sapins[i].x + 25, sapins[i].y+25];
		dist = Math.sqrt(Math.pow(centre_pere[0]-centre_sapin[0], 2) + Math.pow(centre_pere[1]-centre_sapin[1], 2))
		//console.log(dist + " :" + i);
		if(dist <= 50){
			let tupla = [];
			if(centre_sapin[0] > centre_pere[0]){
				if(centre_pere[1] < centre_sapin[1]+50 && centre_pere[1] > centre_sapin[1]-50){
					tupla.push("ArrowRight");
				}
			}
			else{
				if(centre_pere[1] < centre_sapin[1]+50 && centre_pere[1] > centre_sapin[1]-50){
					tupla.push("ArrowLeft");
				}
			}
			if(centre_pere[1] < centre_sapin[1]){
				if(centre_pere[0] < centre_sapin[0]+40 && centre_pere[0] > centre_sapin[0]-40){
					tupla.push("ArrowDown");
				}
			}
			else{
				if(centre_pere[0] < centre_sapin[0]+40 && centre_pere[0] > centre_sapin[0]-40){
					tupla.push("ArrowUp");
				}
			}
			return [false, tupla];
		}
	}

	return [true, null];
}

let sapins=[];
let p = null;
document.onkeydown=function(e){
	
	if (directions[e.key] === undefined){
		return;
	}
	let move = checkMove()
	//console.log(move);
	if(!move[0]){
		if(move[1].indexOf(e.key) > -1){
			return;
		}
	}
	p=directions[e.key];	
	context.clearRect(pos_pere_noel[0],pos_pere_noel[1], 40, 40);
	pos_pere_noel[0]+=p[2];
	pos_pere_noel[1]+=p[3];
	context.drawImage(pereNoel, p[0], p[1], 70, 100, pos_pere_noel[0], pos_pere_noel[1], 40, 40);
	
}

let drawSapin = function (s){
	console.log(s)
	//sapin.draw(context);
	s.image.src = 'ressources/tree.png';
	s.image.onload = function(){
		pos = s.getPos();
		context.drawImage(s.image, 290, 200, 60, 90, pos[0], pos[1], 50, 50);
	}
}


let seconds = 0;
let counter = setInterval(function(){
	seconds++
	console.log(seconds);
	//context.clearRect(time_posx,time_posy, 100, 100);
	//context.fillText('Time: '+seconds, time_posx, time_posy);
  	if(seconds%10 == 0){
		//generate sapin
		console.log("entrou");
		let x=Math.floor((Math.random()*780)+1);
		let y=Math.floor((Math.random()*580)+1);
		
		let n= Math.floor(Math.random());
		let lifetime =(n>0.7) ? 10 : 20;		
		
		s = new Sapin(lifetime,x, y, seconds);
		
		for(i = 0; i < sapins.length; i++){
			if(seconds >= sapins[i].start + sapins[i].lifetime){
				console.log('suppresion: ' + sapins[i]);
				context.clearRect(sapins[i].x,sapins[i].y, 50, 50);
				sapins.splice(i, 1);
			}
		}
		sapins.push(s);
		console.log(sapins);
		drawSapin(s);
	  }
},1000);