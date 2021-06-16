import { Component, Types } from 'https://ecsy.io/build/ecsy.module.js'

class Velocity extends Component { }

Velocity.schema = {
    x: { type: Types.Number, default: 0 },
    y: { type: Types.Number, default: 0 },
}

export default Velocity