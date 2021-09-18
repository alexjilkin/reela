let container;

export function init() {
    container = new PIXI.Container()
    let background = new PIXI.Sprite(PIXI.loader.resources["assets/buildings-bg.png"].texture);

    background.scale.x = 5
    background.scale.y = 5

    background.position.x = 0
    background.position.y = -10

    let background2 = new PIXI.Sprite(PIXI.loader.resources["assets/buildings-bg.png"].texture);

    background2.scale.x = 4.6
    background2.scale.y = 4.6

    background2.position.x = background.getBounds().width
    background2.position.y = 20

    container.addChild(background, background2)
    return container;
}

export function update() {
    
}

export const getClip = () => container