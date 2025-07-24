import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { Text, Instances, Instance } from '@react-three/drei'
import { useTheme } from '@/lib/theme-context'

interface ParticlesProps {
  count: number
}

const codeSnippets = [
  'const', 'let', 'function', 'return', 'if', 'else', 'for', 'while',
  'import', 'export', 'class', 'extends', 'interface', 'type', 'enum',
  'useEffect', 'useState', 'useRef', 'useCallback', 'useMemo', 'React',
  '<div>', '</div>', '<span>', '<p>', '<h1>', '<component>', 'props',
  '{}', '[]', '()', '=>', '===', '!==', '&&', '||', '?:', '+', '-', '*', '/',
]

export default function FloatingParticles({ count = 100 }: ParticlesProps) {
  const { theme } = useTheme()
  const textColor = theme === 'dark' ? '#88ff88' : '#10b981'
  
  // Generate optimized particles data
  const particles = useMemo(() => {
    const temp = []
    for (let i = 0; i < count; i++) {
      const time = Math.random() * 100
      const factor = 20 + Math.random() * 100
      const speed = 0.005 + Math.random() / 200
      const xFactor = Math.random() * 80 - 40
      const yFactor = Math.random() * 50 - 25
      const zFactor = Math.random() * 80 - 40
      const textIndex = Math.floor(Math.random() * codeSnippets.length)
      
      temp.push({
        time,
        factor,
        speed,
        xFactor,
        yFactor,
        zFactor,
        textIndex,
        mx: 0,
        my: 0,
      })
    }
    return temp
  }, [count])
  
  // Use refs for optimization
  const textRefs = useRef<THREE.Group[]>([])
  
  // Update particles position and rotation in animation frame
  useFrame((state) => {
    textRefs.current.forEach((textMesh, i) => {
      if (!textMesh) return
      
      const particle = particles[i]
      
      // Update the particle time
      particle.time += particle.speed
      
      // Calculate new position
      const x = Math.cos(particle.time) * particle.xFactor
      const y = Math.sin(particle.time) * particle.yFactor
      const z = Math.cos(particle.time) * particle.zFactor
      
      // Update position with smooth lerping
      textMesh.position.set(x, y, z)
      
      // Scale based on sine wave for subtle pulsing
      const scale = Math.cos(particle.time * particle.factor) * 0.2 + 0.8
      textMesh.scale.set(scale, scale, scale)
      
      // Rotate to face camera with slight variation
      textMesh.rotation.set(
        particle.time * 0.1, 
        particle.time * 0.2,
        particle.time * 0.05
      )
      
      // Theme-based opacity
      if (textMesh.children[0]) {
        const material = (textMesh.children[0] as THREE.Mesh)
          .material as THREE.MeshBasicMaterial
          
        if (material) {
          material.opacity = theme === 'dark' ? 0.8 : 0.6
        }
      }
    })
  })

  return (
    <group>
      {particles.map((particle, i) => (
        <group
          key={i}
          ref={(el) => {
            if (el) textRefs.current[i] = el
          }}
          position={[
            particle.xFactor,
            particle.yFactor,
            particle.zFactor
          ]}
        >
          <Text
            color={textColor}
            fontSize={0.5}
            maxWidth={2}
            lineHeight={1}
            letterSpacing={0.02}
            textAlign="center"
            font="https://fonts.gstatic.com/s/raleway/v14/1Ptrg8zYS_SKggPNwK4vaqI.woff"
            anchorX="center"
            anchorY="middle"
            fillOpacity={0.8}
          >
            {codeSnippets[particle.textIndex]}
          </Text>
        </group>
      ))}
    </group>
  )
}