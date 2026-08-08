import { Canvas } from '@react-three/fiber';
import * as THREE from 'three/webgpu';

import { PostProcessing } from './PostProcessing';
import { ShaderScene } from './ShaderScene';

/**
 * Hosts the WebGPU sculpture and its node-based post-processing pipeline.
 */
export function HeroCanvas(): React.JSX.Element {
  return (
    <div className="hero-canvas" aria-label="Interactive sculpture">
      <Canvas
        flat
        camera={{ position: [0, 0, 1], fov: 50 }}
        gl={async (rendererProps) => {
          const renderer = new THREE.WebGPURenderer({
            // The Canvas host always provides an HTML canvas in this browser build.
            canvas: rendererProps.canvas as HTMLCanvasElement,
            alpha: true,
            antialias: true,
          });
          renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
          await renderer.init();
          return renderer;
        }}
      >
        <PostProcessing />
        <ShaderScene />
      </Canvas>
    </div>
  );
}
