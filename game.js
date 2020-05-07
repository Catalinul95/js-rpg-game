const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

var currentTime;
var lastTime = 0;
var delta = 0;
var timePerFrame = 16;

let row = 1;
let column = 1;
let speedX;
let speedY;

const grass = new Image();
grass.src = 'grass.png';
const tree = new Image();
tree.src = 'tree.png';
const stone = new Image();
stone.src = 'stone.png';
const sign = new Image();
sign.src = 'sign.png';
const vroad = new Image();
vroad.src = 'vroad.png';
const oroad = new Image();
oroad.src = 'road.png';
const house = new Image();
house.src = 'house.png';
const map = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 6, 1, 1, 1, 1, 1, 1, 1, 2, 1],
    [0, 0, 0, 0, 0, 0, 0, 2, 0, 1, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0],
    [0, 0, 6, 1, 1, 0, 0, 0, 3, 4, 4, 4, 4, 0, 0, 0, 0, 1, 0, 0],
    [1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0],
    [0, 2, 0, 0, 0, 0, 0, 0, 0, 6, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 1, 2, 0, 0, 0, 0, 0, 2, 0, 0, 1, 0, 0],
    [0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 6, 0, 0, 0, 0, 0],
    [0, 1, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0],
    [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 2, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 1, 0],
    [0, 0, 0, 0, 0, 1, 0, 0, 2, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0],
    [0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
];

function getTile(x, y) {
    row = Math.floor((y * 20) / 1280);
    column = Math.floor((x * 20) / 1280);

    console.log(y);
	
	return map[row][column];
}

function checkLeftTileCollision(speed) {
    let rowX = row;
    let colY = column - 1;

    if (getTile(rowX, colY) != 0) {
        posX = colY * 64 + 64;
        difference = playerAnim.options.x - posX;

        if (speedX > difference) {
            speedX = speedX - difference;
        }
    }

    if ( 
    getTile(playerAnim.options.x - speedX, playerAnim.options.y + 32) != 0 || 
    getTile(playerAnim.options.x - speedX, playerAnim.options.y + 60) != 0) {
        return true;
    }

    return false;
}

function checkRightTileCollision(speed) {
    let rowX = row;
    let colY = column + 1;

    if (getTile(rowX, colY) != 0) {
        posX = colY * 64;
        difference = posX - playerAnim.options.x;

        if (speedX > difference) {
            speedX = speedX - difference;
        }
    }

    if ( 
    getTile(playerAnim.options.x + playerAnim.options.width +  speedX, playerAnim.options.y + 32) != 0 || 
    getTile(playerAnim.options.x + playerAnim.options.width + speedX, playerAnim.options.y + 60) != 0) {
        return true;
    }

    return false;
}

function checkBottomTileCollision(speed) {
    let rowX = row + 1;
    let colY = column;

    if (getTile(rowX, colY) != 0) {
        posY = rowX * 64;
        difference = posY - playerAnim.options.y;

        if (speedY > difference) {
            speedY = speedY - difference;
        }
    }

    if ( 
    getTile(playerAnim.options.x + 32, playerAnim.options.y + 64 + speedY) != 0 || 
    getTile(playerAnim.options.x + 60, playerAnim.options.y + 64 + speedY) != 0) {
        return true;
    }

    return false;
}

function checkTopTileCollision(speed) {
    let rowX = row - 1;
    let colY = column;

    if (getTile(rowX, colY) != 0) {
        posY = rowX * 64;
        difference = playerAnim.options.y - posY;

        if (speedY > difference) {
            speedY = speedY - difference;
        }
    }

    if ( 
    getTile(playerAnim.options.x + 32, playerAnim.options.y) != 0 || 
    getTile(playerAnim.options.x + 60, playerAnim.options.y) != 0) {
        return true;
    }

    return false;
}

function drawMap(ctx) {
    for (let row = 0; row < map.length; row++) {
        for (let column = 0; column < map[0].length; column++) {
            if (map[row][column] == 1) {
                ctx.drawImage(
                    tree,
                    64 * column,
                    64 * row,
                    64,
                    64
                );
            } else if (map[row][column] == 2) {
                ctx.drawImage(
                    stone,
                    64 * column,
                    64 * row,
                    64,
                    64
                );
            } else if (map[row][column] == 3) {
                ctx.drawImage(
                    sign,
                    64 * column,
                    64 * row,
                    64,
                    64
                );
            } else if (map[row][column] == 4) {
                ctx.drawImage(
                    oroad,
                    64 * column,
                    64 * row,
                    64,
                    64
                );
            } else if (map[row][column] == 5) {
                ctx.drawImage(
                    vroad,
                    64 * column,
                    64 * row,
                    64,
                    64
                );
            } else if (map[row][column] == 6) {
                ctx.drawImage(
                    house,
                    64 * column,
                    64 * row,
                    64,
                    64
                );
            } else {
                ctx.drawImage(
                    grass,
                    64 * column,
                    64 * row,
                    64,
                    64
                );
            }
        } 
    }
}

