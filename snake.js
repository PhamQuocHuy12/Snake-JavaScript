const cvs = document.getElementById("snake");
const ctx = cvs.getContext("2d");

// create the unit
const box = 32;

// load images

const ground = new Image();
ground.src = "img/ground.png";

const foodImg = new Image();
foodImg.src = "img/food.png";

// load audio files

let dead = new Audio();
let eat = new Audio();


dead.src = "audio/dead.mp3";
eat.src = "audio/eat.mp3";

//try again button

const reloadBtn = document.querySelector('.reload-btn');
reloadBtn.addEventListener('click', () => {
    resetObject();
}); 

let snake = [];
    console.log('hehe')

    snake = [
        {x : 9 * box, y : 10 * box},
    ];

let food = {
    x : Math.floor(Math.random()*17+1) * box,
    y : Math.floor(Math.random()*15+3) * box
}

let score = 0;

function resetObject (){
    // reset the snake
    snake = [
        {x : 9 * box, y : 10 * box},
    ];

    // reset the food
    food = {
        x : Math.floor(Math.random()*17+1) * box,
        y : Math.floor(Math.random()*15+3) * box
    }

    // reset the score var  
    reloadBtn.classList.toggle("hidden");
    score = 0
    d = undefined;
    game = setInterval(draw,100);
}


//control the snake

let d;

document.addEventListener("keydown",direction);

function direction(event){
    console.log(event.keyCode)
    let key = event.keyCode;
    if( key == 65 && d != "RIGHT"){
        d = "LEFT";
    }else if(key == 87 && d != "DOWN"){
        d = "UP";
    }else if(key == 68 && d != "LEFT"){
        d = "RIGHT";
    }else if(key == 83 && d != "UP"){
        d = "DOWN";
    }
}

// cheack collision function
function collision(head,array){
    for(let i = 0; i < array.length; i++){
        if(head.x == array[i].x && head.y == array[i].y){
            return true;
        }
    }
    return false;
}

// draw everything to the canvas

function draw(){
    
    ctx.drawImage(ground,0,0);
    
    for( let i = 0; i < snake.length ; i++){
        ctx.fillStyle = ( i == 0 )? "green" : "white";
        ctx.fillRect(snake[i].x,snake[i].y,box,box);
        
        ctx.strokeStyle = "red";
        ctx.strokeRect(snake[i].x,snake[i].y,box,box);
    }
    
    ctx.drawImage(foodImg, food.x, food.y);
    
    // old head position
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;
    
    // which direction
    if( d == "LEFT") snakeX -= box;
    if( d == "UP") snakeY -= box;
    if( d == "RIGHT") snakeX += box;
    if( d == "DOWN") snakeY += box;
    
    // if the snake eats the food
    if(snakeX == food.x && snakeY == food.y){
        score++;
        eat.play();
        food = {
            x : Math.floor(Math.random()*17+1) * box,
            y : Math.floor(Math.random()*15+3) * box
        }
        // we don't remove the tail
    }else{
        // remove the tail
        snake.pop();
    }
    
    // add new Head
    
    let newHead = {
        x : snakeX,
        y : snakeY
    }
    
    // game over
    
    if(snakeX < box || snakeX > 17 * box || snakeY < 3*box || snakeY > 17*box || collision(newHead,snake)){
        clearInterval(game);
        dead.play();
        reloadBtn.classList.toggle("hidden");
    }
    
    snake.unshift(newHead);
    
    ctx.fillStyle = "white";
    ctx.font = "45px Changa one";
    ctx.fillText(score,2*box,1.6*box);
}

// call draw function every  ms
let game = setInterval(draw,100);


















