import Dart from '@/libs/Dart';

export type Parameters = {
  gravity: number;
  deltaTime: number;
  airResistance: number;
}

export const simulateNextDart = (dart: Dart, params: Parameters): Dart => {
  const t = params.deltaTime
  const g = params.gravity
  const position = dart.getPosition()
  const velocity = dart.getVelocity()
  const rotate = dart.getRotate()
  velocity.vy += g * t
  position.x += t * velocity.vx
  position.y += t * velocity.vy
  position.z += t * velocity.vz
  const wantX = Math.acos(velocity.vy / velocity.vz)
  const rX = wantX - rotate.x;
  const oX = Math.abs(Math.sin(rX))
  rotate.x = rotate.x + (rX * oX * params.airResistance);
  velocity.vz = velocity.vz + Math.abs(Math.sin(rotate.x)) * params.airResistance * 0.01;
  velocity.vy = velocity.vy + Math.abs(Math.cos(rotate.x)) * params.airResistance * 0.01;
  const wantZ = Math.acos(velocity.vx / velocity.vz) - Math.PI * 0.5
  const rZ = wantZ - rotate.z;
  const oZ = Math.abs(Math.sin(rZ));
  rotate.z = rotate.z + (rZ * oZ * params.airResistance);
  velocity.vz = velocity.vz + Math.abs(Math.sin(rotate.z)) * params.airResistance * 0.01;

  return new Dart({
    position: position,
    rotate: rotate,
    velocity: velocity,
  })
}
