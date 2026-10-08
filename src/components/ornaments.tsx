import { useId } from "react"
import { cn } from "@/lib/utils"

/** Gradiente dourado partilhado pelos SVG */
function GoldDefs({ id }: { id: string }) {
  return (
    <defs>
      <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#fbefcd" />
        <stop offset="40%" stopColor="#e2c27c" />
        <stop offset="70%" stopColor="#b88a3f" />
        <stop offset="100%" stopColor="#ecd296" />
      </linearGradient>
    </defs>
  )
}

/** Palmeira estilizada: tronco curvo + folhas pendentes */
function PalmTree({ fill }: { fill: string }) {
  const crown = { x: 52, y: 40 }
  // [ângulo inicial, comprimento, queda]
  const fronds: [number, number, number][] = [
    [-172, 26, 14], [-145, 28, 16], [-118, 22, 10], [-90, 16, 4],
    [-62, 22, 10], [-35, 28, 16], [-8, 26, 14],
  ]
  return (
    <g>
      <path
        d="M47 94 C49 78 54 62 51.5 41 L53.5 41 C56.5 62 52.5 78 51.5 94 Z"
        fill={fill}
      />
      {[50, 58, 66, 74, 82].map((y) => (
        <path key={y} d={`M${48 + (94 - y) * 0.03} ${y} h5`} stroke="#1a0e07" strokeWidth="0.7" />
      ))}
      {fronds.map(([a, len, droop], i) => {
        const r = (a * Math.PI) / 180
        const ex = crown.x + Math.cos(r) * len
        const ey = crown.y + Math.sin(r) * len + droop
        const cx = crown.x + Math.cos(r) * len * 0.55
        const cy = crown.y + Math.sin(r) * len * 0.55 - 4
        return (
          <path
            key={i}
            d={`M${crown.x} ${crown.y} Q${cx} ${cy} ${ex} ${ey} Q${cx + 1.5} ${cy + 5} ${crown.x} ${crown.y + 1.5} Z`}
            fill={fill}
          />
        )
      })}
      <circle cx={crown.x} cy={crown.y + 1} r="2.2" fill={fill} />
    </g>
  )
}

/** Selo circular "Matabeira Resort · Mussulo · Angola" */
export function Emblem({ className }: { className?: string }) {
  const uid = useId().replace(/:/g, "")
  const g = `g-${uid}`
  const top = `t-${uid}`
  const bottom = `b-${uid}`
  return (
    <svg viewBox="0 0 120 120" className={cn("drop-shadow-[0_6px_14px_rgba(0,0,0,0.6)]", className)} aria-hidden>
      <GoldDefs id={g} />
      <path id={top} d="M20 60 A40 40 0 0 1 100 60" fill="none" />
      <path id={bottom} d="M16 60 A44 44 0 0 0 104 60" fill="none" />
      <circle cx="60" cy="60" r="57" fill="#1a0e07" stroke={`url(#${g})`} strokeWidth="1.6" />
      <circle cx="60" cy="60" r="33" fill="none" stroke={`url(#${g})`} strokeWidth="0.9" />
      <text fill={`url(#${g})`} fontFamily="Cinzel Variable, serif" fontSize="8.4" letterSpacing="1.6" fontWeight={600}>
        <textPath href={`#${top}`} startOffset="50%" textAnchor="middle">MATABEIRA RESORT</textPath>
      </text>
      <text fill={`url(#${g})`} fontFamily="Cinzel Variable, serif" fontSize="7.2" letterSpacing="1.8" fontWeight={600}>
        <textPath href={`#${bottom}`} startOffset="50%" textAnchor="middle">· MUSSULO · ANGOLA ·</textPath>
      </text>
      <g transform="translate(60 61) scale(0.8) translate(-52 -64)">
        <PalmTree fill={`url(#${g})`} />
      </g>
    </svg>
  )
}

