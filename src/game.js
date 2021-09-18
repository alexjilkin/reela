import * as dude from './objects/dude.js'
import * as background from './objects/background.js'
import * as mainText from './objects/mainText.js'
import * as projects from './objects/projects.js'
import * as floor from './objects/floor.js'
import * as planets from './objects/planets.js';

import {getPosition} from './objects/camera.js'
import {isClipsCollide} from './utils/index.js'

const width = 900
const height = 500;

let app = new PIXI.Application({ 
    width: 900, 
    height: 500,                       
    antialias: true, 
    transparent: false, 
    resolution: 1
  }
);

let worldContainer;
let absoluteContainer;
let cameraBoundContainer;
let mainPlayerContainer;
let backgroundLayer1
let backgroundLayer0

const backgroundClipsLayer0 = [planets];
const backgroundClipsLayer1 = [background]
const absoluteClips = [mainText]
const cameraClipsCollide = [floor]
const cameraClips = [projects]
const mainPlayer = dude;

let blur

document.getElementById('container').appendChild(app.view);

PIXI.loader
  .add("assets/buildings-bg.png")
  .add("assets/dude.png")
  .add("assets/floor.png")
  .add("assets/planets/Baren.png")
  .add("assets/planets/Ice.png")
  .add("assets/planets/Lava.png")
  .load(setup);

function setup() {
  backgroundLayer1 = new PIXI.Container()
  backgroundLayer0 = new PIXI.Container()
  cameraBoundContainer = new PIXI.Container()
  absoluteContainer = new PIXI.Container()

  const allCameraClips = [...cameraClips, ...cameraClipsCollide]

  allCameraClips.forEach(({init}) => {
    cameraBoundContainer.addChild(init())
  })

  absoluteClips.forEach(({init}) => {
    absoluteContainer.addChild(init())
  })

  backgroundClipsLayer1.forEach(({init}) => {
    backgroundLayer1.addChild(init())
  })

  backgroundClipsLayer0.forEach(({init}) => {
    backgroundLayer0.addChild(init())
  })

  mainPlayerContainer = new PIXI.Container()
  mainPlayerContainer.addChild(mainPlayer.init())

  worldContainer = new PIXI.Container()
  worldContainer.addChild(backgroundLayer0, backgroundLayer1, cameraBoundContainer, absoluteContainer, mainPlayerContainer)
  app.stage.addChild(worldContainer);
  app.ticker.add(delta => updateLoop(delta))
}

function redirectToProject(url){
  blur = new PIXI.filters.BlurFilter(0, 1);
  worldContainer.filters = [blur]
  setTimeout(() => {
    window.location = url
  }, 250)
}

function isCollidingWithWorld(testClip) {
  return cameraClipsCollide.some(clip => isClipsCollide(testClip, clip.getClip()))
}
function updateLoop() {
  const clips = [...backgroundClipsLayer0, ...backgroundClipsLayer1, ...absoluteClips, ...cameraClips]

  clips.forEach(({update = () => {}}) => {
    update(mainPlayer.getClip(), {redirectToProject, isColliding: isCollidingWithWorld})
  })

  mainPlayer.update({redirectToProject, isColliding: isCollidingWithWorld})

  const newX = (width / 2) - getPosition().x
  const newY = (height / 2) - getPosition().y

  cameraBoundContainer.position.set(newX, newY)
  mainPlayerContainer.position.set(newX, newY)

  backgroundLayer1.position.set(-(getPosition().x / 20), -(getPosition().y / 20))

  if (blur) {
    blur.blur = blur.blur + 0.1;
  }
}