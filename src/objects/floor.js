let container;

export function init() {
    container = new PIXI.Container()

    let floor = new PIXI.Sprite(PIXI.loader.resources["assets/floor/floor.png"].texture);
    floor.position.set(0, 485)


    let floor2 = new PIXI.Sprite(PIXI.loader.resources["assets/floor/floor.png"].texture);

    floor2.position.set(floor.width + 100, 360)

    container.addChild(floor, floor2);

    return container;
}

export function update() {
    
}
export const getClip = () => container