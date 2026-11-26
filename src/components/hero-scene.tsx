import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, Lightformer } from '@react-three/drei';
import { useEffect, useRef, useState } from 'react';
import { Group, Color } from 'three';

function Petals({ plum, gold }: { plum: string; gold: string }) {
  const group = useRef<Group>(null);
  useFrame(({ clock, pointer }) => {
    if (!group.current) return;
    group.current.rotation.y = pointer.x * .15;
    group.current.rotation.x = pointer.y * .08;
    group.current.children.forEach((child, i) => {
      child.position.y = Math.sin(clock.elapsedTime * .2 + i) * 2.5;
      child.rotation.z = clock.elapsedTime * .07 + i;
    });
  });
  return <group ref={group}>{Array.from({length: 13}, (_, i) => <mesh key={i} position={[(i % 5 - 2) * 2.3, Math.sin(i) * 3, -i % 3]} rotation={[i, i*.7, i]} scale={i % 3 === 0 ? [.055,.055,.055] : [.13,.28,.06]}><sphereGeometry args={[1,12,8]}/><meshStandardMaterial color={new Color(i % 3 === 0 ? gold : plum)} roughness={.35} metalness={.25}/></mesh>)}</group>;
}
export default function HeroScene() {
  const [colors, setColors] = useState<{plum:string;gold:string} | null>(null);
  useEffect(() => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const probe = document.createElement('canvas');
    if (!probe.getContext('webgl2') && !probe.getContext('webgl')) return;
    const read = (token: string) => {
      const el = document.createElement('span'); el.style.color = `var(${token})`; document.body.append(el);
      const value = getComputedStyle(el).color; el.remove();
      // Canvas converts OKLCH tokens into an sRGB color Three.js understands.
      const c = document.createElement('canvas').getContext('2d');
      if (!c) return value;
      c.fillStyle = value; c.fillRect(0,0,1,1); const pixel = c.getImageData(0,0,1,1).data;
      return `rgb(${pixel[0] ?? 0},${pixel[1] ?? 0},${pixel[2] ?? 0})`;
    };
    setColors({plum:read('--lavender'),gold:read('--gold')});
  }, []);
  if (!colors) return null;
  return <div className="hero-scene" aria-hidden="true"><Canvas dpr={1} camera={{position:[0,0,8],fov:50}} gl={{alpha:true,antialias:false}} onCreated={({gl}) => {gl.domElement.parentElement?.setAttribute('data-scene-ready','true');}}><ambientLight intensity={1.5}/><directionalLight position={[3,5,4]} intensity={3}/><Environment resolution={32}><Lightformer intensity={2} position={[0,5,0]} scale={[10,10,1]}/></Environment><Petals {...colors}/></Canvas></div>;
}