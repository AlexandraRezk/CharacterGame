var ctx = document.getElementById("ctx").getContext("2d");
ctx.font = '30px Arial';

var HEIGHT = 500;
var WIDTH = 500;
var timeWhenGameStarted = Date.now(); //return time in ms

var player;
	

createPlayer = function (){
	player = {
	type:'player',
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
}

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
		type:'enemy',
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

updateEntity = function (entity){
		updateEntityPosition(entity);
		drawEntity(entity);
	}

updateEntityPosition = function (entity){
	if(entity.type === 'player'){
		if(player.pressingRight){
                player.x += 10;
		}
        if(player.pressingLeft) {
                player.x -= 10;
		}
        if(player.pressingDown) {
                player.y += 10;
		}
        if(player.pressingUp){
                player.y -= 10;
		}
       
        //ispositionvalid
        if(player.x < player.width/2) {
                player.x = player.width/2;
		}
        if(player.x > WIDTH-player.width/2) {
                player.x = WIDTH - player.width/2;
		}
        if(player.y < player.height/2) {
                player.y = player.height/2;
		}
        if(player.y > HEIGHT - player.height/2){
                player.y = HEIGHT - player.height/2;
		}
	} else {
	entity.x += entity.spdX;
	entity.y += entity.spdY;
	
	if(entity.x <0 || entity.x > WIDTH){
		entity.spdX = -entity.spdX;
		}
	if(entity.y < 0 || entity.y > HEIGHT){
		entity.spdY = -entity.spdY
		}
	}
}

testCollisionRectRect = function(rect1,rect2){
	return rect1.x <= rect2.x+rect2.width && rect2.x <= rect1.x+rect1.width && rect1.y <= rect2.y + rect2.height && rect2.y < rect1.y + rect1.height;
}

drawEntity = function(entity){
	ctx.save();
	ctx.fillStyle = entity.color;
	ctx.fillRect(entity.x-entity.width/2,entity.y-entity.height/2,entity.width,entity.height);
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
	updateEntity(player);
	ctx.fillText(player.hp + " Hp",0,30);
}
createPlayer();
Enemy('E1',150,350,10,15,30,30);
Enemy('E2',250,350,10,-15,20,20);
Enemy('E3',250,150,10,-5,40,10);

setInterval(update,40);