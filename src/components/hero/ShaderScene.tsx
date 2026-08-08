import { useTexture } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';
import { useEffect, useMemo, useRef } from 'react';
import * as THREE from 'three/webgpu';
import {
  blendScreen,
  float,
  mod,
  mx_cell_noise_float,
  oneMinus,
  smoothstep,
  texture,
  uniform,
  uv,
  vec2,
  vec3,
} from 'three/tsl';

import { getAssetUrl } from '../../lib/getAssetUrl';
import { getArtworkScale } from './getArtworkScale';
import { getPointerNdc, getPointerUv } from './getPointerUv';

const POINTER_STRENGTH = 0.014;
const POINTER_REVEAL_INNER_RADIUS = 0.11;
const POINTER_REVEAL_OUTER_RADIUS = 0.18;
const POINTER_REVEAL_STRENGTH = 8.5;
const POINTER_EASING = 0.12;
const HALFTONE_TILING = 120;

/**
 * Renders the depth-displaced MORPH sculpture with a scanning halftone mask.
 */
export function ShaderScene(): React.JSX.Element {
  const meshRef = useRef<THREE.Mesh>(null);
  const isPointerActiveRef = useRef(false);
  const pointerNdcRef = useRef(new THREE.Vector2(0, 0));
  const pointerUvTargetRef = useRef(new THREE.Vector2(0.5, 0.5));
  const [colorMap, depthMap] = useTexture([
    getAssetUrl('assets/morph-hero-source.png'),
    getAssetUrl('assets/morph-hero-depth.webp'),
  ]);
  const shader = useMemo(() => {
    const pointer = uniform(new THREE.Vector2(0, 0));
    const pointerUv = uniform(new THREE.Vector2(0.5, 0.5));
    const pointerActivity = uniform(0);
    const progress = uniform(0);
    const depthTexture = texture(depthMap);
    const displacedUv = uv().add(depthTexture.r.mul(pointer).mul(POINTER_STRENGTH));
    const colorTexture = texture(colorMap, displacedUv);
    const tiledUv = vec2(uv().x, uv().y).mul(HALFTONE_TILING);
    const cellUv = mod(tiledUv, 2).sub(1);
    const brightness = mx_cell_noise_float(tiledUv.div(2));
    const dot = smoothstep(0.5, 0.49, float(cellUv.length())).mul(brightness);
    const scanBand = oneMinus(
      smoothstep(0, 0.022, depthTexture.r.sub(progress).abs()),
    );
    const scanMask = dot.mul(scanBand).mul(vec3(9.5, 0, 0));
    const pointerDistance = uv().sub(pointerUv).length();
    const pointerFalloff = oneMinus(
      smoothstep(
        POINTER_REVEAL_INNER_RADIUS,
        POINTER_REVEAL_OUTER_RADIUS,
        pointerDistance,
      ),
    );
    const sculptureMask = smoothstep(0.04, 0.18, depthTexture.r);
    const pointerMask = dot
      .mul(pointerFalloff)
      .mul(sculptureMask)
      .mul(pointerActivity)
      .mul(vec3(POINTER_REVEAL_STRENGTH, 0, 0));
    const material = new THREE.MeshBasicNodeMaterial({
      colorNode: blendScreen(colorTexture, scanMask.add(pointerMask)),
      transparent: true,
    });

    return { material, pointer, pointerActivity, pointerUv, progress };
  }, [colorMap, depthMap]);
  const renderer = useThree((state) => state.gl);
  const artworkScale = useThree((state) => getArtworkScale(state.viewport));

  useEffect(() => {
    const canvas = renderer.domElement;
    const heroElement = canvas.closest<HTMLElement>('.hero');

    if (!heroElement) {
      return undefined;
    }

    const handlePointerMove = (event: PointerEvent): void => {
      isPointerActiveRef.current =
        event.pointerType === 'mouse' || event.pointerType === 'pen';
      const bounds = heroElement.getBoundingClientRect();
      const pointerNdc = getPointerNdc({
        clientX: event.clientX,
        clientY: event.clientY,
        left: bounds.left,
        top: bounds.top,
        width: bounds.width,
        height: bounds.height,
      });

      pointerNdcRef.current.set(pointerNdc.x, pointerNdc.y);
    };
    const handlePointerLeave = (): void => {
      isPointerActiveRef.current = false;
    };

    heroElement.addEventListener('pointermove', handlePointerMove);
    heroElement.addEventListener('pointerleave', handlePointerLeave);

    return () => {
      heroElement.removeEventListener('pointermove', handlePointerMove);
      heroElement.removeEventListener('pointerleave', handlePointerLeave);
    };
  }, [renderer]);

  useFrame(({ clock, viewport }) => {
    const elapsedTime = clock.getElapsedTime();
    const pointerUv = getPointerUv({
      pointerX: pointerNdcRef.current.x,
      pointerY: pointerNdcRef.current.y,
      viewportWidth: viewport.width,
      viewportHeight: viewport.height,
      artworkScale,
    });

    shader.progress.value = Math.sin(elapsedTime * 0.48) * 0.5 + 0.5;
    shader.pointer.value.lerp(pointerNdcRef.current, 0.06);
    pointerUvTargetRef.current.set(pointerUv.x, pointerUv.y);
    shader.pointerUv.value.lerp(pointerUvTargetRef.current, POINTER_EASING);
    shader.pointerActivity.value = THREE.MathUtils.lerp(
      shader.pointerActivity.value,
      isPointerActiveRef.current ? 1 : 0,
      POINTER_EASING,
    );
  });

  return (
    <mesh
      ref={meshRef}
      scale={[artworkScale, artworkScale, 1]}
      material={shader.material}
    >
      <planeGeometry />
    </mesh>
  );
}
