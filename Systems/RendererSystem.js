import { System, TagComponent } from 'https://ecsy.io/build/ecsy.module.js'
import { constants } from '../Utils/helpers.js'
import Position from '../Components/PositionComponent.js'
import Shape from '../Components/ShapeComponent.js'
import Engine from '../Components/EngineComponent.js'
import { ctx, canvasWidth, canvasHeight } from '../Utils/ctx.js'
import Direction from '../Components/DirectionComponent.js'

class Renderable extends TagComponent { }

class RendererSystem extends System {
    execute(delta, time) {
        ctx.globalAlpha = 1
        ctx.fillStyle = "#ffffff"
        ctx.fillRect(0, 0, canvasWidth, canvasHeight)

        this.queries.renderables.results.forEach(entity => {
            const shape = entity.getComponent(Shape)
            const position = entity.getComponent(Position)

            switch (shape.primitive) {
                case 'spaceship':
                    this.drawSpaceship(position, entity)
                    break
                case 'planet':
                    this.drawPlanet(position)
                    break
                default:
                    break
            }
        })
    }

    drawPlanet(position) {
        this.color = '#9999cc'
        this.diameter = 100

        ctx.save()
        ctx.translate(position.x, position.y)

        ctx.beginPath()
        ctx.arc(0, 0, this.diameter, 0, -2 * Math.PI)
        ctx.fillStyle = this.color
        ctx.fill()
        ctx.closePath()
        ctx.restore()
    }


    drawSpaceship(position, entity) {
        const engine = entity.getComponent(Engine)
        const direction = entity.getComponent(Direction)

        this.width = 16
        this.height = 30

        this.color = "#cccccc"

        ctx.save()
        ctx.translate(position.x, position.y)
        ctx.rotate(direction.angle)

        ctx.beginPath()
        ctx.arc(0, this.height * -0.5, this.width / 2 + this.width / 6, 0, -2 * Math.PI)
        ctx.fillStyle = "#cc9999"
        ctx.fill()
        ctx.closePath()

        ctx.beginPath()
        ctx.rect(this.width * -0.5 - this.width / 6, this.height * -0.5, this.width + this.width / 3, this.height - this.width / 3)
        ctx.fillStyle = this.color
        ctx.fill()
        ctx.closePath()
        //nozzle
        ctx.beginPath()
        ctx.arc(0, this.height * 0.5, this.width / 2, Math.PI, 0)
        ctx.fillStyle = "#555555"
        ctx.fill()
        ctx.closePath()

        if (engine.state) {
            ctx.beginPath()
            ctx.moveTo(this.width * -0.5, this.height * 0.5)
            ctx.lineTo(this.width * 0.5, this.height * 0.5)
            ctx.lineTo(0, this.height + Math.random() * 5)
            ctx.lineTo(this.width * -0.5, this.height * 0.5)
            ctx.fillStyle = "orange"
            ctx.fill()
            ctx.closePath()

            ctx.beginPath()
            ctx.moveTo(this.width * -0.5, this.height * 0.5)
            ctx.lineTo(this.width * 0.2, this.height * 0.5)
            ctx.lineTo(0, this.height * 0.6 + Math.random() * 5)
            ctx.lineTo(this.width * -0.2, this.height * 0.5)
            ctx.closePath()
            ctx.fillStyle = "#3399ff"
            ctx.fill()
        }

        ctx.restore()
    }
}

RendererSystem.queries = {
    renderables: { components: [Renderable, Shape] }
}

export { RendererSystem, Renderable }