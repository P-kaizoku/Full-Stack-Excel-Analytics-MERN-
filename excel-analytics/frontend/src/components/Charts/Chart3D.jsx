import { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

export default function Chart3D({ data, xKey, yKey }) {
  const ref = useRef();

  useEffect(() => {
    const mount = ref.current;
    if (
      !mount ||
      !data?.length ||
      !xKey ||
      !yKey ||
      typeof data[0][xKey] === "undefined" ||
      typeof data[0][yKey] === "undefined"
    )
      return;

    const width = 600;
    const height = 500;

    // Setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf0f0f0);

    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
    camera.position.set(5, 5, 5);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width, height);
    mount.innerHTML = ""; // clear previous render
    mount.appendChild(renderer.domElement);

    // Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.enableZoom = true;
    controls.minDistance = 2;
    controls.maxDistance = 20;

    // Lights
    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(2, 5, 5);
    scene.add(light);
    scene.add(new THREE.AmbientLight(0x404040));

    // Grid
    scene.add(new THREE.GridHelper(10, 10));

    // Normalize and slice data
    const yValues = data.map((d) => Number(d[yKey])).filter((n) => !isNaN(n));
    const maxY = Math.max(...yValues, 1);
    const barSpacing = 0.6;
    const maxBars = Math.floor(10 / barSpacing);
    const barsToRender = data.slice(0, maxBars);

    const material = new THREE.MeshStandardMaterial({ color: 0x3b82f6 });

    barsToRender.forEach((d, i) => {
      const yVal = Number(d[yKey]);
      if (isNaN(yVal)) return;

      const heightVal = (yVal / maxY) * 3;
      const cube = new THREE.Mesh(
        new THREE.BoxGeometry(0.4, heightVal, 0.4),
        material
      );

      cube.position.x = i * barSpacing - (barsToRender.length * barSpacing) / 2;
      cube.position.y = heightVal / 2;
      cube.position.z = 0;

      scene.add(cube);
    });

    // Animate with user interactivity
    const animate = () => {
      requestAnimationFrame(animate);
      controls.update(); // required for damping
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      controls.dispose();
      renderer.dispose();
      while (mount.firstChild) {
        mount.removeChild(mount.firstChild);
      }
    };
  }, [data, xKey, yKey]);

  return (
    <div
      ref={ref}
      style={{ width: "100%", height: "400px", overflow: "hidden" }}
    />
  );
}
