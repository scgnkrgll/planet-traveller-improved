import { Component, Types } from 'https://ecsy.io/build/ecsy.module.js'

class Attractor extends Component { }

Attractor.schema = {
    attractionForceMag: { type: Types.Number, default: 50 }
}
export default Attractor