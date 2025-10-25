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
        className="absolute inset-0 pointer-events-none z-[1]"
        style={{
          backgroundImage: 'repeating-linear-gradient(0deg, rgba(0, 0, 0, 0.15) 0px, transparent 1px, transparent 2px, rgba(0, 0, 0, 0.15) 3px)',
          opacity: 0.4,
        }}
      />
      
      {/* Vignette */}
      <div 
        className="absolute inset-0 pointer-events-none z-[1]"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 0%, rgba(0, 0, 0, 0.4) 100%)',
        }}
      />
      
      {/* Flicker overlay */}
      <div 
        className="absolute inset-0 pointer-events-none z-[1] crt-flicker"
        style={{
          background: 'linear-gradient(180deg, transparent 0%, rgba(255, 0, 0, 0.05) 50%, transparent 100%)',
        }}
      />
      
      {/* Film grain */}
      <div 
        className="absolute inset-0 pointer-events-none z-[1] crt-grain"
        style={{
          backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\' opacity=\'0.05\'/%3E%3C/svg%3E")',
          opacity: 0.3,
        }}
      />

      <style>{`
        @keyframes crt-flicker {
          0%, 100% { opacity: 0.95; }
          50% { opacity: 1; }
        }
        
        @keyframes crt-grain {
          0%, 100% { transform: translate(0, 0); }
          10% { transform: translate(-5%, -5%); }
          20% { transform: translate(-10%, 5%); }
          30% { transform: translate(5%, -10%); }
          40% { transform: translate(-5%, 15%); }
          50% { transform: translate(-10%, 5%); }
          60% { transform: translate(15%, 0); }
          70% { transform: translate(0, 10%); }
          80% { transform: translate(-15%, 0); }
          90% { transform: translate(10%, 5%); }
        }
        
        .crt-flicker {
          animation: crt-flicker 0.15s infinite;
        }
        
        .crt-grain {
          animation: crt-grain 8s steps(10) infinite;
        }
      `}</style>
    </>
  );
});

CRTEffect.displayName = "CRTEffect";
