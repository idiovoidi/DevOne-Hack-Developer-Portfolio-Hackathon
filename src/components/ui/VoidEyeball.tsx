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
  ox: number;
  oy: number;
};

const spawnShard = (shard: Shard, maxR: number, atRim: boolean) => {
  const band = atRim ? 0.86 + Math.random() * 0.14 : 0.2 + Math.random() * 0.8;
  shard.radius = maxR * band;
  shard.angle = Math.random() * Math.PI * 2;
  shard.spin = (0.55 + Math.random() * 1.15) * (Math.random() < 0.5 ? 1 : -1);
  shard.fall = 16 + Math.random() * 34;
  shard.color = SHARD_COLORS[Math.floor(Math.random() * SHARD_COLORS.length)];
  shard.width = 1.1 + Math.random() * 2.2;
  shard.wobble = Math.random() * Math.PI * 2;
  shard.wobbleAmp = 8 + Math.random() * 26;
  shard.wobbleFreq = 0.45 + Math.random() * 1.7;
  shard.ellipse = 0.78 + Math.random() * 0.4;
  shard.curve = (Math.random() - 0.5) * 1.6;
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
    const shards: Shard[] = Array.from({ length: 120 }, () => {
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
      ctx.lineCap = "round";
      for (let arm = 0; arm < 3; arm += 1) {
        ctx.beginPath();
        const offset = arm * ((Math.PI * 2) / 3) + spinTime * 0.28;
        for (let step = 0; step <= 64; step += 1) {
          const t = step / 64;
          const flutter = Math.sin(spinTime * 0.8 + t * 9 + arm) * (10 + t * 16);
          const radius = horizon + (maxR * 0.92 - horizon) * t * t + flutter;
          const angle = offset + (1 - t) * 5.4 + Math.sin(spinTime * 0.5 + t * 6) * 0.18;
          const x = Math.cos(angle) * radius;
          const y = Math.sin(angle) * radius * (0.92 + arm * 0.04);
          if (step === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.strokeStyle = "rgba(167, 139, 250, 0.1)";
        ctx.lineWidth = 7;
        ctx.stroke();
      }

      for (const shard of shards) {
        const closeness = 1 - Math.min(1, shard.radius / maxR);
        const drift = 0.72 + 0.28 * Math.sin(spinTime * shard.wobbleFreq + shard.wobble);
        const whirl = shard.spin * (0.32 + closeness * closeness * 6.2) * drift;
        const pull = shard.fall * (0.22 + closeness * closeness * 5.4) * (0.7 + 0.3 * drift);

        if (!reduced) {
          shard.angle += whirl * dt;
          shard.radius -= pull * dt;
          shard.ox *= 0.9;
          shard.oy *= 0.9;
          if (shard.radius <= horizon || shard.radius > maxR) spawnShard(shard, maxR, true);
        }

        const breathe = Math.sin(spinTime * shard.wobbleFreq + shard.wobble) * shard.wobbleAmp * (1 - closeness * 0.45);
        const angle = shard.angle + Math.sin(spinTime * shard.wobbleFreq * 0.65 + shard.wobble) * 0.18 * (1 - closeness * 0.4);
        const radius = Math.max(horizon, shard.radius + breathe);
        let headX = Math.cos(angle) * radius + shard.ox;
        let headY = Math.sin(angle) * radius * shard.ellipse + shard.oy;

        if (!reduced && pointer.energy > 0.05) {
          const mdx = headX - pointerX;
          const mdy = headY - pointerY;
          const md = Math.hypot(mdx, mdy) || 1;
          const reach = 150;
          if (md < reach) {
            const falloff = (1 - md / reach) ** 2 * pointer.energy;
            const swirlX = (-mdy / md) * 22 * falloff;
            const swirlY = (mdx / md) * 22 * falloff;
            shard.ox += pointer.vx * 0.55 * falloff + swirlX + (mdx / md) * 8 * falloff;
            shard.oy += pointer.vy * 0.55 * falloff + swirlY + (mdy / md) * 8 * falloff;
            headX += swirlX;
            headY += swirlY;
          }
        }

        const streak = Math.min(radius * 0.42, 12 + closeness * 64);
        const tailRadius = Math.min(maxR, radius + streak);
        const tailAngle = angle - Math.sign(shard.spin || 1) * Math.min(0.7, streak / Math.max(radius, 28));
        const tailX = Math.cos(tailAngle) * tailRadius + shard.ox * 0.35;
        const tailY = Math.sin(tailAngle) * tailRadius * shard.ellipse + shard.oy * 0.35;
        const midAngle = (angle + tailAngle) / 2;
        const midRadius = (radius + tailRadius) / 2;
        const bend = shard.curve * (14 + closeness * 18);
        const controlX = Math.cos(midAngle) * midRadius - Math.sin(midAngle) * bend + shard.ox * 0.6;
        const controlY = Math.sin(midAngle) * midRadius * shard.ellipse + Math.cos(midAngle) * bend + shard.oy * 0.6;
        const nearPointer = pointer.energy > 0.05 ? Math.max(0, 1 - Math.hypot(headX - pointerX, headY - pointerY) / 150) : 0;
        const alpha = Math.min(1, 0.12 + closeness * 0.72 + nearPointer * pointer.energy * 0.45);

        const gradient = ctx.createLinearGradient(tailX, tailY, headX, headY);
        gradient.addColorStop(0, `rgba(${shard.color}, 0)`);
        gradient.addColorStop(0.65, `rgba(${shard.color}, ${alpha * 0.75})`);
        gradient.addColorStop(1, `rgba(255, 255, 255, ${Math.min(0.95, alpha)})`);

        ctx.beginPath();
        ctx.moveTo(tailX, tailY);
        ctx.quadraticCurveTo(controlX, controlY, headX, headY);
        ctx.strokeStyle = gradient;
        ctx.lineWidth = shard.width * (1.35 - closeness * 0.55);
        ctx.stroke();
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
          opacity: 0.72,
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

          {[0, 1, 2, 3].map((ring) => (
            <motion.div
              key={`infall-${ring}`}
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                width: "88%",
                height: "88%",
                borderRadius: "50%",
                border: "1px solid rgba(196, 181, 253, 0.55)",
                boxShadow: "0 0 18px rgba(124, 58, 237, 0.35), inset 0 0 18px rgba(236, 72, 153, 0.2)",
                x: eyeXSpring,
                y: eyeYSpring,
                translateX: "-50%",
                translateY: "-50%",
                pointerEvents: "none",
              }}
              animate={{ scale: [1, 0.08], opacity: [0, 0.7, 0] }}
              transition={{
                duration: 2.8,
                repeat: Infinity,
                ease: "easeIn",
                delay: ring * 0.7,
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

            {/* Unstable core pulse */}
            <motion.div
              animate={{
                scale: [1, 1.4, 0.9, 1.2, 1],
                opacity: [0.8, 1, 0.6, 1, 0.8],
                rotate: [0, 90, 180, 270, 360],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              style={{
                position: "absolute",
                inset: "20%",
                borderRadius: "50%",
                background:
                  "radial-gradient(circle, rgba(167, 139, 250, 0.9) 0%, rgba(124, 58, 237, 0.5) 40%, transparent 70%)",
                filter: "blur(12px)",
                mixBlendMode: "screen",
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
                  opacity: [0, 0.6, 0],
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
              scale: [1, 1.1, 1],
              opacity: [0.15, 0.25, 0.15],
              rotate: [0, 360],
            }}
            transition={{
              duration: 8,
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
