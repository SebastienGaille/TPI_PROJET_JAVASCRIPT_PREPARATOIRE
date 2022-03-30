import Background from './entities/background.js';
import Player from './entities/Player.js';
import Rock from './entities/rock.js';
import Tree from './entities/Tree.js';
import Ice from './entities/Ice.js';
import Keyboard from './utils/Keyboard.js';

const ctx = document.querySelector('canvas').getContext('2d');
// Set the canvas size as the same as the DOM element size
// (as the same of the viewport size if you look at the css)
ctx.canvas.width = ctx.canvas.clientWidth;
ctx.canvas.height = ctx.canvas.clientHeight;

const keyboard = new Keyboard();

let lastTime = 0;
let score = 0;

const player = new Player(ctx.canvas.width / 2, ctx.canvas.height / 2, 0, 0.5);
const entities = [];

function getRandomInt(min, max) { 
  return Math.floor(Math.random() * (max - min + 1)) + min;
}


setInterval(() => {
    const x = getRandomInt(0, ctx.canvas.width);
    const y = ctx.canvas.height + 100;    
    entities.push(new Rock(x, y, 1, 1, 60, 60));
}, 3000);

let treeEveryMSec = 1000;
function generateTree() {
    const x = getRandomInt(0, ctx.canvas.width);
    const y = ctx.canvas.height + 100;    
    entities.push(new Tree(x, y, 2, 1, 80, 120));
    treeEveryMSec -= 10;    
    setTimeout(generateTree, treeEveryMSec);
};
generateTree();

setInterval(() => {
    const x = getRandomInt(0, ctx.canvas.width);
    const y = ctx.canvas.height + 100;    
    entities.push(new Ice(x, y, 0, 1, 100, 100));
}, 5000);

const timerScore = setInterval(() => {
    score += 1;
    document.querySelector('#score').textContent = score;
}, 1000);

function tick(time) {        
    
    // Delta time from last frame
    const dt = time - lastTime;
    lastTime = time;                   

    // A) Update du WORLD    
    
    // A1) les arbre et tout : bouge toutes les entités au nord (sauf le joueur)
    let dir = 1.5 * Math.PI;
    for (const entity of entities) {
        entity.update(dt, dir);
    }

    // A2) update du player (en fonction des touches A et D)
    let dirPlayer = false;
    if (keyboard.isKeyDown('KeyA')) {
        dirPlayer = 'left';
    }
    if (keyboard.isKeyDown('KeyD')) {
        dirPlayer = 'right';
    }
    
    player.update(dt, dirPlayer, ctx);
    
    // check des collissions entre le joueur et les entités    
    for (const entity of entities) {
        // la position du joueur est-elle dans la "hit box" de l'entité        
        if (entity.isInCollission(player.x, player.y)) {            
            if (entity instanceof Ice) {
                console.log("COLLISION AVEC de la glace");
            } else {
                clearInterval(timerScore);
                // sauvez le high score en database
                fetch('saveScore.php?score=' + score);
                return;
            }
         }        
    }
    
    
    // B) Dessine le WORLD
    // B1) On efface le canvas
    ctx.canvas.width = ctx.canvas.clientWidth;
    ctx.canvas.height = ctx.canvas.clientHeight
     

    // B3) On redessine les entités
    entities.sort((e1, e2) => e1.layer - e2.layer); // trie par layer
    for (const entity of entities) entity.draw(ctx);

    //B2) D'abord le joueur (pour qu'il soit au "dessous" de toutes les entités )
    player.draw(ctx);   
    
    requestAnimationFrame(tick);
}

// Start the animation loop (RAF loop)
// for example: 60fps => 16.6666 [ms]
requestAnimationFrame(tick);