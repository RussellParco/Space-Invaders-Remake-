var canvas = document.getElementById("mainCanvas");
var context = canvas.getContext("2d");

var music = document.getElementById('theme_music');

var pause_level = 1;

var flash_stop = 0;

var check = 1;

var bug_direction = 3;

var shipright_pic = new Image();
shipright_pic.src= "shipright.jpg";

var shipleft_pic = new Image();
shipleft_pic.src= "shipleft.jpg";

var shipup_pic = new Image();
shipup_pic.src= "shiptop.jpg";

var destroy_text = new Image();
destroy_text.src= "destroymessage.png";

var ufo_pic = new Image();
ufo_pic.src= "ufo.png";

var level2_pic = new Image();
level2_pic.src= "leveltwo.jpg";

var bugdown_pic = new Image();
bugdown_pic.src= "bugdown.png";

var bugup_pic = new Image();
bugup_pic.src= "bugup.png";

var bugright_pic = new Image();
bugright_pic.src= "bugright.png";

var coin_pic = new Image();
coin_pic.src= "coin_pic.png";

var brickwall_pic = new Image();
brickwall_pic.src= "brickwall.jpg";

var bug_pic = new Image();
bug_pic.src= "bug.png";

var titleship_pic = new Image();
titleship_pic.src= "titleship.png";

var title_pic = new Image();
title_pic.src = "title.png";

var start_pic = new Image();
start_pic.src= "startgame.png";

var startup_pic = new Image();
startup_pic.src= "startup.jpg";

var dancing_pic = new Image();
dancing_pic.src= "dancingalien.gif";

var reset_pic = new Image();
reset_pic.src= "rest.png";

var pause_pic = new Image();
pause_pic.src = "button.png";

var ship_pic= new Image();
ship_pic.src ="titleship.png";

var alien_pic= new Image();
alien_pic.src ="alien.png";

var block_pic= new Image();
block_pic.src ="barrier.png";

var shooting= new Audio();
shooting.src ="shoot.wav";

var coin_noise= new Audio();
coin_noise.src ="coin.wav";

var block= new Audio();
block.src ="explosion.wav";

var loser= new Audio();
loser.src ="loser.mp3";

var point= new Audio();
point.src ="invaderkilled.wav";

var title_ship = {
	x:220,
	speed:3,
}; 

var write;

var coins = [ 10,10,10,10,10,10,10,10, 75, 75, 75, 75, 75, 75, 75, 75, 140,140,140,140,140,140,140,140, 205,205,205,205,205,205,205,205, 270,270,270,270,270,270,270,270, 335,335,335,335,335,335,335,335];

var coins_lane = [5, 70, 135, 200, 265, 330, 395, 450, 5, 70, 135, 200, 265, 330, 395, 450,5, 70, 135, 200, 265, 330, 395, 450,5, 70, 135, 200, 265, 330, 395, 450,5, 70, 135, 200, 265, 330, 395, 450,5, 70, 135, 200, 265, 330, 395, 450,];

var over;

var bullet_count=100;
var score=0;

var keys = [];

var ship_move=1;

var enemy_speed = 1;

var bullet={
	width:5,
	height:2,	
};

var alien={
	width:40,
	height:40,
	
};

var ship1={
	x:150,
	y:300,
	width:200,
	height:35,	
};

var bullets =[];

var lane = [];

var speed = 8;

var width=500, height=400;

var enemy=[];

var enemy_lane=[];

var player = {
	x:40,
	y:350,
	width: 30,
	height: 30
};

var bug = {
	x:500,
	y:200,
	width:40,
	height:40,
	speed:5,
};

var coin_bug = {
		x: 10,
		y: 10, 
		height: 40, 
		width: 40,
		speed: 7,

};

var ufo ={
	x:100,
	y:0,
	width:300,
	height:100,
};

var ufo_health = {
	x:175,
	y: 250,
	height: 10,
	width: 150,
};

var bulletsTwo_up = [];
var laneTwo_up = [];

var bulletsTwo_down = [];
var laneTwo_down = [];

var bulletsTwo_left = [];
var laneTwo_left = [];

var bulletsTwo_right = [];
var laneTwo_right = [];

var enemyTwo_up = [];
var enemylaneTwo_up = [];

var enemyTwo_down = [];
var enemylaneTwo_down = [];

var enemyTwo_left = [];
var enemylaneTwo_left = [];

var enemyTwo_right = [];
var enemylaneTwo_right = [];

window.addEventListener("load", function(e){
	if(sessionStorage.restart==1) {
		over=0;

	}
	else 
		over = 3;
});


