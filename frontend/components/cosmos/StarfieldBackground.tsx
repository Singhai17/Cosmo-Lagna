'use client';

import React, { useEffect, useRef } from 'react';

interface StarNode {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
  glowColor: string;
  alpha: number;
  baseAlpha: number;
  pulseSpeed: number;
  pulsePhase: number;
}

export const StarfieldBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef<{ x: number; y: number; isHovering: boolean }>({
    x: -1000,
    y: -1000,
    isHovering: false,
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
      mouseRef.current.isHovering = true;
    };

    const handleMouseLeave = () => {
      mouseRef.current.isHovering = false;
      mouseRef.current.x = -1000;
      mouseRef.current.y = -1000;
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    // Vibrant Jewel-Tone Starfield Nodes (White, Sky, Cyan, Gold, Violet, Emerald)
    const starPalette = [
      { color: '#ffffff', glow: 'rgba(255, 255, 255, 0.8)' },
      { color: '#38bdf8', glow: 'rgba(56, 189, 248, 0.7)' },
      { color: '#7dd3fc', glow: 'rgba(125, 211, 252, 0.7)' },
      { color: '#fbbf24', glow: 'rgba(251, 191, 36, 0.65)' },
      { color: '#c084fc', glow: 'rgba(192, 132, 252, 0.65)' },
      { color: '#34d399', glow: 'rgba(52, 211, 153, 0.65)' },
      { color: '#f43f5e', glow: 'rgba(244, 63, 94, 0.6)' },
    ];

    const nodeCount = Math.min(Math.floor((width * height) / 8000), 200);
    const nodes: StarNode[] = [];

    for (let i = 0; i < nodeCount; i++) {
      const p = starPalette[Math.floor(Math.random() * starPalette.length)];
      const baseAlpha = Math.random() * 0.55 + 0.2;
      nodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.2,
        vy: (Math.random() - 0.5) * 0.2,
        radius: Math.random() * 1.4 + 0.5,
        color: p.color,
        glowColor: p.glow,
        alpha: baseAlpha,
        baseAlpha,
        pulseSpeed: Math.random() * 0.02 + 0.008,
        pulsePhase: Math.random() * Math.PI * 2,
      });
    }

    let time = 0;

    const render = () => {
      time += 0.012;
      ctx.clearRect(0, 0, width, height);

      // Ambient Multi-Hue Celestial Radial Blooms
      const grad = ctx.createRadialGradient(
        width * 0.5,
        height * 0.2,
        width * 0.05,
        width * 0.5,
        height * 0.5,
        Math.max(width, height) * 0.75
      );
      grad.addColorStop(0, 'rgba(14, 18, 36, 0.55)');
      grad.addColorStop(0.3, 'rgba(12, 14, 28, 0.7)');
      grad.addColorStop(0.7, 'rgba(6, 7, 14, 0.88)');
      grad.addColorStop(1, 'rgba(4, 4, 7, 0.98)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height);

      // Subtle Nebula Color Blooms in Top Corners
      const cyanBloom = ctx.createRadialGradient(width * 0.15, height * 0.1, 0, width * 0.15, height * 0.1, 380);
      cyanBloom.addColorStop(0, 'rgba(56, 189, 248, 0.06)');
      cyanBloom.addColorStop(1, 'transparent');
      ctx.fillStyle = cyanBloom;
      ctx.fillRect(0, 0, width, height);

      const purpleBloom = ctx.createRadialGradient(width * 0.85, height * 0.2, 0, width * 0.85, height * 0.2, 420);
      purpleBloom.addColorStop(0, 'rgba(168, 85, 247, 0.06)');
      purpleBloom.addColorStop(1, 'transparent');
      ctx.fillStyle = purpleBloom;
      ctx.fillRect(0, 0, width, height);

      const goldBloom = ctx.createRadialGradient(width * 0.5, height * 0.8, 0, width * 0.5, height * 0.8, 400);
      goldBloom.addColorStop(0, 'rgba(245, 158, 11, 0.04)');
      goldBloom.addColorStop(1, 'transparent');
      ctx.fillStyle = goldBloom;
      ctx.fillRect(0, 0, width, height);

      // Update & Render Star Nodes
      const mouse = mouseRef.current;
      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];

        node.x += node.vx;
        node.y += node.vy;

        if (node.x < 0) node.x = width;
        if (node.x > width) node.x = 0;
        if (node.y < 0) node.y = height;
        if (node.y > height) node.y = 0;

        // Interactive mouse gravity & illumination
        let extraAlpha = 0;
        if (mouse.isHovering) {
          const dx = mouse.x - node.x;
          const dy = mouse.y - node.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 180 && dist > 1) {
            const force = (180 - dist) / 180;
            node.x += (dx / dist) * force * 0.6;
            node.y += (dy / dist) * force * 0.6;
            extraAlpha = force * 0.4;
          }
        }

        const currentAlpha = Math.min(
          1,
          node.baseAlpha * (0.7 + 0.3 * Math.sin(time * 2 + node.pulsePhase)) + extraAlpha
        );

        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius + (extraAlpha > 0 ? 0.5 : 0), 0, Math.PI * 2);
        ctx.fillStyle = node.color;
        ctx.globalAlpha = currentAlpha;
        ctx.fill();

        // Connect nearby nodes with subtle colored filaments
        for (let j = i + 1; j < nodes.length; j++) {
          const other = nodes[j];
          const dx = node.x - other.x;
          const dy = node.y - other.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 95) {
            const lineAlpha = (1 - dist / 95) * 0.12 * (currentAlpha + other.alpha) * 0.5;
            ctx.beginPath();
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(other.x, other.y);
            ctx.strokeStyle = node.color;
            ctx.globalAlpha = lineAlpha;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      }

      ctx.globalAlpha = 1.0;
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 block w-full h-full"
      style={{ opacity: 0.95 }}
    />
  );
};
