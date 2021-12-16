

export function getCustomProp(elem, prop) {
    return parseFloat(getComputedStyle(elem).getPropertyValue(prop)) || 0;
}


export function setCustomProp(elem, prop, value) {
    elem.style.setProperty(prop, value)
}


export function incrementCustomProp(elem, prop, incr) {
    setCustomProp(elem, prop, getCustomProp(elem, prop) + incr)
}