import { Component, Types } from 'https://ecsy.io/build/ecsy.module.js'

class Position extends Component { }

Position.schema = {
    x: { type: Types.Number, default: 0 },
    y: { type: Types.Number, default: 0 },
}

export default Position
