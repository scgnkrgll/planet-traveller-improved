import { System, Not } from "ecsy";
import { constants } from "../Utils/helpers.js";
import Velocity from "../Components/VelocityComponent.js";
import Position from "../Components/PositionComponent.js";
import { canvasWidth, canvasHeight } from "../Utils/ctx.js";
import PlayerControlled from "../Components/PlayerControlledComponent.js";
import KeyBinder from "../Utils/KeyBinder.js";
import Direction from "../Components/DirectionComponent.js";
import Engine from "../Components/EngineComponent.js";
import Acceleration from "../Components/AccelerationComponent.js";
import Attractor from "../Components/AttractorComponent.js";

class MovableSystem extends System {
  execute(delta) {
    this.queries.moving.results.forEach((entity) => {
      const velocity = entity.getMutableComponent(Velocity);
      const position = entity.getMutableComponent(Position);
      const acceleration = entity.getMutableComponent(Acceleration);

      velocity.x += acceleration.x;
      velocity.y += acceleration.y;

      acceleration.x = 0;
      acceleration.y = 0;

      position.x += velocity.x * delta;
      position.y += velocity.y * delta;

      if (position.x > canvasWidth + constants.SHAPE_HALF_SIZE)
        position.x = -constants.SHAPE_HALF_SIZE;
      if (position.x < -constants.SHAPE_HALF_SIZE)
        position.x = canvasWidth + constants.SHAPE_HALF_SIZE;
      if (position.y > canvasHeight + constants.SHAPE_HALF_SIZE)
        position.y = -constants.SHAPE_HALF_SIZE;
      if (position.y < -constants.SHAPE_HALF_SIZE)
        position.y = canvasHeight + constants.SHAPE_HALF_SIZE;
    });

    this.queries.playerControlled.results.forEach((entity) => {
      const direction = entity.getMutableComponent(Direction);
      const engine = entity.getMutableComponent(Engine);
      const acceleration = entity.getMutableComponent(Acceleration);
      const { thrustForce } = engine;

      engine.state = false;

      if (KeyBinder.isDown(KeyBinder.LEFT) || KeyBinder.isDown(KeyBinder.A))
        direction.angle -= Math.PI / 180;
      if (KeyBinder.isDown(KeyBinder.RIGHT) || KeyBinder.isDown(KeyBinder.D))
        direction.angle += Math.PI / 180;
      if (KeyBinder.isDown(KeyBinder.UP) || KeyBinder.isDown(KeyBinder.W)) {
        engine.state = true;
        acceleration.x += thrustForce * Math.sin(-direction.angle);
        acceleration.y += thrustForce * Math.cos(direction.angle);
      }
    });
    this.queries.attractors.results.forEach((attractorEntity) => {
      const attractorPosition = attractorEntity.getComponent(Position);
      const attractor = attractorEntity.getComponent(Attractor);
      const { attractionForceMag } = attractor;

      this.queries.attractable.results.forEach((attractableEntity) => {
        const attractablePositon = attractableEntity.getComponent(Position);
        const acceleration =
          attractableEntity.getMutableComponent(Acceleration);

        const dVec = {
          x: attractorPosition.x - attractablePositon.x,
          y: attractorPosition.y - attractablePositon.y,
        };

        const dSq = dVec.x * dVec.x + dVec.y * dVec.y;
        const d = Math.sqrt(dSq);

        const normalizedd = {
          x: dVec.x / d,
          y: dVec.y / d,
        };

        const f = {
          x: (normalizedd.x * attractionForceMag) / dSq,
          y: (normalizedd.y * attractionForceMag) / dSq,
        };

        acceleration.x += f.x;
        acceleration.y += f.y;
      });
    });
  }
}

MovableSystem.queries = {
  moving: {
    components: [Velocity, Position],
  },
  playerControlled: {
    components: [PlayerControlled],
  },
  attractable: {
    components: [Position, Not(Attractor)],
  },
  attractors: {
    components: [Attractor],
  },
};

export default MovableSystem;
