function Sapin(lifetime, x, y, time){
	this.lifetime=lifetime;
	this.x=x;
	this.y=y;	
	this.empty=true;
	this.start=time;
	this.image=new Image();
}

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
