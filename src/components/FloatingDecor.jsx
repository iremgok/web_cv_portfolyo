import { motion, useReducedMotion } from 'framer-motion'
import { Orbit } from 'lucide-react'

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
  { Icon: PixelAlien, className: 'left-[6%] top-[22%] w-12 text-neon/20', duration: 8, delay: 0 },
  { Icon: Orbit, className: 'right-[44%] top-[10%] size-9 text-violet/20', duration: 10, delay: 1.5 },
  { Icon: PixelAlien, className: 'right-[30%] bottom-[8%] w-8 text-electric/15', duration: 9, delay: 0.8 },
]

export default function FloatingDecor() {
  const reduce = useReducedMotion()
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {items.map(({ Icon, className, duration, delay }, i) => (
        <motion.div
          key={i}
          className={`absolute ${className}`}
          animate={reduce ? undefined : { y: [0, -12, 0] }}
          transition={{ duration, delay, repeat: Infinity, ease: 'easeInOut' }}
        >
          <Icon className="size-full" />
        </motion.div>
      ))}
    </div>
  )
}