/** Folha de palmeira gerada proceduralmente (dourada ou verde) */
export function PalmFrond({
  className,
  tone = "gold",
}: {
  className?: string
  tone?: "gold" | "green"
}) {
  const uid = useId().replace(/:/g, "")
  const g = `pf-${uid}`
  // caule: curva quadrática P0 -> P2 com controlo C
  const P0 = [6, 214], C = [60, 70], P2 = [214, 18]
  const at = (t: number) => [
    (1 - t) ** 2 * P0[0] + 2 * (1 - t) * t * C[0] + t * t * P2[0],
    (1 - t) ** 2 * P0[1] + 2 * (1 - t) * t * C[1] + t * t * P2[1],
  ]
  const tan = (t: number) => {
    const dx = 2 * (1 - t) * (C[0] - P0[0]) + 2 * t * (P2[0] - C[0])
    const dy = 2 * (1 - t) * (C[1] - P0[1]) + 2 * t * (P2[1] - C[1])
    const l = Math.hypot(dx, dy)
    return [dx / l, dy / l]
  }
  const leaflets: string[] = []
  const N = 26
  for (let i = 2; i < N; i++) {
    const t = i / N
    const [x, y] = at(t)
    const [tx, ty] = tan(t)
    const len = 18 + 62 * Math.sin(Math.PI * Math.min(1, t * 1.15))
    for (const side of [-1, 1]) {
      const ang = side * (0.95 - t * 0.35)
      const dx = tx * Math.cos(ang) - ty * Math.sin(ang)
      const dy = tx * Math.sin(ang) + ty * Math.cos(ang)
      const ex = x + dx * len
      const ey = y + dy * len + len * 0.35
      const mx = x + dx * len * 0.5
      const my = y + dy * len * 0.5 - 2 + len * 0.08
      const w = 2.2 + len * 0.045
      const nx = -dy * w, ny = dx * w
      leaflets.push(
        `M${x.toFixed(1)} ${y.toFixed(1)} Q${(mx + nx).toFixed(1)} ${(my + ny).toFixed(1)} ${ex.toFixed(1)} ${ey.toFixed(1)} Q${(mx - nx).toFixed(1)} ${(my - ny).toFixed(1)} ${x.toFixed(1)} ${y.toFixed(1)}Z`,
      )
    }
  }
  return (
    <svg viewBox="0 0 230 230" className={cn("pointer-events-none", className)} aria-hidden>
      {tone === "gold" ? (
        <GoldDefs id={g} />
      ) : (
        <defs>
          <linearGradient id={g} x1="0" y1="1" x2="1" y2="0">
            <stop offset="0%" stopColor="#123d27" />
            <stop offset="60%" stopColor="#2f6e45" />
            <stop offset="100%" stopColor="#4c8d5c" />
          </linearGradient>
        </defs>
      )}
      <path
        d={`M${P0[0]} ${P0[1]} Q${C[0]} ${C[1]} ${P2[0]} ${P2[1]}`}
        stroke={`url(#${g})`}
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
      />
      <g fill={`url(#${g})`}>
        {leaflets.map((d, i) => (
          <path key={i} d={d} />
        ))}
      </g>
    </svg>
  )
}

/** Divisor ornamental */
export function Flourish({ className }: { className?: string }) {
  const uid = useId().replace(/:/g, "")
  const g = `fl-${uid}`
  return (
    <svg viewBox="0 0 240 20" className={cn("h-4 w-48", className)} aria-hidden>
      <GoldDefs id={g} />
      <g stroke={`url(#${g})`} fill="none" strokeWidth="1" strokeLinecap="round">
        <path d="M4 10 H92" />
        <path d="M148 10 H236" />
        <path d="M92 10 C100 2 108 2 112 10 C108 18 100 18 92 10Z" />
        <path d="M148 10 C140 2 132 2 128 10 C132 18 140 18 148 10Z" />
      </g>
      <path d="M120 3 L124 10 L120 17 L116 10Z" fill={`url(#${g})`} />
      <circle cx="104" cy="10" r="1.6" fill={`url(#${g})`} />
      <circle cx="136" cy="10" r="1.6" fill={`url(#${g})`} />
    </svg>
  )
}

/** Canto ornamental para o cartão claro */
export function PaperCorner({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 60 60" className={cn("absolute size-12 text-paper-gold", className)} aria-hidden>
      <g fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round">
        <path d="M6 54 V18 C6 10 10 6 18 6 H54" />
        <path d="M14 46 C14 30 22 22 40 18 C30 26 24 32 22 44" />
        <path d="M14 46 C20 40 26 38 32 40" />
        <circle cx="18" cy="18" r="3.5" />
      </g>
    </svg>
  )
}
