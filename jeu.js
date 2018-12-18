//Getting the canvas and its context
var canvas = document.getElementById("MainCanvas");
context = canvas.getContext('2d');

//Setting the backgounrd image in the canvas
texture = new Image();
texture.src = 'bonus/Texture/snow1_s.jpg';
texture.onload = () => {
    context.drawImage(texture, 0 , 0, 800, 600);
}

//Setting the initial santa claus
pereNoel = new Image();
pereNoel.src = 'ressources/santa.png';
pereNoel.onload = () => {
    context.drawImage(pereNoel, 70, 110, 70, 100, 0, 60, 20, 20);
}


