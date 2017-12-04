var ctx = document.getElementById("ctx").getContext("2d");
ctx.font = '30px Arial';

var HEIGHT = 500;
var WIDTH = 500;
var timeWhenGameStarted = Date.now(); //return time in ms

//loading the images in memory once
var Img = {};
Img.player = new Image();
Img.player.src = "img/player.png";
Img.enemy = new Image();
Img.enemy.src = "img/enemy.png";


testCollisionRectRect = function(rect1,rect2){
	return rect1.x <= rect2.x+rect2.width && rect2.x <= rect1.x+rect1.width && rect1.y <= rect2.y + rect2.height && rect2.y < rect1.y + rect1.height;
}

document.onkeydown = function(event){
        if(event.keyCode === 39) {       //d
                player.pressingRight = true;
			}
        else if(event.keyCode === 40) {   //s
                player.pressingDown = true;
			}
        else if(event.keyCode === 37){ //a
                player.pressingLeft = true;
			}
        else if(event.keyCode === 38){ // w
                player.pressingUp = true;
			}
}

document.onkeyup = function(event){
        if(event.keyCode === 39) {       //d
                player.pressingRight = false;
			}
        else if(event.keyCode === 40) {   //s
                player.pressingDown = false;
			}
        else if(event.keyCode === 37){ //a
                player.pressingLeft = false;
			}
        else if(event.keyCode === 38){ // w
                player.pressingUp = false;
			}
}


update = function(){
	ctx.clearRect(0,0,WIDTH,HEIGHT);
	currentMap.draw();
	for(var key in enemyList){
		enemyList[key].update();
		
	}
	player.update();
	ctx.fillText(player.hp + " Hp",0,30);
}

Maps = function(id,imgSrc,width,height){
	var self = {
		id:id,
		image: new Image(),
		width:width,
		height:height
	}
	self.image.src = imgSrc;
	self.draw = function(){
		var x = WIDTH/2- player.x;
		var y = HEIGHT/2- player.y;	ctx.drawImage(self.image,0,0,self.image.width,self.image.height,x,y,self.image.width*2,self.image.height*2);
	}
	return self;
}

currentMap = Maps('field','img/map.png',1280,960);

player = Player();
Enemy('E1',150,350,10,15,64,64);
Enemy('E2',250,350,10,-15,64,64);
Enemy('E3',250,150,10,-5,64,64);

setInterval(update,40);

