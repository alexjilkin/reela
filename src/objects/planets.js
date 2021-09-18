import {generatePaths} from '../utils/index.js'

let container;
const path = 'assets/planets/lava';
const num = 140
export let lavaImages = generatePaths(path, num)

export function init() {
   
    let lavaTextures = []
    
    lavaTextures = lavaImages.map(image => 
        PIXI.loader.resources[image].texture
    )

    container = new PIXI.Container();
   
    let planet2 = new PIXI.Sprite(PIXI.loader.resources["assets/planets/Ice.png"].texture);

    planet2.position.x = 500;
    planet2.position.y = 50;
    container.addChild(planet2);

    const lavaSprite =  new PIXI.AnimatedSprite(lavaTextures);
    lavaSprite.scale = 3;
    
    lavaSprite.height = 0
    lavaSprite.width = 0
    lavaSprite.visible = true;
    lavaSprite.scale = 2;
    lavaSprite.position.set(300, 130)
    lavaSprite.animationSpeed = 0.15

    container.addChild(lavaSprite);
    setTimeout(lavaSprite.play, 1000)
    return container;
}

export function update() {
    
}

export const getClip = () => container