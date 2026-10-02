import { motion } from 'framer-motion'
import { Briefcase, FlaskConical, GraduationCap } from 'lucide-react'
import { timeline } from '../data/content'
import { SectionHeading } from './Reveal'

const typeIcon = {
  education: GraduationCap,
  work: Briefcase,
  research: FlaskConical,
}

function Logo({ item }) {
  const Icon = typeIcon[item.type]
  // Blend the logo's own background away: multiply on a light tile for white-bg logos,
  // screen on a dark tile for black-bg logos.
  const tile = item.logoTone === 'light' ? 'bg-white/90' : 'bg-white/5'
  const blend = item.logoTone === 'light' ? 'mix-blend-multiply' : 'mix-blend-screen'
  return (
    <div className={`flex size-16 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-white/10 p-2 ${item.logo ? tile : 'bg-white/5'}`}>
      {item.logo ? (
        <img src={item.logo} alt={`${item.org} logo`} loading="lazy" className={`max-h-full max-w-full object-contain ${blend}`} />
      ) : (
        <Icon className="size-7 text-neon" />
      )}
    </div>
  )
}

export default function Experience() {
  return (
    <section id="experience" className="mx-auto max-w-5xl px-4 py-24 sm:px-6">
      <SectionHeading
        eyebrow="Experience & Education"
        title="Where I've learned & built"
        subtitle="Internships, research and coursework that shaped how I engineer software."
      />

      <ol className="relative ml-3 border-l border-line sm:ml-6">
        {timeline.map((item, i) => {
          const Icon = typeIcon[item.type]
          return (
            <motion.li
              key={`${item.org}-${item.role}`}
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.55, delay: i * 0.05 }}
              className="relative mb-10 pl-8 last:mb-0 sm:pl-12"
            >
              <span className="absolute top-6 -left-[17px] flex size-8 items-center justify-center rounded-full border border-neon/60 bg-bg text-neon shadow-neon-sm">
                <Icon className="size-4" />
              </span>

              <article className="card card-hover p-6">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
                  <Logo item={item} />
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <h3 className="text-lg font-semibold">{item.org}</h3>
                      <span className="badge border-electric/40 bg-electric/10 text-electric">{item.period}</span>
                    </div>
                    <p className="mt-1 font-medium text-neon-soft">{item.role}</p>
                    {item.meta && <p className="mt-1 text-sm text-white/80">{item.meta}</p>}
                    <ul className="mt-3 space-y-1.5 text-muted">
                      {item.points.map((p) => (
                        <li key={p} className="flex gap-2">
                          <span className="mt-2 size-1.5 shrink-0 bg-neon" />
                          <span>{p}</span>
                        </li>
                      ))}
                    </ul>
                    {item.tags && (
                      <div className="mt-4 flex flex-wrap gap-2">
                        {item.tags.map((t) => (
                          <span key={t} className="badge">{t}</span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </article>
            </motion.li>
          )
        })}
      </ol>
    </section>
  )
}
