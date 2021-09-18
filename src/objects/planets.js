let container;

export function init() {
    container = new PIXI.Container();
    container.width = 1000;
    container.height = 1000;
    let planet1 = new PIXI.Sprite(PIXI.loader.resources["assets/planets/Baren.png"].texture);
    let planet2 = new PIXI.Sprite(PIXI.loader.resources["assets/planets/Ice.png"].texture);
    let planet3 = new PIXI.Sprite(PIXI.loader.resources["assets/planets/Lava.png"].texture);

    planet1.position.x = 100;
    planet1.position.y = 100;
    planet2.position.x = 500;
    planet2.position.y = 50;
    container.addChild(planet1);
    container.addChild(planet2);

    planet1.scale.x = 2.5
    planet1.scale.y = 2.5

    return container;
}

export function update() {
    
}

export const getClip = () => container