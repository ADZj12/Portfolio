/**
 * Ambient animated background: soft drifting gradient orbs plus a faint grid.
 * Fixed behind all content, pointer-events-none, theme-aware via CSS vars.
 * Pure CSS animation (GPU compositing, no JS loop) and fully disabled under
 * prefers-reduced-motion by the global media query in globals.css.
 */
export function Backdrop() {
  return (
    <div className="backdrop" aria-hidden="true">
      <div className="backdrop-grid" />
      <div className="orb orb-1" />
      <div className="orb orb-2" />
      <div className="orb orb-3" />
    </div>
  );
}
