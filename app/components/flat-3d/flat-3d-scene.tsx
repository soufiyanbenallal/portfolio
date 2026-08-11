import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import {
  BoxGeometry,
  EdgesGeometry,
  Group,
  MathUtils,
  type Vector3Tuple,
} from "three";

const palette = {
  ink: "#171710",
  paper: "#fff8ed",
  sketch: "#f3ebdd",
  pink: "#e93665",
  sun: "#ffc847",
  aqua: "#21b7c5",
  blue: "#6e7cf6",
  leaf: "#7fd47a",
  coral: "#ff7b59",
} as const;

type OutlinedBoxProps = {
  color: string;
  position: Vector3Tuple;
  rotation?: Vector3Tuple;
  size: Vector3Tuple;
};

function OutlinedBox({ color, position, rotation = [0, 0, 0], size }: OutlinedBoxProps) {
  const edgeGeometry = useMemo(() => {
    const boxGeometry = new BoxGeometry(size[0], size[1], size[2]);
    const edges = new EdgesGeometry(boxGeometry, 24);
    boxGeometry.dispose();
    return edges;
  }, [size]);

  useEffect(() => () => edgeGeometry.dispose(), [edgeGeometry]);

  return (
    <group position={position} rotation={rotation}>
      <mesh castShadow={false} receiveShadow={false}>
        <boxGeometry args={size} />
        <meshToonMaterial color={color} />
      </mesh>
      <lineSegments geometry={edgeGeometry} renderOrder={3}>
        <lineBasicMaterial
          color={palette.ink}
          depthWrite={false}
          opacity={0.92}
          transparent
        />
      </lineSegments>
    </group>
  );
}

function ContextGuard({ onContextLost }: { onContextLost: () => void }) {
  const renderer = useThree((state) => state.gl);

  useEffect(() => {
    const canvas = renderer.domElement;
    const handleContextLoss = (event: Event) => {
      event.preventDefault();
      onContextLost();
    };

    canvas.addEventListener("webglcontextlost", handleContextLoss);
    return () => canvas.removeEventListener("webglcontextlost", handleContextLoss);
  }, [onContextLost, renderer]);

  return null;
}

function BuilderAssembly({ active, pointerInside }: { active: boolean; pointerInside: boolean }) {
  const assembly = useRef<Group>(null);
  const signal = useRef<Group>(null);
  const sketchMarker = useRef<Group>(null);

  useFrame((state, delta) => {
    if (!active) return;

    const targetX = pointerInside ? state.pointer.y * 0.055 : 0;
    const targetY = pointerInside ? state.pointer.x * 0.09 : 0;

    if (assembly.current) {
      assembly.current.rotation.x = MathUtils.damp(
        assembly.current.rotation.x,
        targetX,
        5.4,
        delta,
      );
      assembly.current.rotation.y = MathUtils.damp(
        assembly.current.rotation.y,
        targetY,
        5.4,
        delta,
      );
    }

    const elapsed = state.clock.getElapsedTime();
    if (signal.current) {
      signal.current.position.y = 0.06 + Math.sin(elapsed * 1.15) * 0.07;
      signal.current.rotation.y = elapsed * 0.16;
    }
    if (sketchMarker.current) {
      sketchMarker.current.position.y = Math.sin(elapsed * 1.35 + 1.2) * 0.08;
      sketchMarker.current.rotation.y = elapsed * -0.24;
    }
  });

  return (
    <group ref={assembly} position={[0, -0.15, 0]}>
      <OutlinedBox color={palette.paper} position={[0, -1.55, 0]} size={[5.5, 0.22, 4.35]} />

      <OutlinedBox color={palette.sketch} position={[-1.3, 0.15, -1.48]} size={[2.55, 3.25, 0.14]} />
      <OutlinedBox color={palette.blue} position={[1.3, 0.15, -1.48]} size={[2.55, 3.25, 0.14]} />

      <OutlinedBox color={palette.sun} position={[-0.58, -0.38, 0.12]} size={[3.75, 0.2, 1.42]} />
      <OutlinedBox color={palette.aqua} position={[-2.08, -1.02, 0.12]} size={[0.2, 1.28, 1.05]} />
      <OutlinedBox color={palette.pink} position={[0.92, -1.02, 0.12]} size={[0.2, 1.28, 1.05]} />

      <OutlinedBox color={palette.ink} position={[-0.82, 0.62, -0.02]} size={[1.92, 1.28, 0.18]} />
      <OutlinedBox color={palette.pink} position={[-0.82, 0.62, 0.09]} size={[1.62, 0.98, 0.08]} />
      <OutlinedBox color={palette.aqua} position={[-0.82, -0.16, -0.01]} size={[0.18, 0.52, 0.18]} />
      <OutlinedBox color={palette.paper} position={[-0.82, -0.43, -0.01]} size={[0.78, 0.1, 0.48]} />
      <OutlinedBox
        color={palette.sketch}
        position={[-0.66, -0.2, 0.84]}
        rotation={[-0.08, 0, 0]}
        size={[1.62, 0.1, 0.55]}
      />

      <OutlinedBox color={palette.coral} position={[1.72, -0.55, 0.48]} size={[1.18, 1.18, 1.18]} />
      <OutlinedBox color={palette.leaf} position={[1.72, 0.2, 0.48]} size={[0.86, 0.3, 0.86]} />
      <OutlinedBox color={palette.sun} position={[1.42, 0.52, 0.33]} size={[0.36, 0.36, 0.36]} />
      <OutlinedBox color={palette.blue} position={[1.94, 0.58, 0.57]} size={[0.42, 0.48, 0.42]} />

      <group ref={signal} position={[1.82, 1.55, 0.05]}>
        <mesh castShadow={false} receiveShadow={false} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.56, 0.075, 8, 32]} />
          <meshToonMaterial color={palette.pink} />
        </mesh>
        <mesh castShadow={false} receiveShadow={false}>
          <sphereGeometry args={[0.29, 12, 8]} />
          <meshToonMaterial color={palette.sun} />
        </mesh>
      </group>

      <group ref={sketchMarker} position={[-2.05, 1.27, 0.42]}>
        <mesh castShadow={false} receiveShadow={false} rotation={[0.2, 0, 0.15]}>
          <octahedronGeometry args={[0.45, 0]} />
          <meshToonMaterial color={palette.aqua} />
        </mesh>
      </group>
    </group>
  );
}

type Flat3DSceneProps = {
  active: boolean;
  onContextLost: () => void;
  pointerInside: boolean;
};

export function Flat3DScene({ active, onContextLost, pointerInside }: Flat3DSceneProps) {
  return (
    <>
      <ContextGuard onContextLost={onContextLost} />
      <hemisphereLight args={[palette.paper, palette.ink, 2.25]} />
      <directionalLight color="#ffffff" intensity={3.4} position={[5, 8, 7]} />
      <directionalLight color={palette.aqua} intensity={0.7} position={[-5, 2, 4]} />
      <BuilderAssembly active={active} pointerInside={pointerInside} />
    </>
  );
}
