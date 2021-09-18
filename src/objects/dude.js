import keyboard from '../input.js'
import {setPosition} from './camera.js'
import {generatePaths} from '../utils/index.js'

let container;

const animations = {
    walking: null,
    jumping: null,
    idle: null
}

let state;

let dude;
let dudeCollided;

const dudeHeight = 180;
const a = 0.3;
let dudeIdleImages = generatePaths('assets/hood/idle', 18)
//["assets/hood/idle/tile000.png", "assets/hood/idle/tile001.png", "assets/hood/idle/tile002.png", "assets/hood/idle/tile003.png", "assets/hood/idle/tile004.png", "assets/hood/idle/tile005.png", "assets/hood/idle/tile006.png", "assets/hood/idle/tile007.png", "assets/hood/idle/tile008.png", "assets/hood/idle/tile009.png", "assets/hood/idle/tile010.png", "assets/hood/idle/tile011.png", "assets/hood/idle/tile012.png", "assets/hood/idle/tile013.png", "assets/hood/idle/tile014.png", "assets/hood/idle/tile015.png", "assets/hood/idle/tile016.png", "assets/hood/idle/tile017.png"];
let dudeJumpImages = generatePaths('assets/hood/jump', 19)
//["assets/hood/jump/tile000.png", "assets/hood/jump/tile001.png", "assets/hood/jump/tile002.png", "assets/hood/jump/tile003.png", "assets/hood/jump/tile004.png", "assets/hood/jump/tile005.png", "assets/hood/jump/tile006.png", "assets/hood/jump/tile007.png", "assets/hood/jump/tile008.png", "assets/hood/jump/tile009.png", "assets/hood/jump/tile010.png", "assets/hood/jump/tile011.png", "assets/hood/jump/tile012.png", "assets/hood/jump/tile013.png", "assets/hood/jump/tile014.png", "assets/hood/jump/tile015.png", "assets/hood/jump/tile016.png", "assets/hood/jump/tile017.png", , "assets/hood/jump/tile018.png"];
let dudeWalkingImages = generatePaths('assets/hood/run', 23)
//["assets/hood/run/tile000.png", "assets/hood/run/tile001.png", "assets/hood/run/tile002.png", "assets/hood/run/tile003.png", "assets/hood/run/tile004.png", "assets/hood/run/tile005.png", "assets/hood/run/tile006.png", "assets/hood/run/tile007.png", "assets/hood/run/tile008.png", "assets/hood/run/tile009.png", "assets/hood/run/tile010.png", "assets/hood/run/tile011.png", "assets/hood/run/tile012.png", "assets/hood/run/tile013.png", "assets/hood/run/tile014.png", "assets/hood/run/tile015.png", "assets/hood/run/tile016.png", "assets/hood/run/tile018.png", "assets/hood/run/tile019.png", "assets/hood/run/tile020.png", "assets/hood/run/tile021.png", "assets/hood/run/tile022.png", "assets/hood/run/tile023.png", ];
let dudeWalkingArray = [];
let dudeIdleArray = [];
let dudeJumpArray = [];
export const preload = [...dudeIdleImages, ...dudeJumpImages, ...dudeWalkingImages];

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
        container.vx = 5;
        container.scale.x = 1

        startWalking()
    };

    right.release = () => {
        container.vx = 0;
        stopWalking()
    }

    left.press = () => {
        container.vx = -5;
        container.scale.x = -1

        startWalking()
    };

    left.release = () => {
        container.vx = 0;
        stopWalking()
    }
    
    up.press = () => {
        if (state !== 'jumping') {
            setState('jumping')
            dudeCollided = false
            container.vy = -10 
        }
    };

    setPosition(container.position.x, container.position.y)
}

function setState(newState) {
    if (state !== newState) {
        console.log(newState)
        state = newState
        setAnimation(state)
    }
}
function setAnimation(type) {
    Object.values(animations).forEach(sprite => {
        sprite.visible = false;
        sprite.stop()
    })

    animations[type].visible = true;
    animations[type].play()
}

function startWalking() {

    setState('walking')
    
    
}
function stopWalking() {
    setState('idle')
}

export function init() {
    container = new PIXI.Container()
    
    // container.height = dudeHeight;
    // container.width = dudeHeight;
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
    animations.walking = new PIXI.AnimatedSprite(dudeWalkingArray);
    animations.walking.animationSpeed = 0.4
    const ratio =  animations.walking.width /  animations.walking.height
    animations.walking.height = dudeHeight
    animations.walking.width = dudeHeight / ratio
    animations.walking.visible = false;
    animations.walking.anchor.set(0.35, 0)
    dude.addChild( animations.walking)

    // Jumping animation
    animations.jumping = new PIXI.AnimatedSprite(dudeJumpArray);
    animations.jumping.animationSpeed = 0.15
    // animations.jumping.onLoop = () => {
    //     setState('idle')
    // }

    animations.jumping.height = dudeHeight
    animations.jumping.width = dudeHeight / ratio
    animations.jumping.visible = false;
    animations.jumping.anchor.set(0.35, 0)
    dude.addChild(animations.jumping)

    // Idle animation
    animations.idle = new PIXI.AnimatedSprite(dudeIdleArray);
    animations.idle.anchor.set(0.35, 0)
    animations.idle.height = dudeHeight
    animations.idle.width = dudeHeight / ratio
    animations.idle.animationSpeed = 0.15
    animations.idle.play()
    dude.addChild(animations.idle)

    container.addChild(dude)
    
    setState('idle')
    return container;
}

export const getClip = () => container

export function update({isColliding}) {
    container.x += container.vx;
    container.y += container.vy;

    movement(isColliding)
    physics(isColliding)
    
    if (isColliding(container) && !dudeCollided) {
        dudeCollided = true
        if (container.vx !== 0) {
            setState('walking');
        } else {
            setState('idle');
        }
        

        container.y -= container.vy
    } 

    // if(state === 'jumping') {
    //     if (container.vx !== 0) {
    //         setState('walking')
    //     } else {
    //         setState('idle')
    //     }
    // }
}