/*
performance.now() returns the time in miliseconds passed from the moment
the page loaded until now.

*/
const waterAnim = new SpriteAnimation({
    sprite: 'water.png',
    frameWidth: 64,
    frameHeight: 64,
    ctx: ctx,
    x: 640,
    y: 320,
    width: 64,
    height: 64,
});
waterAnim.setPlay('water', [
    {x: 0, y: 0, duration: 140},
    {x: 64, y: 0, duration: 140},
    {x: 128, y: 0, duration: 140},
    {x: 0, y: 0, duration: 140},
]);
const water2Anim = new SpriteAnimation({
    sprite: 'water.png',
    frameWidth: 64,
    frameHeight: 64,
    ctx: ctx,
    x: 704,
    y: 320,
    width: 64,
    height: 64,
});
water2Anim.setPlay('water', [
    {x: 0, y: 0, duration: 140},
    {x: 64, y: 0, duration: 140},
    {x: 128, y: 0, duration: 140},
    {x: 0, y: 0, duration: 140},
]);
const slime2Anim = new SpriteAnimation({
    sprite: 'slime2.png',
    frameWidth: 64,
    frameHeight: 64,
    ctx: ctx,
    x: 900,
    y: 250,
    width: 64,
    height: 64,
});
slime2Anim.setPlay('slimeWalkingLeft', [
    {x: 0, y: 0, duration: 140},
    {x: 64, y: 0, duration: 140},
    {x: 128, y: 0, duration: 140},
    {x: 0, y: 0, duration: 140},
]);
const spiderAnim = new SpriteAnimation({
    sprite: 'spider.png',
    frameWidth: 64,
    frameHeight: 64,
    ctx: ctx,
    x: 350,
    y: 50,
    width: 64,
    height: 64,
});
spiderAnim.setPlay('spiderWalkingDown', [
    {x: 0, y: 0, duration: 140},
    {x: 64, y: 0, duration: 140},
    {x: 128, y: 0, duration: 140},
    {x: 0, y: 0, duration: 140},
]);
spiderAnim.setPlay('spiderWalkingUp', [
    {x: 192, y: 0, duration: 90},
    {x: 192, y: 0, duration: 90},
    {x: 256, y: 0, duration: 90},
]);
const batAnim = new SpriteAnimation({
    sprite: 'bat.png',
    frameWidth: 64,
    frameHeight: 64,
    ctx: ctx,
    x: 250,
    y: 250,
    width: 64,
    height: 64,
});
batAnim.setPlay('bat', [
    {x: 0, y: 0, duration: 140},
    {x: 64, y: 0, duration: 140},
    {x: 128, y: 0, duration: 140},
    {x: 192, y: 0, duration: 140},
    {x: 256, y: 0, duration: 140},
]);
const bat2Anim = new SpriteAnimation({
    sprite: 'bat2.png',
    frameWidth: 64,
    frameHeight: 64,
    ctx: ctx,
    x: 250,
    y: 350,
    width: 64,
    height: 64,
});
bat2Anim.setPlay('bat2', [
    {x: 0, y: 0, duration: 130},
    {x: 64, y: 0, duration: 130},
    {x: 128, y: 0, duration: 130},
    {x: 192, y: 0, duration: 130},
    {x: 256, y: 0, duration: 130},
    {x: 320, y: 0, duration: 130},
]);

const slimeAnim = new SpriteAnimation({
    sprite: 'slime.png',
    frameWidth: 64,
    frameHeight: 64,
    ctx: ctx,
    x: 250,
    y: 50,
    width: 64,
    height: 64,
});
slimeAnim.setPlay('slime', [
    {x: 0, y: 0, duration: 90},
    {x: 64, y: 0, duration: 90},
    {x: 128, y: 0, duration: 90},
    {x: 192, y: 0, duration: 90},
    {x: 192, y: 0, duration: 90},
    {x: 256, y: 0, duration: 90},
    {x: 320, y: 0, duration: 90},
    {x: 384, y: 0, duration: 90},
    {x: 448, y: 0, duration: 90},
    {x: 512, y: 0, duration: 90},
    {x: 576, y: 0, duration: 90},
]);

