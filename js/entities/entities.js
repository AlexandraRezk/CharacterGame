var player;

	
Entity = function (type,id,x,y,spdX,spdY,width,height,img){
	var self = {
	type:type,
	x:x,
	y:y,
	spdX:spdX,
	spdY:spdY,
	width:width,
	height:height,
	img:img
	};
	
	self.update = function(){
		self.updatePosition();
		self.draw();
		self.spriteAnimCounter += 0.2;
	}
	self.updatePosition = function (){
	
	self.x += self.spdX;
	self.y += self.spdY;
	
	if(self.x <0 || self.x > currentMap.width){
		self.spdX = -self.spdX;
		}
	if(self.y < 0 || self.y > currentMap.height){
		self.spdY = -self.spdY
		}
}
	self.spriteAnimCounter = 0;
self.draw = function(){
	ctx.save();
	var x = self.x - player.x; //offset for player X
	var y = self.y - player.y; //offset for player Y
	
	x += WIDTH/2;
	y += HEIGHT/2;
	
	x -= self.width/2;
	y -= self.height/2;
	
	var frameWidth = self.img.width/3;
	var frameHeight = self.img.height/4;
	
	var directionMod = 3; //draw right
	if(player.pressingDown && y < currentMap.height - self.height){
		directionMod = 2;
	} //down
	if(player.pressingLeft > 0){
		directionMod = 1;
	} //left
	if(player.pressingUp && y > 0){
		directionMod = 0;
	} //up
	
	var walkingMod = Math.floor(self.spriteAnimCounter % 3);
	ctx.drawImage(self.img,walkingMod*frameWidth,directionMod*frameHeight,frameWidth,frameHeight,x,y,self.width,self.height);
	
	ctx.restore();
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

	return self;
}

Player = function (){
	var self = Entity('player','myID',50,40,0,0,50,70,Img.player);
	
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
        if(self.x > currentMap.width-self.width/2) {
                self.x = currentMap.width - self.width/2;
		}
        if(self.y < self.height/2) {
                self.y = self.height/2;
		}
        if(self.y > currentMap.height - self.height/2){
                self.y = currentMap.height - self.height/2;
		}
	}
	var super_update = self.update;
	self.update = function(){
		super_update();
		if(self.hp <= 0){
				var timeSurvived = Date.now() - timeWhenGameStarted;
				
				console.log("You lost! You survived for " + timeSurvived + "ms.");
				timeWhenGameStarted = Date.now();
				self.hp = 10;
			}
	}
	self.hp = 10;
	self.pressingDown = false;
	self.pressingUp = false;
	self.pressingLeft = false;
	self.pressingRight = false;
	return self;
}

Enemy = function (id,x,y,spdX,spdY,width,height,img){
	
	var self = Entity('enemy',id,x,y,spdX,spdY,width,height,img);
		/*self.updatePosition = function (){
			var diffX = player.x - self.x;
			var diffY = player.y - self.y;
			 if (diffX > 0) {
				 self.x += 3;
			 } else{
				 self.x -= 3;
			 }
			if (diffY > 0) {
				 self.y += 3;
			 } else{
				 self.y -= 3;
			 }
		}//Makes the enemies follow the character*/
	var super_update = self.update;
	self.update = function(){
		super_update();
	var isColliding = player.testCollision(self);
		if(isColliding){
			player.hp = player.hp - 1;
		}
	}
	Enemy.list[id] = self;
}

Enemy.list = {};
Enemy.update = function(){
	for(var key in Enemy.list){
		Enemy.list[key].update();
		
	}
}