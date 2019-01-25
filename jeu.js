//Getting the canvas and its context
var canvas = document.getElementById("MainCanvas");
context = canvas.getContext('2d');

var argent_object = document.getElementById("argent");
var cadeaux_object = document.getElementById("cadeaux");
var time_object = document.getElementById("time");

//defining pos_pere_noel of the time in canvas
let time_posx = 200
let time_posy = 10
let cadeaux = 100
let argent = 100
const size_lutin = [25, 25]
const size_pere = [40, 40]
const size_boule = [20, 20]
const size_sapin = [50, 50]

//Defining the pos_pere_noels of the decoreted and no decorated trees
let pos_decorated_tree = [352, 290, 65, 90];
let pos_decorated_cadeux = [352, 290, 65, 90];

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

// lutin = new Image();
// lutin.src = 'ressources/lutin.png';
// lutin.onload = () => {
//     context.drawImage(lutin, 4, 0, 24, 32, 50, 50, 25, 25);
// }

let pos_pere_noel=[0, 60];
let boule = null;
let BOULE_CATCHED = false;
let stop_lutins_time = 15;
let count_lutins_stop_time = 0;

//Setting the initial santa claus
pereNoel = new Image();
pereNoel.src = 'ressources/santa.png';
pereNoel.onload = () => {
    context.drawImage(pereNoel, 70, 110, 70, 100, pos_pere_noel[0], pos_pere_noel[1], 40, 40);
}

let directions_pere={
	"ArrowRight": [140,110, 6, 0],
	"ArrowLeft": [0, 310, -6, 0],
	"ArrowUp": [0,10, 0, -6],
	"ArrowDown":  [0,210, 0, 6]
};

let directions_lutin={
	0: [4, 64, 24, 32, 10, 0],	//right	[sx, sy, swidth, sheight, velocityX, velocityY]
	1: [4, 32, 24, 32, -10, 0],	//left	[sx, sy, swidth, sheight, vx, vy]  
	2: [4, 96, 24, 32, 0, -10],	//up	[sx, sy, swidth, sheight, vx, vy] 
	3: [4, 0, 24, 32, 0, 10]		//down	[sx, sy, swidth, sheight, vx, vy] 
}


