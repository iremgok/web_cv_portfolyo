import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight, Award, CheckCircle2, MessageSquare, X } from 'lucide-react'
import { projects } from '../data/content'
import { SectionHeading, fadeInUp, stagger } from './Reveal'

function ProjectImage({ project, className }) {
  if (project.image) {
    return <img src={project.image} alt={`${project.title} preview`} loading="lazy" className={`object-cover [image-rendering:pixelated] ${className}`} />
  }
  // Placeholder art for projects without a screenshot
  return (
    <div className={`grid-bg flex items-center justify-center bg-gradient-to-br from-violet/30 via-surface-2 to-neon/20 ${className}`}>
      <MessageSquare className="size-16 text-electric drop-shadow-[0_0_14px_rgb(0_212_255/0.6)]" />
    </div>
  )
}

function ProjectModal({ project, onClose }) {
  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose])

  return (
    <motion.div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-modal-title"
        className="card max-h-[90vh] w-full max-w-2xl overflow-y-auto border-neon/40 shadow-neon"
        initial={{ opacity: 0, y: 40, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 40, scale: 0.96 }}
        transition={{ type: 'spring', damping: 24, stiffness: 260 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative">
          <ProjectImage project={project} className="h-56 w-full rounded-t-2xl sm:h-72" />
          <button
            type="button"
            onClick={onClose}
            autoFocus
            className="absolute top-3 right-3 rounded-full bg-black/60 p-2 text-white transition hover:bg-neon"
            aria-label="Close details"
          >
            <X className="size-5" />
          </button>
        </div>
        <div className="p-6 sm:p-8">
          <span className="badge border-neon/40 bg-neon/10 text-neon">
            <Award className="mr-1 size-3.5" /> {project.badge}
          </span>
          <h3 id="project-modal-title" className="mt-3 text-2xl font-bold">{project.title}</h3>
          <p className="mt-3 text-muted">{project.summary}</p>
          <ul className="mt-5 space-y-2.5">
            {project.details.map((d) => (
              <li key={d} className="flex gap-3">
                <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-electric" />
                <span className="text-white/85">{d}</span>
              </li>
            ))}
          </ul>
          <div className="mt-6 flex flex-wrap gap-2">
            {project.tags.map((t) => (
              <span key={t} className="badge">{t}</span>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function Projects() {
  const [selected, setSelected] = useState(null)

  return (
    <section id="projects" className="mx-auto max-w-6xl px-4 py-24 sm:px-6">
      <SectionHeading
        eyebrow="Featured Projects"
        title="Things I've built"
        subtitle="Competition, research and product work across AI, robotics, VR and full-stack development."
      />

      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.1 }}
        className="grid gap-8 md:grid-cols-2"
      >
        {projects.map((project) => (
          <motion.article key={project.title} variants={fadeInUp} className="card card-hover group flex flex-col overflow-hidden">
            <div className="relative overflow-hidden">
              <ProjectImage project={project} className="h-56 w-full transition duration-500 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent" />
              <span className="badge absolute top-4 left-4 border-neon/50 bg-bg/80 text-neon backdrop-blur">
                <Award className="mr-1 size-3.5" /> {project.badge}
              </span>
            </div>

            <div className="flex flex-1 flex-col p-6">
              <h3 className="text-xl font-semibold transition group-hover:text-neon-soft">{project.title}</h3>
              <p className="mt-3 flex-1 leading-relaxed text-muted">{project.summary}</p>
              <div className="mt-5 flex flex-wrap gap-2">
                {project.tags.map((t) => (
                  <span key={t} className="badge">{t}</span>
                ))}
              </div>
              <button
                type="button"
                onClick={() => setSelected(project)}
                className="mt-6 inline-flex w-fit items-center gap-2 font-semibold text-electric transition hover:gap-3 hover:text-white"
              >
                View details <ArrowRight className="size-4" />
              </button>
            </div>
          </motion.article>
        ))}
      </motion.div>

      <AnimatePresence>
        {selected && <ProjectModal project={selected} onClose={() => setSelected(null)} />}
      </AnimatePresence>
    </section>
  )
}
