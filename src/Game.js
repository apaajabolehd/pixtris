import * as PIXI from 'pixi.js';

import ScoreTable from './utils/ScoreTable';
import Keyboard from './utils/Keyboard';
import GamePlay from './play/GamePlay';
import GameMenu from './menu/GameMenu';
import GameOver from './menu/GameOver';



export default class Game {
    constructor(app) {
        this.app = app;
        
        this.gameStates = {};
        this.state = null;
    }
    
    run() {
        let background = new PIXI.extras.TilingSprite(
            PIXI.loader.resources.blocks.textures.background, 
            this.app.renderer.width,
            this.app.renderer.height);
        this.app.stage.addChild(background);
        
        this.key = new Keyboard();
        this.scores = new ScoreTable();
        
        // define available game states
        this.addState('play', new GamePlay(this));
        this.addState('menu', new GameMenu(this));
        this.addState('gameover', new GameOver(this));
        
        // set initial state
        this.setState('menu');
        
        // start the updates
        this.app.ticker.add(this.update, this);
    }
    
    addState(stateName, state) {
        this.gameStates[stateName] = state;
        this.app.stage.addChild(state);
    }
    
    update(dt) {
        if (this.state) {
            this.state.update(dt);
        }
    }
    
    setState(stateName) {
        let oldState = this.state;
        
        this.state = null;
        
        if (oldState) {
            oldState.exit();
        }
        
        let newState = this.gameStates[stateName];
        newState.enter();
        this.state = newState;
    }
}