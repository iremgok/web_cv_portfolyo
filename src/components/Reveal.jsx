import { motion } from 'framer-motion'

export const fadeInUp = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
}

export const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
}

export function Reveal({ as = 'div', variants = fadeInUp, className, children, ...rest }) {
  const Comp = motion[as]
  return (
    <Comp
      variants={variants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.15 }}
      className={className}
      {...rest}
    >
      {children}
    </Comp>
  )
}

export function SectionHeading({ eyebrow, title, subtitle }) {
  return (
    <Reveal className="mb-12 text-center">
      <p className="font-pixel text-lg tracking-[0.2em] text-neon uppercase sm:text-xl">{eyebrow}</p>
      <h2 className="mt-4 text-4xl leading-tight font-bold sm:text-5xl lg:text-6xl">{title}</h2>
      {subtitle && <p className="mx-auto mt-4 max-w-2xl text-muted">{subtitle}</p>}
    </Reveal>
  )
}
