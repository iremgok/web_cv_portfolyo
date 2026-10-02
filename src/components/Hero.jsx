import { motion } from 'framer-motion'
import { ArrowRight, Download, GraduationCap, MapPin } from 'lucide-react'
import { profile } from '../data/content'
import { fadeInUp, stagger } from './Reveal'
import FloatingDecor from './FloatingDecor'

export default function Hero() {
  return (
    <section id="home" className="grid-bg relative flex min-h-screen items-center overflow-hidden pt-24 pb-16">
      <FloatingDecor />

      <div className="relative mx-auto grid w-full max-w-6xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-[1.15fr_0.85fr]">
        <motion.div variants={stagger} initial="hidden" animate="show">
          <motion.p
            variants={fadeInUp}
            className="inline-flex items-center gap-2 rounded-full border border-neon/40 bg-neon/10 px-4 py-1.5 font-pixel text-sm text-neon"
          >
            <span className="size-2 animate-pulse rounded-full bg-neon" /> Open to opportunities
          </motion.p>

          <motion.h1 variants={fadeInUp} className="mt-6 text-4xl leading-tight font-extrabold sm:text-5xl lg:text-6xl">
            Hi, I&apos;m <span className="text-gradient">{profile.name}</span>
          </motion.h1>

          <motion.p variants={fadeInUp} className="mt-4 font-display text-xl font-semibold text-white/90 sm:text-2xl">
            {profile.title}
          </motion.p>

          <motion.p variants={fadeInUp} className="mt-5 max-w-xl text-lg leading-relaxed text-muted">
            I build intelligent software at the intersection of <span className="text-white">machine learning</span>,{' '}
            <span className="text-white">computer vision</span> and <span className="text-white">embedded systems</span>,
            from autonomous underwater vehicles to VR medical simulations.
          </motion.p>

          <motion.div variants={fadeInUp} className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted">
            <span className="inline-flex items-center gap-2">
              <GraduationCap className="size-4 text-electric" /> Izmir Bakircay University · GPA {profile.gpa}
            </span>
            <span className="inline-flex items-center gap-2">
              <MapPin className="size-4 text-electric" /> {profile.location}
            </span>
          </motion.div>

          <motion.div variants={fadeInUp} className="mt-9 flex flex-wrap gap-4">
            <a href="#projects" className="btn-neon group">
              Explore Projects <ArrowRight className="size-4 transition group-hover:translate-x-1" />
            </a>
            <a href={profile.cv} download="IREM_GOK_CV.pdf" className="btn-ghost">
              <Download className="size-4" /> Download CV
            </a>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto w-full max-w-sm"
        >
          <div className="absolute -inset-6 rounded-[2rem] bg-gradient-to-tr from-neon/30 via-violet/25 to-electric/20 blur-3xl" />
          <div className="animate-character-float relative">
            <div className="animate-neon-pulse relative rounded-[2rem] border-2 border-neon bg-surface/70 p-3">
              <img
                src="/assets/character_transparent.png"
                alt="Pixel-art illustration of Irem Gok"
                width="1194"
                height="1730"
                className="aspect-[1194/1730] max-h-[70vh] w-full rounded-[1.5rem] object-contain"
                fetchPriority="high"
              />
              <span className="absolute -top-3 -left-3 size-4 bg-neon" />
              <span className="absolute -right-3 -bottom-3 size-4 bg-electric" />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
