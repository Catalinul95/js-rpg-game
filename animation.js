function loadImage(image) {

}

function SpriteAnimation(options) {
    this.plays = [];
    this.currentFrame = 0;
    this.totalFramesNum = 0;
    this.currentPlay = undefined
    this.spriteSheet = new Image();
    this.spriteLoaded = false;
    this.currentDuration;
    this.frameWidth = options.frameWidth;
    this.frameHeight = options.frameHeight;
    this.options = options;

    let that = this;
    this.spriteSheet.src = options.sprite;
    this.spriteSheet.load = function () {
        that.spriteLoaded = true;
    };

    this.setPlay = function (name, frames) {
        this.plays.push({
            name: name,
            frames: frames,
        });
    }

    this.play = function (playName, delta, ctx) {
        // set current play
        if (!this.currentPlay || this.currentPlay['name'] != playName) {
            for (let i = 0; i < this.plays.length; i++) {
                if (this.plays[i]['name'] == playName) {
                    this.currentPlay = this.plays[i];
                }
            }
            this.currentDuration = this.currentPlay['frames'][0]['duration'];
            this.totalFramesNum = this.currentPlay.frames.length;
            this.currentFrame = 0;
        }

        if (this.spriteSheet && this.currentPlay) {
            this.currentDuration -= delta;
            
            if (this.currentFrame >= this.totalFramesNum - 1) {
                this.currentFrame = 0;
            }
            
                   
            if (this.currentDuration <= 0) {   
                if (this.totalFramesNum > 1) {
                    this.currentFrame++;
                }
                
                this.currentDuration = this.currentPlay['frames'][this.currentFrame].duration;
            }

            ctx.drawImage(
                this.spriteSheet,
                this.currentPlay['frames'][this.currentFrame].x,
                this.currentPlay['frames'][this.currentFrame].y,
                this.frameWidth,
                this.frameHeight,
                this.options.x,
                this.options.y,
                this.options.width,
                this.options.height
            );
        }
    }
}
