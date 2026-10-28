"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";
import { RoundedBoxGeometry } from "three/examples/jsm/geometries/RoundedBoxGeometry.js";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* ------------------------------------------------------------------------ */
/*  GLSL                                                                     */
/* ------------------------------------------------------------------------ */

// Ashima Arts 3D simplex noise (MIT)
const NOISE = /* glsl */ `
vec3 mod289(vec3 x){return x-floor(x*(1.0/289.0))*289.0;}
vec4 mod289(vec4 x){return x-floor(x*(1.0/289.0))*289.0;}
vec4 permute(vec4 x){return mod289(((x*34.0)+10.0)*x);}
vec4 taylorInvSqrt(vec4 r){return 1.79284291400159-0.85373472095314*r;}
float snoise(vec3 v){
  const vec2 C=vec2(1.0/6.0,1.0/3.0);
  const vec4 D=vec4(0.0,0.5,1.0,2.0);
  vec3 i=floor(v+dot(v,C.yyy));
  vec3 x0=v-i+dot(i,C.xxx);
  vec3 g=step(x0.yzx,x0.xyz);
  vec3 l=1.0-g;
  vec3 i1=min(g.xyz,l.zxy);
  vec3 i2=max(g.xyz,l.zxy);
  vec3 x1=x0-i1+C.xxx;
  vec3 x2=x0-i2+C.yyy;
  vec3 x3=x0-D.yyy;
  i=mod289(i);
  vec4 p=permute(permute(permute(
    i.z+vec4(0.0,i1.z,i2.z,1.0))
    +i.y+vec4(0.0,i1.y,i2.y,1.0))
    +i.x+vec4(0.0,i1.x,i2.x,1.0));
  float n_=0.142857142857;
  vec3 ns=n_*D.wyz-D.xzx;
  vec4 j=p-49.0*floor(p*ns.z*ns.z);
  vec4 x_=floor(j*ns.z);
  vec4 y_=floor(j-7.0*x_);
  vec4 x=x_*ns.x+ns.yyyy;
  vec4 y=y_*ns.x+ns.yyyy;
  vec4 h=1.0-abs(x)-abs(y);
  vec4 b0=vec4(x.xy,y.xy);
  vec4 b1=vec4(x.zw,y.zw);
  vec4 s0=floor(b0)*2.0+1.0;
  vec4 s1=floor(b1)*2.0+1.0;
  vec4 sh=-step(h,vec4(0.0));
  vec4 a0=b0.xzyw+s0.xzyw*sh.xxyy;
  vec4 a1=b1.xzyw+s1.xzyw*sh.zzww;
  vec3 p0=vec3(a0.xy,h.x);
  vec3 p1=vec3(a0.zw,h.y);
  vec3 p2=vec3(a1.xy,h.z);
  vec3 p3=vec3(a1.zw,h.w);
  vec4 norm=taylorInvSqrt(vec4(dot(p0,p0),dot(p1,p1),dot(p2,p2),dot(p3,p3)));
  p0*=norm.x;p1*=norm.y;p2*=norm.z;p3*=norm.w;
  vec4 m=max(0.6-vec4(dot(x0,x0),dot(x1,x1),dot(x2,x2),dot(x3,x3)),0.0);
  m=m*m;
  return 42.0*dot(m*m,vec4(dot(p0,x0),dot(p1,x1),dot(p2,x2),dot(p3,x3)));
}
`;

// Soft animated aurora gradient rendered as a full-screen quad. Because it is
// an opaque scene object, the glass objects refract it in their transmission pass.
const BG_VERT = /* glsl */ `
varying vec2 vUv;
void main(){
  vUv = uv;
  gl_Position = vec4(position.xy, 0.9999, 1.0);
}
`;

