import { incrementCustomProp, getCustomProp, setCustomProp } from "./updataProp.js";

const dinoElem = document.querySelector('[data-dino]')

const JUMP_SPEED = .37;

const GRAVITY = .001;

const DINO_FRAME_COUNT = 2;

const FRAME_TIME = 100;
let yvelocity
let isJumping

let dinoframe
let currentFrameTime


export function setupDino() {
    isJumping = false;
    dinoframe = 0;
    yvelocity = 0;
    currentFrameTime = 0;
    setCustomProp(dinoElem, '--bottom', 0)
    document.removeEventListener('keydown', onJump);
    document.addEventListener('keydown', onJump)
}



export function setDinoLose() {
    dinoElem.src = 'imgs/dino-lose.png'
}







export function updateDino(delta, speedScale) {
    handleRun(delta, speedScale);
    handleJump(delta)
}


export function getDinoPos() {
    return dinoElem.getBoundingClientRect()
}





function handleRun(delta, speedScale) {
    if (isJumping) {
        dinoElem.src = `imgs/dino-stationary.png`;
        return
    }
    if (currentFrameTime >= FRAME_TIME) {
        dinoframe = (dinoframe + 1) % DINO_FRAME_COUNT;
        dinoElem.src = `imgs/dino-run-${dinoframe}.png`;
        currentFrameTime -= FRAME_TIME;
    }
    currentFrameTime += delta * speedScale;
}



function handleJump(delta) {
    if (!isJumping) return;
    incrementCustomProp(dinoElem, '--bottom', yvelocity * delta);
    if (getCustomProp(dinoElem, '--bottom') <= 0) {
        setCustomProp(dinoElem, '--bottom', 0);
        isJumping = false;
    }
    yvelocity -= GRAVITY * delta;
}



function onJump(e) {
    if (e.code !== 'Space' || isJumping) return;
    yvelocity = JUMP_SPEED;
    isJumping = true;

}