window.addEventListener("click", function(e){
	if(e.clientX >= 220 && e.clientX < 270 && e.clientY > 20 && e.clientY < 60){
		if(over == 2 && pause_level == 1){
			over=0;
			music.play();
		}
		
		else if (over ==2 && pause_level == 2){
			over=5;
			music.play();
		}
		
		else{ 
			over = 2;
			music.pause();
		};
	}
	if ( over > 0 && over < 3 ){
		if(e.clientX >= 165 && e.clientX < 315 && e.clientY > 300 && e.clientY < 350){
			sessionStorage.restart=1;
			location.reload();
		}
	}
		
	if ( over==3){
		if(e.clientX >= 165 && e.clientX < 365 && e.clientY >= 275 && e.clientY <= 350){
			sessionStorage.restart=1;
			over=0;
		}
	}
		
		
});

window.addEventListener("keydown", function(e){
	keys[e.keyCode] = true;
},false);

window.addEventListener("keyup", function(e){
	delete keys[e.keyCode];
},false );


function incoming(){
	for (var i = 0; i < 5; i++){
		enemy.push(0);
		enemy_lane.push(Math.random() * (width-alien.width));
	}
}

function game(){
	if (over==0){
		update();
		render();
	}
	if(over > 0 && over < 5)paused();
	if (over == 5) {
		update_two();
		render_two();
	}
}

function render(){
	context.clearRect(0,0,width,height);
	
	context.fillStyle = "white";
	
	context.font = "bold 30px helvetica";
	context.fillText(score,30,60);
	context.fillText(bullet_count,425,60);
	
	context.fillStyle ='grey';
	context.font = "bold 20px helvetica";
	context.fillText('Bullets',420,30);
	context.fillText('Score',10,30);
	
	context.drawImage(pause_pic, 220, 10, 40, 40);
	
	context.drawImage(ship_pic,player.x, player.y, player.width, player.height);
	context.drawImage(bug_pic,bug.x, bug.y, bug.width, bug.height);

	bullet_move(bullets, lane, bullets, 5);
  
    for(var e in enemy){
	
				
				context.drawImage(alien_pic,enemy_lane[e],enemy[e],alien.width,alien.height);
				enemy[e]+= enemy_speed;
		
  }


	context.drawImage(block_pic,ship1.x,ship1.y,ship1.width,ship1.height);
	
	context.fillStyle = "white";
	context.font = "bold 100px impact";
	for( e in enemy){
		if(enemy[e] + alien.height >= 400){
			
			context.fillText("GAMEOVER",25,250);		
			music.pause();
			loser.play();
			over = 1;
			}
	}

}

function update(){
	if(keys[37]) player.x-=speed;
	if(keys[39]) player.x+=speed;
	
	if(player.x < 0)player.x=0;
	if (player.x >= width-player.width) player.x = width - player.width;

	ship1.x += ship_move;
	if(ship1.x+ship1.width==500) ship_move-=2;
	if(ship1.x==0) ship_move+=2;
	
	if(bullet_count>0){if(keys[32]) bullets.push(player.y);
	if(keys[32]) lane.push(13 + player.x);
	if(keys[32]) bullet_count=bullet_count-1;}
	
	
	if(keys[32]) shooting.play() ;
	hit(enemy, enemy_lane, alien);
	hit_ship();
	hit_bug();
	
	sessionStorage.restart=0;
	
	if(score >= 50) bug.x -= bug.speed;
	if(score >= 200) over=5;

}

function hit(object, object_lane, item){
	for(var b in lane){
		for (var e in object){
			if(	lane[b] + 6 > object_lane[e] && 
				lane[b] < object_lane[e]+ item.width &&
				bullets[b] <  object[e] + item.height&&
				bullets[b]>object[e])
				{
					object.splice(e, 1);
					object_lane.splice(e, 1);
					score+=1;
					point.play();
					bullets.splice(e, 1);
					lane.splice(e, 1);
					bullet_count += 1;
					
				}
	 				
		}
	}
}

