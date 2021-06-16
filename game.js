import { World } from 'https://ecsy.io/build/ecsy.module.js'
import { getRandomPosition, getRandomVelocity } from './Utils/helpers.js'
import Velocity from '../Components/VelocityComponent.js'
import Position from '../Components/PositionComponent.js'
import Shape from '../Components/ShapeComponent.js'
import MovableSystem from './Systems/MovableSystem.js'
import { RendererSystem, Renderable } from './Systems/RendererSystem.js'
import { canvasWidth, canvasHeight } from '../Utils/ctx.js'
import Engine from './Components/EngineComponent.js'
import PlayerControlled from './Components/PlayerControlledComponent.js'
import KeyBinder from './Utils/KeyBinder.js'
import Direction from './Components/DirectionComponent.js'
import Acceleration from './Components/AccelerationComponent.js'
import Attractor from './Components/AttractorComponent.js'

window.addEventListener('keyup', function (event) { KeyBinder.onKeyup(event) }, false)
window.addEventListener('keydown', function (event) { KeyBinder.onKeydown(event) }, false)

const world = new World()

world.registerComponent(Velocity)
world.registerComponent(Position)
world.registerComponent(Acceleration)
world.registerComponent(Direction)
world.registerComponent(Attractor)

world.registerComponent(Shape)
world.registerComponent(Renderable)
world.registerComponent(PlayerControlled)
world.registerComponent(Engine)

world
    .registerSystem(MovableSystem)
    .registerSystem(RendererSystem)

world.createEntity()
    .addComponent(Velocity, getRandomVelocity())
    .addComponent(Shape, { primitive: 'spaceship' })
    .addComponent(Position, getRandomPosition())
    .addComponent(Engine)
    .addComponent(Renderable)
    .addComponent(PlayerControlled)
    .addComponent(Direction)
    .addComponent(Acceleration)

world.createEntity()
    .addComponent(Shape, { primitive: 'planet' })
    .addComponent(Position, {
        x: 0.5 * canvasWidth,
        y: 0.5 * canvasHeight
    })
    .addComponent(Attractor)
    .addComponent(Renderable)

function run() {
    const time = performance.now()
    const delta = time - lastTime

    world.execute(delta, time)

    lastTime = time
    requestAnimationFrame(run)
}

let lastTime = performance.now()

run()
