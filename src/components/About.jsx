import { motion } from 'framer-motion'
import { BrainCircuit, Cpu, Layers } from 'lucide-react'
import { Reveal, SectionHeading, fadeInUp, stagger } from './Reveal'

const highlights = [
  {
    Icon: BrainCircuit,
    title: 'Data Science',
    text: 'Machine learning and computer vision with Scikit-Learn, TensorFlow, Keras and OpenCV, from data cleaning to deployed models.',
    accent: 'text-neon border-neon/40 bg-neon/10',
  },
  {
    Icon: Cpu,
    title: 'Embedded Systems',
    text: 'Automotive embedded workflows, PLC-connected automation and autonomous underwater vehicle software in C/C++ and Python.',
    accent: 'text-electric border-electric/40 bg-electric/10',
  },
  {
    Icon: Layers,
    title: 'Full-Stack Dev',
    text: 'APIs with ASP.NET Core and FastAPI, frontends in Angular, mobile apps with Flutter, all shipped in Docker containers.',
    accent: 'text-violet-300 border-violet/50 bg-violet/15',
  },
]

export default function About() {
  return (
    <section id="about" className="mx-auto max-w-6xl px-4 py-24 sm:px-6">
      <SectionHeading eyebrow="About Me" title="Engineering ideas into working systems" />

      <Reveal className="mx-auto max-w-3xl space-y-5 text-center text-lg leading-relaxed text-muted">
        <p>
          I&apos;m a senior <span className="text-white">Computer Engineering</span> student at{' '}
          <span className="text-white">Izmir Bakircay University</span> with a 3.44 GPA. I enjoy problems where software
          meets the real world: robots that see underwater, simulations that train doctors, tools that make factories smarter.
        </p>
        <p>
          My goal is to grow as an engineer in <span className="text-white">machine learning</span>,{' '}
          <span className="text-white">artificial intelligence</span> and{' '}
          <span className="text-white">embedded systems</span>, building reliable, data-driven products that scale from a
          microcontroller to the cloud.
        </p>
      </Reveal>

      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        className="mt-14 grid gap-6 md:grid-cols-3"
      >
        {highlights.map(({ Icon, title, text, accent }) => (
          <motion.article key={title} variants={fadeInUp} className="card card-hover p-7">
            <div className={`inline-flex rounded-xl border p-3 ${accent}`}>
              <Icon className="size-6" />
            </div>
            <h3 className="mt-5 text-xl font-semibold">{title}</h3>
            <p className="mt-3 leading-relaxed text-muted">{text}</p>
          </motion.article>
        ))}
      </motion.div>
    </section>
  )
}
