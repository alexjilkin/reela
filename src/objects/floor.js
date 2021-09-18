let container;

export function init() {
    container = new PIXI.Container()

    let floor = new PIXI.Sprite(PIXI.loader.resources["assets/floor.png"].texture);
    floor.scale.x = 2.5
    floor.scale.y = 2.5

    floor.position.set(0, 485)


    let floor2 = new PIXI.Sprite(PIXI.loader.resources["assets/floor.png"].texture);
    floor2.scale.x = 2.5
    floor2.scale.y = 2.5

    floor2.position.set(800, 360)

    container.addChild(floor, floor2);

    return container;
}

export function update() {
    
}
export const getClip = () => container