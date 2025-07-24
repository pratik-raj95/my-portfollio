import { useRef, useEffect } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { OrbitControls, PerspectiveCamera, useGLTF } from '@react-three/drei'
import * as THREE from 'three'
import { useTheme } from '@/lib/theme-context'
import gsap from 'gsap'
import { useIsMobile } from '@/hooks/use-mobile'

interface ModelProps {
  modelType: 'laptop' | 'skills' | 'resume' | 'contact'
  position?: [number, number, number]
  rotation?: [number, number, number]
  scale?: number
}

// Simple 3D models for different sections
function Model({ modelType, position = [0, 0, 0], rotation = [0, 0, 0], scale = 1 }: ModelProps) {
  const groupRef = useRef<THREE.Group>(null!)
  const { theme } = useTheme()
  const { viewport } = useThree()
  
  // Effect for theme changes
  useEffect(() => {
    if (!groupRef.current) return
    
    // Adjust material colors based on theme
    groupRef.current.traverse(child => {
      if (child instanceof THREE.Mesh) {
        const material = child.material as THREE.MeshStandardMaterial
        
        if (material) {
          // Update emission based on theme
          if (material.emissive) {
            gsap.to(material.emissive, {
              r: theme === 'dark' ? 0.2 : 0.05,
              g: theme === 'dark' ? 0.05 : 0.05,
              b: theme === 'dark' ? 0.5 : 0.1,
              duration: 0.5,
            })
          }
          
          // Update metalness and roughness for light adaptation
          gsap.to(material, {
            metalness: theme === 'dark' ? 0.5 : 0.3,
            roughness: theme === 'dark' ? 0.4 : 0.6,
            duration: 0.5,
          })
        }
      }
    })
  }, [theme])
  
  // Animation
  useFrame((state, delta) => {
    if (!groupRef.current) return
    
    // Different animations per model type
    switch (modelType) {
      case 'laptop':
        // Laptop gently floating and rotating
        groupRef.current.rotation.y += delta * 0.2
        groupRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime) * 0.05
        break
        
      case 'skills':
        // Skills cube rotating on all axes
        groupRef.current.rotation.y += delta * 0.5
        groupRef.current.rotation.x += delta * 0.1
        groupRef.current.rotation.z += delta * 0.05
        break
        
      case 'resume':
        // Resume document floating with page flip effect
        groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.2
        groupRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime) * 0.1
        break
        
      case 'contact':
        // Contact sphere pulsing
        const pulseScale = 1 + Math.sin(state.clock.elapsedTime * 2) * 0.05
        groupRef.current.scale.set(scale * pulseScale, scale * pulseScale, scale * pulseScale)
        groupRef.current.rotation.y += delta * 0.3
        break
    }
  })
  
  return (
    <group ref={groupRef} position={position} rotation={rotation} scale={scale}>
      {modelType === 'laptop' && (
        <>
          {/* Laptop base */}
          <mesh castShadow receiveShadow>
            <boxGeometry args={[2, 0.1, 1.5]} />
            <meshStandardMaterial color="#444" metalness={0.5} roughness={0.4} />
          </mesh>
          
          {/* Screen */}
          <group position={[0, 0.7, -0.7]} rotation={[Math.PI / 4, 0, 0]}>
            <mesh castShadow>
              <boxGeometry args={[2, 1.2, 0.08]} />
              <meshStandardMaterial color="#222" metalness={0.8} roughness={0.2} />
            </mesh>
            
            {/* Screen content */}
            <mesh position={[0, 0, 0.05]} castShadow>
              <planeGeometry args={[1.9, 1.1]} />
              <meshStandardMaterial 
                color="#5B21B6" 
                emissive="#5B21B6"
                emissiveIntensity={0.5}
                metalness={0.1}
                roughness={0.3}
              />
            </mesh>
            
            {/* Code lines */}
            {[...Array(5)].map((_, i) => (
              <mesh key={i} position={[-0.7 + Math.random() * 0.2, 0.4 - i * 0.2, 0.06]} castShadow>
                <planeGeometry args={[0.8 + Math.random() * 0.5, 0.05]} />
                <meshStandardMaterial 
                  color="#80ffdb" 
                  emissive="#80ffdb"
                  emissiveIntensity={0.8}
                />
              </mesh>
            ))}
          </group>
          
          {/* Keyboard */}
          <mesh position={[0, 0.05, 0.4]} castShadow receiveShadow>
            <boxGeometry args={[1.8, 0.05, 0.6]} />
            <meshStandardMaterial color="#333" metalness={0.5} roughness={0.5} />
          </mesh>
        </>
      )}
      
      {modelType === 'skills' && (
        <>
          {/* Skills cube with tech logos represented as colored sides */}
          <mesh castShadow receiveShadow>
            <boxGeometry args={[1.5, 1.5, 1.5]} />
            <meshStandardMaterial 
              color="#222"
              metalness={0.7}
              roughness={0.2}
              transparent
              opacity={0.8}
            />
          </mesh>
          
          {/* Tech icons on cube faces */}
          {[
            [0, 0, 0.76], // Front (Z+)
            [0.76, 0, 0], // Right (X+)
            [-0.76, 0, 0], // Left (X-)
            [0, 0, -0.76], // Back (Z-)
            [0, 0.76, 0], // Top (Y+)
            [0, -0.76, 0], // Bottom (Y-)
          ].map((pos, i) => (
            <mesh key={i} position={pos} castShadow>
              <planeGeometry args={[1.2, 1.2]} />
              <meshStandardMaterial 
                color={[
                  '#5B21B6', // Purple - React
                  '#3B82F6', // Blue - TypeScript
                  '#10B981', // Green - Node
                  '#F59E0B', // Yellow - JavaScript
                  '#EC4899', // Pink - HTML
                  '#8B5CF6', // Violet - CSS
                ][i]} 
                emissive={[
                  '#5B21B6',
                  '#3B82F6',
                  '#10B981',
                  '#F59E0B',
                  '#EC4899',
                  '#8B5CF6',
                ][i]}
                emissiveIntensity={0.5}
                metalness={0.3}
                roughness={0.7}
              />
            </mesh>
          ))}
        </>
      )}
      
      {modelType === 'resume' && (
        <>
          {/* Resume document */}
          <group>
            {/* Pages */}
            {[...Array(5)].map((_, i) => (
              <mesh 
                key={i} 
                position={[0, -i * 0.01, 0]} 
                rotation={[0, 0, Math.sin(i * 0.5) * 0.05]}
                castShadow
                receiveShadow
              >
                <boxGeometry args={[1.2, 1.6, 0.01]} />
                <meshStandardMaterial 
                  color="#f8f9fa" 
                  metalness={0.1}
                  roughness={0.9}
                  side={THREE.DoubleSide}
                />
              </mesh>
            ))}
            
            {/* Text lines */}
            {[...Array(12)].map((_, i) => (
              <mesh 
                key={i} 
                position={[-0.4 + Math.random() * 0.1, 0.6 - i * 0.12, 0.02]} 
                castShadow
              >
                <planeGeometry args={[0.7 + Math.random() * 0.3, 0.03]} />
                <meshStandardMaterial 
                  color="#5B21B6" 
                  transparent
                  opacity={0.8}
                />
              </mesh>
            ))}
          </group>
        </>
      )}
      
      {modelType === 'contact' && (
        <>
          {/* Contact holographic sphere */}
          <mesh castShadow>
            <sphereGeometry args={[1, 32, 32]} />
            <meshStandardMaterial 
              color="#3B82F6" 
              emissive="#3B82F6"
              emissiveIntensity={0.3}
              metalness={0.9}
              roughness={0.2}
              transparent
              opacity={0.6}
              wireframe
            />
          </mesh>
          
          {/* Inner sphere */}
          <mesh castShadow>
            <sphereGeometry args={[0.8, 24, 24]} />
            <meshStandardMaterial 
              color="#10B981"
              emissive="#10B981"
              emissiveIntensity={0.3}
              metalness={0.7}
              roughness={0.3}
              transparent
              opacity={0.4}
            />
          </mesh>
          
          {/* Orbiting elements */}
          {[...Array(5)].map((_, i) => {
            const angle = (i / 5) * Math.PI * 2
            const radius = 1.2
            return (
              <mesh 
                key={i}
                position={[
                  Math.cos(angle) * radius,
                  Math.sin(angle) * 0.5,
                  Math.sin(angle) * radius,
                ]}
                castShadow
              >
                <sphereGeometry args={[0.1, 16, 16]} />
                <meshStandardMaterial 
                  color="#F59E0B" 
                  emissive="#F59E0B"
                  emissiveIntensity={0.5}
                />
              </mesh>
            )
          })}
        </>
      )}
    </group>
  )
}

