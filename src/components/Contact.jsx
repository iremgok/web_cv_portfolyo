import { useState } from 'react'
import { motion } from 'framer-motion'
import { CircleCheck, Download, Mail, Send } from 'lucide-react'
import { profile } from '../data/content'
import { GithubIcon, LinkedinIcon } from './BrandIcons'
import { Reveal, SectionHeading } from './Reveal'

const socials = [
  { label: 'LinkedIn', value: 'in/gokirem', href: profile.linkedin, Icon: LinkedinIcon, external: true },
  { label: 'GitHub', value: '@iremgok', href: profile.github, Icon: GithubIcon, external: true },
  { label: 'Email', value: profile.email, href: `mailto:${profile.email}`, Icon: Mail, wide: true },
]

const EMPTY = { name: '', email: '', subject: '', message: '' }
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function validate(form) {
  const errors = {}
  if (!form.name.trim()) errors.name = 'Please enter your name.'
  if (!EMAIL_RE.test(form.email.trim())) errors.email = 'Please enter a valid email.'
  if (!form.subject.trim()) errors.subject = 'Please add a subject.'
  if (form.message.trim().length < 10) errors.message = 'Message should be at least 10 characters.'
  return errors
}

function Field({ id, label, error, as = 'input', className = '', ...props }) {
  const Comp = as
  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-sm font-medium text-white/85">{label}</label>
      <Comp
        id={id}
        name={id}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
        className={`w-full rounded-xl border bg-bg/70 px-4 py-3 text-white placeholder:text-white/30 transition outline-none focus:border-neon focus:shadow-neon-sm ${
          error ? 'border-red-500/70' : 'border-line'
        } ${className}`}
        {...props}
      />
      {error && <p id={`${id}-error`} className="mt-1.5 text-sm text-red-400">{error}</p>}
    </div>
  )
}

export default function Contact() {
  const [form, setForm] = useState(EMPTY)
  const [errors, setErrors] = useState({})
  const [sent, setSent] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((f) => ({ ...f, [name]: value }))
    if (errors[name]) setErrors((er) => ({ ...er, [name]: undefined }))
  }

  // No backend: open the visitor's mail client with the message prefilled.
  const handleSubmit = (e) => {
    e.preventDefault()
    const found = validate(form)
    setErrors(found)
    if (Object.keys(found).length) return

    const body = `${form.message.trim()}\n\n${form.name.trim()} <${form.email.trim()}>`
    const url = `mailto:${profile.email}?subject=${encodeURIComponent(form.subject.trim())}&body=${encodeURIComponent(body)}`
    window.location.href = url
    setSent(true)
    setForm(EMPTY)
  }

  return (
    <section id="contact" className="mx-auto max-w-6xl px-4 py-24 sm:px-6">
      <SectionHeading
        eyebrow="Contact"
        title="Let's build something together"
        subtitle="Internship, research collaboration or just a chat about ML and embedded systems: my inbox is open."
      />

      <div className="grid gap-8 lg:grid-cols-[1.2fr_1fr]">
        <Reveal as="form" onSubmit={handleSubmit} noValidate className="card space-y-5 p-6 sm:p-8">
          <div className="grid gap-5 sm:grid-cols-2">
            <Field id="name" label="Full Name" placeholder="Jane Doe" value={form.name} onChange={handleChange} error={errors.name} autoComplete="name" maxLength={100} />
            <Field id="email" label="Email" type="email" placeholder="jane@example.com" value={form.email} onChange={handleChange} error={errors.email} autoComplete="email" maxLength={150} />
          </div>
          <Field id="subject" label="Subject" placeholder="Internship opportunity" value={form.subject} onChange={handleChange} error={errors.subject} maxLength={150} />
          <Field id="message" label="Message" as="textarea" rows={5} placeholder="Hi Irem, ..." value={form.message} onChange={handleChange} error={errors.message} maxLength={2000} className="resize-y" />
          <button type="submit" className="btn-neon w-full sm:w-auto">
            <Send className="size-4" /> Send Message
          </button>
          {sent && (
            <motion.p initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} role="status" className="flex items-center gap-2 text-sm text-electric">
              <CircleCheck className="size-4" /> Your email app should open with the message ready to send.
            </motion.p>
          )}
        </Reveal>

        <Reveal className="flex flex-col gap-6">
          <div className="grid grid-cols-2 gap-4">
            {socials.map(({ label, value, href, Icon, external, wide }) => (
              <a
                key={label}
                href={href}
                {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                className={`card card-hover group flex flex-col gap-3 p-5 ${wide ? 'col-span-2' : ''}`}
              >
                <span className="inline-flex size-11 items-center justify-center rounded-xl border border-neon/40 bg-neon/10 text-neon transition group-hover:bg-neon group-hover:text-white">
                  <Icon className="size-5" />
                </span>
                <span className="font-semibold">{label}</span>
                <span className="truncate text-sm text-muted">{value}</span>
              </a>
            ))}
          </div>

          <a
            href={profile.cv}
            download="IREM_GOK_CV.pdf"
            className="animate-neon-pulse group flex items-center justify-center gap-3 rounded-2xl border-2 border-neon bg-gradient-to-r from-neon to-fuchsia-600 px-8 py-6 text-lg font-bold text-white transition hover:-translate-y-1"
          >
            <Download className="size-6 transition group-hover:translate-y-0.5" />
            Download CV
            <span className="font-pixel text-sm font-normal text-white/80">PDF</span>
          </a>
        </Reveal>
      </div>
    </section>
  )
}
