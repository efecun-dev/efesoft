"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";
import { RoundedBoxGeometry } from "three/examples/jsm/geometries/RoundedBoxGeometry.js";

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

    let cleanupScene: (() => void) | null = null;
    const initRaf = requestAnimationFrame(() => {
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      const canvas = document.createElement("canvas");
      const glOpts: WebGLContextAttributes = {
        alpha: true,
        antialias: true,
        powerPreference: "high-performance",
      };
      const gl =
        (canvas.getContext("webgl2", glOpts) as WebGLRenderingContext | null) ||
        (canvas.getContext("webgl", glOpts) as WebGLRenderingContext | null);
      if (!gl) return;

      let renderer: THREE.WebGLRenderer;
      try {
        renderer = new THREE.WebGLRenderer({
          canvas,
          context: gl,
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        });
      } catch {
        return;
      }
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
      renderer.toneMapping = THREE.NeutralToneMapping;
      renderer.toneMappingExposure = 1.18;
      renderer.setClearColor(0x000000, 0);
      mount.appendChild(renderer.domElement);

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(36, 1, 0.1, 100);
      camera.position.set(0, 0, 7.6);

      const pmrem = new THREE.PMREMGenerator(renderer);
      const room = new RoomEnvironment();
      const envTex = pmrem.fromScene(room, 0.04).texture;
      room.dispose();
      scene.environment = envTex;

    // Lights
    const key = new THREE.DirectionalLight(0xffffff, 2.4);
    key.position.set(4, 6, 5);
    scene.add(key);

    const fill = new THREE.DirectionalLight(0xbad4ff, 1.5);
    fill.position.set(-5, -3, -3);
    scene.add(fill);

    const dynamicLight = new THREE.PointLight(0x0071e3, 3.8, 12);
    dynamicLight.position.set(0, 0, 2.5);
    scene.add(dynamicLight);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.85);
    scene.add(ambientLight);

    // Glass Material Generator
    const createGlass = (color: string) => {
      return new THREE.MeshPhysicalMaterial({
        color: new THREE.Color(color),
        metalness: 0.04,
        roughness: 0.06,
        transmission: 0.96,
        thickness: 1.9,
        ior: 1.52,
        dispersion: 0.68,
        iridescence: 0.9,
        iridescenceIOR: 1.32,
        iridescenceThicknessRange: [120, 640],
        clearcoat: 1,
        clearcoatRoughness: 0.04,
        attenuationColor: new THREE.Color(color),
        attenuationDistance: 2.4,
      });
    };

    // Chrome/Metallic Accent Material
    const metalMat = new THREE.MeshPhysicalMaterial({
      color: 0xf8fafc,
      metalness: 0.94,
      roughness: 0.12,
      clearcoat: 1,
      iridescence: 0.45,
    });

    // Glowing Inner Core Material Generator
    const createCoreMat = (color: string) =>
      new THREE.MeshStandardMaterial({
        color: 0xffffff,
        emissive: new THREE.Color(color),
        emissiveIntensity: 0.65,
        roughness: 0.15,
        metalness: 0.2,
      });

    // 4 Distinct Multi-Part 3D Sculptural Artifacts
    const artifacts: THREE.Group[] = [];

    // Artifact 0: EfeERP Prism (Faceted Octahedron + Inner Glowing Core + Dual Gyro Rings + Data Satellites)
    const g0 = new THREE.Group();
    const octGeo = new THREE.OctahedronGeometry(1.38, 0);
    const m0 = new THREE.Mesh(octGeo, createGlass("#0071e3"));
    g0.add(m0);
    const core0 = new THREE.Mesh(new THREE.OctahedronGeometry(0.55, 1), createCoreMat("#2997ff"));
    g0.add(core0);
    const ring0A = new THREE.Mesh(new THREE.TorusGeometry(1.88, 0.045, 24, 96), metalMat);
    const ring0B = new THREE.Mesh(new THREE.TorusGeometry(2.18, 0.025, 20, 96), metalMat);
    ring0B.rotation.x = Math.PI / 2.4;
    g0.add(ring0A, ring0B);
    const sat0A = new THREE.Mesh(new THREE.SphereGeometry(0.14, 24, 24), createCoreMat("#0071e3"));
    sat0A.position.set(1.88, 0, 0);
    ring0A.add(sat0A);
    artifacts.push(g0);
    scene.add(g0);

    // Artifact 1: EfeCRM Torus Knot + Orbiting Omni-Channel Nodes + Glass Halo
    const g1 = new THREE.Group();
    const knotGeo = new THREE.TorusKnotGeometry(1.02, 0.3, 140, 36, 2, 3);
    const m1 = new THREE.Mesh(knotGeo, createGlass("#ff2d55"));
    g1.add(m1);
    const crmOrbitGroup = new THREE.Group();
    const crmRing = new THREE.Mesh(new THREE.TorusGeometry(1.95, 0.03, 20, 96), metalMat);
    crmRing.rotation.x = Math.PI / 3;
    crmOrbitGroup.add(crmRing);
    for (let i = 0; i < 3; i++) {
      const a = (i / 3) * Math.PI * 2;
      const orb = new THREE.Mesh(
        new THREE.SphereGeometry(0.18, 32, 32),
        createCoreMat("#ff2d55")
      );
      orb.position.set(Math.cos(a) * 1.95, Math.sin(a) * 1.95, 0);
      crmRing.add(orb);
    }
    g1.add(crmOrbitGroup);
    artifacts.push(g1);
    scene.add(g1);

    // Artifact 2: EfePOS Rounded Vault Cube + Levitating Contactless Rings & Metallic Coin
    const g2 = new THREE.Group();
    const boxGeo = new RoundedBoxGeometry(1.55, 1.55, 1.55, 6, 0.28);
    const m2 = new THREE.Mesh(boxGeo, createGlass("#30d158"));
    g2.add(m2);
    const posCore = new THREE.Mesh(
      new RoundedBoxGeometry(0.68, 0.68, 0.68, 4, 0.14),
      createCoreMat("#30d158")
    );
    g2.add(posCore);
    const coinGeo = new THREE.CylinderGeometry(0.52, 0.52, 0.08, 48);
    const coin = new THREE.Mesh(coinGeo, metalMat);
    coin.rotation.x = Math.PI / 3;
    coin.position.set(1.05, 0.9, 0.95);
    g2.add(coin);
    const waveRing = new THREE.Mesh(new THREE.TorusGeometry(1.9, 0.035, 20, 96), metalMat);
    waveRing.rotation.x = -Math.PI / 3;
    waveRing.rotation.y = Math.PI / 6;
    g2.add(waveRing);
    artifacts.push(g2);
    scene.add(g2);

    // Artifact 3: EfeHR Nested Biomorphic Spheres + Dual Saturn Halos + Orbiting Pearls
    const g3 = new THREE.Group();
    const sphereOuterGeo = new THREE.IcosahedronGeometry(1.3, 4);
    const m3 = new THREE.Mesh(sphereOuterGeo, createGlass("#af52de"));
    g3.add(m3);
    const innerBall = new THREE.Mesh(
      new THREE.SphereGeometry(0.65, 32, 32),
      createCoreMat("#da8fff")
    );
    g3.add(innerBall);
    const haloGeo = new THREE.TorusGeometry(2.05, 0.04, 20, 100);
    const halo = new THREE.Mesh(haloGeo, metalMat);
    halo.rotation.x = Math.PI / 2.3;
    g3.add(halo);
    const halo2 = new THREE.Mesh(new THREE.TorusGeometry(1.75, 0.025, 16, 90), metalMat);
    halo2.rotation.y = Math.PI / 2.6;
    g3.add(halo2);
    artifacts.push(g3);
    scene.add(g3);

    // Subtle floating pedestal ring under active artifact
    const pedestalGeo = new THREE.RingGeometry(1.2, 1.24, 64);
    const pedestalMat = new THREE.MeshBasicMaterial({
      color: 0x0071e3,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.22,
    });
    const pedestal = new THREE.Mesh(pedestalGeo, pedestalMat);
    pedestal.rotation.x = Math.PI / 2;
    pedestal.position.y = -2.15;
    scene.add(pedestal);

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

    // Pointer interaction for subtle 3D tilt
    const pointer = { x: 0, y: 0, tx: 0, ty: 0 };
    const onPointer = (e: PointerEvent) => {
      const rect = mount.getBoundingClientRect();
      pointer.tx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      pointer.ty = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
    };
    mount.addEventListener("pointermove", onPointer, { passive: true });

    // Render loop
    let lastTime = performance.now();
    const startTime = performance.now();
    let running = false;
    const targetColor = new THREE.Color(PRODUCT_COLORS[0].primary);

    const render = () => {
      const now = performance.now();
      const t = (now - startTime) / 1000;
      lastTime = now;
      const motion = reduced ? 0 : 1;

      pointer.x += (pointer.tx - pointer.x) * 0.08;
      pointer.y += (pointer.ty - pointer.y) * 0.08;

      const target = targetIndexRef.current;
      animState.current.lerpIndex += (target - animState.current.lerpIndex) * 0.08;
      const currentVal = animState.current.lerpIndex;

      // Smoothly transition dynamic point light color
      targetColor.set(PRODUCT_COLORS[target]?.primary ?? "#0071e3");
      dynamicLight.color.lerp(targetColor, 0.06);
      pedestalMat.color.lerp(targetColor, 0.06);
      pedestal.scale.setScalar(1 + Math.sin(t * 2) * 0.04 * motion);

      // Update artifacts visibility, scale, rotation and position based on active index
      artifacts.forEach((art, idx) => {
        const dist = Math.abs(currentVal - idx);
        const isActive = dist < 0.99;
        art.visible = isActive;

        if (isActive) {
          const factor = Math.max(0, 1 - dist);
          const scale = THREE.MathUtils.lerp(0.25, 1, factor);
          art.scale.setScalar(scale);

          // Position offset: smooth slide along Y / Z
          const offset = (idx - currentVal) * 3.6;
          art.position.y = -offset * 0.55 + Math.sin(t * 1.3 + idx) * 0.09 * motion;
          art.position.x = pointer.x * 0.4;
          art.position.z = -Math.abs(offset) * 1.6;

          // Rotation
          art.rotation.y = t * 0.42 * motion + pointer.x * 0.5 + idx * 1.5;
          art.rotation.x = 0.2 + pointer.y * 0.4 + Math.sin(t * 0.55) * 0.1 * motion;
          art.rotation.z = Math.cos(t * 0.35) * 0.08 * motion;

          // Specific internal choreography per artifact
          if (idx === 0) {
            ring0A.rotation.x = t * 0.75 * motion;
            ring0A.rotation.y = t * 0.5 * motion;
            ring0B.rotation.z = -t * 0.6 * motion;
            core0.rotation.y = -t * 1.1 * motion;
          } else if (idx === 1) {
            crmOrbitGroup.rotation.z = t * 0.65 * motion;
            crmOrbitGroup.rotation.x = Math.sin(t * 0.5) * 0.3 * motion;
          } else if (idx === 2) {
            coin.rotation.y = t * 1.6 * motion;
            coin.position.y = 0.9 + Math.sin(t * 2.2) * 0.1 * motion;
            waveRing.rotation.z = -t * 0.55 * motion;
            posCore.rotation.x = -t * 0.8 * motion;
          } else if (idx === 3) {
            halo.rotation.z = t * 0.85 * motion;
            halo2.rotation.x = -t * 0.65 * motion;
            innerBall.scale.setScalar(1 + Math.sin(t * 2.5) * 0.08 * motion);
          }
        }
      });

      renderer.render(scene, camera);
    };

    const start = () => {
      if (running) return;
      running = true;
      lastTime = performance.now();
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

    cleanupScene = () => {
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
    });

    return () => {
      cancelAnimationFrame(initRaf);
      cleanupScene?.();
    };
  }, []);

  return <div ref={mountRef} className="products__canvas" aria-hidden />;
}
