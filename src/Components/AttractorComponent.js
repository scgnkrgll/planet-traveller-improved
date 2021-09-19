import { Component, Types } from "ecsy";

class Attractor extends Component {}

Attractor.schema = {
  attractionForceMag: { type: Types.Number, default: 50 },
};
export default Attractor;
