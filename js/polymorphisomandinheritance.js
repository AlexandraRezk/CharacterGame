var ctx = document.getElementById("ctx").getContext("2d");
ctx.font = '30px Arial';

var HEIGHT = 500;
var WIDTH = 500;
var timeWhenGameStarted = Date.now(); //return time in ms

var player;
var enemyList = {};
	
Entity = function (type,id,x,y,spdX,spdY,width,height,color){
	var self = {
	type:type,
	x:x,
	spdX:spdX,
	y:y,
	spdY:spdY,
	width:width,
	height:height,
	color:color
	};
	
	self.update = function(){
		self.updatePosition();
		self.draw();
	}
	self.updatePosition = function (){
	
	self.x += self.spdX;
	self.y += self.spdY;
	
	if(self.x <0 || self.x > WIDTH){
		self.spdX = -self.spdX;
		}
	if(self.y < 0 || self.y > HEIGHT){
		self.spdY = -self.spdY
		}
}
self.getDistance = function (entity2){ //return distance (number)
	var vx = self.x - entity2.x;
	var vy = self.y - entity2.y;
	return Math.sqrt(vx*vx+vy*vy);
}
self.testCollision = function (entity2){ //return if colliding (true/false)
	var rect1 = {
		x:self.x-self.width/2,
		y:self.y-self.height/2,
		width:self.width,
		height:self.height
	}
	var rect2 = {
		x:entity2.x-entity2.width/2,
		y:entity2.y-entity2.height/2,
		width:entity2.width,
		height:entity2.height
	}
	return testCollisionRectRect(rect1,rect2);
}
self.draw = function(){
	ctx.save();
	ctx.fillStyle = self.color;
	ctx.fillRect(self.x-self.width/2,self.y-self.height/2,self.width,self.height);
	ctx.restore();
}
	return self;
}

Player = function (){
	var self = Entity('player','myID',50,40,30,5,20,20,'green');
	
	self.updatePosition = function(){
		if(self.pressingRight){
                self.x += 10;
		}
        if(self.pressingLeft) {
                self.x -= 10;
		}
        if(self.pressingDown) {
               	self.y += 10;
		}
        if(self.pressingUp){
                self.y -= 10;
		}
       
        //ispositionvalid
        if(self.x < self.width/2) {
                self.x = self.width/2;
		}
        if(self.x > WIDTH-self.width/2) {
                self.x = WIDTH - self.width/2;
		}
        if(self.y < self.height/2) {
                self.y = self.height/2;
		}
        if(self.y > HEIGHT - self.height/2){
                self.y = HEIGHT - self.height/2;
		}
	}
	self.hp = 10;
	self.pressingDown = false;
	self.pressingUp = false;
	self.pressingLeft = false;
	self.pressingRight = false;
	return self;
}






Enemy = function (id,x,y,spdX,spdY,width,height){
	var self = Entity('enemy',id,x,y,spdX,spdY,width,height,'red');
	enemyList[id] = self;
}

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
	
	for(var key in enemyList){
		enemyList[key].update();
		
		var isColliding = player.testCollision(enemyList[key]);
		if(isColliding){
			player.hp = player.hp - 1;
			if(player.hp <= 0){
				var timeSurvived = Date.now() - timeWhenGameStarted;
				
				console.log("You lost! You survived for " + timeSurvived + "ms.");
				timeWhenGameStarted = Date.now();
				player.hp = 10;
			}
		}
	}
	player.update();
	ctx.fillText(player.hp + " Hp",0,30);
}
player = Player();
Enemy('E1',150,350,10,15,30,30);
Enemy('E2',250,350,10,-15,20,20);
Enemy('E3',250,150,10,-5,40,10);

setInterval(update,40);