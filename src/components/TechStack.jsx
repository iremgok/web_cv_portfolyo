import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { BrainCircuit, CodeXml, Layers, Wrench } from 'lucide-react'
import { techStack } from '../data/content'
import { SectionHeading, Reveal } from './Reveal'

const tabIcons = {
  Languages: CodeXml,
  Frameworks: Layers,
  'ML & Data': BrainCircuit,
  'Dev Tools': Wrench,
}

export default function TechStack() {
  const categories = Object.keys(techStack)
  const [active, setActive] = useState(categories[0])

  return (
    <section id="stack" className="mx-auto max-w-5xl px-4 py-24 sm:px-6">
      <SectionHeading eyebrow="Tech Stack" title="Tools of the trade" />

      <Reveal>
        <div role="tablist" aria-label="Technology categories" className="mx-auto flex max-w-fit flex-wrap justify-center gap-2 rounded-2xl border border-line bg-surface/60 p-2">
          {categories.map((cat) => {
            const Icon = tabIcons[cat]
            const selected = cat === active
            return (
              <button
                key={cat}
                type="button"
                role="tab"
                id={`tab-${cat}`}
                aria-selected={selected}
                aria-controls="stack-panel"
                onClick={() => setActive(cat)}
                className={`relative inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition ${
                  selected ? 'text-white' : 'text-muted hover:text-white'
                }`}
              >
                {selected && (
                  <motion.span layoutId="stack-tab" className="absolute inset-0 rounded-xl bg-neon shadow-neon-sm" transition={{ type: 'spring', damping: 26, stiffness: 300 }} />
                )}
                <Icon className="relative size-4" />
                <span className="relative">{cat}</span>
              </button>
            )
          })}
        </div>

        <div id="stack-panel" role="tabpanel" aria-labelledby={`tab-${active}`} className="mt-10 min-h-48">
          <AnimatePresence mode="wait">
            <motion.ul
              key={active}
              initial="hidden"
              animate="show"
              exit={{ opacity: 0, y: -10, transition: { duration: 0.15 } }}
              variants={{ hidden: {}, show: { transition: { staggerChildren: 0.05 } } }}
              className="grid grid-cols-2 gap-4 sm:grid-cols-3"
            >
              {techStack[active].map((tech) => (
                <motion.li
                  key={tech}
                  variants={{ hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } }}
                  className="card card-hover flex items-center gap-3 px-5 py-4"
                >
                  <span className="size-2.5 shrink-0 bg-neon shadow-neon-sm" />
                  <span className="font-pixel text-lg tracking-wide">{tech}</span>
                </motion.li>
              ))}
            </motion.ul>
          </AnimatePresence>
        </div>
      </Reveal>
    </section>
  )
}
