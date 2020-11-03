import keyboard from '../input.js'

let container;
let dude;
let text

function physics(block) {
    if (block.position.y < 380) {
        block.vy += 0.3;
    } else {
        block.vy = 0;
    }
}

function movement() {
    let left = keyboard("ArrowLeft"),
    up = keyboard("ArrowUp"),
    right = keyboard("ArrowRight"),
    down = keyboard("ArrowDown");

    right.press = () => {
        container.vx = 5;
    };
    right.release = () => {
        container.vx = 0;
    }

    left.press = () => {
        container.vx = -5;
    };

    left.release = () => {
        container.vx = 0;
    }
    
    up.press = () => {
        container.vy = -9;
    };
}

let style = new PIXI.TextStyle({
    fontFamily: 'ailerons',
    fontSize: 18,
    fill: "white",
  
  });

export function init() {
    container = new PIXI.Container()
    
    container.vx = 0.00;
    container.vy = 0.00;

    dude = new PIXI.Sprite(PIXI.loader.resources["../assets/dude.png"].texture);
    dude.scale.x = 0.1 
    dude.scale.y = 0.1

    //text = new PIXI.Text("Oh boy\nI've missed the matrix...", style);

    container.addChild(dude)
    //container.addChild(text)
    
    return container;
}

export function update() {
    container.x += container.vx;
    container.y += container.vy;

    movement()
    physics(container)
}

