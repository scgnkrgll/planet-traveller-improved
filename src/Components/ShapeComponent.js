import { Component, Types } from "ecsy";

class Shape extends Component {}

Shape.schema = {
  primitive: { type: Types.String, default: "planet" },
};

export default Shape;
