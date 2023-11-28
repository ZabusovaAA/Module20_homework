export default class Config {
       constructor() {
        //арт
        this.sprite = new Image();
        this.sprite.src = "sprite.png";

        //звуки
        this.ScoreSound = new Audio();
        this.ScoreSound.src = "audio/sfx_point.wav";

        this.hitSound = new Audio();
        this.hitSound.src = "audio/sfx_hit.wav";
                
		//параметры элементов игры на спредшите
        this.backgroundSpriteX = 0;
        this.backgroundSpriteY = 0;
        this.backgroundSpriteWidth = 275;
        this.backgroundSpriteHeight = 226;

        this.foregroundSpriteX = 276;
        this.foregroundSpriteY = 0;
        this.foregroundSpriteWidth = 224;
        this.foregroundSpriteHeight = 111;

        this.birdSpriteX = 277;
        this.birdSpriteY = 112;
        this.birdSpriteWidth = 35;
        this.birdSpriteHeight = 26;
        
        this.pipeSpriteWidth = 52;
        this.pipeSpriteHeight = this.backgroundSpriteHeight;
        this.bottomPipeSpriteX = 502;
        this.bottomPipeSpriteY = 0;
        this.topPipeSpriteX = 554;
        this.topPipeSpriteY = 400 - this.pipeSpriteHeight;

        this.startButtonSpriteX = 30;
        this.startButtonSpriteY = 280;
        this.startButtonSpriteWidth = 116;
        this.startButtonSpriteHeight = 100;

        //параметры игры
        //поле
        const maxScale = 2;  // ограничение на максимальный размер игрового поля
        const padding = 40; //  поля от краев экрана до границ игрового поля
        this.scale = Math.min(maxScale, Math.min(window.innerWidth / this.backgroundSpriteWidth, window.innerHeight / (this.backgroundSpriteHeight + this.foregroundSpriteHeight)));  // коэффициент масштабирования игры относительно спрайтшита
        this.gameWidth =  this.backgroundSpriteWidth * this.scale - padding;
        this.gameBgHeight = this.backgroundSpriteHeight * this.scale - padding;
        this.gameFgHeight = this.foregroundSpriteHeight * this.scale - padding;
        this.backgroundSpriteOverlap = -2; // для более гладной сшивки бэкграунда
        this.backgroundSpeedCoeff = 1.3 // для создания эффекта параллакса
        //птица
        this.birdStartX = Math.floor(this.gameWidth * 0.18);
        this.birdStartY = Math.floor(this.gameBgHeight * 0.48);
        this.birdHeight = Math.floor(this.gameBgHeight * 0.25 * 0.3); // высота птицы - 40% от промежутка, а промежуток - 25% от высоты трубы, которая занимает весь экран
        this.birdWidth = Math.floor(35 / 26 * this.birdHeight); //для сохранения пропорции
        //трубы
        this.pipeWidth = 2 * this.birdWidth; //ширина трубы в 2 раза больше ширины птицы
        this.pipeGap = Math.floor(0.25 * this.gameBgHeight);
        
        //скорости и ускорения
        this.birdAccelY = 0.02 * this.scale;
        this.birdSpeedX = 4 * this.pipeWidth / 180 ;
    }
}