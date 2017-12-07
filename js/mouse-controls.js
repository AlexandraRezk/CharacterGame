var ctx = document.getElementById("ctx").getContext("2d");
ctx.font = '30px Arial';

var HEIGHT = 500;
var WIDTH = 500;
var timeWhenGameStarted = Date.now(); //return time in ms

var player = {
	x:50,
	spdX:30,
	y:40,
	spdY:5,
	name:'P',
	hp:10,
	width:20,
	height:20,
	color:'green'
};

var enemyList = {};

getDistanceBetweenEntity = function (entity1,entity2){ //return distance (number)
	var vx = entity1.x - entity2.x;
	var vy = entity1.y - entity2.y;
	return Math.sqrt(vx*vx+vy*vy);
}

testCollisionEntity = function (entity1,entity2){ //return if colliding (true/false)
	var rect1 = {
		x:entity1.x-entity1.width/2,
		y:entity1.y-entity1.height/2,
		width:entity1.width,
		height:entity1.height
	}
	var rect2 = {
		x:entity2.x-entity2.width/2,
		y:entity2.y-entity2.height/2,
		width:entity2.width,
		height:entity2.height
	}
	return testCollisionRectRect(rect1,rect2);
}

Enemy = function (id,x,y,spdX,spdY,width,height){
	var enemy3 = {
		x:x,
		spdX:spdX,
		y:y,
		spdY:spdY,
		name: 'E',
		id:id,
		width:width,
		height:height,
		color:'red'
	};
	enemyList[id] = enemy3;
}

document.onmousemove = function(mouse){
	var mouseX = mouse.clientX;
	var mouseY = mouse.clientY;
	
	if(mouseX < player.width/2){
		mouseX = player.width/2;
	}
	if(mouseX > WIDTH-player.width/2){
		mouseX = WIDTH - player.width/2;
	}
	if(mouseY < player.height/2){
		mouseY = player.height/2;
	}
	if(mouseY > HEIGHT - player.height/2){
		mouseY = HEIGHT - player.height/2;
	}
	
	player.x = mouseX;
	player.y = mouseY;
	
}

updateEntity = function (something){
		updateEntityPosition(something);
		drawEntity(something);
	}

updateEntityPosition = function (something){
	something.x += something.spdX;
	something.y += something.spdY;
	
	if(something.x <0 || something.x > WIDTH){
		something.spdX = -something.spdX;
	}
	if(something.y < 0 || something.y > HEIGHT){
		something.spdY = -something.spdY
	}
}

testCollisionRectRect = function(rect1,rect2){
	return rect1.x <= rect2.x+rect2.width && rect2.x <= rect1.x+rect1.width && rect1.y <= rect2.y + rect2.height && rect2.y < rect1.y + rect1.height;
}

drawEntity = function(something){
	ctx.save();
	ctx.fillStyle = something.color;
	ctx.fillRect(something.x-something.width/2,something.y-something.height/2,something.width,something.height);
	ctx.restore();
}

update = function(){
	ctx.clearRect(0,0,WIDTH,HEIGHT);
	
	for(var key in enemyList){
		updateEntity(enemyList[key]);
		
		var isColliding = testCollisionEntity(player,enemyList[key]);
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
	
	drawEntity(player);
	ctx.fillText(player.hp + " Hp",0,30);
}

Enemy('E1',150,350,10,15,30,30);
Enemy('E2',250,350,10,-15,20,20);
Enemy('E3',250,150,10,-5,40,10);

setInterval(update,40);