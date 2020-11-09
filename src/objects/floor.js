let floor;

export function init() {
    floor = new PIXI.Sprite(PIXI.loader.resources["assets/floor.png"].texture);

    floor.scale.x = 3
    floor.scale.y = 3

    floor.position.set(0, 485)

    return floor;
}

export function update() {
    
}
export const getClip = () => floor