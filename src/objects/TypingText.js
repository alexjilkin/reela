class TypingText extends PIXI.Text {

    constructor(text, speed = 2, ...args) {
        super(text, ...args)

        this.originalText = text
        this.speed = speed
        
        this.text = ''
        this.i = 0;
        this.letters = 0;
    }

    update() {
        if (this.letters > this.originalText.length) {
            return; 
        }

        this.i++;

        if (this.i % Math.round(10 / this.speed) === 0) {
            this.letters++
            
            this.text = this.originalText.slice(0, this.letters)
        }
    }
}

export default TypingText