import { Component, Types } from "ecsy";

class Position extends Component {}

Position.schema = {
  x: { type: Types.Number, default: 0 },
  y: { type: Types.Number, default: 0 },
};

export default Position;
