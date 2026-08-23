'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { FullAstrologicalResponse, PlanetPosition } from '../../types/jyotish';
import { PLANETARY_GLYPHS } from '../../lib/constants';
import {
  RotateCcw,
  Sparkles,
  Camera,
  Orbit,
} from 'lucide-react';

interface CosmicSolarSystem3DProps {
  data: FullAstrologicalResponse;
  onSelectPlanet: (planet: PlanetPosition) => void;
}

// Astronomical & Astrological Rendering Configuration with Vibrant, Colorful Space Palette
const PLANETS_CONFIG: Record<
  string,
  {
    radius: number;
    size: number;
    color: string;
    speed: number;
    textureType: string;
    hasRings?: boolean;
  }
> = {
  Sun: { radius: 0, size: 14, color: '#f59e0b', speed: 0, textureType: 'sun' },
  Moon: { radius: 38, size: 4.8, color: '#38bdf8', speed: 0.045, textureType: 'moon' },
  Mercury: { radius: 62, size: 4.0, color: '#10b981', speed: 0.038, textureType: 'mercury' },
  Venus: { radius: 88, size: 5.6, color: '#facc15', speed: 0.032, textureType: 'venus' },
  Mars: { radius: 116, size: 4.6, color: '#ef4444', speed: 0.026, textureType: 'mars' },
  Jupiter: { radius: 154, size: 10.5, color: '#f97316', speed: 0.016, textureType: 'jupiter' },
  Saturn: { radius: 194, size: 9.0, color: '#eab308', speed: 0.012, textureType: 'saturn', hasRings: true },
  Rahu: { radius: 230, size: 4.8, color: '#a855f7', speed: -0.008, textureType: 'rahu' },
  Ketu: { radius: 230, size: 4.8, color: '#ec4899', speed: -0.008, textureType: 'ketu' },
};

