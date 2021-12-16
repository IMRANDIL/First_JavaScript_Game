import { getCustomProp, setCustomProp, incrementCustomProp } from './updataProp.js'
const Speed = .05;
const groundElem = document.querySelectorAll('[data-ground]');
export function setupGround() {
    setCustomProp(groundElem[0], '--left', 0)
    setCustomProp(groundElem[1], '--left', 300)
}

export function updateGround(delta, speedScale) {
    groundElem.forEach((ground) => {
        incrementCustomProp(ground, '--left', delta * speedScale * Speed * -1);
        if (getCustomProp(ground, '--left') <= -300) {
            incrementCustomProp(ground, '--left', 600)
        }
    })
}