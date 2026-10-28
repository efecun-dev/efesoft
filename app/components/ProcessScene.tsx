"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";

interface ProcessSceneProps {
  progress: number; // 0 to 1
  activeStep: number; // 0 to 3
}

export default function ProcessScene({ progress, activeStep }: ProcessSceneProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef(progress);
  progressRef.current = progress;

  const activeStepRef = useRef(activeStep);
  activeStepRef.current = activeStep;

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    let cleanupScene: (() => void) | null = null;
    const initRaf = requestAnimationFrame(() => {
      const canvasEl = document.createElement("canvas");
      const glOpts: WebGLContextAttributes = {
        alpha: true,
        antialias: true,
        powerPreference: "high-performance",
      };
      const gl =
        (canvasEl.getContext("webgl2", glOpts) as WebGLRenderingContext | null) ||
        (canvasEl.getContext("webgl", glOpts) as WebGLRenderingContext | null);
      if (!gl) return;

      // WebGL Renderer with neutral tone mapping and transparent canvas
      let renderer: THREE.WebGLRenderer;
      try {
        renderer = new THREE.WebGLRenderer({
          canvas: canvasEl,
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
      renderer.toneMappingExposure = 1.35;
      renderer.setClearColor(0x000000, 0);
      mount.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(36, 1, 0.1, 100);
    // Camera positioned for a perfect isometric view of the workstation
    camera.position.set(0, 0.4, 7.8);

    // Environment Lighting
    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    pmremGenerator.compileEquirectangularShader();
    const envScene = new RoomEnvironment();
    const envTex = pmremGenerator.fromScene(envScene, 0.04).texture;
    scene.environment = envTex;
    envScene.dispose();

    // Scene Lights
    const ambLight = new THREE.AmbientLight(0xffffff, 0.85);
    scene.add(ambLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 2.4);
    keyLight.position.set(5, 8, 6);
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0x0071e3, 3.2);
    rimLight.position.set(-6, -2, -4);
    scene.add(rimLight);

    // Dynamic Step Accent Light
    const stepLight = new THREE.PointLight(0x0071e3, 4.5, 12);
    stepLight.position.set(0, 0.5, 2.5);
    scene.add(stepLight);

    // Main Rig Group (stays centered in viewport, rotates cleanly)
    const rig = new THREE.Group();
    scene.add(rig);

    /* =========================================================================
       1. FUTURISTIC STUDIO WORKSTATION & ALL-IN-ONE RETINA DISPLAY
       ========================================================================= */
    const compGroup = new THREE.Group();
    rig.add(compGroup);

    // Display Chassis (Slim Aluminum Back Housing)
    const screenWidth = 3.6;
    const screenHeight = 2.25;
    const screenDepth = 0.12;

    const chassisGeo = new THREE.BoxGeometry(screenWidth, screenHeight, screenDepth);
    const chassisMat = new THREE.MeshPhysicalMaterial({
      color: 0x161b26,
      metalness: 0.92,
      roughness: 0.18,
      clearcoat: 0.4,
      clearcoatRoughness: 0.1,
    });
    const chassisMesh = new THREE.Mesh(chassisGeo, chassisMat);
    chassisMesh.position.set(0, 0.6, 0);
    compGroup.add(chassisMesh);

    // Bezel Border (Ultra-thin Anodized Aluminum Frame)
    const bezelGeo = new THREE.BoxGeometry(screenWidth + 0.05, screenHeight + 0.05, 0.06);
    const bezelMat = new THREE.MeshStandardMaterial({
      color: 0x242a38,
      metalness: 0.95,
      roughness: 0.15,
    });
    const bezelMesh = new THREE.Mesh(bezelGeo, bezelMat);
    bezelMesh.position.set(0, 0.6, screenDepth / 2 + 0.01);
    compGroup.add(bezelMesh);

    // Glass Screen Display Surface
    const screenGeo = new THREE.PlaneGeometry(screenWidth - 0.08, screenHeight - 0.08);
    const screenMat = new THREE.MeshPhysicalMaterial({
      color: 0x070b14,
      emissive: 0x0071e3,
      emissiveIntensity: 0.35,
      metalness: 0.1,
      roughness: 0.05,
      transmission: 0.1,
      clearcoat: 1.0,
      clearcoatRoughness: 0.05,
    });
    const screenMesh = new THREE.Mesh(screenGeo, screenMat);
    screenMesh.position.set(0, 0.6, screenDepth / 2 + 0.045);
    compGroup.add(screenMesh);

    // Dynamic High-Tech Canvas Texture for Screen Dashboard
    const canvas = document.createElement("canvas");
    canvas.width = 512;
    canvas.height = 320;
    const ctx = canvas.getContext("2d")!;

    const screenTex = new THREE.CanvasTexture(canvas);
    screenTex.minFilter = THREE.LinearFilter;
    screenMat.map = screenTex;
    screenMat.emissiveMap = screenTex;

    const drawDashboard = (step: number, time: number) => {
      ctx.fillStyle = "#090d18";
      ctx.fillRect(0, 0, 512, 320);

      // Top UI Bar
      ctx.fillStyle = "#161d2d";
      ctx.fillRect(0, 0, 512, 36);

      // Status Dots
      ctx.fillStyle = "#ff5f56";
      ctx.beginPath();
      ctx.arc(20, 18, 5, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = "#ffbd2e";
      ctx.beginPath();
      ctx.arc(36, 18, 5, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = "#27c93f";
      ctx.beginPath();
      ctx.arc(52, 18, 5, 0, Math.PI * 2);
      ctx.fill();

      // Header Text
      ctx.font = "bold 13px 'SF Pro Display', sans-serif";
      ctx.fillStyle = "#8da2c0";
      ctx.fillText("EfeFlow OS · v2.4 Enterprise Architecture Console", 75, 22);

      // Main UI Grid
      const stepThemes = [
        { title: "DATA INGESTION BUS", color: "#0071e3", metric: "SAP & LOGO · REST/gRPC" },
        { title: "EFEFLOW ENGINE CORE", color: "#9a5cf5", metric: "128 CORES · <120ms LATENCY" },
        { title: "DEVSECOPS HSM SHIELD", color: "#10b981", metric: "AES-256 VAULT · TLS 1.3" },
        { title: "AUTONOMOUS CLOUD SYNC", color: "#00a2ff", metric: "99.98% UPTIME · MULTI-DC" },
      ];
      const cur = stepThemes[step] || stepThemes[0];

      // Left Panel: Architecture Node Tree
      ctx.fillStyle = "#111726";
      ctx.beginPath();
      ctx.roundRect(16, 48, 220, 256, 10);
      ctx.fill();

      ctx.font = "bold 12px sans-serif";
      ctx.fillStyle = cur.color;
      ctx.fillText(cur.title, 28, 72);

      ctx.font = "11px monospace";
      ctx.fillStyle = "#71829e";
      ctx.fillText(cur.metric, 28, 92);

      // Pipeline Graph Nodes
      for (let i = 0; i < 4; i++) {
        const yN = 120 + i * 38;
        ctx.fillStyle = i === step ? `${cur.color}33` : "#182133";
        ctx.beginPath();
        ctx.roundRect(28, yN, 196, 30, 6);
        ctx.fill();

        ctx.fillStyle = i === step ? cur.color : "#94a3b8";
        ctx.font = "bold 11px sans-serif";
        const nodeLabels = ["01 Data Mapping", "02 Queue Validation", "03 Crypto Vault", "04 Cloud Synchronize"];
        ctx.fillText(nodeLabels[i], 42, yN + 19);

        // Active Indicator Dot
        if (i === step) {
          ctx.beginPath();
          ctx.arc(206, yN + 15, 4, 0, Math.PI * 2);
          ctx.fillStyle = cur.color;
          ctx.fill();
        }
      }

      // Right Panel: Live Waveform / Telemetry Graph
      ctx.fillStyle = "#111726";
      ctx.beginPath();
      ctx.roundRect(250, 48, 246, 256, 10);
      ctx.fill();

      ctx.font = "bold 11px sans-serif";
      ctx.fillStyle = "#94a3b8";
      ctx.fillText("LIVE SYSTEM TELEMETRY", 264, 72);

      // Sine Waveform
      ctx.strokeStyle = cur.color;
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      for (let x = 0; x < 218; x += 3) {
        const y = 140 + Math.sin(x * 0.05 + time * 3) * 28 + Math.cos(x * 0.02 - time) * 12;
        if (x === 0) ctx.moveTo(264 + x, y);
        else ctx.lineTo(264 + x, y);
      }
      ctx.stroke();

      // Stat Readouts
      ctx.fillStyle = "#182133";
      ctx.beginPath();
      ctx.roundRect(264, 210, 100, 78, 8);
      ctx.fill();
      ctx.beginPath();
      ctx.roundRect(380, 210, 100, 78, 8);
      ctx.fill();

      ctx.fillStyle = "#71829e";
      ctx.font = "9px sans-serif";
      ctx.fillText("THROUGHPUT", 274, 230);
      ctx.fillText("RELIABILITY", 390, 230);

      ctx.fillStyle = "#ffffff";
      ctx.font = "bold 16px sans-serif";
      ctx.fillText("50k/s", 274, 256);
      ctx.fillText("99.98%", 390, 256);

      screenTex.needsUpdate = true;
    };

    // Cantilever Display Stand (Polished Chrome / Titanium)
    const standMat = new THREE.MeshStandardMaterial({
      color: 0x8a95a8,
      metalness: 0.96,
      roughness: 0.12,
    });
    const standArmGeo = new THREE.BoxGeometry(0.35, 1.4, 0.1);
    const standArm = new THREE.Mesh(standArmGeo, standMat);
    standArm.position.set(0, -0.2, -0.15);
    standArm.rotation.x = 0.14;
    compGroup.add(standArm);

    // Stand Base Plate
    const standBaseGeo = new THREE.CylinderGeometry(0.7, 0.75, 0.06, 32);
    const standBase = new THREE.Mesh(standBaseGeo, standMat);
    standBase.position.set(0, -0.85, 0.2);
    compGroup.add(standBase);

    // Keyboard / Workstation Deck
    const deckGeo = new THREE.BoxGeometry(2.6, 0.06, 1.1);
    const deckMat = new THREE.MeshStandardMaterial({
      color: 0x1b2230,
      metalness: 0.88,
      roughness: 0.22,
    });
    const deck = new THREE.Mesh(deckGeo, deckMat);
    deck.position.set(0, -0.84, 1.35);
    deck.rotation.x = 0.04;
    compGroup.add(deck);

    // Illuminated Glass Trackpad
    const padGeo = new THREE.PlaneGeometry(0.9, 0.55);
    const padMat = new THREE.MeshPhysicalMaterial({
      color: 0x0071e3,
      metalness: 0.2,
      roughness: 0.08,
      transmission: 0.5,
      transparent: true,
      opacity: 0.6,
    });
    const pad = new THREE.Mesh(padGeo, padMat);
    pad.rotation.x = -Math.PI / 2 + 0.04;
    pad.position.set(0, -0.805, 1.62);
    compGroup.add(pad);

    /* =========================================================================
       2. FLOATING HOLOGRAPHIC ARCHITECTURE RINGS & CHIP CORE
       ========================================================================= */
    // Holographic Quantum CPU Core floating above the keyboard base
    const chipGeo = new THREE.BoxGeometry(0.45, 0.12, 0.45);
    const chipMat = new THREE.MeshStandardMaterial({
      color: 0x0d121d,
      metalness: 0.9,
      roughness: 0.2,
      emissive: 0x0071e3,
      emissiveIntensity: 0.8,
    });
    const chipMesh = new THREE.Mesh(chipGeo, chipMat);
    chipMesh.position.set(0, -0.4, 0.9);
    rig.add(chipMesh);

    // Concentric Gimbal Holographic Rings
    const ringMat1 = new THREE.MeshBasicMaterial({
      color: 0x0071e3,
      transparent: true,
      opacity: 0.5,
    });
    const ringGeo1 = new THREE.TorusGeometry(2.4, 0.015, 16, 64);
    const ring1 = new THREE.Mesh(ringGeo1, ringMat1);
    ring1.position.set(0, 0.4, 0);
    rig.add(ring1);

    const ringMat2 = new THREE.MeshBasicMaterial({
      color: 0x9a5cf5,
      transparent: true,
      opacity: 0.4,
    });
    const ringGeo2 = new THREE.TorusGeometry(2.65, 0.012, 16, 64);
    const ring2 = new THREE.Mesh(ringGeo2, ringMat2);
    ring2.position.set(0, 0.4, 0);
    ring2.rotation.x = Math.PI / 3;
    rig.add(ring2);

    /* =========================================================================
       3. DEVSECOPS GEODESIC SECURITY FORCEFIELD (STEP 3)
       ========================================================================= */
    const shieldGroup = new THREE.Group();
    rig.add(shieldGroup);

    const shieldGeo = new THREE.IcosahedronGeometry(2.7, 1);
    const shieldMat = new THREE.MeshBasicMaterial({
      color: 0x10b981,
      wireframe: true,
      transparent: true,
      opacity: 0.12,
    });
    const shieldMesh = new THREE.Mesh(shieldGeo, shieldMat);
    shieldMesh.position.set(0, 0.4, 0);
    shieldGroup.add(shieldMesh);

    /* =========================================================================
       4. SATELLITE CLOUD NODES & SKYWARD UPLINK BEAM (STEP 4)
       ========================================================================= */
    const cloudGroup = new THREE.Group();
    rig.add(cloudGroup);

    const satNodes: THREE.Mesh[] = [];
    const satCount = 4;
    const satGeo = new THREE.IcosahedronGeometry(0.2, 0);
    const satMat = new THREE.MeshStandardMaterial({
      color: 0x00a2ff,
      metalness: 0.85,
      roughness: 0.15,
      emissive: 0x0071e3,
      emissiveIntensity: 0.7,
    });

    const satRadius = 2.8;
    for (let s = 0; s < satCount; s++) {
      const angle = (s * Math.PI * 2) / satCount;
      const sMesh = new THREE.Mesh(satGeo, satMat);
      sMesh.position.set(Math.cos(angle) * satRadius, 0.4 + Math.sin(angle) * 0.8, Math.sin(angle) * satRadius);
      cloudGroup.add(sMesh);
      satNodes.push(sMesh);
    }

    // Skyward Vertical Laser Uplink
    const beamGeo = new THREE.CylinderGeometry(0.035, 0.035, 10, 16);
    const beamMat = new THREE.MeshBasicMaterial({
      color: 0x00b4ff,
      transparent: true,
      opacity: 0.35,
    });
    const beamMesh = new THREE.Mesh(beamGeo, beamMat);
    beamMesh.position.set(0, 5, 0);
    cloudGroup.add(beamMesh);

    /* =========================================================================
       5. MOUSE TACTILE TILT & RESIZE HANDLING
       ========================================================================= */
    const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
    const handleMouseMove = (e: MouseEvent) => {
      const rect = mount.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      mouse.targetX = x * 0.28;
      mouse.targetY = y * 0.2;
    };
    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    const handleResize = () => {
      if (!mount) return;
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      if (w === 0 || h === 0) return;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    handleResize();

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(mount);

    /* =========================================================================
       6. RENDER LOOP (WITH CLEAN CENTERING AND STEP DYNAMICS)
       ========================================================================= */
    let animId = 0;
    let lastTime = performance.now();
    const startTime = performance.now();
    let currentLerpProgress = progressRef.current;
    let isVisible = true;

    const io = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting;
    });
    io.observe(mount);

    const stepColors = [
      new THREE.Color("#0071e3"), // Step 1: Blue
      new THREE.Color("#9a5cf5"), // Step 2: Purple
      new THREE.Color("#10b981"), // Step 3: Emerald
      new THREE.Color("#00a2ff"), // Step 4: Azure
    ];

    const render = () => {
      animId = requestAnimationFrame(render);
      if (!isVisible) return;

      const now = performance.now();
      const delta = Math.min((now - lastTime) / 1000, 0.1);
      const time = (now - startTime) / 1000;
      lastTime = now;

      // Responsive progress lerp
      const targetP = progressRef.current;
      currentLerpProgress += (targetP - currentLerpProgress) * 0.12;
      const p = currentLerpProgress;

      // Mouse lerp
      mouse.x += (mouse.targetX - mouse.x) * 0.08;
      mouse.y += (mouse.targetY - mouse.y) * 0.08;

      // The workstation model stays stably centered in the canvas viewport
      // Gentle floating arc
      rig.position.y = Math.sin(time * 1.5) * 0.08;
      rig.position.x = 0;

      // Clean multi-axis rotation synchronized with the 4 steps
      // Step 1: Front-facing slightly angled view of the screen
      // Step 2: Isometric perspective showing the CPU chip and screen
      // Step 3: Front-isometric view highlighting the security shield
      // Step 4: Perspective showing the cloud satellites and uplink
      const targetRotY = -0.35 + p * Math.PI * 1.8;
      const targetRotX = 0.12 + Math.sin(p * Math.PI * 2) * 0.08;

      rig.rotation.y = targetRotY + mouse.x;
      rig.rotation.x = targetRotX - mouse.y;

      // Rotate Gimbal Rings
      ring1.rotation.y += delta * 0.4;
      ring1.rotation.x += delta * 0.2;
      ring2.rotation.z -= delta * 0.35;

      // Pulsing chip core
      const activeStep = activeStepRef.current;
      const targetCol = stepColors[activeStep] || stepColors[0];
      chipMat.emissive.lerp(targetCol, 0.08);
      stepLight.color.lerp(targetCol, 0.08);

      // Redraw Dashboard screen texture periodically
      drawDashboard(activeStep, time);

      // Step 3: Security Shield
      if (activeStep === 2) {
        shieldMesh.rotation.y += delta * 0.4;
        shieldMesh.rotation.x += delta * 0.25;
        shieldMat.opacity = THREE.MathUtils.lerp(shieldMat.opacity, 0.42, 0.08);
      } else {
        shieldMat.opacity = THREE.MathUtils.lerp(shieldMat.opacity, 0.06, 0.08);
      }

      // Step 4: Satellite Dynamics
      satNodes.forEach((node, idx) => {
        const baseAngle = (idx * Math.PI * 2) / satCount + time * 0.5;
        const rad = satRadius + Math.sin(time * 2 + idx) * 0.15;
        node.position.set(Math.cos(baseAngle) * rad, 0.4 + Math.sin(time * 1.5 + idx) * 0.6, Math.sin(baseAngle) * rad);
      });

      renderer.render(scene, camera);
    };

    render();

    cleanupScene = () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("mousemove", handleMouseMove);
      resizeObserver.disconnect();
      io.disconnect();
      scene.traverse((obj) => {
        if (obj instanceof THREE.Mesh) {
          obj.geometry.dispose();
          const mats = Array.isArray(obj.material) ? obj.material : [obj.material];
          mats.forEach((m) => m.dispose());
        }
      });
      screenTex.dispose();
      envTex.dispose();
      renderer.dispose();
      pmremGenerator.dispose();
      if (mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }
    };
    });

    return () => {
      cancelAnimationFrame(initRaf);
      cleanupScene?.();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      style={{
        width: "100%",
        height: "100%",
        position: "relative",
        touchAction: "none",
      }}
      aria-hidden="true"
    />
  );
}