const BG_FRAG = /* glsl */ `
uniform float uTime;
uniform float uAspect;
uniform vec3 uBase;
uniform vec3 uC1;
uniform vec3 uC2;
uniform vec3 uC3;
uniform vec3 uC4;
uniform vec2 uFocus;
varying vec2 vUv;

float blob(vec2 p, vec2 c, float r){
  float d = length(p - c);
  return smoothstep(r, 0.0, d);
}

void main(){
  vec2 p = vUv;
  p.x *= uAspect;
  float t = uTime * 0.08;
  vec2 f = vec2(uFocus.x * uAspect, uFocus.y);

  vec3 col = uBase;
  col = mix(col, uC1, blob(p, f + vec2(0.25*sin(t*1.3), 0.18*cos(t)), 0.78) * 0.78);
  col = mix(col, uC2, blob(p, f + vec2(-0.42 + 0.2*cos(t*0.9), -0.28 + 0.12*sin(t*1.7)), 0.72) * 0.72);
  col = mix(col, uC3, blob(p, f + vec2(0.35 + 0.15*sin(t*1.1), -0.35 + 0.1*cos(t*1.4)), 0.62) * 0.62);
  col = mix(col, uC4, blob(p, vec2(0.14*uAspect + 0.1*sin(t), 0.88), 0.58) * 0.38);

  // Subtle architectural dot matrix in the aurora background for glass refraction
  vec2 gridUv = fract(p * 18.0) - 0.5;
  float dotMask = smoothstep(0.09, 0.04, length(gridUv));
  float focusDist = smoothstep(1.1, 0.1, length(p - f));
  col = mix(col, vec3(0.0, 0.44, 0.89), dotMask * focusDist * 0.07);

  // subtle grain to avoid banding
  float n = fract(sin(dot(vUv * 1000.0, vec2(12.9898, 78.233))) * 43758.5453);
  col += (n - 0.5) * 0.012;

  gl_FragColor = vec4(col, 1.0);
  #include <colorspace_fragment>
}
`;

/* ------------------------------------------------------------------------ */

function makeGlass(overrides: Partial<THREE.MeshPhysicalMaterialParameters> = {}) {
  return new THREE.MeshPhysicalMaterial({
    color: 0xffffff,
    metalness: 0,
    roughness: 0.04,
    transmission: 1,
    thickness: 1.5,
    ior: 1.45,
    dispersion: 0.52,
    iridescence: 0.92,
    iridescenceIOR: 1.28,
    iridescenceThicknessRange: [120, 680],
    clearcoat: 1,
    clearcoatRoughness: 0.05,
    specularIntensity: 1,
    envMapIntensity: 1.35,
    attenuationColor: new THREE.Color("#eaf2ff"),
    attenuationDistance: 2.2,
    ...overrides,
  });
}

