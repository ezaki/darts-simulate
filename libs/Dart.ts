export type Position = {
  x: number
  y: number
  z: number
};
export type Rotate = {
  x: number
  y: number
  z: number
};
export type Velocity = {
  vx: number
  vy: number
  vz: number
}

export type DartOptions = {
  position: Position
  rotate: Rotate
  velocity: Velocity
}

const createInitPosition = (): Position => ({
  x: 0,
  y: 0,
  z: 0
})
const createInitRotate = (): Rotate => ({
  x: 0,
  y: Math.PI * 0.5,
  z: 0
})
const createInitVelocity = (): Velocity => ({
  vx: 0,
  vy: 0,
  vz: 0
})

export default class Dart {
  private position: Position
  private rotate: Rotate
  private velocity: Velocity

  constructor(options?: DartOptions) {
    this.position = options?.position ?? createInitPosition()
    this.rotate = options?.rotate ?? createInitRotate()
    this.velocity = options?.velocity ?? createInitVelocity()
  }

  getPosition(): Position {
    return {...this.position}
  }

  getRotate(): Rotate {
    return {...this.rotate}
  }

  getVelocity(): Velocity {
    return {...this.velocity}
  }

  setPosition(x: number, y: number, z: number): void {
    this.position = { x, y, z }
  }

  setRotate(x: number, y: number, z: number): void {
    this.rotate = { x, y, z }
  }

  setVelocity(vx: number, vy: number, vz: number): void {
    this.velocity = { vx, vy, vz }
  }

  isStop(): boolean {
    return this.hitBoard() || this.position.z < -1 || this.position.y < 0;
  }

  hitBoard(): boolean {
    if (this.position.z < -0.02 || 0 < this.position.z) {
      return false
    }
    const l = Math.sqrt(Math.pow(this.position.x, 2) + Math.pow(this.position.y - 1.73, 2))
    return l < 0.393;
  }
}
