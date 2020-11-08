import keyboard from '../input.js'
import {isClipsCollide} from '../utils/index.js'
let container;
let text
let rect


function effect(mainPlayer, redirectToProject) {
    const enter = keyboard("Enter")

    enter.press = () => {
        if(isClipsCollide(mainPlayer, container)) {
            redirectToProject()
        }
    };
}

let style = new PIXI.TextStyle({
    fontFamily: 'impact',
    fontSize: 30,
    fill: "green",
  });

export function init() {
    container = new PIXI.Container()

    rect = new PIXI.Graphics()
    rect.beginFill(0xFFFFFF)
    rect.drawRoundedRect(0, 0, 100, 100, 5)
    rect.endFill();

    text = new PIXI.Text("The\nMatrix", style);
    text.position.set(5, 10)
    container.addChild(rect)
    container.addChild(text)
    container.position.set(500, 380)

    return container;
}

export function update(mainPlayer, redirectToProject) {
    effect(mainPlayer, redirectToProject)
}

