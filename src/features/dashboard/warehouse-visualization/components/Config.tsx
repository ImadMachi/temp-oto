import { useEffect, useRef } from 'react'
import type { OrbitControls as OrbitControlsImpl } from 'three-stdlib'
import { OrbitControls, PerspectiveCamera } from '@react-three/drei'
import { useWarehouseStore } from '../hooks/useWarehouseStore'

const isDevEnv = process.env.NODE_ENV === 'development'

export default function Config() {
  // Refs
  const ref = useRef<OrbitControlsImpl>(null)

  // Hooks
  const { setOrbitControlsRef } = useWarehouseStore()

  useEffect(() => {
    setOrbitControlsRef(ref)
  }, [ref, setOrbitControlsRef])

  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 30, 80]} fov={50} />
      <OrbitControls zoomToCursor zoomSpeed={1} ref={ref} />
      {isDevEnv && <axesHelper args={[10]} />}
      <directionalLight position={[-20, 40, -40]} />
      <ambientLight intensity={0.7} />
    </>
  )
}
