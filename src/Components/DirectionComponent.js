import { Component, Types } from "ecsy";

class Direction extends Component {}

Direction.schema = {
  angle: { type: Types.Number, default: 0 },
};

export default Direction;
