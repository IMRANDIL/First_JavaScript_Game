
import { setupGround, updateGround } from './ground.js';
import { updateDino, setupDino } from './dino.js'


const WORLD_WIDTH = 100;
const WORLD_HEIGHT = 30;

const SPEED_SCALE_INCREASE = 0.00001

let score

const worldElem = document.querySelector('[data-world]');
const scoreElem = document.querySelector('[data-score]');
const startScreen = document.querySelector('[data-start-screen]')

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
    updateSpeedScale(delta);
    updateScore(delta);
    // console.log(delta);
    lastTime = time;
    window.requestAnimationFrame(update)
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
    setupDino()
    startScreen.classList.add('hide')
    window.requestAnimationFrame(update);
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