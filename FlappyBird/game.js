import Config from "./config.js";

class Field {
    constructor( box ) {
        this.config = new Config();
        this.element = document.createElement( "canvas" );
        this.context = this.element.getContext( "2d" );
        this.element.width = this.config.gameWidth; //ширина игрового поля
        this.element.height = this.config.gameBgHeight + this.config.gameFgHeight ; //высота игрового поля

        this.context.fillStyle = "#FFF";
        this.context.strokeStyle = "#000";
        this.context.font = "30px Arial";
        
        this.x = 0;
        this.y = 0;
        this.dx = this.config.birdSpeedX / this.config.backgroundSpeedCoeff; // для создания эффекта параллакса
        box.appendChild( this.element );
    }

	draw(context) {
        const wrap = document.getElementsByClassName("wrapper");
        wrap[0].setAttribute("style", `height: ${this.element.height}px`);
        //небо
        context.drawImage(this.config.sprite, 
            this.config.backgroundSpriteX, 
            this.config.backgroundSpriteY, 
            this.config.backgroundSpriteWidth, 
            this.config.backgroundSpriteHeight, 
            
            this.x, 
            this.y, 
            this.config.gameWidth, 
            this.config.gameBgHeight
        )
        context.drawImage(this.config.sprite, 
            this.config.backgroundSpriteX, 
            this.config.backgroundSpriteY, 
            this.config.backgroundSpriteWidth, 
            this.config.backgroundSpriteHeight, 
            
            this.x + this.config.gameWidth, 
            this.y, 
            this.config.gameWidth, 
            this.config.gameBgHeight
        )
        //земля
        context.drawImage(this.config.sprite, 
            this.config.foregroundSpriteX, 
            this.config.foregroundSpriteY, 
            this.config.foregroundSpriteWidth, 
            this.config.foregroundSpriteHeight, 
            
            0, 
            this.config.gameBgHeight,
            this.config.gameWidth, 
            this.config.gameFgHeight
        )
     }

    drawStartButton( context ) {
        context.drawImage(this.config.sprite, 
            this.config.startButtonSpriteX, 
            this.config.startButtonSpriteY, 
            this.config.startButtonSpriteWidth, 
            this.config.startButtonSpriteHeight, 
        
            (this.config.gameWidth - this.config.startButtonSpriteWidth*this.config.scale) / 2, 
            (this.config.gameBgHeight - this.config.startButtonSpriteHeight*this.config.scale) / 2, 
            this.config.startButtonSpriteWidth*this.config.scale, 
            this.config.startButtonSpriteHeight*this.config.scale
        )
    }

    update() {
        if (this.x < -this.element.width) {
            this.x = this.config.backgroundSpriteOverlap;
        } else {
        this.x -= this.dx; 
        }
    }
}

class Bird {
		constructor() {
		this.config = new Config();
        this.x = this.config.birdStartX;        // начальная позиция птицы
		this.y = this.config.birdStartY;
        this.rotation = 0;
         
        this.sY = this.config.birdSpriteY;      // переменные для смены картинок (машем крыльями)
        this.frame = 0;
        this.groundHitFlag = 0;

		this.height = this.config.birdHeight; 
		this.width = this.config.birdWidth; // для сохранения пропорции

		this.dy = 0.0;              // начальная скорость птицы
        
		this.jumpHeight = Math.floor(this.config.gameBgHeight * 0.25 * 0.5); // высота прыжка - 50% от промежутка, а промежуток - 25% от высоты трубы
                
        this.control();        
	}

