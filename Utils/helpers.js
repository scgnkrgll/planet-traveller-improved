import { canvasWidth, canvasHeight } from './ctx.js'

const constants = {
    SPEED_MULTIPLIER: 0.1,
    SHAPE_SIZE: 20,
    NUM_ELEMENTS: 600,
    SHAPE_SIZE: 20,
    SHAPE_HALF_SIZE: 20 / 2
}

function getRandomVelocity() {
    return {
        x: constants.SPEED_MULTIPLIER * (2 * Math.random() - 1),
        y: constants.SPEED_MULTIPLIER * (2 * Math.random() - 1)
    }
}

function getRandomPosition() {
    return {
        x: Math.random() * canvasWidth,
        y: Math.random() * canvasHeight
    }
}


export { constants, getRandomPosition, getRandomVelocity }