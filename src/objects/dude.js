import keyboard from '../input.js'
import {setPosition} from './camera.js'

let container;
let dudeWalking;
let dudeIdle;
let dude;
let dudeCollided;

let isMoving;
let isInAir = true;

const dudeHeight = 60;
const a = 0.3;
let dudeIdleImages = ["assets/dino/tile001.png","assets/dino/tile002.png","assets/dino/tile003.png"];
let dudeWalkingImages = ["assets/dino/tile003.png", "assets/dino/tile004.png","assets/dino/tile005.png","assets/dino/tile006.png", "assets/dino/tile007.png",  "assets/dino/tile008.png",  "assets/dino/tile009.png"];
let dudeWalkingArray = [];
let dudeIdleArray = [];

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

        startWalking()
    };

    right.release = () => {
        isMoving = false;
        container.vx = 0;
        stopWalking()
    }

    left.press = () => {
        isMoving = true;
        container.vx = -5;
        container.scale.x = -1

        startWalking()
    };

    left.release = () => {
        isMoving = false;
        container.vx = 0;
        stopWalking()
    }
    
    up.press = () => {
        if (!isInAir) {
            isInAir = true
            dudeCollided = false
            container.vy = -10 
        }
        
    };

    setPosition(container.position.x, container.position.y)
}

function startWalking() {
    dudeWalking.play()
    dudeWalking.visible = true;
    dudeIdle.visible = false
}
function stopWalking() {
    dudeWalking.stop()
    dudeWalking.visible = false;
    dudeIdle.visible = true
    //dude.currentFrame = 0
}

export function init() {
    container = new PIXI.Container()
    
    container.vx = 0.00;
    container.vy = 0.00;
    container.position.set(100, 200)

    for (let i=0; i < dudeWalkingImages.length; i++)
    {
        let texture = PIXI.Texture.from(dudeWalkingImages[i]);
        dudeWalkingArray.push(texture);
    };

    for (let i=0; i < dudeIdleImages.length; i++)
    {
        let texture = PIXI.Texture.from(dudeIdleImages[i]);
        dudeIdleArray.push(texture);
    };

    dudeWalking = new PIXI.AnimatedSprite(dudeWalkingArray);
    
    dude = new PIXI.Container();
    
    dudeWalking.animationSpeed = 0.2
    

    const ratio = dudeWalking.width / dudeWalking.height

    dudeWalking.height = dudeHeight
    dudeWalking.width = dudeHeight / ratio
    dudeWalking.visible = false;
    // dudeWalking.height = dude.height;
    // dudeWalking.width = dude.width;

    dudeWalking.anchor.set(0.5, 0)
    
    dude.addChild(dudeWalking)

    dudeIdle = new PIXI.AnimatedSprite(dudeIdleArray);
    dudeIdle.animationSpeed = 0.08
    dudeIdle.anchor.set(0.5, 0)
    dudeIdle.height = dudeHeight
    dudeIdle.width = dudeHeight / ratio
    dudeIdle.animationSpeed = 0.08
    dudeIdle.play()
    dude.addChild(dudeIdle)
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
        isInAir = false;
    } else {
        dudeCollided = false
    }

    if (dudeCollided) {
        container.y -= container.vy
    }
}

