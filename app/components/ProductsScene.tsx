"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";
import { RoundedBoxGeometry } from "three/examples/jsm/geometries/RoundedBoxGeometry.js";
import gsap from "gsap";

interface ProductsSceneProps {
  activeIndex: number;
}

const PRODUCT_COLORS = [
  { primary: "#0071e3", accent: "#2997ff", bg: "#eaf2ff" }, // EfeERP - Deep iOS Blue
  { primary: "#ff2d55", accent: "#ff6482", bg: "#ffeef2" }, // EfeCRM - Ruby Pink
  { primary: "#30d158", accent: "#63e6be", bg: "#eafcf1" }, // EfePOS - Emerald Mint
  { primary: "#af52de", accent: "#da8fff", bg: "#f7eeff" }, // EfeHR - Royal Purple
];

export default function ProductsScene({ activeIndex }: ProductsSceneProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const targetIndexRef = useRef(activeIndex);
  targetIndexRef.current = activeIndex;

  const animState = useRef({
    lerpIndex: activeIndex,
    rotationSpeed: 0.6,
  });

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
    renderer.toneMapping = THREE.NeutralToneMapping;
    renderer.toneMappingExposure = 1.15;
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 100);
    camera.position.set(0, 0, 7.5);

    const pmrem = new THREE.PMREMGenerator(renderer);
    const room = new RoomEnvironment();
    const envTex = pmrem.fromScene(room, 0.04).texture;
    scene.environment = envTex;

    // Lights
    const key = new THREE.DirectionalLight(0xffffff, 2.2);
    key.position.set(4, 6, 5);
    scene.add(key);

    const fill = new THREE.DirectionalLight(0xbad4ff, 1.4);
    fill.position.set(-5, -3, -3);
    scene.add(fill);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    // Glass Material Generator
    const createGlass = (color: string) => {
      return new THREE.MeshPhysicalMaterial({
        color: new THREE.Color(color),
        metalness: 0.05,
        roughness: 0.08,
        transmission: 0.95,
        thickness: 1.8,
        ior: 1.5,
        dispersion: 0.6,
        iridescence: 0.85,
        iridescenceIOR: 1.3,
        iridescenceThicknessRange: [100, 600],
        clearcoat: 1,
        clearcoatRoughness: 0.05,
        attenuationColor: new THREE.Color(color),
        attenuationDistance: 2.5,
      });
    };

    // Chrome/Metallic Accent Material
    const metalMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      metalness: 0.95,
      roughness: 0.12,
    });

    // 4 Distinct 3D Artifacts
    const artifacts: THREE.Group[] = [];

    // Artifact 0: EfeERP Prism (Faceted Octahedron inside Gyro Rings)
    const g0 = new THREE.Group();
    const octGeo = new THREE.OctahedronGeometry(1.4, 0);
    const m0 = new THREE.Mesh(octGeo, createGlass("#0071e3"));
    g0.add(m0);
    const ring0Geo = new THREE.TorusGeometry(1.9, 0.06, 24, 80);
    const ring0 = new THREE.Mesh(ring0Geo, metalMat);
    g0.add(ring0);
    artifacts.push(g0);
    scene.add(g0);

    // Artifact 1: EfeCRM Torus Knot (Flowing customer loop)
    const g1 = new THREE.Group();
    const knotGeo = new THREE.TorusKnotGeometry(1.05, 0.32, 128, 32, 2, 3);
    const m1 = new THREE.Mesh(knotGeo, createGlass("#ff2d55"));
    g1.add(m1);
    artifacts.push(g1);
    scene.add(g1);

    // Artifact 2: EfePOS Rounded Vault Box + Floating Coin
    const g2 = new THREE.Group();
    const boxGeo = new RoundedBoxGeometry(1.6, 1.6, 1.6, 6, 0.28);
    const m2 = new THREE.Mesh(boxGeo, createGlass("#30d158"));
    g2.add(m2);
    const coinGeo = new THREE.CylinderGeometry(0.55, 0.55, 0.08, 48);
    const coin = new THREE.Mesh(coinGeo, metalMat);
    coin.rotation.x = Math.PI / 3;
    coin.position.set(0.9, 0.8, 0.9);
    g2.add(coin);
    artifacts.push(g2);
    scene.add(g2);

    // Artifact 3: EfeHR Nested Biomorphic Spheres + Halo
    const g3 = new THREE.Group();
    const sphereOuterGeo = new THREE.IcosahedronGeometry(1.3, 3);
    const m3 = new THREE.Mesh(sphereOuterGeo, createGlass("#af52de"));
    g3.add(m3);
    const sphereInnerGeo = new THREE.SphereGeometry(0.68, 32, 32);
    const innerBall = new THREE.Mesh(
      sphereInnerGeo,
      new THREE.MeshStandardMaterial({
        color: 0xffffff,
        metalness: 0.3,
        roughness: 0.1,
        emissive: 0xd896ff,
        emissiveIntensity: 0.35,
      })
    );
    g3.add(innerBall);
    const haloGeo = new THREE.TorusGeometry(2.1, 0.04, 16, 100);
    const halo = new THREE.Mesh(haloGeo, metalMat);
    halo.rotation.x = Math.PI / 2.3;
    g3.add(halo);
    artifacts.push(g3);
    scene.add(g3);

    // Layout
    const layout = () => {
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      if (w === 0 || h === 0) return;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    layout();
    const ro = new ResizeObserver(layout);
    ro.observe(mount);

    // Pointer interaction for subtle tilt
    const pointer = { x: 0, y: 0, tx: 0, ty: 0 };
    const onPointer = (e: PointerEvent) => {
      const rect = mount.getBoundingClientRect();
      pointer.tx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      pointer.ty = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
    };
    mount.addEventListener("pointermove", onPointer, { passive: true });

    // Render loop
    const clock = new THREE.Clock();
    let running = false;

    const render = () => {
      const dt = Math.min(clock.getDelta(), 0.05);
      const t = clock.elapsedTime;
      const motion = reduced ? 0 : 1;

      pointer.x += (pointer.tx - pointer.x) * 0.08;
      pointer.y += (pointer.ty - pointer.y) * 0.08;

      const target = targetIndexRef.current;
      animState.current.lerpIndex += (target - animState.current.lerpIndex) * 0.08;
      const currentVal = animState.current.lerpIndex;

      // Update artifacts visibility, scale, rotation and position based on active index
      artifacts.forEach((art, idx) => {
        const dist = Math.abs(currentVal - idx);
        const isActive = dist < 0.99;
        art.visible = isActive;

        if (isActive) {
          const factor = Math.max(0, 1 - dist);
          const scale = THREE.MathUtils.lerp(0.3, 1, factor);
          art.scale.setScalar(scale);

          // Position offset: smooth slide along Y / Z
          const offset = (idx - currentVal) * 3.5;
          art.position.y = -offset * 0.5 + Math.sin(t * 1.2 + idx) * 0.08 * motion;
          art.position.x = pointer.x * 0.35;
          art.position.z = -Math.abs(offset) * 1.5;

          // Rotation
          art.rotation.y = t * 0.4 * motion + pointer.x * 0.4 + idx * 1.5;
          art.rotation.x = 0.2 + pointer.y * 0.35 + Math.sin(t * 0.5) * 0.1 * motion;
          art.rotation.z = Math.cos(t * 0.3) * 0.08 * motion;

          // Specific internal rotations
          if (idx === 0) {
            ring0.rotation.x = t * 0.7 * motion;
            ring0.rotation.y = t * 0.5 * motion;
          } else if (idx === 2) {
            coin.rotation.y = t * 1.5 * motion;
          } else if (idx === 3) {
            halo.rotation.z = t * 0.8 * motion;
          }
        }
      });

      renderer.render(scene, camera);
    };

    const start = () => {
      if (running) return;
      running = true;
      clock.getDelta();
      renderer.setAnimationLoop(render);
    };
    const stop = () => {
      running = false;
      renderer.setAnimationLoop(null);
    };

    const io = new IntersectionObserver(
      ([entry]) => (entry.isIntersecting ? start() : stop()),
      { threshold: 0 }
    );
    io.observe(mount);

    return () => {
      stop();
      io.disconnect();
      ro.disconnect();
      mount.removeEventListener("pointermove", onPointer);

      scene.traverse((obj) => {
        if (obj instanceof THREE.Mesh) {
          obj.geometry.dispose();
          const mats = Array.isArray(obj.material) ? obj.material : [obj.material];
          mats.forEach((m) => m.dispose());
        }
      });
      envTex.dispose();
      pmrem.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, []);

  return <div ref={mountRef} className="products__canvas" aria-hidden />;
}
