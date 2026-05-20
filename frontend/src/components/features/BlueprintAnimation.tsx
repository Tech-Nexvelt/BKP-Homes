'use client';

import React, { useRef, useEffect } from 'react';

export function BlueprintAnimation() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = 0;
    let height = 0;

    // Handle resizing
    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      width = rect.width;
      height = rect.height;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
    };

    resize();
    window.addEventListener('resize', resize);

    // Particles for joinery assembly effect
    interface Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      alpha: number;
      life: number;
      color: string;
    }
    const particles: Particle[] = [];

    const createParticles = (x: number, y: number, count: number, color = '#C8A96B') => {
      for (let i = 0; i < count; i++) {
        particles.push({
          x,
          y,
          vx: (Math.random() - 0.5) * 2.5,
          vy: (Math.random() - 0.5) * 2.5,
          alpha: 1.0,
          life: 0.02 + Math.random() * 0.03, // fade rate
          color,
        });
      }
    };

    // Helper: Draw a dotted measurement line
    const drawMeasurement = (
      x1: number,
      y1: number,
      x2: number,
      y2: number,
      label: string,
      side: 'left' | 'right' | 'top' | 'bottom',
      offset = 25
    ) => {
      ctx.save();
      ctx.strokeStyle = 'rgba(200, 169, 107, 0.45)';
      ctx.fillStyle = '#C8A96B';
      ctx.font = '8px monospace';
      ctx.lineWidth = 0.8;
      ctx.setLineDash([2, 3]);

      let ox = 0;
      let oy = 0;
      if (side === 'left') ox = -offset;
      if (side === 'right') ox = offset;
      if (side === 'top') oy = -offset;
      if (side === 'bottom') oy = offset;

      // Draw extension lines
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x1 + ox, y1 + oy);
      ctx.moveTo(x2, y2);
      ctx.lineTo(x2 + ox, y2 + oy);
      ctx.stroke();

      // Draw dimension line
      ctx.beginPath();
      ctx.moveTo(x1 + ox, y1 + oy);
      ctx.lineTo(x2 + ox, y2 + oy);
      ctx.stroke();

      // Draw ticks
      ctx.setLineDash([]);
      ctx.beginPath();
      ctx.arc(x1 + ox, y1 + oy, 1.5, 0, Math.PI * 2);
      ctx.arc(x2 + ox, y2 + oy, 1.5, 0, Math.PI * 2);
      ctx.fill();

      // Label text
      ctx.setLineDash([]);
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      const mx = (x1 + x2) / 2 + ox;
      const my = (y1 + y2) / 2 + oy;

      ctx.fillStyle = 'rgba(245, 242, 237, 0.85)';
      ctx.fillText(label, mx, my - 6);
      ctx.restore();
    };

    let startTimestamp: number | null = null;

    const render = (time: number) => {
      if (!startTimestamp) startTimestamp = time;
      const elapsed = (time - startTimestamp) % 12000; // 12-second animation cycle

      ctx.clearRect(0, 0, width, height);

      // 1. Draw Grid Background
      ctx.strokeStyle = 'rgba(217, 187, 132, 0.035)';
      ctx.lineWidth = 1;
      const gridSize = 20;
      ctx.beginPath();
      for (let x = 0; x < width; x += gridSize) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
      }
      for (let y = 0; y < height; y += gridSize) {
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
      }
      ctx.stroke();

      // 2. Draw Blueprint Title Text (Top Left)
      ctx.fillStyle = 'rgba(200, 169, 107, 0.35)';
      ctx.font = '8px monospace';
      ctx.textAlign = 'left';
      ctx.fillText('BKP ASSEMBLY SCHEMATIC // CAD-902', 15, 25);
      ctx.fillText('SCALE: 1:10 // MATERIAL: SOLID TEAK', 15, 37);

      // Center coords
      const cx = width / 2;
      const cy = height / 2 + 10;

      // Define assembly progress phases
      // Phase 1 (0s - 3s): Draw teak wooden framework
      // Phase 2 (3s - 4.5s): Mortise-Tenon joints lock (burst particles)
      // Phase 3 (4.5s - 7.5s): Emerald Cushions slide down and assemble
      // Phase 4 (7.5s - 10s): Dimension lines fade in
      // Phase 5 (10s - 12s): Assembly complete, glow highlights, fade out

      const t1 = Math.min(Math.max((elapsed - 0) / 3000, 0), 1); // Legs drawing
      const t2 = Math.min(Math.max((elapsed - 3000) / 1500, 0), 1); // Wood joints lock
      const t3 = Math.min(Math.max((elapsed - 4500) / 3000, 0), 1); // Cushion assembly
      const t4 = Math.min(Math.max((elapsed - 7500) / 2500, 0), 1); // Dimension text
      const t5 = Math.min(Math.max((elapsed - 10000) / 2000, 0), 1); // Glow / Fade

      // Draw floor line
      ctx.strokeStyle = 'rgba(217, 187, 132, 0.1)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(cx - 120, cy + 60);
      ctx.lineTo(cx + 120, cy + 60);
      ctx.stroke();

      // Joint Positions for particles
      const jointFL = { x: cx - 45, y: cy + 30 }; // Front-Left leg joint
      const jointFR = { x: cx + 45, y: cy + 30 }; // Front-Right leg joint
      const jointBL = { x: cx - 35, y: cy - 10 }; // Back leg joint
      const jointSeat = { x: cx, y: cy + 10 };

      // Joint bursts trigger once at the exact transition
      if (elapsed >= 3000 && elapsed <= 3020) {
        createParticles(jointFL.x, jointFL.y, 15);
        createParticles(jointFR.x, jointFR.y, 15);
        createParticles(jointBL.x, jointBL.y, 15);
      }

      ctx.save();
      // Draw Legs (Teak Wood Frame)
      ctx.strokeStyle = 'rgba(200, 169, 107, 0.7)';
      ctx.lineWidth = 1.8;

      // Front Left Leg
      if (t1 > 0) {
        ctx.beginPath();
        ctx.moveTo(cx - 45, cy + 20);
        ctx.lineTo(cx - 45 + (10 * t1), cy + 20 + (40 * t1));
        ctx.stroke();
      }

      // Front Right Leg
      if (t1 > 0.25) {
        const tf = Math.min(Math.max((t1 - 0.25) / 0.75, 0), 1);
        ctx.beginPath();
        ctx.moveTo(cx + 45, cy + 20);
        ctx.lineTo(cx + 45 - (10 * tf), cy + 20 + (40 * tf));
        ctx.stroke();
      }

      // Back Leg
      if (t1 > 0.5) {
        const tf = Math.min(Math.max((t1 - 0.5) / 0.5, 0), 1);
        ctx.beginPath();
        ctx.moveTo(cx - 20, cy + 15);
        ctx.lineTo(cx - 28 - (8 * tf), cy + 15 + (45 * tf));
        ctx.stroke();
      }

      // Connecting framework
      if (t1 > 0.8) {
        const tf = Math.min(Math.max((t1 - 0.8) / 0.2, 0), 1);
        ctx.beginPath();
        // Lower cross bar
        ctx.moveTo(cx - 40, cy + 40);
        ctx.lineTo(cx - 40 + (80 * tf), cy + 40);
        // Seat support bar
        ctx.moveTo(cx - 50, cy + 15);
        ctx.lineTo(cx - 50 + (100 * tf), cy + 15);
        ctx.stroke();
      }

      // Draw Joint Connectors (mortise/tenon highlights)
      if (t2 > 0) {
        ctx.fillStyle = `rgba(200, 169, 107, ${(1 - t2) * 0.8})`;
        ctx.beginPath();
        ctx.arc(jointFL.x, jointFL.y, 4 + t2 * 6, 0, Math.PI * 2);
        ctx.arc(jointFR.x, jointFR.y, 4 + t2 * 6, 0, Math.PI * 2);
        ctx.fill();

        ctx.strokeStyle = '#C8A96B';
        ctx.lineWidth = 1;
        ctx.setLineDash([2, 2]);
        ctx.beginPath();
        ctx.arc(jointFL.x, jointFL.y, 6, 0, Math.PI * 2);
        ctx.arc(jointFR.x, jointFR.y, 6, 0, Math.PI * 2);
        ctx.stroke();
        ctx.setLineDash([]);
      }

      // Cushions Assembly
      if (t3 > 0) {
        ctx.save();
        // Slide down animation
        const offsetY = (1 - t3) * 60;
        ctx.translate(0, offsetY);

        // Seat Cushion (Vibrant Emerald Velvet theme)
        ctx.fillStyle = `rgba(30, 94, 78, ${t3 * 0.75})`;
        ctx.strokeStyle = 'rgba(50, 143, 121, 0.85)';
        ctx.lineWidth = 2;

        ctx.beginPath();
        // Custom curved trapezoid for seat cushion
        ctx.moveTo(cx - 55, cy + 5);
        ctx.bezierCurveTo(cx - 55, cy - 3, cx + 55, cy - 3, cx + 55, cy + 5);
        ctx.lineTo(cx + 48, cy + 18);
        ctx.bezierCurveTo(cx + 40, cy + 22, cx - 40, cy + 22, cx - 48, cy + 18);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        // Cushion seams / buttons (Chesterfield style highlights)
        ctx.fillStyle = 'rgba(245, 242, 237, 0.4)';
        ctx.beginPath();
        ctx.arc(cx - 20, cy + 8, 1.5, 0, Math.PI * 2);
        ctx.arc(cx, cy + 9, 1.5, 0, Math.PI * 2);
        ctx.arc(cx + 20, cy + 8, 1.5, 0, Math.PI * 2);
        ctx.fill();

        // Backrest Cushion (Fades and slides down slightly later)
        if (t3 > 0.3) {
          const tBack = (t3 - 0.3) / 0.7;
          const backOffsetY = (1 - tBack) * 20;
          ctx.translate(0, backOffsetY);

          ctx.fillStyle = `rgba(30, 94, 78, ${tBack * 0.75})`;
          ctx.strokeStyle = 'rgba(50, 143, 121, 0.85)';
          ctx.lineWidth = 2;

          ctx.beginPath();
          // Rounded rectangular backrest
          ctx.roundRect(cx - 40, cy - 40, 80, 26, 4);
          ctx.fill();
          ctx.stroke();

          // Chesterfield buttons on backrest
          ctx.fillStyle = 'rgba(245, 242, 237, 0.4)';
          ctx.beginPath();
          ctx.arc(cx - 15, cy - 27, 1.5, 0, Math.PI * 2);
          ctx.arc(cx + 15, cy - 27, 1.5, 0, Math.PI * 2);
          ctx.fill();

          // Connect backrest to frame with support brackets
          ctx.strokeStyle = 'rgba(200, 169, 107, 0.6)';
          ctx.lineWidth = 1.5;
          ctx.beginPath();
          ctx.moveTo(cx - 25, cy - 14);
          ctx.lineTo(cx - 25, cy);
          ctx.moveTo(cx + 25, cy - 14);
          ctx.lineTo(cx + 25, cy);
          ctx.stroke();
        }

        ctx.restore();
      }

      ctx.restore();

      // 3. Draw dimension lines (Phase 4)
      if (t4 > 0) {
        ctx.save();
        ctx.globalAlpha = t4;

        // Seat width dimension
        drawMeasurement(cx - 55, cy + 5, cx + 55, cy + 5, 'W: 780mm', 'top', 30);
        // Legs depth dimension
        drawMeasurement(cx - 45, cy + 60, cx + 35, cy + 60, 'D: 680mm', 'bottom', 20);
        // Chair Height dimension
        drawMeasurement(cx - 45, cy + 60, cx - 40, cy - 40, 'H: 820mm', 'left', 30);

        // Technical Callout Labels
        ctx.fillStyle = '#C8A96B';
        ctx.font = '7px monospace';
        
        // Wood callout
        ctx.strokeStyle = 'rgba(200, 169, 107, 0.4)';
        ctx.beginPath();
        ctx.moveTo(cx + 35, cy + 50);
        ctx.lineTo(cx + 70, cy + 55);
        ctx.lineTo(cx + 110, cy + 55);
        ctx.stroke();
        ctx.fillText('SOLID TEAK FRAME', cx + 75, cy + 51);

        // Upholstery callout
        ctx.beginPath();
        ctx.moveTo(cx + 10, cy + 8);
        ctx.lineTo(cx + 80, cy - 10);
        ctx.lineTo(cx + 120, cy - 10);
        ctx.stroke();
        ctx.fillText('EMERALD VELVET', cx + 83, cy - 14);

        // Joint callout
        ctx.beginPath();
        ctx.moveTo(jointFL.x, jointFL.y);
        ctx.lineTo(cx - 95, cy + 30);
        ctx.stroke();
        ctx.fillText('MORTISE & TENON', cx - 140, cy + 26);

        ctx.restore();
      }

      // Phase 5: Pulse & Glowing complete highlight, then fade out
      if (t5 > 0) {
        ctx.fillStyle = `rgba(200, 169, 107, ${Math.sin(t5 * Math.PI) * 0.08})`;
        ctx.fillRect(0, 0, width, height);
      }

      // Update and draw particles
      ctx.save();
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.alpha -= p.life;
        if (p.alpha <= 0) {
          particles.splice(i, 1);
        } else {
          ctx.fillStyle = p.color;
          ctx.globalAlpha = p.alpha;
          ctx.beginPath();
          ctx.arc(p.x, p.y, 1.5, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      ctx.restore();

      animationFrameId = requestAnimationFrame(render);
    };

    render(0);

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="w-full h-full relative overflow-hidden bg-black/60 flex items-center justify-center">
      <canvas 
        ref={canvasRef} 
        className="w-full h-full block" 
        style={{ touchAction: 'none' }}
      />
    </div>
  );
}
