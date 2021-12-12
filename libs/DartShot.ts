import Dart from '@/libs/Dart';
import {Parameters, simulateNextDart} from '@/libs/SimulateDart';

export type DartShotOptions = {
  initDart?: Dart
  deltaTime?: number
  gravity?: number
  airResistance?: number
}

const createInitDart = (): Dart => {
  const dart = new Dart()
  dart.setPosition(0, 1.73, 2.44)
  dart.setRotate(0, 0, 0)
  dart.setVelocity(0, 2.5, -4.9)
  return dart
}

export default class DartShot {
  private dartArray: Dart[] = []
  private readonly initDart: Dart;
  private readonly deltaTime: number = 0.001
  private readonly gravity: number = -9.8
  private readonly airResistance: number = 0.05

  constructor(options?: DartShotOptions) {
    if (!options) {
      this.initDart = createInitDart()
      return
    }
    if (options.deltaTime != null) {
      this.deltaTime = options.deltaTime
    }
    if (options.gravity != null) {
      this.gravity = options.gravity
    }
    if (options.airResistance != null) {
      this.airResistance = options.airResistance
    }
    this.initDart = options.initDart != null ? options.initDart : createInitDart()
  }

  execSimulate() {
    this.dartArray = [];
    let lastDart = this.initDart;
    this.dartArray.push(lastDart)
    const params: Parameters = {
      deltaTime: this.deltaTime,
      gravity: this.gravity,
      airResistance: this.airResistance,
    }

    while (!lastDart.isStop() && this.dartArray.length < 10000) {
      lastDart = simulateNextDart(lastDart, params)
      this.dartArray.push(lastDart)
    }
  }

  getFrameCount(): number {
    return this.dartArray.length
  }
  getFrameSecLength(): number {
    return this.getFrameCount() * this.deltaTime
  }
  getFrameDarts(frame: number): Dart {
    if (frame < 0) {
      return this.dartArray[0]
    }
    if (this.getFrameCount() <= frame) {
      return this.dartArray[this.getFrameCount() - 1]
    }
    return this.dartArray[frame];
  }
  getFrameDartsFromSec(sec: number): Dart {
    const frame = Math.floor(sec / this.deltaTime)
    return this.getFrameDarts(frame)
  }
}
