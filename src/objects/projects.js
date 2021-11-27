import keyboard from '../input.js'
import {isClipsCollide} from '../utils/index.js'
import projects from '../../my-projects.js'

let container;
let projectContainers = [];
let text
let rect


function effect(mainPlayer, redirectToProject) {
    const enter = keyboard("Enter")

    enter.press = () => {
        const colidingProjectIndex = projectContainers.findIndex((projectContainer) =>
            isClipsCollide(mainPlayer, projectContainer)
        )
        if(colidingProjectIndex !== -1) {
            redirectToProject(projects[colidingProjectIndex].url)
        }
    };
}

let style = new PIXI.TextStyle({
    fontFamily: 'impact',
    fontSize: 30,
    fill: "green",
  });

const positions = [[-100, 0], [150, -150]]
export function init() {
    container = new PIXI.Container()

    projects.forEach((project, index) => {
        const projectContainer = new PIXI.Container()

        rect = new PIXI.Graphics()
        rect.beginFill(0xFFFFFF)
        rect.drawRoundedRect(0, 0, 100, 100, 5)
        rect.endFill();

        text = new PIXI.Text(project.name, style);
        text.position.set(5, 10)
        projectContainer.addChild(rect)
        projectContainer.addChild(text)
        projectContainer.position.set(...positions[index])
        container.addChild(projectContainer)
        projectContainers.push(projectContainer)
    })
    
    container.position.set(300, 380)

    return container;
}

export function update(mainPlayer, {redirectToProject}) {
    effect(mainPlayer, redirectToProject)
}

export const getClip = () => container