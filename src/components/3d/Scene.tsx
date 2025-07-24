import { Suspense, useRef, useEffect } from 'react'
import { Canvas, useThree, useFrame } from '@react-three/fiber'
import { OrbitControls, Environment, PerspectiveCamera, useGLTF, AdaptiveDpr } from '@react-three/drei'
import { useIsMobile } from '@/hooks/use-mobile'
import FloatingParticles from './FloatingParticles'
import { Avatar } from './Avatar'
import { useTheme } from '@/lib/theme-context'
import * as THREE from 'three'

// Scene manager to handle theme changes
function SceneManager() {
  const { theme } = useTheme()
  const { scene } = useThree()
  
  // Update scene based on theme
  useEffect(() => {
    // Update background color based on theme
    scene.background = new THREE.Color(
      theme === 'dark' ? '#1a1138' : '#f5f7fa'
    )
    
    // Update fog based on theme
    scene.fog = new THREE.FogExp2(
      theme === 'dark' ? '#1a1138' : '#f5f7fa',
      0.05
    )
  }, [theme, scene])
  
  return null
}

// Main lighting system that adapts to theme
function LightingSystem() {
  const { theme } = useTheme()
  const lightsRef = useRef<{
    ambient: THREE.AmbientLight
    spot: THREE.SpotLight
    point1: THREE.PointLight
    point2: THREE.PointLight
  }>({
    ambient: new THREE.AmbientLight(),
    spot: new THREE.SpotLight(),
    point1: new THREE.PointLight(),
    point2: new THREE.PointLight()
  })
  
  // Update lighting when theme changes
  useEffect(() => {
    if (!lightsRef.current) return
    
    const { ambient, spot, point1, point2 } = lightsRef.current
    
    // Adjust ambient light
    ambient.intensity = theme === 'dark' ? 0.5 : 0.7
    ambient.color.set(theme === 'dark' ? '#6930c3' : '#ffffff')
    
    // Adjust spot light
    spot.intensity = theme === 'dark' ? 1 : 0.8
    spot.color.set(theme === 'dark' ? '#ffffff' : '#f8f9fa')
    
    // Adjust point lights
    point1.intensity = theme === 'dark' ? 1.5 : 0.6
    point1.color.set(theme === 'dark' ? '#4ea8de' : '#3b82f6')
    
    point2.intensity = theme === 'dark' ? 1.5 : 0.6
    point2.color.set(theme === 'dark' ? '#80ffdb' : '#10b981')
  }, [theme])
  
  return (
    <>
      <ambientLight 
        ref={(el) => el && (lightsRef.current.ambient = el)} 
        intensity={0.5}
      />
      <spotLight
        ref={(el) => el && (lightsRef.current.spot = el)}
        position={[10, 20, 10]}
        angle={0.12}
        penumbra={1}
        intensity={1}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />
      <pointLight
        ref={(el) => el && (lightsRef.current.point1 = el)}
        position={[-10, 5, -10]}
        intensity={1.5}
        color="#4ea8de"
      />
      <pointLight
        ref={(el) => el && (lightsRef.current.point2 = el)}
        position={[10, -5, -5]}
        intensity={1.5}
        color="#80ffdb"
      />
    </>
  )
}

// Optimized scene with enhanced controls
export default function Scene() {
  const isMobile = useIsMobile()

  return (
    <div className="canvas-container">
      <Canvas shadows dpr={[1, 1.5]}>
        <fog attach="fog" args={['#1a1138', 0, 40]} />
        <SceneManager />
        <Suspense fallback={null}>
          {/* Adaptive lighting system */}
          <LightingSystem />
          
          {/* Environment map for realistic reflections */}
          <Environment preset="city" />
          
          {/* Main character */}
          <group position={[0, isMobile ? -2 : -1.5, 0]}>
            <Avatar position={[0, 0, 0]} scale={isMobile ? 2 : 2.5} />
          </group>
          
          {/* Optimized floating code particles */}
          <FloatingParticles count={isMobile ? 80 : 150} />
          
          {/* Camera and controls */}
          <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={50} />
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            minPolarAngle={Math.PI / 2.2}
            maxPolarAngle={Math.PI / 1.8}
            minAzimuthAngle={-Math.PI / 4}
            maxAzimuthAngle={Math.PI / 4}
            rotateSpeed={0.5}
          />
          
          {/* Performance optimization */}
          <AdaptiveDpr pixelated />
        </Suspense>
      </Canvas>
    </div>
  )
}