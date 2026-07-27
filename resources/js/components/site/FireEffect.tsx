import React, { useRef, useState, useEffect, useMemo } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { Bloom, EffectComposer } from '@react-three/postprocessing';
import * as THREE from 'three';
import yantraImg from "@/assets/tantric-hero-yantra.png";

// "Isolated Yantra" Shader
// Extracts the central Sri Yantra from its background and applies a high-fidelity golden pulse.
const YantraShader = {
  uniforms: {
    uTime: { value: 0 },
    uTexture: { value: null },
    uGoldColor: { value: new THREE.Color('#ffcc00') },
  },
  vertexShader: `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: `
    varying vec2 vUv;
    uniform float uTime;
    uniform sampler2D uTexture;
    uniform vec3 uGoldColor;

    void main() {
      // 1. Extraction Mask
      // Tight circular mask to isolate the Yantra from the stars
      float dist = distance(vUv, vec2(0.5, 0.5));
      float mask = smoothstep(0.48, 0.45, dist);
      
      vec4 texColor = texture2D(uTexture, vUv);
      
      // 2. Divine Pulse Logic
      float pulse = sin(uTime * 3.0) * 0.1 + 1.1;
      
      // Identify golden highlights to amplify
      float goldIntensity = pow(texColor.r * 0.8 + texColor.g * 0.4, 2.0);
      
      vec3 finalColor = texColor.rgb;
      
      // Amplify the golden glow
      finalColor += uGoldColor * goldIntensity * pulse * 0.5;
      
      // Add radiant center glow
      float centerGlow = smoothstep(0.3, 0.0, dist) * pulse;
      finalColor += uGoldColor * centerGlow * 0.3;
      
      // Apply the mask
      finalColor *= mask;
      float alpha = mask * texColor.a;

      gl_FragColor = vec4(finalColor, alpha);
    }
  `
};

function YantraRenderer() {
  const meshRef = useRef<THREE.Mesh>(null!);
  const materialRef = useRef<THREE.ShaderMaterial>(null!);
  const texture = useLoader(THREE.TextureLoader, yantraImg);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = t;
    }
    if (meshRef.current) {
      // Slow, meditative rotation
      meshRef.current.rotation.z = t * 0.05;
    }
  });

  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uTexture: { value: texture },
    uGoldColor: { value: new THREE.Color('#ffcc00') },
  }), [texture]);

  return (
    <mesh ref={meshRef} scale={[3.2, 3.2, 1]}>
      <planeGeometry args={[1, 1, 16, 16]} />
      <shaderMaterial
        ref={materialRef}
        uniforms={uniforms}
        vertexShader={YantraShader.vertexShader}
        fragmentShader={YantraShader.fragmentShader}
        transparent
      />
    </mesh>
  );
}

export function FireEffect() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <div className="w-full h-full absolute inset-0 z-20 pointer-events-none overflow-hidden">
      <Canvas camera={{ position: [0, 0, 2] }} gl={{ alpha: true, antialias: true }}>
        <React.Suspense fallback={null}>
          <YantraRenderer />
        </React.Suspense>
        <EffectComposer>
          <Bloom 
            luminanceThreshold={0.2} 
            mipmapBlur 
            intensity={1.0} 
            radius={0.3} 
          />
        </EffectComposer>
      </Canvas>
    </div>
  );
}