// High-Definition, Ultra-Vibrant Procedural Planetary Texture Generator
function createProceduralTexture(type: string, baseColor: string): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 512;
  const ctx = canvas.getContext('2d')!;

  const w = canvas.width;
  const h = canvas.height;

  if (type === 'sun') {
    // Solar plasma core & luminous turbulence
    const grad = ctx.createLinearGradient(0, 0, w, h);
    grad.addColorStop(0, '#ffffff');
    grad.addColorStop(0.2, '#fef08a');
    grad.addColorStop(0.5, '#f59e0b');
    grad.addColorStop(0.8, '#ea580c');
    grad.addColorStop(1, '#991b1b');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, w, h);

    // Dynamic solar flares
    for (let i = 0; i < 500; i++) {
      ctx.beginPath();
      ctx.arc(
        Math.random() * w,
        Math.random() * h,
        Math.random() * 45 + 10,
        0,
        Math.PI * 2
      );
      ctx.fillStyle = `rgba(255, 255, 255, ${Math.random() * 0.45 + 0.15})`;
      ctx.fill();
    }
  } else if (type === 'mercury') {
    // Vibrant Emerald / Mint Crystal
    const grad = ctx.createLinearGradient(0, 0, w, h);
    grad.addColorStop(0, '#ecfdf5');
    grad.addColorStop(0.3, '#34d399');
    grad.addColorStop(0.7, '#059669');
    grad.addColorStop(1, '#064e3b');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, w, h);

    for (let i = 0; i < 800; i++) {
      ctx.beginPath();
      ctx.arc(Math.random() * w, Math.random() * h, Math.random() * 12 + 1, 0, Math.PI * 2);
      ctx.fillStyle = Math.random() > 0.5 ? 'rgba(167, 243, 208, 0.8)' : 'rgba(4, 120, 87, 0.7)';
      ctx.fill();
    }
  } else if (type === 'venus') {
    // Luminous Champagne Diamond & Golden Clouds
    const grad = ctx.createLinearGradient(0, 0, 0, h);
    grad.addColorStop(0, '#ffffff');
    grad.addColorStop(0.25, '#fef9c3');
    grad.addColorStop(0.5, '#fde047');
    grad.addColorStop(0.75, '#eab308');
    grad.addColorStop(1, '#ca8a04');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, w, h);

    ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
    for (let i = 0; i < 150; i++) {
      ctx.beginPath();
      ctx.ellipse(
        Math.random() * w,
        Math.random() * h,
        Math.random() * 90 + 30,
        Math.random() * 18 + 5,
        (Math.random() - 0.5) * 0.4,
        0,
        Math.PI * 2
      );
      ctx.fill();
    }
  } else if (type === 'moon') {
    // Pearlescent Silver & Starlight Cyan
    const grad = ctx.createLinearGradient(0, 0, w, h);
    grad.addColorStop(0, '#ffffff');
    grad.addColorStop(0.4, '#e0f2fe');
    grad.addColorStop(0.8, '#bae6fd');
    grad.addColorStop(1, '#38bdf8');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, w, h);

    // Basalt maria
    for (let i = 0; i < 45; i++) {
      ctx.beginPath();
      ctx.ellipse(
        Math.random() * w,
        Math.random() * h,
        Math.random() * 80 + 20,
        Math.random() * 55 + 15,
        Math.random() * Math.PI,
        0,
        Math.PI * 2
      );
      ctx.fillStyle = 'rgba(30, 41, 59, 0.5)';
      ctx.fill();
    }
    // Bright impact craters
    for (let i = 0; i < 600; i++) {
      ctx.beginPath();
      ctx.arc(Math.random() * w, Math.random() * h, Math.random() * 8 + 1, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(255, 255, 255, 0.85)';
      ctx.fill();
    }
  } else if (type === 'mars') {
    // Fiery Cosmic Ruby Red
    const grad = ctx.createLinearGradient(0, 0, 0, h);
    grad.addColorStop(0, '#ffffff'); // Polar ice
    grad.addColorStop(0.08, '#ff4d4f');
    grad.addColorStop(0.5, '#dc2626');
    grad.addColorStop(0.92, '#b91c1c');
    grad.addColorStop(1, '#ffffff');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, w, h);

    // Dark Martian canyons
    ctx.fillStyle = 'rgba(69, 10, 10, 0.65)';
    for (let i = 0; i < 100; i++) {
      ctx.beginPath();
      ctx.ellipse(
        Math.random() * w,
        Math.random() * h,
        Math.random() * 110 + 20,
        Math.random() * 25 + 5,
        (Math.random() - 0.5) * 0.2,
        0,
        Math.PI * 2
      );
      ctx.fill();
    }
  } else if (type === 'jupiter') {
    // Imperial Golden Topaz & Amber Bands
    const bands = [
      '#9a3412', '#ea580c', '#fbbf24', '#f59e0b', '#fde68a', '#c2410c', '#fef08a', '#d97706',
    ];
    const bandH = h / bands.length;
    bands.forEach((col, idx) => {
      ctx.fillStyle = col;
      ctx.fillRect(0, idx * bandH, w, bandH);
    });

    ctx.fillStyle = 'rgba(255, 255, 255, 0.35)';
    for (let i = 0; i < 90; i++) {
      ctx.beginPath();
      ctx.ellipse(
        Math.random() * w,
        Math.random() * h,
        Math.random() * 120 + 30,
        Math.random() * 15 + 3,
        0,
        0,
        Math.PI * 2
      );
      ctx.fill();
    }

    // Great Red Spot
    ctx.beginPath();
    ctx.ellipse(w * 0.6, h * 0.65, 55, 32, 0, 0, Math.PI * 2);
    ctx.fillStyle = '#ef4444';
    ctx.fill();
    ctx.strokeStyle = '#7f1d1d';
    ctx.lineWidth = 5;
    ctx.stroke();
  } else if (type === 'saturn') {
    // Golden ochre & honey bands
    const bands = ['#eab308', '#fde047', '#fef08a', '#ca8a04', '#fde047', '#854d0e', '#fbbf24'];
    const bandH = h / bands.length;
    bands.forEach((col, idx) => {
      ctx.fillStyle = col;
      ctx.fillRect(0, idx * bandH, w, bandH);
    });
  } else if (type === 'rahu') {
    // Cosmic Mystic Ultraviolet Vortex
    const grad = ctx.createRadialGradient(w / 2, h / 2, 20, w / 2, h / 2, w / 2);
    grad.addColorStop(0, '#e879f9');
    grad.addColorStop(0.4, '#a855f7');
    grad.addColorStop(0.8, '#6b21a8');
    grad.addColorStop(1, '#020206');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, w, h);

    ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
    for (let i = 0; i < 900; i++) {
      ctx.beginPath();
      ctx.arc(Math.random() * w, Math.random() * h, Math.random() * 3 + 1, 0, Math.PI * 2);
      ctx.fill();
    }
  } else if (type === 'ketu') {
    // Cosmic Neon Hot Pink Flare
    const grad = ctx.createRadialGradient(w / 2, h / 2, 20, w / 2, h / 2, w / 2);
    grad.addColorStop(0, '#fbcfe8');
    grad.addColorStop(0.4, '#ec4899');
    grad.addColorStop(0.8, '#be185d');
    grad.addColorStop(1, '#020206');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, w, h);

    ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
    for (let i = 0; i < 900; i++) {
      ctx.beginPath();
      ctx.arc(Math.random() * w, Math.random() * h, Math.random() * 3 + 1, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  return texture;
}

// Procedural Saturn Ring Texture
function createSaturnRingTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 64;
  const ctx = canvas.getContext('2d')!;

  const grad = ctx.createLinearGradient(0, 0, 512, 0);
  grad.addColorStop(0.0, 'rgba(250, 204, 21, 0.0)');
  grad.addColorStop(0.15, 'rgba(250, 204, 21, 0.8)');
  grad.addColorStop(0.45, 'rgba(254, 240, 138, 0.95)');
  grad.addColorStop(0.55, 'rgba(5, 5, 10, 0.05)'); // Cassini Division gap
  grad.addColorStop(0.65, 'rgba(234, 179, 8, 0.9)');
  grad.addColorStop(0.9, 'rgba(250, 204, 21, 0.7)');
  grad.addColorStop(1.0, 'rgba(250, 204, 21, 0.0)');

  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 512, 64);

  return new THREE.CanvasTexture(canvas);
}

