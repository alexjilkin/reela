import keyboard from '../input.js'
import {setPosition} from './camera.js'

let container;
let dude;
let dudeCollided;
let isMoving;

const dudeHeight = 60;
const a = 0.3;
let dudeImages = ["assets/dino/tile001.png","assets/dino/tile002.png","assets/dino/tile003.png","assets/dino/tile004.png", "assets/dino/tile005.png",  "assets/dino/tile006.png",  "assets/dino/tile006.png"];
let dudeArray = [];

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

        dude.play()
    };

    right.release = () => {
        isMoving = false;
        container.vx = 0;
        dude.stop()
    }

    left.press = () => {
        isMoving = true;
        container.vx = -5;
        container.scale.x = -1
        dude.play()
    };

    left.release = () => {
        isMoving = false;
        container.vx = 0;
        dude.stop()
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

    for (let i=0; i < dudeImages.length; i++)
    {
        let texture = PIXI.Texture.from(dudeImages[i]);
        dudeArray.push(texture);
    };

    dude = new PIXI.AnimatedSprite(dudeArray);
    dude.animationSpeed = 0.3
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