interface SectionModelProps {
  type: 'laptop' | 'skills' | 'resume' | 'contact'
  className?: string
  style?: React.CSSProperties
}

export default function SectionModel({ type, className, style }: SectionModelProps) {
  const isMobile = useIsMobile()
  const containerRef = useRef<HTMLDivElement>(null)
  
  // Scroll animation to reveal the model
  useEffect(() => {
    if (!containerRef.current) return
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
          }
        })
      },
      { threshold: 0.3 }
    )
    
    observer.observe(containerRef.current)
    
    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current)
      }
    }
  }, [])
  
  return (
    <div 
      ref={containerRef}
      className={`model-container scroll-animated ${className || ''}`} 
      style={style}
      aria-hidden="true"
    >
      <Canvas shadows>
        <PerspectiveCamera 
          makeDefault 
          position={[0, 0, 5]} 
          fov={isMobile ? 60 : 50} 
        />
        <ambientLight intensity={0.5} />
        <spotLight
          position={[5, 5, 5]}
          angle={0.15}
          penumbra={1}
          intensity={0.8}
          castShadow
        />
        <Model 
          modelType={type} 
          position={[0, 0, 0]} 
          scale={isMobile ? 0.8 : 1.2}
        />
        <OrbitControls 
          enableZoom={false} 
          enablePan={false}
          minPolarAngle={Math.PI / 4}
          maxPolarAngle={Math.PI / 2}
          rotateSpeed={0.5}
        />
      </Canvas>
    </div>
  )
}