function hit_coin(){
		for (var c in coins){
				if( coin_bug.x + coin_bug.width >= coins_lane[c] &&
					coin_bug.x + coin_bug.width <= coins_lane[c] + 50 &&
					coin_bug.y + coin_bug.height >= coins[c] &&
					coin_bug.y + coin_bug.height <= coins[c] + 50 ||
					
					coin_bug.x >= coins_lane[c] &&
					coin_bug.x <= coins_lane[c] + 50 &&
					coin_bug.y + coin_bug.height >= coins[c] &&
					coin_bug.y + coin_bug.height <= coins[c] + 50 ||
					
					coin_bug.x + coin_bug.width >= coins_lane[c] &&
					coin_bug.x + coin_bug.width <= coins_lane[c] + 50 &&
					coin_bug.y  >= coins[c] &&
					coin_bug.y  <= coins[c] + 50 ||
					
					coin_bug.x >= coins_lane[c] &&
					coin_bug.x <= coins_lane[c] + 50 &&
					coin_bug.y >= coins[c] &&
					coin_bug.y <= coins[c] + 50
					)
			
			
				{
					coins_lane.splice(c, 1);
					coins.splice(c,1);
					score += 2;
					coin_noise.play();
				}
		}
			
}

function hit_ship(){
		for (var e in enemy){
			if(	enemy_lane[e] + alien.width > ship1.x && 
				enemy_lane[e] < ship1.x+ ship1.width &&
				enemy[e] < ship1.y + ship1.height&&
				enemy[e]>ship1.y)
				{
					ship1.height-=5;
					enemy.splice(e, 1);
					enemy_lane.splice(e, 1);
					score-=5;
					block.play();
				}
		}
}

function hit_bug(){
	for (var b in bullets)
		if(	lane[b] + bullet.width > bug.x && 
				lane[b]< bug.x+ bug.width &&
				bullets[b]< bug.y + bug.height&&
				bullets[b]>bug.y)
				{
					over=4;
		}
}

function hit_ufo(bullets, lane){
	for (var b in bullets)
		if(	lane[b] + bullet.width > ufo.x && 
				lane[b]< ufo.x+ ufo.width &&
				bullets[b]< ufo.y + ufo.height&&
				bullets[b]>ufo.y)
				{
					score += 1;
					if(ufo_health.width > 0)ufo_health.width -= 5;
					if(ufo_health.width < 0)ufo_health.width = 0;
					bullets.splice(b,1);
					
				}
}

function paused(){
	
	
	if(over == 2 ){
		context.fillStyle = "white";
		context.font = "bold 100px impact";
		context.fillText('PAUSE', 100, 200);
		context.drawImage(reset_pic, 165, 300, 150, 50);
		highScores();
	}
		
	if(over == 1 ){
		context.drawImage(reset_pic, 165, 300, 150, 50);
		if(check == 1){
			high();
			check=0;
		}
	
	}
	
	if(over == 3 ){
		context.drawImage(startup_pic,0,0,width,height);
		context.drawImage(title_pic,110,30,300,150);
		context.drawImage(titleship_pic,title_ship.x,200,45,45);
		context.drawImage(dancing_pic,50,275,70,70);
		context.drawImage(dancing_pic,390,275,70,70);
		context.drawImage(start_pic, 165, 275, 200, 75);
	
		if (title_ship.x >= width-45) title_ship.speed = -4;
		if (title_ship.x <= 0) title_ship.speed = 4;
		title_ship.x += title_ship.speed;
		
	};
	
	
	
	if (over == 4){
		context.drawImage(brickwall_pic, 0, 0, 500, 400);
		for(var c in coins){
			
				context.drawImage(coin_pic, coins_lane[c], coins[c], 50, 50);
		};
		
		hit_coin();

		
		
		if(keys[37]) {coin_bug.x-=speed; bug_direction = 1;}
		if(keys[39]) {coin_bug.x+=speed; bug_direction = 4;}
		if(keys[38]) {coin_bug.y-=speed; bug_direction = 2;}
		if(keys[40]) {coin_bug.y+=speed; bug_direction = 3;}
		
		if(bug_direction == 1) context.drawImage(bug_pic, coin_bug.x, coin_bug.y, coin_bug.width, coin_bug.height);
		if(bug_direction == 2) context.drawImage(bugup_pic, coin_bug.x, coin_bug.y, coin_bug.width, coin_bug.height);
		if(bug_direction == 3) context.drawImage(bugdown_pic, coin_bug.x, coin_bug.y, coin_bug.width, coin_bug.height);
		if(bug_direction == 4) context.drawImage(bugright_pic, coin_bug.x, coin_bug.y, coin_bug.width, coin_bug.height);
		
		context.fillStyle = 'red';
		context.font = "bold 50px impact";
		context.fillText("SCORE", 190, 50);
		context.fillText(score,240,100);
		
		if(coin_bug.x < 0)coin_bug.x=0;
		if (coin_bug.x >= width-coin_bug.width) coin_bug.x = width - coin_bug.width;
		if(coin_bug.y < 0)coin_bug.y=0;
		if (coin_bug.y >= height-coin_bug.height) coin_bug.y = height - coin_bug.height;
		
		if (coins.length == 0) over = 0;
		if (flash_stop < 10){if(write==1){ collect();}};
	
	
	};
}