    draw(context){
        context.save();
        context.translate(this.x, this.y);
        context.rotate(this.rotation * Math.PI/180);
        context.drawImage(this.config.sprite, 
            this.config.birdSpriteX, 
            this.sY, 
            this.config.birdSpriteWidth, 
            this.config.birdSpriteHeight, 

            -this.width/2, 
            -this.height/2, 
            this.width, 
            this.height
        );
        context.restore();        
	}
	update() {
        if (this.frame < 5) {    //анимация машущих крыльев, каждый 5 кадр меняем картинку
            this.frame++;
        } else {
            this.frame = 0;
            this.sY += this.config.birdSpriteHeight;
        }
        if (this.sY >= this.config.birdSpriteY + 2 * this.config.birdSpriteHeight ) { //зацикливаем смену трех картинок
            this.sY = this.config.birdSpriteY;
        }
        if (this.dy >= this.jumpHeight * 0.055) {        // поворачиваем птичку при падении и взлете      
            this.rotation = 45;
        } else if (this.dy === 0) {
            this.rotation = 0;
        } else {
            this.rotation = -25;
        }
        
         if ( Math.floor(this.y + this.height) >= this.config.gameBgHeight && this.groundHitFlag === 0) {   //обработка столкновения с землей
            this.config.hitSound.play(); 
            this.groundHitFlag  = 1;            
            this.dy = 0;
            setTimeout( () => location.reload(), 300);
        }
	}
	jump() {
		if (this.y > this.jumpHeight ) {           //взлетаем не выше потолка
			this.y -= this.jumpHeight;
			}            
        }
	control() {		
		document.addEventListener("click", () => {
			this.jump();
            this.dy = 1;
		});
		
		document.addEventListener("keydown", (e) => {
		 	if (e.code == "Space") {
				this.jump();
                this.dy = 1;
			}
		 });
	}
}

class Physics {
    constructor() {
        this.config = new Config(); 
    }
    falling( bird ) {
        bird.y += bird.dy;      //падаем
        bird.dy += this.config.birdAccelY;    //с ускорением
    }
}

class Pipe {
    constructor() {
		this.config = new Config();
        this.width = this.config.pipeWidth; 
		this.height = this.config.gameBgHeight; //высота трубы равна высоте бэграунда
        this.gap = this.config.pipeGap;
        this.dx = this.config.birdSpeedX;  

        this.frames = 0;
        this.pipes = [];
        this.pipes[0] = {
            x: this.config.gameWidth,
            y: getRandomInt( 0.1 * this.height + this.gap, 0.9 * this.height),
            scoreFlag : 0,
            hitFlag : 0
        }
    }

    draw( context ) {
        this.pipes.forEach ( (el, index) => {
            context.drawImage(this.config.sprite,                   //верхняя труба
                this.config.topPipeSpriteX, 
                this.config.topPipeSpriteY, 
                this.config.pipeSpriteWidth,
                this.config.pipeSpriteHeight, 
                
                el.x, 
                el.y - this.gap - this.height, 
                this.width, 
                this.height
            );
            context.drawImage(this.config.sprite,                   //нижняя труба
                this.config.bottomPipeSpriteX, 
                this.config.bottomPipeSpriteY, 
                this.config.pipeSpriteWidth, 
                this.config.pipeSpriteHeight - el.y / this.config.scale, 
                
                el.x, 
                el.y, 
                this.width, 
                this.height - el.y
            );
        } )
    }

    update( bird, score, canvas ) {
        this.pipes.forEach ( (el, index) => {
            el.x -= this.dx * (1 + 0.1 * Math.floor(Math.log10(score.score + 0.001)));  // увеличиваем скорость птицы на 10% при достижении 9, 99, 999 и т.д. очков
            if (this.frames === Math.floor(180 / (1 + 0.1 * Math.floor(Math.log10(score.score + 0.001))))) {          // при 60 кадрах в секунду новые трубы появляются каждые 3 секунды, при увеличении сложности - расстояние сохраняется, время уменьшается
                this.pipes.push ( {
                    x: this.config.gameWidth,
                    y: getRandomInt( 0.1 * this.height + this.gap, 0.9 * this.height),
                    scoreFlag: 0,
                    hitFlag: 0
                } )
                this.frames = 0;                 // обнуляем счетчик кадров   
            }
            
            if (el.x < bird.x - Math.floor(bird.width / 2) && el.scoreFlag === 0) {      //проверка на начисление очков
            score.incScore(); 
            el.scoreFlag = 1;
            }

            if ((bird.x + bird.width / 2 > el.x) && (bird.x - bird.width / 2 < el.x + this.config.pipeWidth) // проверка на столкновение с трубами
            && ((bird.y + bird.height / 2 > el.y) || (bird.y - bird.height / 2 < el.y - this.gap)) && el.hitFlag === 0 ) {
                el.hitFlag = 1;
                this.config.hitSound.play(); 
                this.dx = 0;
                canvas.dx = 0;
                bird.dy = 0;
                setTimeout( () => location.reload(), 300);
            }


            if (el.x === -this.width) {         // удаляем из массива трубы, которые ушли за экран
                this.pipes.shift()
            }
        } )
        this.frames++;
    }
}

