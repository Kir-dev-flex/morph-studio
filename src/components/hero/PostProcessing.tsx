import { useFrame, useThree } from '@react-three/fiber';
import { useMemo } from 'react';
import * as THREE from 'three/webgpu';
import { bloom } from 'three/examples/jsm/tsl/display/BloomNode.js';
import {
  abs,
  add,
  float,
  mix,
  oneMinus,
  pass,
  smoothstep,
  uniform,
  uv,
  vec3,
} from 'three/tsl';

export interface PostProcessingProps {
  strength?: number;
  threshold?: number;
}

/**
 * Applies the red scan highlight and restrained bloom to the hero scene.
 */
export function PostProcessing({
  strength = 0.82,
  threshold = 0.88,
}: PostProcessingProps): null {
  const { camera, gl, scene } = useThree();
  const pipeline = useMemo(() => {
    // React Three Fiber types expose the common renderer surface; this scene
    // is initialized with WebGPURenderer in HeroCanvas.
    const renderer = gl as unknown as THREE.WebGPURenderer;
    const postProcessing = new THREE.RenderPipeline(renderer);
    const scenePass = pass(scene, camera);
    const sceneColor = scenePass.getTextureNode('output');
    const bloomPass = bloom(sceneColor, strength, 0.45, threshold);
    const scanProgress = uniform(0);
    const scanDistance = abs(uv().y.sub(float(scanProgress)));
    const scanMask = oneMinus(smoothstep(0, 0.045, scanDistance));
    const effectMask = smoothstep(0.96, 1, scanMask);
    const redOverlay = vec3(1, 0.018, 0).mul(effectMask).mul(0.28);
    const scannedScene = mix(sceneColor, add(sceneColor, redOverlay), effectMask);

    postProcessing.outputNode = scannedScene.add(bloomPass);

    return { postProcessing, scanProgress };
  }, [camera, gl, scene, strength, threshold]);

  useFrame(({ clock }) => {
    pipeline.scanProgress.value = Math.sin(clock.getElapsedTime() * 0.48) * 0.5 + 0.5;
    pipeline.postProcessing.render();
  }, 1);

  return null;
}
