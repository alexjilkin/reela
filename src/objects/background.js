let background;

export function init() {
    background = new PIXI.Sprite(PIXI.loader.resources["../assets/buildings-bg.png"].texture);

    background.scale.x = 5
    background.scale.y = 5

    return background;
}

export function update() {
    
}