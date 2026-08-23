'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import Matter from 'matter-js';
import { FullAstrologicalResponse, PlanetPosition } from '../../types/jyotish';
import { PLANETARY_GLYPHS } from '../../lib/constants';
import { Sparkles, Compass, Rocket, Magnet, Globe, RotateCcw, Info } from 'lucide-react';

interface AntiGravityCanvasProps {
  data: FullAstrologicalResponse;
  onSelectPlanet: (planet: PlanetPosition) => void;
}

type PhysicsMode = 'zero-g' | 'anti-gravity' | 'normal' | 'vortex';

export const AntiGravityCanvas: React.FC<AntiGravityCanvasProps> = ({
  data,
  onSelectPlanet,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const engineRef = useRef<Matter.Engine | null>(null);
  const runnerRef = useRef<Matter.Runner | null>(null);
  const bodiesMapRef = useRef<Map<Matter.Body, any>>(new Map());

  const [currentMode, setCurrentMode] = useState<PhysicsMode>('anti-gravity');
  const [selectedBodyInfo, setSelectedBodyInfo] = useState<string | null>(null);

  // Set physics mode
  const applyPhysicsMode = useCallback((mode: PhysicsMode, engine: Matter.Engine) => {
    setCurrentMode(mode);
    switch (mode) {
      case 'zero-g':
        engine.gravity.x = 0;
        engine.gravity.y = 0;
        engine.gravity.scale = 0.001;
        break;
      case 'anti-gravity':
        engine.gravity.x = 0;
        engine.gravity.y = -0.8;
        engine.gravity.scale = 0.001;
        break;
      case 'normal':
        engine.gravity.x = 0;
        engine.gravity.y = 1.0;
        engine.gravity.scale = 0.001;
        break;
      case 'vortex':
        engine.gravity.x = 0;
        engine.gravity.y = 0;
        engine.gravity.scale = 0.001;
        break;
    }
  }, []);

  const resetPositions = useCallback(() => {
    if (!engineRef.current || !containerRef.current) return;
    const width = containerRef.current.clientWidth;
    const height = containerRef.current.clientHeight;

    let index = 0;
    const total = bodiesMapRef.current.size;
    const cols = Math.min(4, Math.max(2, Math.floor(width / 220)));

    bodiesMapRef.current.forEach((meta, body) => {
      const col = index % cols;
      const row = Math.floor(index / cols);
      const targetX = (width / (cols + 1)) * (col + 1) + (Math.random() - 0.5) * 30;
      const targetY = 120 + row * 90 + (Math.random() - 0.5) * 20;

      Matter.Body.setPosition(body, { x: targetX, y: targetY });
      Matter.Body.setVelocity(body, { x: (Math.random() - 0.5) * 4, y: (Math.random() - 0.5) * 4 });
      Matter.Body.setAngle(body, (Math.random() - 0.5) * 0.2);
      index++;
    });
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    let width = (canvas.width = container.clientWidth);
    let height = (canvas.height = container.clientHeight);

    // Create Matter Engine
    const { Engine, World, Bodies, Mouse, MouseConstraint, Runner, Composite, Events } = Matter;
    const engine = Engine.create({
      enableSleeping: false,
    });
    engineRef.current = engine;

    // Apply initial anti-gravity mode
    applyPhysicsMode('anti-gravity', engine);

    const world = engine.world;
    bodiesMapRef.current.clear();

    // Create Cosmic Boundary Walls
    const wallThickness = 80;
    const walls = [
      // Top
      Bodies.rectangle(width / 2, -wallThickness / 2, width * 2, wallThickness, { isStatic: true, restitution: 0.9 }),
      // Bottom
      Bodies.rectangle(width / 2, height + wallThickness / 2, width * 2, wallThickness, { isStatic: true, restitution: 0.8 }),
      // Left
      Bodies.rectangle(-wallThickness / 2, height / 2, wallThickness, height * 2, { isStatic: true, restitution: 0.9 }),
      // Right
      Bodies.rectangle(width + wallThickness / 2, height / 2, wallThickness, height * 2, { isStatic: true, restitution: 0.9 }),
    ];
    World.add(world, walls);

    // Create Bodies for Planets
    const cardWidth = 190;
    const cardHeight = 78;
    const radius = 16;

    const allCardsData: Array<{
      type: 'planet' | 'ascendant' | 'numerology' | 'chart';
      title: string;
      subtitle: string;
      glyph: string;
      color: string;
      badge?: string;
      isVargottama?: boolean;
      meta?: any;
    }> = [];

    // Ascendant Card
    allCardsData.push({
      type: 'ascendant',
      title: `Asc: ${data.ascendant.sign_name}`,
      subtitle: `${data.ascendant.sign_sanskrit} • ${data.ascendant.formatted_dms}`,
      glyph: 'ASC',
      color: '#d4af37',
      badge: 'Lagna (1st House)',
      meta: data.ascendant,
    });

    // 9 Grahas Cards
    data.planets.forEach((p) => {
      let badge = p.dignity;
      if (p.is_vargottama) badge = 'Vargottama ★';
      else if (p.is_retrograde && p.name !== 'Rahu' && p.name !== 'Ketu') badge = `${p.dignity} (R)`;

      allCardsData.push({
        type: 'planet',
        title: `${p.name} (${p.sanskrit.split(' ')[0]})`,
        subtitle: `${p.sign_name} • ${p.formatted_dms}`,
        glyph: PLANETARY_GLYPHS[p.name] || '★',
        color: p.color || '#fbbf24',
        badge: badge,
        isVargottama: p.is_vargottama,
        meta: p,
      });
    });

    // Numerology Cards
    allCardsData.push({
      type: 'numerology',
      title: `Mulank ${data.numerology.mulank}`,
      subtitle: `Driver • ${data.numerology.mulank_profile.planet.split(' ')[0]}`,
      glyph: '①',
      color: '#f59e0b',
      badge: 'Driver Number',
      meta: data.numerology.mulank_profile,
    });

    allCardsData.push({
      type: 'numerology',
      title: `Bhagyank ${data.numerology.bhagyank}`,
      subtitle: `Destiny • ${data.numerology.bhagyank_profile.planet.split(' ')[0]}`,
      glyph: '⑧',
      color: '#8b5cf6',
      badge: 'Destiny Number',
      meta: data.numerology.bhagyank_profile,
    });

    allCardsData.push({
      type: 'numerology',
      title: `Namank ${data.numerology.namank}`,
      subtitle: `Chaldean: ${data.numerology.namank_compound} (${data.numerology.namank_profile.planet.split(' ')[0]})`,
      glyph: '🔤',
      color: '#06b6d4',
      badge: 'Name Number',
      meta: data.numerology.namank_profile,
    });

    // Spawn Bodies in Grid Formation
    const cols = Math.min(4, Math.max(2, Math.floor(width / 230)));
    const bodies: Matter.Body[] = [];

    allCardsData.forEach((item, idx) => {
      const col = idx % cols;
      const row = Math.floor(idx / cols);
      const posX = (width / (cols + 1)) * (col + 1) + (Math.random() - 0.5) * 40;
      const posY = 100 + row * 90 + (Math.random() - 0.5) * 30;

      const body = Bodies.rectangle(posX, posY, cardWidth, cardHeight, {
        chamfer: { radius: radius },
        restitution: 0.75,
        friction: 0.05,
        frictionAir: 0.015,
        density: 0.002,
        render: {
          visible: false, // We use custom 2D canvas drawing
        },
      });

      // Initial orbital nudge
      Matter.Body.setVelocity(body, {
        x: (Math.random() - 0.5) * 3,
        y: (Math.random() - 0.5) * 3,
      });

      bodies.push(body);
      bodiesMapRef.current.set(body, item);
    });

    World.add(world, bodies);

    // Mouse Controls & Drag Interaction
    const mouse = Mouse.create(canvas);
    const mouseConstraint = MouseConstraint.create(engine, {
      mouse: mouse,
      constraint: {
        stiffness: 0.2,
        render: {
          visible: true,
          type: 'line',
        },
      },
    });

    World.add(world, mouseConstraint);

    // Click inspection detection
    let startPoint = { x: 0, y: 0 };
    let dragStartTime = 0;

    Events.on(mouseConstraint, 'mousedown', (event: any) => {
      startPoint = { x: event.mouse.position.x, y: event.mouse.position.y };
      dragStartTime = Date.now();
    });

    Events.on(mouseConstraint, 'mouseup', (event: any) => {
      const endPoint = { x: event.mouse.position.x, y: event.mouse.position.y };
      const dist = Math.hypot(endPoint.x - startPoint.x, endPoint.y - startPoint.y);
      const timeElapsed = Date.now() - dragStartTime;

      // If clicked without large drag or quick tap, inspect card
      if (dist < 15 && timeElapsed < 400 && mouseConstraint.body) {
        const item = bodiesMapRef.current.get(mouseConstraint.body);
        if (item) {
          if (item.type === 'planet') {
            onSelectPlanet(item.meta);
          }
          setSelectedBodyInfo(`${item.title}: ${item.subtitle} [${item.badge || ''}]`);
        }
      }
    });

    // Custom Before Update for Vortex Gravity
    Events.on(engine, 'beforeUpdate', () => {
      const mode = (engine as any)._customMode;
      if (mode === 'vortex') {
        const centerX = width / 2;
        const centerY = height / 2;
        bodies.forEach((b) => {
          const dx = centerX - b.position.x;
          const dy = centerY - b.position.y;
          const dist = Math.hypot(dx, dy) + 50;
          const forceMag = 0.0003;
          // Tangential swirl + inward attraction
          Matter.Body.applyForce(b, b.position, {
            x: (dx / dist) * forceMag * b.mass + (-dy / dist) * forceMag * 0.6 * b.mass,
            y: (dy / dist) * forceMag * b.mass + (dx / dist) * forceMag * 0.6 * b.mass,
          });
        });
      }
    });

    // Start Physics Runner
    const runner = Runner.create();
    Runner.run(runner, engine);
    runnerRef.current = runner;

    // Custom Canvas Render Loop
    let animationFrame: number;
    const ctx = canvas.getContext('2d');

    const renderLoop = () => {
      if (!ctx) return;
      ctx.clearRect(0, 0, width, height);

      // Draw active mode background indicator
      ctx.save();
      ctx.fillStyle = 'rgba(212, 175, 55, 0.035)';
      ctx.font = '800 38px Cinzel, serif';
      ctx.textAlign = 'center';
      ctx.fillText(
        `GOOGLE ANTI-GRAVITY JYOTISH • ${data.birth_data.name.toUpperCase()}`,
        width / 2,
        height / 2
      );
      ctx.restore();

      // Render Each Celestial Body Card
      bodiesMapRef.current.forEach((item, body) => {
        const { x, y } = body.position;
        const angle = body.angle;

        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(angle);

        const w = cardWidth;
        const h = cardHeight;
        const r = radius;

        // Card Glow Shadow
        ctx.shadowColor = item.color;
        ctx.shadowBlur = item.isVargottama ? 25 : 14;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 4;

        // Glassmorphism Card Body
        ctx.beginPath();
        ctx.roundRect(-w / 2, -h / 2, w, h, r);
        ctx.fillStyle = 'rgba(12, 11, 28, 0.92)';
        ctx.fill();

        // Border
        ctx.lineWidth = item.isVargottama ? 2.2 : 1.4;
        ctx.strokeStyle = item.isVargottama ? '#fef08a' : item.color;
        ctx.stroke();
        ctx.shadowBlur = 0;

        // Top Accent Stripe
        ctx.beginPath();
        ctx.roundRect(-w / 2 + 1, -h / 2 + 1, w - 2, 4, [r, r, 0, 0]);
        ctx.fillStyle = item.color;
        ctx.fill();

        // Glyph Circle
        const circleX = -w / 2 + 25;
        const circleY = 2;
        ctx.beginPath();
        ctx.arc(circleX, circleY, 17, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
        ctx.fill();
        ctx.strokeStyle = item.color;
        ctx.lineWidth = 1.2;
        ctx.stroke();

        // Glyph Icon
        ctx.fillStyle = item.color;
        ctx.font = 'bold 16px sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(item.glyph, circleX, circleY + 1);

        // Title Text
        ctx.fillStyle = '#f8fafc';
        ctx.font = '700 13px Plus Jakarta Sans, sans-serif';
        ctx.textAlign = 'left';
        ctx.textBaseline = 'top';
        ctx.fillText(item.title, -w / 2 + 50, -h / 2 + 13);

        // Subtitle Text
        ctx.fillStyle = '#cbd5e1';
        ctx.font = '500 10.5px Plus Jakarta Sans, sans-serif';
        ctx.fillText(item.subtitle, -w / 2 + 50, -h / 2 + 31);

        // Badge pill
        if (item.badge) {
          const badgeX = -w / 2 + 50;
          const badgeY = -h / 2 + 50;
          ctx.beginPath();
          ctx.roundRect(badgeX, badgeY, 110, 18, 6);
          ctx.fillStyle = item.isVargottama
            ? 'rgba(212, 175, 55, 0.35)'
            : 'rgba(255, 255, 255, 0.12)';
          ctx.fill();
          ctx.strokeStyle = item.isVargottama ? '#fef08a' : 'rgba(255, 255, 255, 0.25)';
          ctx.lineWidth = 1;
          ctx.stroke();

          ctx.fillStyle = item.isVargottama ? '#fef08a' : '#f1f5f9';
          ctx.font = '700 9.5px Plus Jakarta Sans, sans-serif';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText(item.badge, badgeX + 55, badgeY + 9);
        }

        ctx.restore();
      });

      // Render Dragging Spring Line
      if (mouseConstraint.body) {
        const bodyPos = mouseConstraint.body.position;
        const mousePos = mouseConstraint.mouse.position;

        ctx.save();
        ctx.beginPath();
        ctx.moveTo(bodyPos.x, bodyPos.y);
        ctx.lineTo(mousePos.x, mousePos.y);
        ctx.strokeStyle = 'rgba(212, 175, 55, 0.85)';
        ctx.lineWidth = 2.5;
        ctx.setLineDash([4, 4]);
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(mousePos.x, mousePos.y, 7, 0, Math.PI * 2);
        ctx.fillStyle = '#fef08a';
        ctx.shadowColor = '#d4af37';
        ctx.shadowBlur = 10;
        ctx.fill();
        ctx.restore();
      }

      animationFrame = requestAnimationFrame(renderLoop);
    };

    renderLoop();

    // Resize Handler
    const handleResize = () => {
      if (!container || !canvas || !engine) return;
      width = canvas.width = container.clientWidth;
      height = canvas.height = container.clientHeight;

      // Update walls
      Matter.Body.setPosition(walls[0], { x: width / 2, y: -wallThickness / 2 });
      Matter.Body.setPosition(walls[1], { x: width / 2, y: height + wallThickness / 2 });
      Matter.Body.setPosition(walls[2], { x: -wallThickness / 2, y: height / 2 });
      Matter.Body.setPosition(walls[3], { x: width + wallThickness / 2, y: height / 2 });
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrame);
      if (runnerRef.current) Runner.stop(runnerRef.current);
      if (engineRef.current) World.clear(engineRef.current.world, false);
    };
  }, [data, onSelectPlanet, applyPhysicsMode]);

  const handleModeChange = (mode: PhysicsMode) => {
    if (engineRef.current) {
      (engineRef.current as any)._customMode = mode;
      applyPhysicsMode(mode, engineRef.current);
    }
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[540px] rounded-3xl glass-panel-glow overflow-hidden select-none border border-vedic-gold/40 shadow-2xl"
    >
      {/* Interactive Physics Control Bar */}
      <div className="absolute top-4 left-4 right-4 z-20 flex flex-wrap items-center justify-between gap-3 bg-obsidian-950/85 backdrop-blur-xl px-4 py-3 rounded-2xl border border-vedic-gold/30 shadow-lg">
        <div className="flex items-center space-x-2.5">
          <div className="w-2.5 h-2.5 rounded-full bg-vedic-gold animate-ping" />
          <span className="text-xs font-bold uppercase tracking-wider text-vedic-bright">
            Matter.js 2D Physics Playground
          </span>
          <span className="text-[11px] text-slate-300 hidden md:inline">
            (Drag, throw, or click any celestial body)
          </span>
        </div>

        {/* Physics Modes Button Group */}
        <div className="flex items-center space-x-1.5 bg-obsidian-900/90 p-1.5 rounded-xl border border-slate-800 shadow-inner">
          <button
            onClick={() => handleModeChange('anti-gravity')}
            className={`flex items-center space-x-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
              currentMode === 'anti-gravity'
                ? 'bg-vedic-gold text-obsidian-950 shadow-gold-glow font-extrabold'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
            }`}
            title="Upward Float (-G) physics"
          >
            <Rocket className="w-3.5 h-3.5" />
            <span>Anti-Gravity</span>
          </button>

          <button
            onClick={() => handleModeChange('zero-g')}
            className={`flex items-center space-x-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
              currentMode === 'zero-g'
                ? 'bg-vedic-gold text-obsidian-950 shadow-gold-glow font-extrabold'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
            }`}
            title="Zero-G floating orbital drift"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Zero-G</span>
          </button>

          <button
            onClick={() => handleModeChange('normal')}
            className={`flex items-center space-x-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
              currentMode === 'normal'
                ? 'bg-vedic-gold text-obsidian-950 shadow-gold-glow font-extrabold'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
            }`}
            title="Normal Earth drop gravity"
          >
            <Globe className="w-3.5 h-3.5" />
            <span>Earth</span>
          </button>

          <button
            onClick={() => handleModeChange('vortex')}
            className={`flex items-center space-x-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
              currentMode === 'vortex'
                ? 'bg-vedic-gold text-obsidian-950 shadow-gold-glow font-extrabold'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
            }`}
            title="Centripetal orbital mandala vortex"
          >
            <Magnet className="w-3.5 h-3.5" />
            <span>Vortex</span>
          </button>

          <button
            onClick={resetPositions}
            className="p-2 text-slate-300 hover:text-vedic-gold hover:bg-slate-800/80 rounded-lg transition-colors"
            title="Reset Card Positions"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Canvas */}
      <canvas ref={canvasRef} className="w-full h-full cursor-grab active:cursor-grabbing block" />

      {/* Selected Info Toast */}
      {selectedBodyInfo && (
        <div className="absolute bottom-4 left-4 right-4 z-20 flex items-center justify-between bg-obsidian-900/95 backdrop-blur-xl px-5 py-3 rounded-2xl border border-vedic-gold/40 text-xs text-slate-100 shadow-xl animate-fadeIn">
          <div className="flex items-center space-x-2.5">
            <Info className="w-4 h-4 text-vedic-gold flex-shrink-0" />
            <span className="font-semibold text-vedic-light">{selectedBodyInfo}</span>
          </div>
          <button
            onClick={() => setSelectedBodyInfo(null)}
            className="text-slate-400 hover:text-white ml-3 text-xs underline font-medium"
          >
            Dismiss
          </button>
        </div>
      )}
    </div>
  );
};