const keyDown = {};
const playerAnim = new SpriteAnimation({
    sprite: 'player.png',
    frameWidth: 64,
    frameHeight: 68,
    ctx: ctx,
    x: 64,
    y: 64,
    direction: 'right-idle',
    width: 64,
    height: 64,
});
playerAnim.setPlay('walkingDown', [
    {x: 0, y: 0, duration: 150},
    {x: 0, y: 68, duration: 150},
    {x: 0, y: 136, duration: 150},
    {x: 0, y: 0, duration: 150},
]);
playerAnim.setPlay('walkingUp', [
    {x: 128, y: 0, duration: 150},
    {x: 128, y: 68, duration: 150},
    {x: 128, y: 136, duration: 150},
    {x: 128, y: 0, duration: 150},
]);
playerAnim.setPlay('walkingRight', [
    {x: 68, y: 0, duration: 150},
    {x: 68, y: 68, duration: 150},
    {x: 68, y: 136, duration: 150},
    {x: 68, y: 0, duration: 150},
]);
playerAnim.setPlay('walkingLeft', [
    {x: 192, y: 0, duration: 150},
    {x: 192, y: 68, duration: 150},
    {x: 192, y: 136, duration: 150},
    {x: 192, y: 0, duration: 150},
]);

playerAnim.setPlay('right-idle', [
    {x: 68, y: 0, duration: 150},
]);
playerAnim.setPlay('down-idle', [
    {x: 0, y: 0, duration: 150},
]);
playerAnim.setPlay('left-idle', [
    {x: 192, y: 0, duration: 150},
]);
playerAnim.setPlay('up-idle', [
    {x: 128, y: 0, duration: 150},
]);

function loop() {
  ctx.clearRect(0, 0, 640, 640);
  window.requestAnimationFrame(loop);
  
  if (!currentTime) {
      currentTime = performance.now();
  } else {
      delta = currentTime - lastTime;
  }

  drawMap(ctx);

  waterAnim.play('water', delta, ctx);
  water2Anim.play('water', delta, ctx);

  speedX = ( delta / 1000 ) * 200;
  speedY = ( delta / 1000 ) * 200;

    let rowX = row * 64;
    let colY  = column * 64;

    
  
  if (keyDown[39] && !checkRightTileCollision(speedX)) {
    playerAnim.options.x += speedX;
    playerAnim.play('walkingRight', delta, ctx);
    playerAnim.options.direction = 'right-idle';
  } else if (keyDown[40] && !checkBottomTileCollision(speedY)) {
    playerAnim.options.y += speedY;
    playerAnim.play('walkingDown', delta, ctx);
    playerAnim.options.direction = 'down-idle';
  } else if (keyDown[37] && !checkLeftTileCollision(speedX)) {
    playerAnim.options.x -= speedX;
    playerAnim.play('walkingLeft', delta, ctx);
    playerAnim.options.direction = 'left-idle';
  } else if (keyDown[38] && !checkTopTileCollision(speedY)) {
    playerAnim.options.y -= speedY;
    playerAnim.play('walkingUp', delta, ctx);
    playerAnim.options.direction = 'up-idle';
  } else {
    playerAnim.play(playerAnim.options.direction, delta, ctx);
  }

  slimeAnim.play('slime', delta, ctx);
  batAnim.play('bat', delta, ctx);
  bat2Anim.play('bat2', delta, ctx);

  spiderAnim.options.y +=  ( delta / 1000 ) * 50;
  spiderAnim.play('spiderWalkingDown', delta, ctx);

  slime2Anim.options.x -=  ( delta / 1000 ) * 50;
  slime2Anim.play('slimeWalkingLeft', delta, ctx);

  
  
  lastTime = currentTime;
  currentTime = performance.now();
  
  ctx.fillStyle = 'red';
  ctx.font = "30px Arial";
  ctx.fillText("FPS: " + parseInt((1000 / delta)), 50, 50);
  ctx.fillText("TILE ID: " + getTile(playerAnim.options.x, playerAnim.options.y + 60), 200, 50);
  ctx.fillText("ROW: " + row, 900, 100);
  ctx.fillText("COL: " + column, 900, 150);

 // moving to left: getTile(playerAnim.options.x + 63, playerAnim.options.y + 32)
/*
  ctx.lineWidth = 2;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;
    ctx.shadowBlur    = 5;
    ctx.shadowColor   = "#ccc";
    
    // draw the grid
    for (let i = 1; i < 20; i++) {
      ctx.strokeStyle = '#888';
      ctx.beginPath();
      ctx.moveTo(64 * i, 0);
      ctx.lineTo(64 * i, 1280);
      ctx.stroke();
    }
    
    for (let i = 1; i < 20; i++) {
      ctx.strokeStyle = '#888';
      ctx.beginPath();
      ctx.moveTo(0, 64 * i);
      ctx.lineTo(1280, 64 * i);
      ctx.stroke();
}
*/
}

loop();

document.addEventListener('keydown', function (e) {
    keyDown[e.keyCode] = true;
});

document.addEventListener('keyup', function (e) {
    keyDown[e.keyCode] = false;
});