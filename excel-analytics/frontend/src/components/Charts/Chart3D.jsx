import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function Chart3D({ data, xKey, yKey }) {
  const ref = useRef();

  useEffect(() => {
    if (!data?.length || !xKey || !yKey || !data[0][xKey] || !data[0][yKey] || !ref.current) return;

    const width = 400;
    const height = 400;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width, height);
    ref.current.appendChild(renderer.domElement);

    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(0, 5, 5);
    scene.add(light);

    const material = new THREE.MeshStandardMaterial({ color: 0x3b82f6 });

    data.forEach((d, i) => {
      const yValue = d[yKey];
      if (typeof yValue !== "number") return;

      const heightValue = yValue / 10;
      const cube = new THREE.Mesh(new THREE.BoxGeometry(0.2, heightValue, 0.2), material);
      cube.position.x = i * 0.5;
      cube.position.y = heightValue / 2;
      scene.add(cube);
    });

    const animate = () => {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };

    animate();

    return () => {
      renderer.dispose();
      if (ref.current.contains(renderer.domElement)) {
        ref.current.removeChild(renderer.domElement);
      }
    };
  }, [data, xKey, yKey]);

  return <div ref={ref} style={{ width: "400px", height: "400px" }} />;
}
