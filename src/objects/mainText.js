import TypingText from './TypingText.js'

let subject;

export function init() {
    let style = new PIXI.TextStyle({
        fontFamily: 'ailerons',
        fontSize: 26,
        fill: "white",
    });

    subject = new TypingText('Welcome to Evening City... \nPress Enter near a project to open it', 
        3,  style)
    subject.position.set(10, 10)
    return subject
}

export function update() {
    subject.update()
}
export const getClip = () => subject