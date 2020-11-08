import keyboard from '../input.js'
import {setPosition} from './camera.js'

let container;
let dude;

function physics(blocks) {
    if (container.position.y < 380) {
        container.vy += 0.3;
    } else {
        container.vy = 0;
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

    setPosition(container.position.x, container.position.y)
}



export function init() {
    container = new PIXI.Container()
    
    container.vx = 0.00;
    container.vy = 0.00;

    dude = new PIXI.Sprite(PIXI.loader.resources["../assets/dude.png"].texture);
    dude.scale.x = 0.1
    dude.scale.y = 0.1
    container.addChild(dude)
    
    return container;
}

export const getClip = () => container

export function update(clips) {
    container.x += container.vx;
    container.y += container.vy;

    movement()
    physics(clips)
}

