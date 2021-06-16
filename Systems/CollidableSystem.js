import { System } from 'https://ecsy.io/build/ecsy.module.js'
import Position from '../Components/PositionComponent.js'

class CollidableSystem extends System {
    execute(delta, time) {
    }
}

CollidableSystem.queries = {
    playerControlled: {
        components: [Position]
    }
}

export default CollidableSystem