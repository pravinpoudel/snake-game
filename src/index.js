 const canvas = document.getElementById("game");
 const context = canvas.getContext("2d");

 const tileCount = 20;
 const tileSize = canvas.width/tileCount -2;

 let headX = 10;
 let headY = 10;

 let xVelocity = 0;
 let yVelocity = 0;

 let appleX = 5;
 let appleY = 5;

 const snakeParts = [];
 let tailLength = 0;

 let then =0; 
 let elapsed = 0;

 document.body.addEventListener("keydown", keyDown);

 class SnakePart{
     constructor(x, y){
         this.x =x;
         this.y = y;
     }
 }

 function drawGame(timeStamp){
    let delta = timeStamp - then;
    then = timeStamp;
    clearScreen();
    changeSnakePosition(delta);
    checkAppleCollision();
    drawApple();
    drawSnake(delta);
    requestAnimationFrame(drawGame)   
 }

function clearScreen(){
    context.fillStyle = "black";
    context.fillRect(0, 0, canvas.clientWidth, canvas.clientHeight);
}

function drawSnake(delta){
    elapsed += delta;
    // console.log(snakeParts);
    context.fillStyle = 'orange';
    context.fillRect(headX*tileCount, headY*tileCount, tileSize, tileSize);
    context.fillStyle= "green";
    for(let i=0; i<snakeParts.length; i++){
        let part = snakeParts[i];
        if(part.x === headX && part.y === headY){
            console.log("game over");
            break;
        }
    }
    if(elapsed>1000){
        snakeParts.push(new SnakePart(headX, headY));
        elapsed=0;
    }
    if(snakeParts.length > tailLength){
        snakeParts.shift();  
    }
}

function drawApple(){
    context.fillStyle ="red";
    context.fillRect(appleX*tileCount, appleY*tileCount, tileSize, tileSize)
}

function changeSnakePosition(delta){
    headX = headX + 2* xVelocity*delta*0.001;
    headY = headY + 2* yVelocity*delta*0.001;
}

function checkAppleCollision(){
    console.log(headY, appleY)
    if( headX + 1 > appleX && headX < (appleX + 1) && (headY + 1) > appleY && headY < appleY+ 1){
        console.log("collision")
        appleX = Math.floor(Math.random()* tileCount);
        appleY = Math.floor(Math.random()* tileCount);
    }
}

function keyDown(event){
    if(event.keyCode == 38){
        if(yVelocity ==1) return;
            xVelocity = 0;
            yVelocity = -1;    
        
    }
    if(event.keyCode == 40){
        if (yVelocity == -1) return;
        console.log(event.keyCode)
        xVelocity = 0;
        yVelocity = 1;
    }
    if(event.keyCode == 37){
        if(xVelocity == 1) return;
        xVelocity =-1;
        yVelocity = 0;
    }
    if(event.keyCode == 39){
        if(xVelocity == -1) return;
        xVelocity = 1;
        yVelocity = 0;
    }
}

requestAnimationFrame(drawGame);