function highScores(){
	var level = 100;
	context.fillStyle = "blue";
	context.font = "lighter 20px helvetica";
	context.fillText("HIGHSCORE",350,level);
	level += 25;
	context.fillText('1.   ' + localStorage.high_score1,380,level);
	level+=25;
	context.fillText('2.   ' + localStorage.high_score2,380,level);
	level+=25;
	context.fillText('3.   ' + localStorage.high_score3,380,level);
	level+=25;
	context.fillText('4.   ' + localStorage.high_score4,380,level);
	level+=25;
	context.fillText('5.   ' + localStorage.high_score5,380,level);
	level+=25;
};


function high(){
	if(score > localStorage.high_score1){
		localStorage.high_score5 = localStorage.high_score4;
		localStorage.high_score4 = localStorage.high_score3;
		localStorage.high_score3 = localStorage.high_score2;
		localStorage.high_score2 = localStorage.high_score1;
		localStorage.high_score1 = score;
	}
		
	else if(score > localStorage.high_score2 && score < localStorage.high_score1){
		localStorage.high_score5 = localStorage.high_score4;
		localStorage.high_score4 = localStorage.high_score3;
		localStorage.high_score3 = localStorage.high_score2;
		localStorage.high_score2 = score;
	}
		
	else if(score > localStorage.high_score3 && score < localStorage.high_score2){
		localStorage.high_score5 = localStorage.high_score4;
		localStorage.high_score4 = localStorage.high_score3;
		localStorage.high_score3 = score;
	}
		
	else if(score > localStorage.high_score4 && score < localStorage.high_score3){
		localStorage.high_score5 = localStorage.high_score4;
		localStorage.high_score4 = score;
	}
		
	else if(score > localStorage.high_score5 && score < localStorage.high_score4){
		localStorage.high_score5 = score;
	}
		
}

function collect(){
	context.fillStyle = 'red';
	context.font = 'bold 75px impact';
	context.fillText('COLLECT COINS', 25, 225);
	
}



function flash(){
	if(write == 1){write = 0}
	else write = 1;
	flash_stop+=1;
}
	
function harder(){
  enemy_speed+=0.5;
  bullet_count+=30;
	
}

function bullet_move(bullets, lane, what, move){
		  for(var b in bullets){
		if(bullets[b]){
				context.fillStyle='grey';
				context.fillRect(lane[b],bullets[b],bullet.width,bullet.height);
				what[b]-=move;
		}
  };
}

function update_two(){

	pause_level = 2; 
	if(keys[37]) player.x-=speed;
	if(keys[39]) player.x+=speed;
	if(keys[38]) player.y-=speed;
	if(keys[40]) player.y+=speed;
	
	
	if(player.x < 0)player.x=0;
	if (player.x >= width-player.width) player.x = width - player.width;
	if(player.y < 0)player.y=0;
	if (player.y >= height-player.height) player.y = height - player.height;
	
	if(ufo.y < 140) ufo.y+=2;
	
	if(bullet_count>0){
	
		if(keys[32]) {
			shooting.play();
 			bullet_count = bullet_count-1;
			if(player.y > ufo.y + ufo.height){bulletsTwo_up.push(player.y);laneTwo_up.push(player.x);}
			if(player.y < ufo.y ){bulletsTwo_down.push(player.y);laneTwo_down.push(player.x);}
			if(player.x > ufo.x + ufo.width){bulletsTwo_left.push(player.y);laneTwo_left.push(player.x);}
			if(player.x < ufo.x){bulletsTwo_right.push(player.y);laneTwo_right.push(player.x);}

		}
	};
	
	hit_ufo(bulletsTwo_left, laneTwo_left);
	hit_ufo(bulletsTwo_right, laneTwo_right);
	hit_ufo(bulletsTwo_up, laneTwo_up);
	hit_ufo(bulletsTwo_down, laneTwo_down);
	
	if(ufo_health.width <= 0) {over = 0; player.y = 350; pause_level = 1;}

}

