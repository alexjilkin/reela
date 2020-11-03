let subject;

const value = 'Welcome to Evening City... \nJack in the matrix'

export function init() {
    let style = new PIXI.TextStyle({
        fontFamily: 'ailerons',
        fontSize: 26,
        fill: "white",
    });

    subject = new PIXI.Text('', style)
    subject.position.set(10, 10)
    return subject
}

let i = 0;
let letters = 0;

export function update() {
    i++

    if (i % 5 === 0) {
        letters++
        
        subject.text = value.slice(0, letters)
    }
}