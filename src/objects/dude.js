import keyboard from '../input.js'
import {setPosition} from './camera.js'

let container;
let dude;
let dudeCollided;
let isMoving;

const dudeHeight = 100;
const a = 0.3;

function physics() {
    if (!dudeCollided) {
        container.vy += a;
    } else {
        container.vy = 0;
    }
}

function movement(isColliding) {
    let left = keyboard("ArrowLeft"),
    up = keyboard("ArrowUp"),
    right = keyboard("ArrowRight"),
    down = keyboard("ArrowDown");

    
    right.press = () => {
        isMoving = true;
        container.vx = 5;
        
        container.scale.x = 1
    };

    right.release = () => {
        isMoving = false;
        container.vx = 0;
    }

    left.press = () => {
        isMoving = true;
        container.vx = -5;
        container.scale.x = -1
    };

    left.release = () => {
        isMoving = false;
        container.vx = 0;
    }
    
    up.press = () => {
        dudeCollided = false
        container.vy = -10;
    };

    setPosition(container.position.x, container.position.y)
}



export function init() {
    container = new PIXI.Container()
    
    container.vx = 0.00;
    container.vy = 0.00;
    container.position.set(100, 200)
    dude = new PIXI.Sprite(PIXI.loader.resources["assets/dude.png"].texture);
    const ratio = dude.width / dude.height

    dude.height = dudeHeight
    dude.width = dude.height / ratio
    dude.anchor.set(0.5, 0)
    container.addChild(dude)
    
    return container;
}

export const getClip = () => container

export function update({isColliding}) {
    container.x += container.vx;
    container.y += container.vy;

    movement(isColliding)
    physics(isColliding)

    if (isColliding(container)) {
        dudeCollided = true
    } else {
        dudeCollided = false
    }

    if (dudeCollided) {
        container.y -= container.vy
    }
}

