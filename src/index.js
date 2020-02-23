import { Application, loader } from 'pixi.js';

import config from './config';
import Game from './Game';
import sprites from './assets/sprites.json';

// create PIXI application
let app = new Application(config.display.width, config.display.height, {});
document.body.appendChild(app.view);

let game = new Game(app);

// load sprites and run game when done
loader.add('./assets/sprites.json').load(() => game.run())
