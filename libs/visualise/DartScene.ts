import {
  Camera, Clock,
  DirectionalLight,
  FogExp2, Group, HemisphereLight,
  Mesh,
  MeshLambertMaterial,
  PerspectiveCamera, PlaneGeometry,
  Scene,
  WebGLRenderer
} from 'three';
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader';
import DartShot from '@/libs/DartShot';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';
import Dart from '@/libs/Dart';

const clock = new Clock()
let time = 0

let camera: Camera
let dart: Group
let board: Group

let shot = new DartShot()
shot.execSimulate()

const onRender = (renderer: WebGLRenderer, scene: Scene, camera: Camera, setCurrent: any) => {
  time += clock.getDelta() * 0.1
  const s = shot.getFrameDartsFromSec(time)
  const t = shot.getFrameSecLength()
  const p = s.getPosition()
  const r = s.getRotate()
  const v = s.getVelocity()
  dart.position.set(p.x, p.y, p.z)
  dart.rotation.set(r.x, r.y, r.z)
  camera.position.set(p.x + 0.1, p.y, p.z + 0.3)
  camera.lookAt(0, 1.73, 0)
  setCurrent({vx: v.vx, vy: v.vy, vz: v.vz, time: time < t ? time : t})
  renderer.render(scene, camera)
  window.requestAnimationFrame(() => { onRender(renderer, scene, camera, setCurrent) })
}

export const start = async (renderer: WebGLRenderer, setCurrent: any) => {
  const scene = new Scene()
  renderer.setClearColor(0xCFD8DC)
  renderer.shadowMap.enabled = true
  camera = new PerspectiveCamera(
    75,
    renderer.domElement.width / renderer.domElement.height,
    0.1,
    1000
  )
  camera.position.set(0.2, 1.73, 2)
  const control = new OrbitControls(camera, renderer.domElement)
  control.target.set(0, 1.73, 0)

  const ambient = new HemisphereLight(0xFFFFFF, 0x999999, 0.7)
  scene.add(ambient)
  const light = new DirectionalLight(0xFFFFFF, 0.3)
  light.position.set(10, 10, 10)
  light.shadow.mapSize.width = 2048
  light.shadow.mapSize.height = 2048
  light.shadow.camera.left = -10
  light.shadow.camera.right = 10
  light.shadow.camera.top = 10
  light.shadow.camera.bottom = -10
  light.castShadow = true
  scene.add(light)
  scene.fog = new FogExp2(0xCFD8DC, 0.05)

  const baseGeometry = new PlaneGeometry(100, 100, 10, 10)
  const baseMaterial = new MeshLambertMaterial({ color: 0xCFD8DC })
  const base = new Mesh(baseGeometry, baseMaterial)
  base.position.set(0, 0, 0)
  base.rotation.x = -Math.PI / 2
  base.receiveShadow = true
  scene.add(base)

  const gltfLoader = new GLTFLoader()
  dart = (await gltfLoader.loadAsync('/assets/dart.glb')).scene
  dart.traverse((child) => {
    if (child instanceof Mesh) {
      child.castShadow = true
      child.receiveShadow = true
      child.geometry.computeBoundingBox()
    }
  })
  dart.rotation.set(Math.PI * 0.5, 0, 0)
  dart.position.set(0, 1, 0)
  scene.add(dart)

  board = (await gltfLoader.loadAsync('/assets/board.glb')).scene
  board.traverse((child) => {
    if (child instanceof Mesh) {
      child.castShadow = true
      child.receiveShadow = true
      child.geometry.computeBoundingBox()
    }
  })
  board.rotation.set(0, 0, 0)
  board.position.set(0, 0, 0)
  scene.add(board)

  onRender(renderer, scene, camera, setCurrent)
}

export const reCalc = ({ vx, vy, vz }: any) => {
  const s = new DartShot({
    initDart: new Dart({
      position: { x: 0, y: 1.73, z: 2.44 },
      rotate: { x: 0, y: Math.PI * 0.5, z: 0 },
      velocity: { vx, vy, vz: -vz },
    }),
    deltaTime: 0.001,
    gravity: -9.8,
    airResistance: 0.05,
  })
  s.execSimulate()
  shot = s
  time = 0
}
