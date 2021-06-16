import { Component, Types } from 'https://ecsy.io/build/ecsy.module.js'

class Acceleration extends Component { }

Acceleration.schema = {
    x: { type: Types.Number, default: 0 },
    y: { type: Types.Number, default: 0 },
}

export default Acceleration
