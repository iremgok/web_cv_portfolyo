import { motion, useReducedMotion } from 'framer-motion'
import { Heart, Laptop, Orbit, Save } from 'lucide-react'

// 11x8 pixel-art space invader
const ALIEN = [
  '00100000100',
  '00010001000',
  '00111111100',
  '01101110110',
  '11111111111',
  '10111111101',
  '10100000101',
  '00011011000',
]

function PixelAlien({ className }) {
  return (
    <svg viewBox="0 0 11 8" className={className} shapeRendering="crispEdges" aria-hidden="true">
      {ALIEN.flatMap((row, y) =>
        [...row].map((c, x) => (c === '1' ? <rect key={`${x}-${y}`} x={x} y={y} width="1" height="1" fill="currentColor" /> : null)),
      )}
    </svg>
  )
}

const items = [
  { Icon: PixelAlien, className: 'left-[6%] top-[22%] w-14 text-neon/40', duration: 7, delay: 0 },
  { Icon: Heart, className: 'right-[8%] top-[16%] size-9 text-neon/35', duration: 6, delay: 1 },
  { Icon: Laptop, className: 'left-[12%] bottom-[14%] size-11 text-electric/30', duration: 8, delay: 0.5 },
  { Icon: Orbit, className: 'right-[44%] top-[10%] size-10 text-violet/40', duration: 9, delay: 1.5 },
  { Icon: Save, className: 'right-[6%] bottom-[20%] size-9 text-electric/30', duration: 7.5, delay: 2 },
  { Icon: PixelAlien, className: 'right-[30%] bottom-[8%] w-9 text-violet/35', duration: 6.5, delay: 0.8 },
]

export default function FloatingDecor() {
  const reduce = useReducedMotion()
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {items.map(({ Icon, className, duration, delay }, i) => (
        <motion.div
          key={i}
          className={`absolute ${className}`}
          animate={reduce ? undefined : { y: [0, -18, 0], rotate: [0, 6, -4, 0] }}
          transition={{ duration, delay, repeat: Infinity, ease: 'easeInOut' }}
        >
          <Icon className="size-full" />
        </motion.div>
      ))}
    </div>
  )
}
