import { useRef, useState, useEffect } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { useGLTF, useAnimations } from '@react-three/drei'
import * as THREE from 'three'
import { useTheme } from '@/lib/theme-context'
import gsap from 'gsap'

interface AvatarProps {
  position: [number, number, number]
  scale: number
}

// Advanced Avatar with animations and theme-based lighting
export function Avatar({ position, scale }: AvatarProps) {
  const group = useRef<THREE.Group>(null!)
  const [lookAt] = useState(new THREE.Vector3(0, 0, 5))
  const { theme } = useTheme()
  const { viewport } = useThree()
  
  // Avatar state for animations
  const [state, setState] = useState({
    isWaving: false,
    isBlinking: false,
    isInteracting: false,
  })
  
  // Mouse tracking for avatar head movement with bounds
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Map mouse position to scene coordinates with bounds
      const x = (e.clientX / window.innerWidth) * 2 - 1
      const y = -(e.clientY / window.innerHeight) * 2 + 1
      
      // Update the look-at target with limited range
      lookAt.set(x * 1.5, y + 1, 5)
      
      // If mouse is near the avatar, trigger interaction
      const mouseDist = Math.sqrt(x * x + y * y)
      if (mouseDist < 0.5 && !state.isInteracting) {
        setState(prev => ({ ...prev, isInteracting: true }))
        setTimeout(() => {
          setState(prev => ({ ...prev, isInteracting: false }))
        }, 2000)
      }
    }
    
    // Scroll handler to trigger animations based on scroll position
    const handleScroll = () => {
      const scrollPos = window.scrollY
      const windowHeight = window.innerHeight
      
      if (scrollPos < windowHeight * 0.3 && !state.isWaving) {
        setState(prev => ({ ...prev, isWaving: true }))
        setTimeout(() => {
          setState(prev => ({ ...prev, isWaving: false }))
        }, 2500)
      }
    }
    
    // Blink randomly
    const blinkInterval = setInterval(() => {
      setState(prev => ({ ...prev, isBlinking: true }))
      setTimeout(() => {
        setState(prev => ({ ...prev, isBlinking: false }))
      }, 200)
    }, 3000 + Math.random() * 4000)
    
    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('scroll', handleScroll)
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('scroll', handleScroll)
      clearInterval(blinkInterval)
    }
  }, [lookAt, state.isInteracting, state.isWaving])
  
  // Update lighting when theme changes
  useEffect(() => {
    if (!group.current) return
    
    // Find the main lights in the avatar group
    const lights = group.current.children.filter(
      child => child instanceof THREE.Light
    ) as THREE.Light[]
    
    // Adjust lighting based on theme
    lights.forEach(light => {
      gsap.to(light, {
        intensity: theme === 'dark' ? 1.5 : 0.8,
        duration: 0.5,
      })
      
      if (light instanceof THREE.PointLight) {
        gsap.to(light.color, {
          r: theme === 'dark' ? 0.4 : 0.9,
          g: theme === 'dark' ? 0.2 : 0.8,
          b: theme === 'dark' ? 0.9 : 0.7,
          duration: 0.5,
        })
      }
    })
    
    // Adjust materials based on theme
    group.current.traverse(child => {
      if (child instanceof THREE.Mesh && child.material) {
        const material = child.material as THREE.MeshStandardMaterial
        if (material.emissive) {
          gsap.to(material.emissive, {
            r: theme === 'dark' ? 0.2 : 0.05,
            g: theme === 'dark' ? 0.05 : 0.05,
            b: theme === 'dark' ? 0.3 : 0.05,
            duration: 0.5,
          })
        }
      }
    })
  }, [theme])
  
  // Animation logic for the avatar
  useFrame((state, delta) => {
    if (!group.current) return
    
    // Get head and face components
    const head = group.current.getObjectByName('Head')
    const leftEye = group.current.getObjectByName('LeftEye')
    const rightEye = group.current.getObjectByName('RightEye')
    const rightArm = group.current.getObjectByName('RightArm')
    
    // Head tracking
    if (head) {
      // Smooth head rotation towards look target
      const targetRotation = new THREE.Euler()
      targetRotation.copy(head.rotation)
      
      // Calculate desired rotation based on lookAt
      const dx = lookAt.x - head.getWorldPosition(new THREE.Vector3()).x
      const dy = lookAt.y - head.getWorldPosition(new THREE.Vector3()).y
      
      // Apply limited rotation with smoothing
      targetRotation.y = THREE.MathUtils.lerp(
        head.rotation.y, 
        Math.max(-0.5, Math.min(0.5, dx * 0.3)), 
        delta * 3
      )
      targetRotation.x = THREE.MathUtils.lerp(
        head.rotation.x, 
        Math.max(-0.2, Math.min(0.2, -dy * 0.2)),
        delta * 3
      )
      
      head.rotation.copy(targetRotation)
    }
    
    // Blinking animation
    if (leftEye && rightEye && state.isBlinking) {
      leftEye.scale.y = 0.1
      rightEye.scale.y = 0.1
    } else if (leftEye && rightEye) {
      leftEye.scale.y = THREE.MathUtils.lerp(leftEye.scale.y, 1, delta * 8)
      rightEye.scale.y = THREE.MathUtils.lerp(rightEye.scale.y, 1, delta * 8)
    }
    
    // Waving animation
    if (rightArm && state.isWaving) {
      rightArm.rotation.z = Math.sin(state.animation * 12) * 0.3 + 0.7
      rightArm.rotation.y = Math.sin(state.animation * 6) * 0.1
      state.animation += delta
    } else if (rightArm) {
      rightArm.rotation.z = THREE.MathUtils.lerp(rightArm.rotation.z, 0, delta * 3)
      rightArm.rotation.y = THREE.MathUtils.lerp(rightArm.rotation.y, 0, delta * 3)
    }
    
    // Subtle floating animation
    group.current.position.y = position[1] + Math.sin(state.animation * 1.5) * 0.1
    
    // Update animation time
    state.animation += delta * 0.5
  })
  
  return (
    <group ref={group} position={position} scale={scale}>
      {/* Character group with improved structure */}
      <group name="Character">
        {/* Body */}
        <mesh position={[0, 0, 0]} castShadow receiveShadow name="Body">
          <capsuleGeometry args={[0.5, 1, 4, 16]} />
          <meshStandardMaterial 
            color="#6930c3" 
            metalness={0.3}
            roughness={0.7}
          />
        </mesh>
        
        {/* Head */}
        <group name="Head" position={[0, 1, 0]}>
          <mesh castShadow receiveShadow>
            <sphereGeometry args={[0.4, 32, 32]} />
            <meshStandardMaterial 
              color="#ffd166" 
              metalness={0.1}
              roughness={0.6}
            />
          </mesh>
          
          {/* Eyes */}
          <mesh position={[0.15, 0.1, 0.35]} castShadow name="RightEye">
            <sphereGeometry args={[0.08, 32, 16]} />
            <meshStandardMaterial color="#000000" />
          </mesh>
          <mesh position={[-0.15, 0.1, 0.35]} castShadow name="LeftEye">
            <sphereGeometry args={[0.08, 32, 16]} />
            <meshStandardMaterial color="#000000" />
          </mesh>
          
          {/* Mouth */}
          <mesh position={[0, -0.1, 0.35]} rotation={[0, 0, 0]} castShadow>
            <boxGeometry args={[0.2, 0.05, 0.05]} />
            <meshStandardMaterial color="#000000" />
          </mesh>
        </group>
        
        {/* Arms with improved structure */}
        <group position={[-0.7, 0, 0]} rotation={[0, 0, -Math.PI / 4]} name="LeftArm">
          <mesh castShadow>
            <capsuleGeometry args={[0.2, 0.8, 4, 16]} />
            <meshStandardMaterial 
              color="#6930c3"
              metalness={0.3}
              roughness={0.7}
            />
          </mesh>
        </group>
        <group position={[0.7, 0, 0]} rotation={[0, 0, Math.PI / 4]} name="RightArm">
          <mesh castShadow>
            <capsuleGeometry args={[0.2, 0.8, 4, 16]} />
            <meshStandardMaterial 
              color="#6930c3"
              metalness={0.3}
              roughness={0.7}
            />
          </mesh>
        </group>
        
        {/* Legs */}
        <mesh position={[-0.3, -1, 0]} castShadow name="LeftLeg">
          <capsuleGeometry args={[0.25, 0.8, 4, 16]} />
          <meshStandardMaterial 
            color="#4ea8de"
            metalness={0.2}
            roughness={0.8}
          />
        </mesh>
        <mesh position={[0.3, -1, 0]} castShadow name="RightLeg">
          <capsuleGeometry args={[0.25, 0.8, 4, 16]} />
          <meshStandardMaterial 
            color="#4ea8de"
            metalness={0.2}
            roughness={0.8}
          />
        </mesh>
      </group>
      
      {/* Platform with lighting effect */}
      <mesh position={[0, -2, 0]} receiveShadow rotation={[-Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[2, 2, 0.1, 32]} />
        <meshStandardMaterial 
          color="#80ffdb" 
          emissive="#80ffdb"
          emissiveIntensity={0.5}
          metalness={0.5}
          roughness={0.3}
        />
      </mesh>
      
      {/* Add point light for glow effect that changes with theme */}
      <pointLight
        position={[0, -1.9, 0]}
        intensity={1.5}
        distance={5}
        color="#80ffdb"
        castShadow
      />
    </group>
  )
}