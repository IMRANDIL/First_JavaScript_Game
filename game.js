
import { setupGround, updateGround } from './ground.js';
import { updateDino, setupDino, getDinoPos, setDinoLose } from './dino.js'
import { updateCactus, setupCactus, getCactusPos } from './cactus.js'

const WORLD_WIDTH = 100;
const WORLD_HEIGHT = 30;

const SPEED_SCALE_INCREASE = 0.00001

let score

const worldElem = document.querySelector('[data-world]');
const scoreElem = document.querySelector('[data-score]');
const startScreen = document.querySelector('[data-start-screen]');
const motivate = document.querySelector('[data-motivate]')

setPixelToWorldScale();


window.addEventListener('resize', setPixelToWorldScale);
document.addEventListener('keydown', handleStart, { once: true })
let lastTime;

let speedScale


function update(time) {
    if (lastTime == null) {
        lastTime = time;
        window.requestAnimationFrame(update);
        return;
    }
    const delta = time - lastTime;
    updateGround(delta, speedScale);
    updateDino(delta, speedScale);
    updateCactus(delta, speedScale)
    updateSpeedScale(delta);
    updateScore(delta);
    if (checkLose()) return handleLose()
    lastTime = time;
    window.requestAnimationFrame(update)
}




function checkLose() {
    const dinoPos = getDinoPos();
    return getCactusPos().some(rect => isCollision(rect, dinoPos));

}

function isCollision(rect1, rect2) {
    return (rect1.left < rect2.right
        && rect1.top < rect2.bottom
        && rect1.right > rect2.left
        && rect1.bottom > rect2.top
    )
}



function updateSpeedScale(delta) {
    speedScale += delta * SPEED_SCALE_INCREASE;
}

function updateScore(delta) {
    score += delta * .01;
    scoreElem.textContent = Math.floor(score);

}

function handleStart() {
    lastTime = null;
    score = 0
    speedScale = 1
    setupGround();
    setupDino();
    setupCactus()
    motivate.textContent = ''
    startScreen.classList.add('hide')
    window.requestAnimationFrame(update);
}


function handleLose() {
    setDinoLose();
    setTimeout(() => {
        document.addEventListener('keydown', handleStart, { once: true });
        startScreen.classList.remove('hide');
        motivate.textContent = 'You Are A RockStar...!!! Try Again...'
    }, 100);

}

function setPixelToWorldScale() {
    let worldToPixelScale
    if (window.innerWidth / window.innerHeight < WORLD_WIDTH / WORLD_HEIGHT) {
        worldToPixelScale = window.innerWidth / WORLD_WIDTH
    }
    else {
        worldToPixelScale = window.innerHeight / WORLD_HEIGHT
    }

    worldElem.style.width = `${WORLD_WIDTH * worldToPixelScale}px`
    worldElem.style.height = `${WORLD_HEIGHT * worldToPixelScale}px`

}