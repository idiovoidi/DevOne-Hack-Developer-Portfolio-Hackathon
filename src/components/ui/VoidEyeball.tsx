import React, { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring, type MotionValue } from "framer-motion";

const SHARD_COLORS = ["167, 139, 250", "236, 72, 153", "196, 181, 253", "125, 211, 252"];

type Shard = {
  angle: number;
  radius: number;
  spin: number;
  fall: number;
  color: string;
  width: number;
  wobble: number;
  wobbleAmp: number;
  wobbleFreq: number;
  ellipse: number;
  curve: number;
  girth: number;
  length: number;
  tumble: number;
  skew: number;
  ox: number;
  oy: number;
};

const spawnShard = (shard: Shard, maxR: number, atRim: boolean) => {
  let band = atRim ? 0.9 + Math.random() * 0.1 : 0.68 + Math.random() * 0.28;
  if (!atRim && band > 0.34 && band < 0.62) band = 0.72 + Math.random() * 0.22;
  shard.radius = maxR * band;
  shard.angle = Math.random() * Math.PI * 2;
  shard.spin = (0.35 + Math.random() * 1.1) * (Math.random() < 0.5 ? 1 : -1);
  shard.fall = 14 + Math.random() * 26;
  shard.color = SHARD_COLORS[Math.floor(Math.random() * SHARD_COLORS.length)];
  shard.width = 1.1 + Math.random() * 2.2;
  shard.wobble = Math.random() * Math.PI * 2;
  shard.tumble = Math.random() * Math.PI * 2;
  shard.skew = 0.45 + Math.random() * 1.35;
  shard.wobbleAmp = 14 + Math.random() * 34;
  shard.wobbleFreq = 0.4 + Math.random() * 1.6;
  shard.ellipse = 0.65 + Math.random() * 0.58;
  shard.curve = (Math.random() - 0.5) * 3;
  shard.girth = 6 + Math.random() * 12;
  shard.length = 0.4 + Math.random() * 1.25;
  shard.ox = 0;
  shard.oy = 0;
};

