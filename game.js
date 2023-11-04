const flower = new Image();
flower.src="png/flower.png";

const headUp = new Image();
headUp.src="png/headUp.png";
const headRight = new Image();
headRight.src="png/headRight.png";
const headDown = new Image();
headDown.src="png/headDown.png";
const headLeft = new Image();
headLeft.src="png/headLeft.png";

const body = new Image();
body.src="png/body.png";

let head = new Image();

class Field {
    constructor( box ) {
        this.element = document.createElement( "canvas" );
        this.context = this.element.getContext( "2d" );
        this.element.width = 320;
        this.element.height = 320;
        box.appendChild( this.element );
    }
}

class Config {
	constructor() {
		this.step = 0;
		this.maxStep = 7; // скорость змейки
		this.sizeCell = 16; // размер ячейки
	}
}

class Berry {
    constructor( canvas ) {
        this.x = 0;
        this.y = 0;
        this.canvas = canvas;
        this.config = new Config();
        this.randomCoords();
    }
    draw(context) {
        context.drawImage(flower, this.x, this.y);
    }
    randomCoords() {
        this.x = this.config.sizeCell * getRandomInt( 0, this.canvas.element.width / this.config.sizeCell );
        this.y = this.config.sizeCell * getRandomInt( 0, this.canvas.element.height / this.config.sizeCell );
    }
}

class Snake {	
	constructor(){
		this.config = new Config();
		this.x = 160;
		this.y = 160;
		this.dx = this.config.sizeCell;
		this.dy = 0;
		this.tails = [];
		this.maxTails = 3;
		this.control();
	}

	update( berry, score, canvas ) {
		this.x += this.dx;
		this.y += this.dy;	
		if (this.x < 0) {
			this.x = canvas.element.width - this.config.sizeCell;
		} else if ( this.x >= canvas.element.width ) {
			this.x = 0;
		}	
		if (this.y < 0) {
			this.y = canvas.element.height - this.config.sizeCell;
		} else if ( this.y >= canvas.element.height ) {
			this.y = 0;
		}	
		this.tails.unshift( { x: this.x, y: this.y } );	
		if ( this.tails.length > this.maxTails ) {
			this.tails.pop();
		}	
		this.tails.forEach( (el, index) => {	
			if ( el.x === berry.x && el.y === berry.y ) {
				this.maxTails++;
				score.incScore();
				berry.randomCoords();
			}
	
			for( let i = index + 1; i < this.tails.length; i++ ) {	
				if ( el.x == this.tails[i].x && el.y == this.tails[i].y ) {
					this.gameover();
					score.setToZero();
					berry.randomCoords();
				}	
			}	
		} );
	}

	draw(context) {
		this.tails.forEach( (el, index) => {
			if (index == 0) {
				if (this.dx > 0) {
                    head = headRight;
                } else if (this.dx < 0) {
                    head = headLeft;
                } else if (this.dy < 0) {
                    head = headUp;
                } else {
                    head = headDown;
                }
                context.drawImage(head, el.x, el.y)
			} else {
				context.drawImage(body, el.x, el.y)
            }			
		} );
	}

	gameover() {
		this.x = 10 * this.config.sizeCell;
		this.y = 10 * this.config.sizeCell;
		this.dx = this.config.sizeCell;
		this.dy = 0;
		this.tails = [];
		this.maxTails = 3;
	}

	control() {		
		document.addEventListener("keydown",  (e) => {
			if ( e.code == "KeyW" || e.code == "ArrowUp" ) {
				this.dy = -this.config.sizeCell;
				this.dx = 0;
			} else if ( e.code == "KeyA" || e.code == "ArrowLeft" ) {
				this.dx = -this.config.sizeCell;
				this.dy = 0;
			} else if ( e.code == "KeyS" || e.code == "ArrowDown" ) {
				this.dy = this.config.sizeCell;
				this.dx = 0;
			} else if ( e.code == "KeyD" || e.code == "ArrowRight") {
				this.dx = this.config.sizeCell;
				this.dy = 0;
			}
		});
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
        if ( ++this.config.step < this.config.maxStep) {
            return;
        }
        this.config.step = 0;
        this.update();
        this.draw();
    }
}

class Score {
    constructor( scoreBlock, score = 0 ) {
        this.scoreBlock = document.querySelector( scoreBlock );
        this.score = score;
        this.draw();
    }
    incScore() {
        this.score++;
        this.draw();
    }

    setToZero() {
        this.score = 0;
        this.draw();
    }

    draw() {
        this.scoreBlock.innerHTML = this.score;
    }    
}

class Game {
    constructor( box ) {
        this.canvas = new Field( box );
        this.snake = new Snake();
        this.berry = new Berry( this.canvas );
        this.score = new Score( ".game-score .score-count", 0 );
        new GameLoop( this.update.bind(this), this.draw.bind(this) );
    }
    update() {
        this.snake.update( this.berry, this.score, this.canvas );
    }
    draw() {
        this.canvas.context.clearRect( 0, 0, this.canvas.element.width, this.canvas.element.height );
        this.snake.draw( this.canvas.context );
        this.berry.draw( this.canvas.context );
    }
}

new Game( document.querySelector(".wrapper") );

function getRandomInt(min, max) {
	return Math.floor( Math.random() * (max - min) + min );
}