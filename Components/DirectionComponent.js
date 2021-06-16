import { Component, Types } from 'https://ecsy.io/build/ecsy.module.js'

class Direction extends Component { }

Direction.schema = {
    angle: { type: Types.Number, default: 0 }
}

export default Direction