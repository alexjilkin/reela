import keyboard from '../input.js'
import {setPosition} from './camera.js'

let container;
let dudeWalking;
let dudeJumping;
let dudeIdle;
let dude;
let dudeCollided;

let isMoving;
let isInAir = true;

const dudeHeight = 180;
const a = 0.3;
let dudeIdleImages = ["assets/hood/idle/tile000.png", "assets/hood/idle/tile001.png", "assets/hood/idle/tile002.png", "assets/hood/idle/tile003.png", "assets/hood/idle/tile004.png", "assets/hood/idle/tile005.png", "assets/hood/idle/tile006.png", "assets/hood/idle/tile007.png", "assets/hood/idle/tile008.png", "assets/hood/idle/tile009.png", "assets/hood/idle/tile010.png", "assets/hood/idle/tile011.png", "assets/hood/idle/tile012.png", "assets/hood/idle/tile013.png", "assets/hood/idle/tile014.png", "assets/hood/idle/tile015.png", "assets/hood/idle/tile016.png", "assets/hood/idle/tile017.png"];
let dudeJumpImages = ["assets/hood/jump/tile000.png", "assets/hood/jump/tile001.png", "assets/hood/jump/tile002.png", "assets/hood/jump/tile003.png", "assets/hood/jump/tile004.png", "assets/hood/jump/tile005.png", "assets/hood/jump/tile006.png", "assets/hood/jump/tile007.png", "assets/hood/jump/tile008.png", "assets/hood/jump/tile009.png", "assets/hood/jump/tile010.png", "assets/hood/jump/tile011.png", "assets/hood/jump/tile012.png", "assets/hood/jump/tile013.png", "assets/hood/jump/tile014.png", "assets/hood/jump/tile015.png", "assets/hood/jump/tile016.png", "assets/hood/jump/tile017.png", , "assets/hood/jump/tile018.png"];
let dudeWalkingImages = ["assets/hood/run/tile000.png", "assets/hood/run/tile001.png", "assets/hood/run/tile002.png", "assets/hood/run/tile003.png", "assets/hood/run/tile004.png", "assets/hood/run/tile005.png", "assets/hood/run/tile006.png", "assets/hood/run/tile007.png", "assets/hood/run/tile008.png", "assets/hood/run/tile009.png", "assets/hood/run/tile010.png", "assets/hood/run/tile011.png", "assets/hood/run/tile012.png", "assets/hood/run/tile013.png", "assets/hood/run/tile014.png", "assets/hood/run/tile015.png", "assets/hood/run/tile016.png", "assets/hood/run/tile018.png", "assets/hood/run/tile019.png", "assets/hood/run/tile020.png", "assets/hood/run/tile021.png", "assets/hood/run/tile022.png", "assets/hood/run/tile023.png", ];
let dudeWalkingArray = [];
let dudeIdleArray = [];
let dudeJumpArray = [];

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
            dudeJumping.play()
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
}

export function init() {
    container = new PIXI.Container()
    
    container.vx = 0.00;
    container.vy = 0.00;
    container.position.set(100, 200)

    dudeWalkingImages.forEach(image => {
        let texture = PIXI.Texture.from(image);
        dudeWalkingArray.push(texture);
    });

    dudeIdleImages.forEach(image => {
        let texture = PIXI.Texture.from(image);
        dudeIdleArray.push(texture);
    });

    dudeJumpImages.forEach(image => {
        let texture = PIXI.Texture.from(image);
        dudeJumpArray.push(texture);
    });
    
    dude = new PIXI.Container();
    
    // Walking Animation
    dudeWalking = new PIXI.AnimatedSprite(dudeWalkingArray);
    dudeWalking.animationSpeed = 0.4
    const ratio = dudeWalking.width / dudeWalking.height
    dudeWalking.height = dudeHeight
    dudeWalking.width = dudeHeight / ratio
    dudeWalking.visible = false;
    dudeWalking.anchor.set(0.5, 0)
    dude.addChild(dudeWalking)

    // Jumping animation
    dudeJumping = new PIXI.AnimatedSprite(dudeJumpArray);
    dudeJumping.animationSpeed = 0.15
    const ratio2 = dudeJumping.width / dudeJumping.height
    dudeJumping.height = dudeHeight
    dudeJumping.width = dudeHeight / ratio2
    dudeJumping.visible = false;
    dudeJumping.anchor.set(0.5, 0)
    dude.addChild(dudeJumping)

    // Idle animation
    dudeIdle = new PIXI.AnimatedSprite(dudeIdleArray);
    dudeIdle.anchor.set(0.5, 0)
    dudeIdle.height = dudeHeight
    dudeIdle.width = dudeHeight / ratio
    dudeIdle.animationSpeed = 0.15
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
    container.hitArea = new PIXI.Rectangle(container.x + 20, container.y + 20, container.x + 60, container.y + 60);
    if (isColliding(container)) {
        dudeCollided = true
        isInAir = false;
    } else {
        dudeCollided = false
    }

    if (dudeCollided) {
        container.y -= container.vy
    }

    if(isInAir) {
        dudeJumping.visible = true;
        dudeWalking.visible = false;
        dudeIdle.visible = false;
    } else {
        dudeJumping.visible = false;
        dudeJumping.stop();
        if (!isMoving)
            dudeIdle.visible = true;
    }
}