function render_two(){
	context.drawImage(level2_pic, 0, 0, width, height);
	context.drawImage(ufo_pic, ufo.x, ufo.y, ufo.width, ufo.height);
	
	context.fillStyle = 'red';
	if (ufo.y >= 140) context.fillRect(ufo_health.x, ufo_health.y, ufo_health.width, ufo_health.height);

	
	if (ufo.y >= 140) {
		context.rect(ufo_health.x, ufo_health.y, 150, ufo_health.height);
		context.strokeStyle= 'blue';
		context.stroke();
	};
	
	if(ufo.y < 140) {context.drawImage(destroy_text, 100, 250, 300, 100);
		}
	if (player.y > ufo.y + ufo.height)context.drawImage(ship_pic,player.x, player.y, player.width, player.height);	
	if (player.y < ufo.y)context.drawImage(shipup_pic,player.x, player.y, player.width, player.height);
	if (player.x > ufo.x + ufo.width)context.drawImage(shipright_pic,player.x, player.y, player.width, player.height);
	if (player.x < ufo.x)context.drawImage(shipleft_pic,player.x, player.y, player.width, player.height);
	
	bullet_move(bulletsTwo_up, laneTwo_up, bulletsTwo_up, 5);
	bullet_move(bulletsTwo_down, laneTwo_down, bulletsTwo_down, -5);
	bullet_move(bulletsTwo_left, laneTwo_left, laneTwo_left, 7);
	bullet_move(bulletsTwo_right, laneTwo_right, laneTwo_right, -7);
	
	context.fillStyle = "white";
	
	context.font = "bold 30px helvetica";
	context.fillText(score,30,60);
	context.fillText(bullet_count,425,60);
	
	context.fillStyle ='grey';
	context.font = "bold 20px helvetica";
	context.fillText('Bullets',420,30);
	context.fillText('Score',10,30);
	
	context.drawImage(pause_pic, 220, 10, 40, 40);
	
	
	bullet_move(enemyTwo_up, enemylaneTwo_up, enemyTwo_up, 5);
	bullet_move(enemyTwo_down, enemylaneTwo_down, enemyTwo_down, -5);
	bullet_move(enemyTwo_left, enemylaneTwo_left, enemylaneTwo_left, 7);
	bullet_move(enemyTwo_right, enemylaneTwo_right, enemylaneTwo_right, -7);
	
	ufo_hit();
	shot_down(enemyTwo_up, enemylaneTwo_up);
	shot_down(enemyTwo_down, enemylaneTwo_down);
	shot_down(enemyTwo_left, enemylaneTwo_left);
	shot_down(enemyTwo_right, enemylaneTwo_right);
}

function ufo_shoot(){
	if (player.x > ufo.x &&
	player.x < ufo.x + ufo.width &&
	player.y < ufo.y)
		{
			enemyTwo_up.push(ufo.y);
			enemylaneTwo_up.push(player.x);
			
		
		}
	if (player.x > ufo.x &&
	player.x < ufo.x + ufo.width &&
	player.y > ufo.y+ufo.height)
		{
			enemyTwo_down.push(ufo.y + ufo.height);
			enemylaneTwo_down.push(player.x);
			
		
		}
	if (player.y > ufo.y &&
	player.y < ufo.y + ufo.height &&
	player.x < ufo.x)
		{
			enemyTwo_left.push(player.y);
			enemylaneTwo_left.push(ufo.x);
			
		
		}
		if (player.y > ufo.y &&
	player.y < ufo.y + ufo.height &&
	player.x > ufo.x + ufo.width)
		{
			enemyTwo_right.push(player.y);
			enemylaneTwo_right.push(ufo.x + ufo.width);
			
		
		}
}

function ufo_hit(){
	if(player.x > ufo.x && player.x < ufo.x + ufo.width && player.y > ufo.y && player.y < ufo.y + ufo.height){
		over = 1;
		music.pause();
		loser.play();
		context.fillStyle = "white";
		context.font = "bold 100px impact";
		context.fillText("GAMEOVER",25,250);
	}
		
}

function shot_down(bullets, lane){
	for (var b in bullets)
		if(	lane[b] + bullet.width > player.x && 
				lane[b]< player.x+ player.width &&
				bullets[b]< player.y + player.height&&
				bullets[b]>player.y)
				{
				over = 1;
				music.pause();
				loser.play();
				context.fillStyle = "white";
				context.font = "bold 100px impact";
				context.fillText("GAMEOVER",25,250);
					
				}
}

setInterval(function(){if (over == 5) ufo_shoot()},500);		

setInterval(function(){if (over == 4) flash()},500);

setInterval(
 function(){if (over==0) harder();},30000);
	
setInterval(function(){if (over==0)incoming();},5000);

setInterval(
	function(){game();},1000/30);
	