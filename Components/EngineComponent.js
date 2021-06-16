import { Component, Types } from 'https://ecsy.io/build/ecsy.module.js'

class Engine extends Component { }

Engine.schema = {
    state: { type: Types.Boolean, default: false },
    thrustForce: { type: Types.Number, default: -0.005 }
}
export default Engine