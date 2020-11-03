import * as dude from './objects/dude.js'
import * as background from './objects/background.js'
import * as mainText from './objects/mainText.js'

//Create a Pixi Application
let app = new PIXI.Application({ 
    width: 900, 
    height: 500,                       
    antialias: true, 
    transparent: false, 
    resolution: 1
  }
);

const clips = [background, dude, mainText]

document.getElementById('container').appendChild(app.view);

PIXI.loader
  .add("../assets/buildings-bg.png")
  .add("../assets/dude.png")
  .load(setup);

function setup() {

  clips.forEach(({init}) => {
    app.stage.addChild(init());
  })
  
  app.ticker.add(delta => updateLoop(delta))
}

function updateLoop() {
  clips.forEach(({update = () => {}}) => {
    update()
  })
}