import * as THREE from 'three'
import { createRoot } from 'react-dom/client'
import { useRef, useState } from 'react'
import { Canvas, useFrame, ThreeElements } from '@react-three/fiber'

function Box(props: ThreeElements['mesh']) {
  const ref = useRef<THREE.Mesh>(null!)

  const [hovered, hover] = useState(false)
  const [clicked, click] = useState(false)

  useFrame((_state, delta) => {
    ref.current.rotation.x += delta;
  })

  return (
    <mesh
      {...props}
      ref={ref}
      scale={clicked ? 1.5 : 1}
      onClick={(_event) => {
        click(!clicked)
      }}
      onPointerOver={(_event) => hover(true)}
      onPointerOut={(_event) => hover(false)}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
    </mesh>
  )
}

createRoot(document.getElementById('root') as HTMLElement).render(
  <Canvas style={{ height: "100vh" }}>
    <ambientLight intensity={Math.PI / 2} />
    <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} decay={0} intensity={Math.PI} />
    <pointLight position={[-10, -10, -10]} decay={0} intensity={Math.PI} />
    <Box position={[-1.2, 0, 0]} />
    <Box position={[0, 0, 0]} />
    <Box position={[1.2, 0, 0]} />
  </Canvas>,
)