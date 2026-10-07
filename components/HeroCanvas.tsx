'use client';

import { useEffect, useRef } from 'react';

/**
 * Generative tech-grid / wireframe animation for the hero.
 * A mesh of nodes gently displaced by layered sine waves, connected by
 * lines, with a traveling accent pulse and a few brighter data nodes.
 * Theme-aware (reads CSS color vars, re-reads on theme change), DPR-capped,
 * pauses when the tab is hidden, and renders a single static frame under
 * prefers-reduced-motion.
 */
export function HeroCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d')!;

    const reduce =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let width = 0;
    let height = 0;
    let dpr = 1;
    const spacing = 46; // px between grid nodes
    let cols = 0;
    let rows = 0;

    // Colors, refreshed from the theme.
    const colors = { line: '15,20,28', accent: '255,90,40', node: '232,237,242' };

    function readColors() {
      const cs = getComputedStyle(document.documentElement);
      const g = (v: string, fallback: string) => {
        const raw = cs.getPropertyValue(v).trim();
        if (!raw) return fallback;
        // stored as "r g b" channel triplets -> "r,g,b"
        return raw.split(/\s+/).join(',');
      };
      colors.line = g('--c-ash', '126,139,153');
      colors.accent = g('--c-iris', '255,90,40');
      colors.node = g('--c-chalk', '232,237,242');
    }

    function resize() {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      cols = Math.ceil(width / spacing) + 2;
      rows = Math.ceil(height / spacing) + 2;
    }

    function pointAt(c: number, r: number, t: number) {
      const baseX = c * spacing;
      const baseY = r * spacing;
      const dx = Math.sin((r * 0.6 + t * 0.6)) * 6 + Math.cos((c * 0.4 - t * 0.4)) * 5;
      const dy = Math.cos((c * 0.5 + t * 0.5)) * 6 + Math.sin((r * 0.3 + t * 0.3)) * 5;
      return [baseX + dx, baseY + dy] as const;
    }

    function draw(t: number) {
      if (!canvas) return;
      ctx.clearRect(0, 0, width, height);

      // Traveling pulse band position (0..1 across the grid diagonally).
      const pulse = (t * 0.08) % 1.6;

      // Lines
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const [x, y] = pointAt(c, r, t);
          // horizontal neighbor
          if (c < cols - 1) {
            const [nx, ny] = pointAt(c + 1, r, t);
            drawEdge(x, y, nx, ny, c, r, pulse);
          }
          // vertical neighbor
          if (r < rows - 1) {
            const [nx, ny] = pointAt(c, r + 1, t);
            drawEdge(x, y, nx, ny, c, r, pulse);
          }
        }
      }

      // Nodes (a sparse subset brighter + accent pulse)
      for (let r = 0; r < rows; r += 1) {
        for (let c = 0; c < cols; c += 1) {
          const [x, y] = pointAt(c, r, t);
          const diag = (c + r) / (cols + rows);
          const near = Math.abs(diag - pulse % 1) < 0.06;
          const isData = (c * 7 + r * 13) % 11 === 0;
          if (near) {
            ctx.fillStyle = `rgba(${colors.accent},0.9)`;
            ctx.beginPath();
            ctx.arc(x, y, 2.2, 0, Math.PI * 2);
            ctx.fill();
          } else if (isData) {
            ctx.fillStyle = `rgba(${colors.node},0.28)`;
            ctx.beginPath();
            ctx.arc(x, y, 1.1, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      }
    }

    function drawEdge(
      x: number,
      y: number,
      nx: number,
      ny: number,
      c: number,
      r: number,
      pulse: number
    ) {
      const diag = (c + r) / (cols + rows);
      const near = Math.abs(diag - (pulse % 1)) < 0.05;
      ctx.strokeStyle = near
        ? `rgba(${colors.accent},0.5)`
        : `rgba(${colors.line},0.22)`;
      ctx.lineWidth = near ? 1.1 : 0.7;
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(nx, ny);
      ctx.stroke();
    }

    let raf = 0;
    let start = performance.now();
    let running = true;

    function loop(now: number) {
      if (!running) return;
      const t = (now - start) / 1000;
      draw(t);
      raf = requestAnimationFrame(loop);
    }

    function onVisibility() {
      if (document.hidden) {
        running = false;
        cancelAnimationFrame(raf);
      } else if (!reduce) {
        running = true;
        start = performance.now();
        raf = requestAnimationFrame(loop);
      }
    }

    const themeObserver = new MutationObserver(() => readColors());
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme'],
    });

    readColors();
    resize();

    if (reduce) {
      draw(0.5); // one static frame
    } else {
      raf = requestAnimationFrame(loop);
    }

    window.addEventListener('resize', resize);
    document.addEventListener('visibilitychange', onVisibility);

    return () => {
      cancelAnimationFrame(raf);
      running = false;
      window.removeEventListener('resize', resize);
      document.removeEventListener('visibilitychange', onVisibility);
      themeObserver.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="hero-canvas"
    />
  );
}