class GameLoop {
    constructor( update, draw ) {
        this.update = update;
        this.draw = draw;
        this.config = new Config();
        this.animate = this.animate.bind(this);
        this.animate();
    }

    animate() {
        requestAnimationFrame( this.animate );
        this.config.step = 0;
        this.update();
        this.draw();
    }
}

class Score {
    constructor( score = 0, maxScore = 0 ) {
        this.config = new Config();
        this.score = score;
        this.maxScore = maxScore;
        this.reset();
    }

    incScore() {
        this.config.ScoreSound.play();
        this.score++;        
        if (this.maxScore < this.score) {
            this.maxScore = this.score;
            localStorage.setItem("MaxScore", this.maxScore);
        }
            }
    drawScore( context ) {
        context.fillText(`Score: ${this.score}`, 10, this.config.gameBgHeight + this.config.gameFgHeight - 50);
        context.strokeText(`Score: ${this.score}`, 10, this.config.gameBgHeight + this.config.gameFgHeight - 50);
    }    
    drawMaxScore( context ) {
        if (localStorage.getItem("MaxScore") !== null) {
            this.maxScore = localStorage.getItem("MaxScore");
            } else {
                this.maxScore = 0;
            }
        context.fillText(`Best: ${this.maxScore}`, 10, this.config.gameBgHeight + this.config.gameFgHeight - 10);
        context.strokeText(`Best: ${this.maxScore}`, 10, this.config.gameBgHeight + this.config.gameFgHeight - 10);
    }
    reset(){
        document.addEventListener("keydown", (e) => {
            if (e.code == "KeyR") {
                localStorage.removeItem("MaxScore");
                location.reload();
            }
        } );
    }
}

class Game {
    constructor( box ) {
        this.canvas = new Field( box );
        this.score = new Score( 0, 0 );
        this.fall = new Physics();
        this.bird = new Bird( );
        this.pipe = new Pipe( );
        this.gameState = 0;
        this.rect; 
	    new GameLoop( this.update.bind(this), this.draw.bind(this) );
    }
    update() {
        this.canvas.update();
        this.bird.update();

        document.addEventListener("click", () => {
            this.gameState = 1;
        } );

        document.addEventListener("keydown", (e) => {
            if (e.code == "Space") {
                this.gameState = 1;
            }
        } );

            if (this.gameState === 1){
            this.fall.falling(this.bird);
            this.pipe.update(this.bird, this.score, this.canvas);
        }
    }
    draw() {
        this.canvas.context.clearRect( 0, 0, this.canvas.element.width, this.canvas.element.height );
		this.canvas.draw(this.canvas.context);
        this.score.drawScore(this.canvas.context);
        this.score.drawMaxScore(this.canvas.context);
        this.bird.draw (this.canvas.context);
        this.pipe.draw (this.canvas.context);

        if (this.gameState === 0) {
            this.canvas.drawStartButton(this.canvas.context);
        }            
    }
}

new Game( document.querySelector(".wrapper") );

function getRandomInt(min, max) {
	return Math.floor( Math.random() * (max - min) + min );
}