/** Face-on accretion field. Debris spirals faster as it falls into the core. */
const PortalVortex: React.FC<{ offsetX: MotionValue<number>; offsetY: MotionValue<number> }> = ({
  offsetX,
  offsetY,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const shards: Shard[] = Array.from({ length: 26 }, () => {
      const shard = {} as Shard;
      spawnShard(shard, 320, false);
      return shard;
    });

    const center = { x: 0, y: 0 };
    const pointer = { clientX: -9999, clientY: -9999, vx: 0, vy: 0, energy: 0 };
    const unsubX = offsetX.on("change", (value) => {
      center.x = value;
    });
    const unsubY = offsetY.on("change", (value) => {
      center.y = value;
    });

    const onPointerMove = (event: MouseEvent) => {
      if (pointer.clientX > -1000) {
        pointer.vx = event.clientX - pointer.clientX;
        pointer.vy = event.clientY - pointer.clientY;
        pointer.energy = Math.min(1, Math.hypot(pointer.vx, pointer.vy) / 16);
      }
      pointer.clientX = event.clientX;
      pointer.clientY = event.clientY;
    };
    window.addEventListener("mousemove", onPointerMove);

    let frame = 0;
    let last = performance.now();
    let running = true;

    const resize = () => {
      const size = canvas.parentElement?.clientWidth ?? 700;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.max(1, size * dpr);
      canvas.height = Math.max(1, size * dpr);
      canvas.style.width = `${size}px`;
      canvas.style.height = `${size}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const draw = (now: number) => {
      if (!running) return;
      const dt = reduced ? 0 : Math.min(0.033, (now - last) / 1000);
      last = now;

      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      const cx = width / 2 + center.x;
      const cy = height / 2 + center.y;
      const maxR = Math.min(width, height) * 0.5;
      const horizon = maxR * 0.07;

      ctx.clearRect(0, 0, width, height);
      ctx.save();
      ctx.translate(cx, cy);
      ctx.globalCompositeOperation = "lighter";

      const spinTime = reduced ? 0 : now / 1000;
      const bounds = canvas.getBoundingClientRect();
      const pointerX = pointer.clientX - bounds.left - width / 2 - center.x;
      const pointerY = pointer.clientY - bounds.top - height / 2 - center.y;
      pointer.energy *= reduced ? 0 : 0.9;

      for (const shard of shards) {
        const closeness = 1 - Math.min(1, shard.radius / maxR);
        const drift = 0.68 + 0.32 * Math.sin(spinTime * shard.wobbleFreq + shard.wobble);
        const whirl = shard.spin * (0.2 + closeness * closeness * 4.2) * drift;
        const pull = shard.fall * (0.28 + closeness ** 1.35 * 7.2);

        if (!reduced) {
          shard.angle += whirl * dt;
          shard.radius -= pull * dt;
          shard.ox *= 0.86;
          shard.oy *= 0.86;
          if (shard.radius <= horizon || shard.radius > maxR * 1.02) spawnShard(shard, maxR, true);
        }

        const breathe = Math.sin(spinTime * shard.wobbleFreq + shard.wobble) * shard.wobbleAmp * (0.55 + closeness * 0.45);
        const flutter = Math.sin(spinTime * shard.wobbleFreq * 1.55 + shard.tumble) * shard.wobbleAmp * 0.35;
        const angle =
          shard.angle +
          Math.sin(spinTime * shard.wobbleFreq * 0.7 + shard.wobble) * 0.28 +
          Math.cos(spinTime * shard.wobbleFreq * 1.1 + shard.tumble) * 0.12;
        const radius = Math.max(horizon, shard.radius + breathe * 0.65 + flutter * 0.35);
        let headX = Math.cos(angle) * radius + shard.ox;
        let headY = Math.sin(angle) * radius * shard.ellipse + shard.oy;

        if (!reduced && pointer.energy > 0.05) {
          const mdx = headX - pointerX;
          const mdy = headY - pointerY;
          const md = Math.hypot(mdx, mdy) || 1;
          const reach = 150;
          if (md < reach) {
            const falloff = (1 - md / reach) ** 2 * pointer.energy * (0.35 + closeness * 0.35);
            const swirlX = (-mdy / md) * 14 * falloff;
            const swirlY = (mdx / md) * 14 * falloff;
            shard.ox += pointer.vx * 0.35 * falloff + swirlX + (mdx / md) * 5 * falloff;
            shard.oy += pointer.vy * 0.35 * falloff + swirlY + (mdy / md) * 5 * falloff;
            headX += swirlX;
            headY += swirlY;
          }
        }

        const body =
          shard.girth * (0.88 + 0.22 * Math.sin(spinTime * shard.wobbleFreq + shard.tumble) * shard.skew);
        const span = body * (1.35 + shard.length * 1.35);
        const tangentX = Math.cos(angle);
        const tangentY = Math.sin(angle) * shard.ellipse;
        const sideX = -Math.sin(angle);
        const sideY = Math.cos(angle);
        const bend = shard.curve * body * 0.65;
        const flap = Math.sin(spinTime * shard.wobbleFreq * 1.35 + shard.tumble) * body * shard.skew * 0.45;
        const twist = Math.cos(spinTime * shard.wobbleFreq * 0.85 + shard.wobble) * body * 0.3;
        const tailX = headX - tangentX * span;
        const tailY = headY - tangentY * span;
        const orbitT = shard.radius / maxR;
        const inDirectOrbit = orbitT > 0.32 && orbitT < 0.64;
        const orbitFade = inDirectOrbit ? 0.14 : orbitT >= 0.64 ? 0.55 : 0.28 + closeness * 0.35;
        const nearPointer = pointer.energy > 0.05 ? Math.max(0, 1 - Math.hypot(headX - pointerX, headY - pointerY) / 150) : 0;
        const alpha = Math.min(0.26, (0.06 + closeness * 0.12 + nearPointer * pointer.energy * 0.08) * orbitFade);
        if (alpha < 0.025) continue;

        const gradient = ctx.createLinearGradient(tailX, tailY, headX, headY);
        gradient.addColorStop(0, `rgba(${shard.color}, 0)`);
        gradient.addColorStop(0.4, `rgba(${shard.color}, ${alpha * 0.85})`);
        gradient.addColorStop(1, `rgba(${shard.color}, ${alpha * 0.12})`);

        ctx.beginPath();
        ctx.moveTo(tailX, tailY);
        ctx.quadraticCurveTo(
          headX - tangentX * span * 0.38 + sideX * (body + flap) + bend + twist,
          headY - tangentY * span * 0.38 + sideY * (body - flap * 0.6) - twist * 0.5,
          headX,
          headY,
        );
        ctx.quadraticCurveTo(
          headX - tangentX * span * 0.52 - sideX * (body * 0.7 - flap) + bend * 0.4,
          headY - tangentY * span * 0.52 - sideY * (body * 0.85 + flap * 0.5) + twist,
          tailX,
          tailY,
        );
        ctx.fillStyle = gradient;
        ctx.fill();
      }

      ctx.restore();

      if (reduced) return;
      frame = requestAnimationFrame(draw);
    };

    resize();
    const observer = new ResizeObserver(resize);
    if (canvas.parentElement) observer.observe(canvas.parentElement);
    frame = requestAnimationFrame(draw);

    return () => {
      running = false;
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("mousemove", onPointerMove);
      unsubX();
      unsubY();
    };
  }, [offsetX, offsetY]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }}
    />
  );
};

const VoidEyeball: React.FC = () => {
  // Chaotic movement with jittery spring
  const eyeX = useMotionValue(0);
  const eyeY = useMotionValue(0);
  const springConfig = { damping: 15, stiffness: 200 };
  const eyeXSpring = useSpring(eyeX, springConfig);
  const eyeYSpring = useSpring(eyeY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;

      const deltaX = (e.clientX - centerX) / centerX;
      const deltaY = (e.clientY - centerY) / centerY;

      const maxMove = 20;
      eyeX.set(deltaX * maxMove);
      eyeY.set(deltaY * maxMove);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [eyeX, eyeY]);

  return (
    <div
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        zIndex: 0,
        pointerEvents: "none",
        overflow: "visible",
      }}
    >
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{
          scale: 1,
          opacity: 0.55,
        }}
        transition={{ duration: 2, ease: "easeOut" }}
        style={{
          width: "min(700px, 90vw)",
          height: "min(700px, 90vw)",
          pointerEvents: "none",
          position: "relative",
        }}
      >
        {/* Chaotic void container */}
        <div
          style={{
            position: "relative",
            width: "100%",
            height: "100%",
          }}
        >
          <PortalVortex offsetX={eyeXSpring} offsetY={eyeYSpring} />

          {[0, 1].map((ring) => (
            <motion.div
              key={`infall-${ring}`}
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                width: "88%",
                height: "88%",
                borderRadius: "50%",
                border: "1px solid rgba(196, 181, 253, 0.28)",
                boxShadow: "0 0 12px rgba(124, 58, 237, 0.18)",
                x: eyeXSpring,
                y: eyeYSpring,
                translateX: "-50%",
                translateY: "-50%",
                pointerEvents: "none",
              }}
              animate={{ scale: [1, 0.12], opacity: [0, 0.32, 0] }}
              transition={{
                duration: 4.6,
                repeat: Infinity,
                ease: "easeIn",
                delay: ring * 2.3,
              }}
            />
          ))}

          {/* Chaotic void core with RGB split */}
          <motion.div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              width: "30%",
              height: "30%",
              borderRadius: "50%",
              x: eyeXSpring,
              y: eyeYSpring,
              translateX: "-50%",
              translateY: "-50%",
            }}
          >
            {/* RGB chromatic aberration layers */}
            {[
              { color: "rgba(255, 0, 100, 0.3)", offset: -3 },
              { color: "rgba(0, 255, 255, 0.3)", offset: 3 },
              { color: "rgba(0, 0, 0, 0.9)", offset: 0 },
            ].map((layer, idx) => (
              <motion.div
                key={`rgb-${idx}`}
                animate={{
                  x: [layer.offset, -layer.offset, layer.offset],
                  y: [layer.offset, layer.offset, -layer.offset],
                  scale: [1, 1.02, 1],
                }}
                transition={{
                  duration: 0.75 + idx * 0.18,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                style={{
                  position: "absolute",
                  inset: 0,
                  borderRadius: "50%",
                  background: `radial-gradient(circle, ${layer.color} 0%, transparent 70%)`,
                  boxShadow:
                    idx === 2
                      ? "inset 0 0 60px rgba(0, 0, 0, 1), 0 0 80px rgba(124, 58, 237, 0.6)"
                      : "none",
                }}
              />
            ))}

            {/* Quiet resting glow */}
            <motion.div
              animate={{
                scale: [1, 1.08, 1],
                opacity: [0.45, 0.62, 0.45],
              }}
              transition={{
                duration: 5.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              style={{
                position: "absolute",
                inset: "18%",
                borderRadius: "50%",
                background:
                  "radial-gradient(circle, rgba(167, 139, 250, 0.55) 0%, rgba(124, 58, 237, 0.28) 46%, transparent 72%)",
                filter: "blur(14px)",
                mixBlendMode: "screen",
              }}
            />

            {/* Occasional deep breath from the core */}
            <motion.div
              animate={{
                scale: [1, 1, 2.35, 1.12, 1],
                opacity: [0, 0, 0.95, 0.28, 0],
              }}
              transition={{
                duration: 7.5,
                times: [0, 0.62, 0.76, 0.88, 1],
                repeat: Infinity,
                ease: "easeOut",
              }}
              style={{
                position: "absolute",
                inset: "-55%",
                borderRadius: "50%",
                background:
                  "radial-gradient(circle, rgba(255, 120, 200, 0.75) 0%, rgba(124, 58, 237, 0.55) 22%, rgba(76, 29, 149, 0.25) 48%, transparent 72%)",
                filter: "blur(22px)",
                mixBlendMode: "screen",
                pointerEvents: "none",
              }}
            />
            <motion.div
              animate={{
                scale: [0.2, 0.2, 2.1, 1.05],
                opacity: [0, 0, 0.72, 0],
              }}
              transition={{
                duration: 7.5,
                times: [0, 0.62, 0.8, 1],
                repeat: Infinity,
                ease: "easeOut",
              }}
              style={{
                position: "absolute",
                inset: "-95%",
                borderRadius: "50%",
                border: "2px solid rgba(221, 214, 254, 0.65)",
                boxShadow:
                  "0 0 48px rgba(167, 139, 250, 0.65), inset 0 0 36px rgba(236, 72, 153, 0.35)",
                pointerEvents: "none",
              }}
            />
            <motion.div
              animate={{
                scale: [1, 1, 1.55, 1],
                opacity: [0.35, 0.35, 0.9, 0.35],
              }}
              transition={{
                duration: 7.5,
                times: [0, 0.62, 0.74, 1],
                repeat: Infinity,
                ease: "easeOut",
              }}
              style={{
                position: "absolute",
                inset: "5%",
                borderRadius: "50%",
                background:
                  "radial-gradient(circle, rgba(167, 139, 250, 0.85) 0%, rgba(124, 58, 237, 0.45) 38%, transparent 70%)",
                filter: "blur(10px)",
                mixBlendMode: "screen",
                pointerEvents: "none",
              }}
            />
          </motion.div>

          {/* Digital corruption artifacts */}
          {[0, 1, 2, 3, 4, 5, 6].map((i) => {
            const width = 30 + i * 8;
            const height = 2 + (i % 3);
            const angle = (i / 7) * 360;
            const xOffset = i % 2 === 0 ? 10 : -10;

            return (
              <motion.div
                key={`artifact-${i}`}
                animate={{
                  opacity: [0, 0.22, 0],
                  scaleX: [0, 1, 0],
                  x: [0, xOffset],
                }}
                transition={{
                  duration: 0.4 + i * 0.05,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.4,
                  repeatDelay: 2.5 + i * 0.3,
                }}
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  width: `${width}px`,
                  height: `${height}px`,
                  background: `linear-gradient(90deg, 
                    transparent, 
                    rgba(${
                      i % 2 === 0 ? "167, 139, 250" : "236, 72, 153"
                    }, 0.8), 
                    transparent
                  )`,
                  transform: `translate(-50%, -50%) rotate(${angle}deg) translateY(${
                    80 + i * 20
                  }px)`,
                  filter: "blur(1px)",
                }}
              />
            );
          })}

          {/* Distortion field with noise */}
          <motion.div
            animate={{
              scale: [1, 1, 1.28, 1.04, 1],
              opacity: [0.12, 0.12, 0.38, 0.18, 0.12],
              rotate: [0, 360],
            }}
            transition={{
              duration: 7.5,
              times: [0, 0.62, 0.76, 0.88, 1],
              repeat: Infinity,
              ease: "linear",
            }}
            style={{
              position: "absolute",
              inset: "-50%",
              borderRadius: "50%",
              background: `
                radial-gradient(
                  circle,
                  transparent 30%,
                  rgba(124, 58, 237, 0.15) 50%,
                  rgba(167, 139, 250, 0.2) 70%,
                  rgba(236, 72, 153, 0.1) 85%,
                  transparent 100%
                )
              `,
              filter: "blur(60px) contrast(1.3)",
              mixBlendMode: "screen",
            }}
          />
        </div>
      </motion.div>
    </div>
  );
};

export { VoidEyeball };
export default VoidEyeball;
