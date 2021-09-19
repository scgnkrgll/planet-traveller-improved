import { Component, Types } from "ecsy";

class Velocity extends Component {}

Velocity.schema = {
  x: { type: Types.Number, default: 0 },
  y: { type: Types.Number, default: 0 },
};

export default Velocity;
