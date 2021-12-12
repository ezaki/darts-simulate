import React, {FC, useRef, useEffect, useState} from 'react';
import {WebGLRenderer} from 'three';
import {
  start,
  reCalc,
} from '@/libs/visualise/DartScene';
import ValueInput from '@/molecules/ValueInput';
import InfoPopup from '@/organisms/InfoPopup';

const canvasResize = (wrapper: HTMLDivElement, renderer: WebGLRenderer) => {
  const [width, height] = [wrapper.clientWidth, wrapper.clientHeight]
  renderer.setSize(width, height)
}

const calcV = (x: number, y: number, z: number): string => {
  const tmp = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2))
  const v = Math.sqrt(Math.pow(tmp, 2) + Math.pow(z, 2))
  return v.toFixed(2)
}

const SimulateBox: FC = () => {
  const [form, setForm] = useState({
    vx: 0, vy: 2.5, vz: 4.9
  })
  const [current, setCurrent] = useState({
    vx: 0, vy: 0, vz: 0, time: 0
  });
  const wrapperRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const wrapper = wrapperRef.current
    if (!wrapper) {
      return;
    }

    const renderer = new WebGLRenderer({ antialias: true });
    canvasResize(wrapper, renderer)
    wrapper.appendChild(renderer.domElement)

    const windowResize = () => { canvasResize(wrapper, renderer) }
    if (window) {
      windowResize()
      document.addEventListener('loaded', windowResize)
      window.addEventListener('resize', windowResize)
    }

    start(renderer, setCurrent)

    return () => {
      if (window) {
        window.removeEventListener('resize', windowResize)
      }
    }
  }, [wrapperRef])
  const handleChange = (input: string) => (e: any) => {
    let n = Number(e.target.value)
    if (Number.isNaN(n)) {
      n = 0
    }
    setForm({...form, [input]: n})
  }
  return (
    <div
      className="w-full h-full relative overflow-hidden"
    >
      <div
        className="absolute left-0 top-0 w-full h-full overflow-hidden"
        ref={wrapperRef}
      />
      <div
        className="absolute right-0 top-0 bg-white bg-opacity-80 shadow rounded p-2"
      >
        <p>矢速: { calcV(current.vx, current.vy, current.vz) } m/s</p>
        <p>時間: { current.time.toFixed(2) } s</p>
      </div>
      <div
        className="absolute left-0 bottom-0 w-full p-4 flex justify-end items-end
                    bg-white bg-opacity-70"
      >
        <div>
          <p>初速度</p>
          <ValueInput
            value={form.vx}
            prefix="左右"
            suffix="m/s"
            onChange={handleChange('vx')}
          />
          <ValueInput
            value={form.vy}
            prefix="上下"
            suffix="m/s"
            onChange={handleChange('vy')}
          />
          <ValueInput
            value={form.vz}
            prefix="奥行"
            suffix="m/s"
            onChange={handleChange('vz')}
          />
        </div>
        <button
          type="button"
          className="rounded bg-indigo-600 hover:bg-indigo-900 text-white py-2 px-8 ml-2"
          onClick={ () => reCalc({vx: form.vx, vy: form.vy, vz: form.vz})}
        >
          投げる
        </button>
      </div>
      <InfoPopup/>
    </div>
  )
};

export default SimulateBox;