export default function HeroScene() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const markReady = () => {
      if (typeof window !== "undefined") {
        (window as unknown as { __efesoft_3d_ready?: boolean }).__efesoft_3d_ready = true;
        window.dispatchEvent(new CustomEvent("efesoft:3d-ready"));
      }
    };

    let cleanupScene: (() => void) | null = null;
    const initRaf = requestAnimationFrame(() => {
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const isSmall = window.matchMedia("(max-width: 900px)").matches;

      /* ---------- safe WebGL pre-flight check ---------- */
      const canvas = document.createElement("canvas");
      const glOpts: WebGLContextAttributes = {
        alpha: true,
        antialias: true,
        powerPreference: "high-performance",
      };
      const gl =
        (canvas.getContext("webgl2", glOpts) as WebGLRenderingContext | null) ||
        (canvas.getContext("webgl", glOpts) as WebGLRenderingContext | null);

      if (!gl) {
        markReady();
        return;
      }

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
        markReady();
        return;
      }
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, isSmall ? 1.5 : 1.75));
      renderer.toneMapping = THREE.NeutralToneMapping;
      renderer.toneMappingExposure = 1.06;
      renderer.setClearColor(0x000000, 0);
      mount.appendChild(renderer.domElement);

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 100);
      camera.position.set(0, 0, 10);

      const pmrem = new THREE.PMREMGenerator(renderer);
      const room = new RoomEnvironment();
      const envTex = pmrem.fromScene(room, 0.035).texture;
      room.dispose();
      scene.environment = envTex;

    /* ---------- background aurora ---------- */
    const bgUniforms = {
      uTime: { value: 0 },
      uAspect: { value: 1 },
      uFocus: { value: new THREE.Vector2(0.72, 0.5) },
      uBase: { value: new THREE.Color("#f4f6fb") },
      uC1: { value: new THREE.Color("#b4d2ff") },
      uC2: { value: new THREE.Color("#d5c6ff") },
      uC3: { value: new THREE.Color("#b8f0ea") },
      uC4: { value: new THREE.Color("#ffe0cf") },
    };
    const bgMat = new THREE.ShaderMaterial({
      uniforms: bgUniforms,
      vertexShader: BG_VERT,
      fragmentShader: BG_FRAG,
      depthWrite: false,
      depthTest: false,
      toneMapped: false,
    });
    const bgGeo = new THREE.PlaneGeometry(2, 2);
    const bg = new THREE.Mesh(bgGeo, bgMat);
    bg.frustumCulled = false;
    bg.renderOrder = -1;
    scene.add(bg);

    /* ---------- lights (env does most of the work) ---------- */
    const key = new THREE.DirectionalLight(0xffffff, 1.75);
    key.position.set(3, 5, 6);
    scene.add(key);
    const rim = new THREE.DirectionalLight(0xb8c8ff, 1.35);
    rim.position.set(-6, -2, -3);
    scene.add(rim);

    /* ---------- composition root ---------- */
    const root = new THREE.Group();
    scene.add(root);
    const rig = new THREE.Group(); // receives pointer + scroll rotation
    root.add(rig);

    /* ---------- liquid glass blob ---------- */
    const blobUniforms = {
      uTime: { value: 0 },
      uAmp: { value: 0.2 },
    };
    const blobMat = makeGlass({ thickness: 2.3, dispersion: 0.65 });
    blobMat.onBeforeCompile = (shader) => {
      shader.uniforms.uTime = blobUniforms.uTime;
      shader.uniforms.uAmp = blobUniforms.uAmp;
      shader.vertexShader = shader.vertexShader
        .replace(
          "#include <common>",
          /* glsl */ `#include <common>
          uniform float uTime;
          uniform float uAmp;
          ${NOISE}
          float displace(vec3 p){
            float n = snoise(p * 1.25 + vec3(uTime * 0.24, uTime * 0.18, -uTime * 0.14));
            n += 0.35 * snoise(p * 2.6 - vec3(uTime * 0.2));
            return n * uAmp;
          }
          vec3 orthogonal(vec3 v){
            return normalize(abs(v.x) > abs(v.z) ? vec3(-v.y, v.x, 0.0) : vec3(0.0, -v.z, v.y));
          }`
        )
        .replace(
          "#include <beginnormal_vertex>",
          /* glsl */ `
          vec3 dispPos = position + normal * displace(position);
          vec3 tng = orthogonal(normal);
          vec3 btg = normalize(cross(normal, tng));
          vec3 pA = position + tng * 0.012;
          vec3 pB = position + btg * 0.012;
          pA += normalize(pA) * displace(pA);
          pB += normalize(pB) * displace(pB);
          vec3 objectNormal = normalize(cross(pA - dispPos, pB - dispPos));
          #ifdef USE_TANGENT
            vec3 objectTangent = vec3(tangent.xyz);
          #endif`
        )
        .replace("#include <begin_vertex>", "vec3 transformed = dispPos;");
    };
    const blobGeo = new THREE.IcosahedronGeometry(1.32, isSmall ? 32 : 48);
    const blob = new THREE.Mesh(blobGeo, blobMat);
    rig.add(blob);

    /* ---------- precision orbital gyroscope rings ---------- */
    const metalRingMat = new THREE.MeshPhysicalMaterial({
      color: 0xe2e8f0,
      metalness: 0.92,
      roughness: 0.14,
      clearcoat: 1,
      iridescence: 0.6,
    });
    const outerGyroGeo = new THREE.TorusGeometry(2.05, 0.022, 24, 160);
    const outerGyro = new THREE.Mesh(outerGyroGeo, metalRingMat);
    outerGyro.rotation.x = Math.PI * 0.32;
    outerGyro.rotation.y = Math.PI * 0.12;
    rig.add(outerGyro);

    const innerGyroGeo = new THREE.TorusGeometry(1.68, 0.032, 24, 140);
    const innerGyro = new THREE.Mesh(
      innerGyroGeo,
      makeGlass({ thickness: 0.6, attenuationColor: new THREE.Color("#cfe4ff") })
    );
    innerGyro.rotation.x = -Math.PI * 0.25;
    innerGyro.rotation.z = Math.PI * 0.18;
    rig.add(innerGyro);

    /* ---------- secondary glass objects ---------- */
    const torusGeo = new THREE.TorusGeometry(0.46, 0.17, 48, 128);
    const torus = new THREE.Mesh(torusGeo, makeGlass({ thickness: 0.9 }));
    torus.position.set(-1.85, 1.15, 0.4);
    rig.add(torus);

    const cubeGeo = new RoundedBoxGeometry(0.78, 0.78, 0.78, 6, 0.18);
    const cube = new THREE.Mesh(cubeGeo, makeGlass({ thickness: 1.1, iridescence: 1 }));
    cube.position.set(1.65, -1.25, 0.6);
    rig.add(cube);

    const capsuleGeo = new THREE.CapsuleGeometry(0.16, 0.7, 12, 32);
    const capsule = new THREE.Mesh(capsuleGeo, makeGlass({ thickness: 0.5 }));
    capsule.position.set(1.55, 1.45, -0.2);
    capsule.rotation.z = -0.7;
    rig.add(capsule);

    const octaGeo = new THREE.OctahedronGeometry(0.38, 0);
    const octa = new THREE.Mesh(octaGeo, makeGlass({ thickness: 1.2, dispersion: 0.8 }));
    octa.position.set(-1.55, -1.15, 0.5);
    rig.add(octa);

    /* ---------- solid color orbs (seen through the glass) ---------- */
    const orbGeo = new THREE.SphereGeometry(1, 48, 48);
    const orbSpecs = [
      { color: "#0a84ff", r: 0.34, radius: 2.15, speed: 0.32, phase: 0.0, tilt: 0.35, z: -0.6 },
      { color: "#5e5ce6", r: 0.24, radius: 1.8, speed: -0.42, phase: 2.1, tilt: -0.5, z: -1.1 },
      { color: "#2ec4b6", r: 0.2, radius: 2.4, speed: 0.26, phase: 4.0, tilt: 0.9, z: -0.9 },
      { color: "#ff7a59", r: 0.15, radius: 1.6, speed: 0.5, phase: 1.2, tilt: -1.1, z: -0.4 },
      { color: "#9a5cf5", r: 0.12, radius: 2.7, speed: -0.3, phase: 3.3, tilt: 0.2, z: -1.4 },
    ];
    const orbs = orbSpecs.map((s) => {
      const m = new THREE.Mesh(
        orbGeo,
        new THREE.MeshPhysicalMaterial({
          color: s.color,
          roughness: 0.25,
          metalness: 0.0,
          clearcoat: 1,
          clearcoatRoughness: 0.1,
          sheen: 0.6,
          sheenColor: new THREE.Color("#ffffff"),
        })
      );
      m.scale.setScalar(s.r);
      rig.add(m);
      return { mesh: m, ...s };
    });

    /* ---------- 3D Spatial Depth Particle Field ---------- */
    const particleCount = isSmall ? 36 : 70;
    const pPositions = new Float32Array(particleCount * 3);
    const pScales = new Float32Array(particleCount);
    for (let i = 0; i < particleCount; i++) {
      const r = 2.2 + Math.random() * 2.8;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      pPositions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pPositions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta) * 0.75;
      pPositions[i * 3 + 2] = (Math.random() - 0.5) * 3.5;
      pScales[i] = 0.4 + Math.random() * 0.8;
    }
    const particleGeo = new THREE.BufferGeometry();
    particleGeo.setAttribute("position", new THREE.BufferAttribute(pPositions, 3));
    particleGeo.setAttribute("aScale", new THREE.BufferAttribute(pScales, 1));
    const particleMat = new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      uniforms: {
        uTime: { value: 0 },
        uPixelRatio: { value: Math.min(window.devicePixelRatio, 2) },
      },
      vertexShader: /* glsl */ `
        attribute float aScale;
        uniform float uTime;
        uniform float uPixelRatio;
        varying float vAlpha;
        void main() {
          vec3 pos = position;
          pos.y += sin(uTime * 0.6 + position.x * 1.5) * 0.12;
          pos.x += cos(uTime * 0.45 + position.y * 1.5) * 0.08;
          vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
          gl_Position = projectionMatrix * mvPosition;
          gl_PointSize = aScale * 24.0 * uPixelRatio * (1.0 / -mvPosition.z);
          vAlpha = smoothstep(-5.0, 2.0, pos.z) * 0.45;
        }
      `,
      fragmentShader: /* glsl */ `
        varying float vAlpha;
        void main() {
          float d = length(gl_PointCoord - vec2(0.5));
          if (d > 0.5) discard;
          float strength = smoothstep(0.5, 0.05, d);
          gl_FragColor = vec4(0.15, 0.52, 0.98, strength * vAlpha);
        }
      `,
    });
    const particleField = new THREE.Points(particleGeo, particleMat);
    rig.add(particleField);

    /* ---------- layout ---------- */
    const layout = () => {
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      bgUniforms.uAspect.value = w / h;

      const visibleH = 2 * Math.tan(THREE.MathUtils.degToRad(camera.fov / 2)) * camera.position.z;
      const visibleW = visibleH * camera.aspect;

      if (camera.aspect < 0.9) {
        // mobile: centered under the copy
        root.position.set(0, -visibleH * 0.26, 0);
        root.scale.setScalar(Math.min(0.62, visibleW / 6.2));
        bgUniforms.uFocus.value.set(0.5, 0.26);
      } else {
        // desktop: right column
        root.position.set(visibleW * 0.22, -0.05, 0);
        root.scale.setScalar(Math.min(1, visibleW / 11));
        bgUniforms.uFocus.value.set(0.72, 0.5);
      }
    };
    layout();
    const ro = new ResizeObserver(layout);
    ro.observe(mount);

    /* ---------- interaction ---------- */
    const pointer = { x: 0, y: 0, tx: 0, ty: 0, vel: 0 };
    let lastX = 0;
    let lastY = 0;
    const onPointer = (e: PointerEvent) => {
      const nx = (e.clientX / window.innerWidth) * 2 - 1;
      const ny = (e.clientY / window.innerHeight) * 2 - 1;
      pointer.tx = nx;
      pointer.ty = ny;
      const dx = e.clientX - lastX;
      const dy = e.clientY - lastY;
      pointer.vel = Math.min(1, pointer.vel + Math.hypot(dx, dy) / 800);
      lastX = e.clientX;
      lastY = e.clientY;
    };
    window.addEventListener("pointermove", onPointer, { passive: true });

    const scroll = { p: 0 };
    const st = ScrollTrigger.create({
      trigger: mount.parentElement ?? mount,
      start: "top top",
      end: "bottom top",
      scrub: true,
      onUpdate: (self) => {
        scroll.p = self.progress;
      },
    });

    /* ---------- intro ---------- */
    const intro = { s: reduced ? 1 : 0.001 };
    if (!reduced) {
      gsap.to(intro, { s: 1, duration: 2.2, ease: "elastic.out(1, 0.6)", delay: 0.2 });
    }

    /* ---------- loop ---------- */
    let lastTime = performance.now();
    const startTime = performance.now();
    let running = false;
    let firstFrameRendered = false;

    const render = () => {
      const now = performance.now();
      const dt = Math.min((now - lastTime) / 1000, 0.05);
      const t = (now - startTime) / 1000;
      lastTime = now;
      const motion = reduced ? 0 : 1;

      pointer.x += (pointer.tx - pointer.x) * 0.055;
      pointer.y += (pointer.ty - pointer.y) * 0.055;
      pointer.vel *= 0.94;

      bgUniforms.uTime.value = t * motion;
      blobUniforms.uTime.value = t * motion;
      blobUniforms.uAmp.value = 0.18 + pointer.vel * 0.18 * motion + scroll.p * 0.08;
      particleMat.uniforms.uTime.value = t * motion;

      // Multi-axis 3D parallax with pointer & scroll
      rig.rotation.y = pointer.x * 0.42 + scroll.p * 1.45 + t * 0.05 * motion;
      rig.rotation.x = pointer.y * 0.26 + scroll.p * 0.42;
      rig.position.y = scroll.p * 1.65 - pointer.y * 0.18;
      rig.position.x = pointer.x * 0.22;
      rig.scale.setScalar(intro.s * (1 - scroll.p * 0.14));

      blob.rotation.y += dt * 0.09 * motion;

      // Orbital gyroscope counter-rotation + scroll expansion
      outerGyro.rotation.z = t * 0.22 * motion + scroll.p * 1.8;
      outerGyro.rotation.x = Math.PI * 0.32 + Math.sin(t * 0.4) * 0.15 * motion;
      outerGyro.scale.setScalar(1 + scroll.p * 0.22);

      innerGyro.rotation.y = -t * 0.32 * motion - scroll.p * 1.5;
      innerGyro.rotation.x = -Math.PI * 0.25 + Math.cos(t * 0.5) * 0.18 * motion;
      innerGyro.scale.setScalar(1 + scroll.p * 0.12);

      // Secondary floating satellites with scroll dispersion
      const spread = 1 + scroll.p * 0.35;
      torus.rotation.x = t * 0.4 * motion + 0.6;
      torus.rotation.y = t * 0.3 * motion;
      torus.position.set(
        -1.85 * spread,
        (1.15 + Math.sin(t * 0.9) * 0.12 * motion) * spread,
        0.4 + scroll.p * 0.5
      );

      cube.rotation.x = t * 0.25 * motion + 0.4;
      cube.rotation.y = t * 0.35 * motion + 0.6;
      cube.position.set(
        1.65 * spread,
        (-1.25 + Math.cos(t * 0.8) * 0.14 * motion) * spread,
        0.6 + scroll.p * 0.4
      );

      capsule.rotation.z = -0.7 + Math.sin(t * 0.6) * 0.25 * motion;
      capsule.position.set(
        1.55 * spread,
        (1.45 + Math.sin(t * 1.1 + 1) * 0.1 * motion) * spread,
        -0.2 - scroll.p * 0.3
      );

      octa.rotation.x = -t * 0.35 * motion;
      octa.rotation.z = t * 0.45 * motion;
      octa.position.set(
        -1.55 * spread,
        (-1.15 + Math.sin(t * 0.95 + 2.0) * 0.12 * motion) * spread,
        0.5 + scroll.p * 0.35
      );

      particleField.rotation.y = -t * 0.03 * motion + pointer.x * 0.15;
      particleField.rotation.x = pointer.y * 0.1;

      for (const o of orbs) {
        const a = o.phase + t * o.speed * motion;
        o.mesh.position.set(
          Math.cos(a) * o.radius,
          Math.sin(a) * o.radius * Math.sin(o.tilt) * 0.55,
          o.z + Math.sin(a) * Math.cos(o.tilt) * 0.9
        );
      }

      renderer.render(scene, camera);

      if (!firstFrameRendered) {
        firstFrameRendered = true;
        markReady();
      }
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

    const onVisibility = () => (document.hidden ? stop() : start());
    document.addEventListener("visibilitychange", onVisibility);

    /* ---------- cleanup ---------- */
    cleanupScene = () => {
      stop();
      io.disconnect();
      ro.disconnect();
      st.kill();
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("pointermove", onPointer);
      gsap.killTweensOf(intro);

      scene.traverse((obj) => {
        if (obj instanceof THREE.Mesh || obj instanceof THREE.Points) {
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

  return <div ref={mountRef} className="hero__canvas" aria-hidden />;
}
