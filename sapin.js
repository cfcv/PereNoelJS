function Sapin(seconds, x, y){
	this.seconds=seconds;
	this.x=x;
	this.y=y;	
	this.empty=true;
}
var canvas = document.getElementById("MainCanvas");
context = canvas.getContext('2d');
Sapin.prototype.draw= function(){
	s = new Image();
	s.src = 'ressources/tree.png';
	s.onload = () => {
    context.drawImage(s, 290, 200, 60, 90, this.x, this.y, 25, 25);

	}
}

Sapin.prototype.placeGifts= function(){
	
	
}

Sapin.prototype.getPos = function(){
	return [this.x, this.y];
}
