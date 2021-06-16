import { Component, Types } from 'https://ecsy.io/build/ecsy.module.js'

class Shape extends Component { }

Shape.schema = {
    primitive: { type: Types.String, default: 'planet' }
}

export default Shape