export const CosmicSolarSystem3D: React.FC<CosmicSolarSystem3DProps> = ({
  data,
  onSelectPlanet,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mountRef = useRef<HTMLDivElement>(null);

  const [focusedPlanetName, setFocusedPlanetName] = useState<string>('Overview');
  const [hoveredPlanet, setHoveredPlanet] = useState<PlanetPosition | null>(null);

  // References for Three.js state
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const planetMeshesRef = useRef<Map<string, THREE.Group>>(new Map());
  const planetAnglesRef = useRef<Record<string, number>>({});
  const cameraTargetPosRef = useRef<THREE.Vector3 | null>(null);
  const controlsTargetPosRef = useRef<THREE.Vector3 | null>(null);

  // Initialize natal angles
  useEffect(() => {
    const angles: Record<string, number> = {};
    data.planets.forEach((p) => {
      // Longitude to radians on X-Z plane
      const rad = ((p.longitude - 90) * Math.PI) / 180.0;
      angles[p.name] = rad;
    });
    planetAnglesRef.current = angles;
  }, [data]);

  const resetToOverview = useCallback(() => {
    setFocusedPlanetName('Overview');
    cameraTargetPosRef.current = new THREE.Vector3(0, 240, 320);
    controlsTargetPosRef.current = new THREE.Vector3(0, 0, 0);
  }, []);

  const focusOnPlanet = useCallback(
    (planetName: string) => {
      setFocusedPlanetName(planetName);
      if (planetName === 'Overview') {
        resetToOverview();
        return;
      }

      const pGroup = planetMeshesRef.current.get(planetName);
      if (pGroup) {
        const cfg = PLANETS_CONFIG[planetName] || { size: 5 };
        const pPos = new THREE.Vector3();
        pGroup.getWorldPosition(pPos);

        controlsTargetPosRef.current = pPos.clone();
        const dist = cfg.size * 5.5 + 15;
        cameraTargetPosRef.current = new THREE.Vector3(pPos.x, pPos.y + dist * 0.45, pPos.z + dist);
      }
    },
    [resetToOverview]
  );

  useEffect(() => {
    const container = containerRef.current;
    const mount = mountRef.current;
    if (!container || !mount) return;

    const width = container.clientWidth;
    const height = container.clientHeight;

    // 1. Transparent Scene setup (Seamless blending with deep space canvas)
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.background = null;

    // 2. Camera setup
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 4000);
    camera.position.set(0, 240, 320);
    cameraRef.current = camera;

    // 3. Transparent Renderer setup
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      powerPreference: 'high-performance',
      alpha: true,
    });
    renderer.setSize(width, height);
    renderer.setClearColor(0x000000, 0);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.35;
    mount.replaceChildren(renderer.domElement);
    rendererRef.current = renderer;

    // 4. OrbitControls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.maxDistance = 900;
    controls.minDistance = 8;
    controls.maxPolarAngle = Math.PI / 2 + 0.1;
    controlsRef.current = controls;

    // 5. Rich Multi-Source Lighting (Vivid, Bright & Colorful 3D)
    const sunLight = new THREE.PointLight('#fffbeb', 5.0, 1600, 0.25);
    sunLight.position.set(0, 0, 0);
    scene.add(sunLight);

    const hemiLight = new THREE.HemisphereLight(0xffffff, 0x0e1738, 2.2);
    scene.add(hemiLight);

    const frontDirLight = new THREE.DirectionalLight(0xffffff, 1.8);
    frontDirLight.position.set(200, 300, 400);
    scene.add(frontDirLight);

    const backDirLight = new THREE.DirectionalLight(0x7dd3fc, 1.2);
    backDirLight.position.set(-200, -100, -300);
    scene.add(backDirLight);

    // 6. Deep Space 3D Stellar Dust
    const starGeo = new THREE.BufferGeometry();
    const starCount = 2500;
    const starPos = new Float32Array(starCount * 3);
    const starColors = new Float32Array(starCount * 3);

    for (let i = 0; i < starCount; i++) {
      const r = 900 + Math.random() * 1100;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);

      starPos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      starPos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      starPos[i * 3 + 2] = r * Math.cos(phi);

      const colRand = Math.random();
      if (colRand > 0.7) {
        starColors[i * 3] = 0.5; starColors[i * 3 + 1] = 0.8; starColors[i * 3 + 2] = 1.0;
      } else if (colRand > 0.4) {
        starColors[i * 3] = 0.8; starColors[i * 3 + 1] = 0.6; starColors[i * 3 + 2] = 1.0;
      } else {
        starColors[i * 3] = 1.0; starColors[i * 3 + 1] = 1.0; starColors[i * 3 + 2] = 1.0;
      }
    }
    starGeo.setAttribute('position', new THREE.BufferAttribute(starPos, 3));
    starGeo.setAttribute('color', new THREE.BufferAttribute(starColors, 3));

    const starMat = new THREE.PointsMaterial({
      size: 2.2,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
    });
    const starField = new THREE.Points(starGeo, starMat);
    scene.add(starField);

    // 7. Outer 3D Zodiac Ecliptic Belt (Starlight Cyan)
    const zodiacRadius = 265;
    const zodiacRingGeo = new THREE.RingGeometry(zodiacRadius - 3, zodiacRadius + 3, 128);
    const zodiacRingMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.28,
    });
    const zodiacRing = new THREE.Mesh(zodiacRingGeo, zodiacRingMat);
    zodiacRing.rotation.x = Math.PI / 2;
    scene.add(zodiacRing);

    // 8. Ascendant (Lagna) Dynamic Ray in 3D (Electric Sky Blue)
    const ascRad = ((data.ascendant.longitude - 90) * Math.PI) / 180.0;
    const ascX = Math.cos(ascRad) * (zodiacRadius + 15);
    const ascZ = Math.sin(ascRad) * (zodiacRadius + 15);

    const ascLineGeo = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(ascX, 0, ascZ),
    ]);
    const ascLineMat = new THREE.LineDashedMaterial({
      color: 0x7dd3fc,
      linewidth: 2,
      scale: 1,
      dashSize: 4,
      gapSize: 2,
      transparent: true,
      opacity: 0.9,
    });
    const ascLine = new THREE.Line(ascLineGeo, ascLineMat);
    ascLine.computeLineDistances();
    scene.add(ascLine);

    // 9. Planetary Creation with Vibrant 3D Materials & Glowing Halos
    const clickableObjects: THREE.Object3D[] = [];

    Object.entries(PLANETS_CONFIG).forEach(([pName, cfg]) => {
      const pGroup = new THREE.Group();
      pGroup.name = pName;

      // Orbit Line (Vivid colored wireframe)
      if (cfg.radius > 0) {
        const orbitPoints: THREE.Vector3[] = [];
        const segments = 128;
        for (let i = 0; i <= segments; i++) {
          const theta = (i / segments) * Math.PI * 2;
          orbitPoints.push(
            new THREE.Vector3(Math.cos(theta) * cfg.radius, 0, Math.sin(theta) * cfg.radius)
          );
        }
        const orbitGeo = new THREE.BufferGeometry().setFromPoints(orbitPoints);
        const orbitMat = new THREE.LineBasicMaterial({
          color: new THREE.Color(cfg.color),
          transparent: true,
          opacity: pName === 'Rahu' || pName === 'Ketu' ? 0.25 : 0.35,
        });
        const orbitLine = new THREE.Line(orbitGeo, orbitMat);
        scene.add(orbitLine);
      }

      // Planet Sphere Mesh with Procedural Texture & Emissive Glow
      const texture = createProceduralTexture(cfg.textureType, cfg.color);
      const sphereGeo = new THREE.SphereGeometry(cfg.size, 64, 64);

      let sphereMat: THREE.Material;
      if (pName === 'Sun') {
        sphereMat = new THREE.MeshBasicMaterial({ map: texture });
      } else {
        sphereMat = new THREE.MeshStandardMaterial({
          map: texture,
          roughness: 0.3,
          metalness: 0.15,
          emissive: new THREE.Color(cfg.color),
          emissiveIntensity: 0.4,
        });
      }

      const planetMesh = new THREE.Mesh(sphereGeo, sphereMat);
      pGroup.add(planetMesh);

      // Planet Atmospheric Glow Halo (Luminous Colored Aura)
      const haloGeo = new THREE.SphereGeometry(cfg.size * (pName === 'Sun' ? 1.45 : 1.25), 32, 32);
      const haloMat = new THREE.MeshBasicMaterial({
        color: new THREE.Color(cfg.color),
        transparent: true,
        opacity: pName === 'Sun' ? 0.55 : 0.35,
        side: THREE.BackSide,
        blending: THREE.AdditiveBlending,
      });
      const haloMesh = new THREE.Mesh(haloGeo, haloMat);
      pGroup.add(haloMesh);

      // Saturn Rings (with Cassini Division)
      if (cfg.hasRings) {
        const ringGeo = new THREE.RingGeometry(cfg.size * 1.35, cfg.size * 2.4, 64);
        const ringTex = createSaturnRingTexture();
        const ringMat = new THREE.MeshStandardMaterial({
          map: ringTex,
          side: THREE.DoubleSide,
          transparent: true,
          opacity: 0.95,
          roughness: 0.3,
        });
        const ringMesh = new THREE.Mesh(ringGeo, ringMat);
        ringMesh.rotation.x = Math.PI / 2 + 0.35;
        pGroup.add(ringMesh);
      }

      // Initial angle placement
      const initAngle = planetAnglesRef.current[pName] ?? 0;
      if (cfg.radius > 0) {
        pGroup.position.x = Math.cos(initAngle) * cfg.radius;
        pGroup.position.z = Math.sin(initAngle) * cfg.radius;
      }

      // Store in references & scene
      pGroup.userData = { planetName: pName };
      planetMesh.userData = { planetName: pName };
      clickableObjects.push(planetMesh);

      scene.add(pGroup);
      planetMeshesRef.current.set(pName, pGroup);
    });

    // 10. Interactive Raycaster for Hover & Click Planet Selection
    const raycaster = new THREE.Raycaster();
    const pointer = new THREE.Vector2();

    const handlePointerMove = (event: MouseEvent) => {
      const rect = renderer.domElement.getBoundingClientRect();
      pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      pointer.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(pointer, camera);
      const intersects = raycaster.intersectObjects(clickableObjects);

      if (intersects.length > 0) {
        const pName = intersects[0].object.userData.planetName;
        const pData = data.planets.find((p) => p.name === pName);
        if (pData) {
          setHoveredPlanet(pData);
          renderer.domElement.style.cursor = 'pointer';
        }
      } else {
        setHoveredPlanet(null);
        renderer.domElement.style.cursor = 'grab';
      }
    };

    const handleClick = (event: MouseEvent) => {
      const rect = renderer.domElement.getBoundingClientRect();
      pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      pointer.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(pointer, camera);
      const intersects = raycaster.intersectObjects(clickableObjects);

      if (intersects.length > 0) {
        const pName = intersects[0].object.userData.planetName;
        const pData = data.planets.find((p) => p.name === pName);
        if (pData) {
          focusOnPlanet(pName);
          onSelectPlanet(pData);
        }
      }
    };

    renderer.domElement.addEventListener('mousemove', handlePointerMove);
    renderer.domElement.addEventListener('click', handleClick);

    // 11. Continuous Natural Orbital Animation Loop
    let animId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      const delta = clock.getDelta();

      // Fluid Keplerian Orbital Motion
      Object.entries(PLANETS_CONFIG).forEach(([pName, cfg]) => {
        if (cfg.radius > 0) {
          const currentAngle = (planetAnglesRef.current[pName] ?? 0) + cfg.speed * delta * 0.4;
          planetAnglesRef.current[pName] = currentAngle;

          const pGroup = planetMeshesRef.current.get(pName);
          if (pGroup) {
            pGroup.position.x = Math.cos(currentAngle) * cfg.radius;
            pGroup.position.z = Math.sin(currentAngle) * cfg.radius;
            // Self-axial rotation
            pGroup.children[0].rotation.y += 0.01;
          }
        } else {
          // Sun self-rotation
          const pGroup = planetMeshesRef.current.get(pName);
          if (pGroup) {
            pGroup.children[0].rotation.y += 0.003;
          }
        }
      });

      // Smooth camera interpolation when focusing on planet
      if (cameraTargetPosRef.current) {
        camera.position.lerp(cameraTargetPosRef.current, 0.04);
        if (camera.position.distanceTo(cameraTargetPosRef.current) < 0.5) {
          cameraTargetPosRef.current = null;
        }
      }

      if (controlsTargetPosRef.current) {
        controls.target.lerp(controlsTargetPosRef.current, 0.04);
        if (controls.target.distanceTo(controlsTargetPosRef.current) < 0.2) {
          controlsTargetPosRef.current = null;
        }
      }

      controls.update();
      renderer.render(scene, camera);
      animId = requestAnimationFrame(animate);
    };

    animate();

    // Resize Handler
    const handleResize = () => {
      if (!container || !mount) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      renderer.domElement.removeEventListener('mousemove', handlePointerMove);
      renderer.domElement.removeEventListener('click', handleClick);
      cancelAnimationFrame(animId);
      renderer.dispose();
    };
  }, [data, focusOnPlanet, onSelectPlanet]);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[400px] sm:h-[580px] lg:h-[680px] select-none pointer-events-auto rounded-3xl overflow-hidden bg-transparent border-0 outline-none shadow-none"
    >
      {/* 3D WebGL Canvas Viewport */}
      <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing block" />

      {/* Minimal Floating HUD Telemetry (Clean, luxury minimalist, non-intrusive) */}
      <div className="absolute top-3 left-3 right-3 sm:top-4 sm:left-4 sm:right-4 z-20 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 pointer-events-none">
        <div className="flex items-center space-x-2.5 sm:space-x-3 bg-obsidian-950/85 backdrop-blur-xl px-3.5 py-1.5 sm:py-2 rounded-full border border-white/[0.1] shadow-luxury-card pointer-events-auto self-start">
          <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-sky-400 animate-pulse shadow-[0_0_10px_rgba(56,189,248,0.8)]" />
          <div>
            <div className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-white flex items-center space-x-1.5 font-mono">
              <Orbit className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-sky-400" />
              <span>3D Graha Mandala</span>
            </div>
            <div className="text-[9px] sm:text-[10px] text-slate-300 hidden sm:block">
              Drag to rotate • Scroll to zoom • Click planet to inspect
            </div>
          </div>
        </div>

        {/* Camera Focus & Reset */}
        <div className="flex items-center space-x-1.5 sm:space-x-2 bg-obsidian-950/85 backdrop-blur-xl p-1 rounded-full border border-white/[0.1] shadow-luxury-card pointer-events-auto self-start sm:self-auto">
          <div className="flex items-center space-x-1 sm:space-x-1.5 px-2">
            <Camera className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-sky-400" />
            <select
              value={focusedPlanetName}
              onChange={(e) => focusOnPlanet(e.target.value)}
              className="bg-obsidian-900/90 text-[11px] sm:text-xs font-semibold text-white border border-white/[0.12] rounded-full px-2.5 sm:px-3 py-1 focus:outline-none focus:border-sky-400 cursor-pointer max-w-[160px] sm:max-w-none"
            >
              <option value="Overview">Cosmic Overview</option>
              {data.planets.map((p) => (
                <option key={p.name} value={p.name}>
                  {p.name} ({p.sanskrit})
                </option>
              ))}
            </select>
          </div>

          <button
            type="button"
            onClick={resetToOverview}
            className="p-1 sm:p-1.5 text-slate-300 hover:text-white hover:bg-white/[0.1] rounded-full transition-colors cursor-pointer mr-0.5 sm:mr-1"
            title="Reset to Full View"
          >
            <RotateCcw className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
          </button>
        </div>
      </div>

      {/* Target Focus & Hover Banner */}
      {hoveredPlanet && (
        <div
          className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4 z-20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2.5 sm:gap-3 bg-obsidian-950/95 backdrop-blur-2xl p-3.5 sm:px-5 sm:py-3.5 rounded-2xl sm:rounded-3xl text-xs text-slate-100 shadow-2xl animate-fadeIn pointer-events-auto"
          style={{
            border: `1px solid ${hoveredPlanet.color}50`,
            boxShadow: `0 10px 40px -5px ${hoveredPlanet.color}30, inset 0 1px 0 rgba(255,255,255,0.1)`,
          }}
        >
          <div className="flex items-center space-x-3">
            <div
              className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl sm:rounded-2xl flex items-center justify-center font-bold text-sm sm:text-base shadow-sm shrink-0"
              style={{
                backgroundColor: `${hoveredPlanet.color}25`,
                color: hoveredPlanet.color,
                border: `1.5px solid ${hoveredPlanet.color}`,
                boxShadow: `0 0 15px ${hoveredPlanet.color}40`,
              }}
            >
              {PLANETARY_GLYPHS[hoveredPlanet.name] || '★'}
            </div>
            <div>
              <div className="font-bold text-sm sm:text-base text-white font-serif tracking-wide">
                {hoveredPlanet.name} ({hoveredPlanet.sanskrit}) • {hoveredPlanet.sign_name} ({hoveredPlanet.formatted_dms})
              </div>
              <div className="text-[10.5px] sm:text-[11.5px] text-slate-300">
                Occupies <strong className="text-white font-semibold">House {hoveredPlanet.house}</strong> • Dignity:{' '}
                <strong style={{ color: hoveredPlanet.color }}>{hoveredPlanet.dignity}</strong>
                {hoveredPlanet.is_vargottama && ' • Vargottama ★'}
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={() => onSelectPlanet(hoveredPlanet)}
            className="w-full sm:w-auto btn-luxury-primary px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs font-bold whitespace-nowrap cursor-pointer hover:scale-105 active:scale-95 transition-all shadow-md text-center"
          >
            Inspect Dignities & Remedies →
          </button>
        </div>
      )}
    </div>
  );
};
