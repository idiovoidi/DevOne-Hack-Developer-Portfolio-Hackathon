import { memo } from "react";

/**
 * CRT Film Effect Component
 *
 * Lightweight CRT/film grain effect for retro video aesthetic
 */

export const CRTEffect = memo(() => {
  return (
    <>
      {/* Scanlines */}
      <div
        className="absolute inset-0 pointer-events-none z-1"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, rgba(0, 0, 0, 0.15) 0px, transparent 1px, transparent 2px, rgba(0, 0, 0, 0.15) 3px)",
          opacity: 0.4,
        }}
      />

      {/* Vignette */}
      <div
        className="absolute inset-0 pointer-events-none z-1"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 0%, rgba(0, 0, 0, 0.4) 100%)",
        }}
      />

      {/* Flicker overlay */}
      <div
        className="absolute inset-0 pointer-events-none z-1 crt-flicker"
        style={{
          background:
            "linear-gradient(180deg, transparent 0%, rgba(255, 0, 0, 0.05) 50%, transparent 100%)",
        }}
      />

      {/* Film grain - animated opacity for static TV effect */}
      <div className="absolute inset-0 pointer-events-none z-1 overflow-hidden">
        <div
          className="absolute inset-0 crt-grain"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.05'/%3E%3C/svg%3E\")",
            backgroundSize: "200px 200px",
          }}
        />
      </div>

      <style>{`
        @keyframes crt-flicker {
          0%, 100% { opacity: 0.98; }
          50% { opacity: 1; }
        }
        
        @keyframes crt-grain {
          0% { opacity: 0.5; }
          5% { opacity: 0.55; }
          10% { opacity: 0.45; }
          15% { opacity: 0.6; }
          20% { opacity: 0.48; }
          25% { opacity: 0.52; }
          30% { opacity: 0.58; }
          35% { opacity: 0.46; }
          40% { opacity: 0.54; }
          45% { opacity: 0.49; }
          50% { opacity: 0.56; }
          55% { opacity: 0.51; }
          60% { opacity: 0.47; }
          65% { opacity: 0.53; }
          70% { opacity: 0.57; }
          75% { opacity: 0.5; }
          80% { opacity: 0.55; }
          85% { opacity: 0.48; }
          90% { opacity: 0.52; }
          95% { opacity: 0.54; }
          100% { opacity: 0.5; }
        }
        
        .crt-flicker {
          animation: crt-flicker 3s ease-in-out infinite;
        }
        
        .crt-grain {
          animation: crt-grain 0.3s steps(20) infinite;
        }
      `}</style>
    </>
  );
});

CRTEffect.displayName = "CRTEffect";
