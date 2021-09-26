import {generatePaths} from '../utils/index.js'

let container;
const path = 'assets/planets/lava';
const num = 158
export let lavaImages = generatePaths(path, num)

export function init() {
   
    let lavaTextures = []
    
    lavaTextures = lavaImages.map(image => 
        PIXI.loader.resources[image].texture
    )

    container = new PIXI.Container();
   
    let planet = new PIXI.Sprite(PIXI.loader.resources["assets/planets/Ice.png"].texture);

    planet.position.x = 190;
    planet.position.y = 45;
    planet.width = 60
    planet.height = 60
    
    container.addChild(planet);

    const lavaSprite =  new PIXI.AnimatedSprite(lavaTextures);
    
    lavaSprite.visible = true;
    lavaSprite.scale = 2;
    lavaSprite.width = 170
    lavaSprite.height = 170
    lavaSprite.position.x = 100
    lavaSprite.position.y = 70
    lavaSprite.animationSpeed = 0.15

    container.addChild(lavaSprite);
    lavaSprite.play()

    return container;
}

export function update() {
    
}

export const getClip = () => container