import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const ParticleBackground = () => {
  const pointsRef = useRef<THREE.Points>(null);
  const linesRef = useRef<THREE.LineSegments>(null);
  
  const particleCount = 150;
  const connectionDistance = 25;

  // Generate particles
  const { positions, velocities } = useMemo(() => {
    const positions = new Float32Array(particleCount * 3);
    const velocities = new Float32Array(particleCount * 3);
    
    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      positions[i3] = (Math.random() - 0.5) * 100;
      positions[i3 + 1] = (Math.random() - 0.5) * 100;
      positions[i3 + 2] = (Math.random() - 0.5) * 50;
      
      velocities[i3] = (Math.random() - 0.5) * 0.02;
      velocities[i3 + 1] = (Math.random() - 0.5) * 0.02;
      velocities[i3 + 2] = (Math.random() - 0.5) * 0.01;
    }
    
    return { positions, velocities };
  }, []);

  // Create line geometry for connections
  const lineGeometry = useMemo(() => {
    const geometry = new THREE.BufferGeometry();
    const linePositions = new Float32Array(particleCount * particleCount * 6);
    geometry.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));
    return geometry;
  }, []);

  useFrame((state) => {
    if (!pointsRef.current) return;
    
    const positionsArray = pointsRef.current.geometry.attributes.position.array as Float32Array;
    const time = state.clock.elapsedTime;
    
    // Update particle positions
    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      
      positionsArray[i3] += velocities[i3];
      positionsArray[i3 + 1] += velocities[i3 + 1];
      positionsArray[i3 + 2] += velocities[i3 + 2];
      
      // Add subtle wave motion
      positionsArray[i3 + 1] += Math.sin(time * 0.5 + positionsArray[i3] * 0.1) * 0.01;
      
      // Boundary check - wrap around
      if (Math.abs(positionsArray[i3]) > 50) velocities[i3] *= -1;
      if (Math.abs(positionsArray[i3 + 1]) > 50) velocities[i3 + 1] *= -1;
      if (Math.abs(positionsArray[i3 + 2]) > 25) velocities[i3 + 2] *= -1;
    }
    
    pointsRef.current.geometry.attributes.position.needsUpdate = true;
    
    // Update connections
    if (linesRef.current) {
      const linePositions = linesRef.current.geometry.attributes.position.array as Float32Array;
      let lineIndex = 0;
      
      for (let i = 0; i < particleCount; i++) {
        for (let j = i + 1; j < particleCount; j++) {
          const i3 = i * 3;
          const j3 = j * 3;
          
          const dx = positionsArray[i3] - positionsArray[j3];
          const dy = positionsArray[i3 + 1] - positionsArray[j3 + 1];
          const dz = positionsArray[i3 + 2] - positionsArray[j3 + 2];
          const distance = Math.sqrt(dx * dx + dy * dy + dz * dz);
          
          if (distance < connectionDistance && lineIndex < particleCount * 6) {
            linePositions[lineIndex++] = positionsArray[i3];
            linePositions[lineIndex++] = positionsArray[i3 + 1];
            linePositions[lineIndex++] = positionsArray[i3 + 2];
            linePositions[lineIndex++] = positionsArray[j3];
            linePositions[lineIndex++] = positionsArray[j3 + 1];
            linePositions[lineIndex++] = positionsArray[j3 + 2];
          }
        }
      }
      
      // Clear remaining line positions
      for (let i = lineIndex; i < particleCount * particleCount * 6; i++) {
        linePositions[i] = 0;
      }
      
      linesRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <group>
      {/* Particles */}
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[positions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.5}
          color="#00FFC2"
          transparent
          opacity={0.8}
          sizeAttenuation
          blending={THREE.AdditiveBlending}
        />
      </points>
      
      {/* Connection Lines */}
      <lineSegments ref={linesRef} geometry={lineGeometry}>
        <lineBasicMaterial
          color="#00FFC2"
          transparent
          opacity={0.15}
          blending={THREE.AdditiveBlending}
        />
      </lineSegments>
      
      {/* Ambient Glow */}
      <mesh position={[0, 0, -20]}>
        <planeGeometry args={[200, 200]} />
        <meshBasicMaterial
          color="#050505"
          transparent
          opacity={0.3}
        />
      </mesh>
    </group>
  );
};

export default ParticleBackground;