checkMove = function(){
	let centre_pere = [pos_pere_noel[0]+20, pos_pere_noel[1]+20];
	if(boule != null){
		let centre_boule = [boule.x+10, boule.y+10];
		dist_boule = Math.sqrt(Math.pow(centre_pere[0]-centre_boule[0], 2) + Math.pow(centre_pere[1]-centre_boule[1], 2));
		//console.log(dist_boule);
		if(dist_boule <= 35){
			BOULE_CATCHED = true;
			context.clearRect(boule.x, boule.y, size_boule[0], size_boule[1]);
			boule = null;
			count_lutins_stop_time = 0;
		}
	}
	for(var i =0; i < sapins.length; i++){
		let centre_sapin = [sapins[i].x + 25, sapins[i].y+25];
		dist = Math.sqrt(Math.pow(centre_pere[0]-centre_sapin[0], 2) + Math.pow(centre_pere[1]-centre_sapin[1], 2));
		//console.log(dist + " :" + i);
		if(dist <= 50){
			if(sapins[i].empty){
				sapins[i].empty=false;
				deposee = (sapins[i].lifetime == 20) ? 5 : 10;
				cadeaux -= deposee;
			}
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
	
	if (directions_pere[e.key] === undefined){
		return;
	}

	let move = checkMove()
	//console.log(move);
	if(!move[0]){
		if(move[1].indexOf(e.key) > -1){
			return;
		}
	}
	p=directions_pere[e.key];	
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
	for(let i = 0; i < s.lutins.length; i++){
		let lutin = s.lutins[i];
		lutin.image.src = 'ressources/lutin.png';
		lutin.image.onload = function(){
			positions = directions_lutin[lutin.initial_pos];
			context.drawImage(lutin.image, positions[0], positions[1], positions[2], positions[3], lutin.x, lutin.y, size_lutin[0], size_lutin[1]);
		}
	}
}


moveLutins = setInterval(function() {
	if(!BOULE_CATCHED){
		let centre_pere = [pos_pere_noel[0]+20, pos_pere_noel[1]+20];
		for(let i = 0; i < sapins.length; i++){
			for(let j = 0; j < sapins[i].lutins.length; j++){
				let r = Math.floor((Math.random()*20)+1);
				r = r%4;
				let direct = directions_lutin[r];
				context.clearRect(sapins[i].lutins[j].x, sapins[i].lutins[j].y, size_lutin[0], size_lutin[1]);
				sapins[i].lutins[j].x += direct[4];
				sapins[i].lutins[j].y += direct[5];
				context.drawImage(sapins[i].lutins[j].image, direct[0], direct[1], direct[2], direct[3], sapins[i].lutins[j].x, sapins[i].lutins[j].y, size_lutin[0], size_lutin[1]);
				let centre_lutin = [sapins[i].lutins[j].x + 25, sapins[i].lutins[j].y+25];
				dist = Math.sqrt(Math.pow(centre_pere[0]-centre_lutin[0], 2) + Math.pow(centre_pere[1]-centre_lutin[1], 2));
				if(dist <= 50){
					argent -= 5;
				}
				 
			}
		}
	}
}, 500);

clearGame = function(){
	context.clearRect(0, 0, 800, 600);
	sapins = [];
	//context.clearRect(pos_pere_noel[0], pos_pere_noel[1], size_pere[0], size_pere[1]);
	pos_pere_noel=[0, 60];
	context.drawImage(pereNoel, 70, 110, 70, 100, pos_pere_noel[0], pos_pere_noel[1], 40, 40);
	seconds = 0;
	cadeaux = 100
	argent = 100
}


showTime = setInterval(function(){
	let minutes = Math.floor(seconds / 60);
	let seconds_layout = seconds - minutes * 60;
	time_object.innerHTML = "Temps: " + minutes + ":" + seconds_layout;
	cadeaux_object.innerHTML = "Cadeaux: " + cadeaux;
	argent_object.innerHTML = "Argent: " + argent;

	if(seconds >= 210 || argent <= 0){
		alert('You lose with '+ cadeaux + ' gifts remaining');
		clearGame();
	}
	else if(cadeaux <= 0){
		alert('You won with '+ argent + ' euros');
		clearGame();
	}
}, 100);

let seconds = 0;
let counter = setInterval(function(){
	seconds++

	if(BOULE_CATCHED){
		count_lutins_stop_time += 1;
		if(count_lutins_stop_time >= stop_lutins_time){
			BOULE_CATCHED = false;
		}
	}
	if(seconds == 70 || seconds == 150){
		let x=Math.floor((Math.random()*760)+1);
		let y=Math.floor((Math.random()*560)+1);
		boule = new Boule(x, y, seconds);
		boule.image.src = "ressources/boule.jpeg";
		boule.image.onload = function(){
			context.drawImage(boule.image, x, y, size_boule[0], size_boule[1]);
		}
	}	
  	if(seconds%10 == 0){
		//generate sapin
		let x=Math.floor((Math.random()*760)+1);
		let y=Math.floor((Math.random()*560)+1);
		
		let n= Math.random();
		let lifetime =(n>0.7) ? 10 : 20;		
		
		s = new Sapin(lifetime,x, y, seconds);
		
		for(let i = 0; i < sapins.length; i++){
			if(seconds >= sapins[i].start + sapins[i].lifetime){
				context.clearRect(sapins[i].x,sapins[i].y, 50, 50);
				for(let j = 0; j < sapins[i].lutins.length; j++){
					context.clearRect(sapins[i].lutins[j].x, sapins[i].lutins[j].y, size_lutin[0], size_lutin[1]);
				}
				sapins.splice(i, 1);
			}
		}

		if(boule != null && (seconds - boule.start) >= boule.lifetime){
			context.clearRect(boule.x, boule.y, size_boule[0], size_boule[1]);
			boule = null;
		}
		//generate lutins
		if(lifetime == 20){
			//generate only one lutin
			let l_x=Math.floor((Math.random()*760)+1);
			let l_y=Math.floor((Math.random()*560)+1);

			s.lutins.push(new Lutin(l_x, l_y));
		}
		else{
			//generate two lutins
			//first lutin
			let l_x=Math.floor((Math.random()*760)+1);
			let l_y=Math.floor((Math.random()*560)+1);

			s.lutins.push(new Lutin(l_x, l_y));
			
			//second lutin
			l_x=Math.floor((Math.random()*760)+1);
			l_y=Math.floor((Math.random()*560)+1);

			s.lutins.push(new Lutin(l_x, l_y));
		}

		sapins.push(s);
		drawSapin(s);
	}
},1000);