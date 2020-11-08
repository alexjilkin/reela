let background;

export function init() {
    background = new PIXI.Sprite(PIXI.loader.resources["assets/buildings-bg.png"].texture);

    background.scale.x = 6
    background.scale.y = 6

    return background;
}

export function update() {
    
}