import { ArrowUp, Heart, Mail } from 'lucide-react'
import { profile } from '../data/content'
import { GithubIcon, LinkedinIcon } from './BrandIcons'

const links = [
  { label: 'GitHub', href: profile.github, Icon: GithubIcon, external: true },
  { label: 'LinkedIn', href: profile.linkedin, Icon: LinkedinIcon, external: true },
  { label: 'Email', href: `mailto:${profile.email}`, Icon: Mail },
]

export default function Footer() {
  return (
    <footer className="border-t border-line bg-surface/40">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 px-4 py-10 sm:flex-row sm:px-6">
        <p className="flex items-center gap-1.5 text-sm text-muted">
          © {new Date().getFullYear()} {profile.name}. Built with <Heart className="size-4 fill-neon text-neon" /> React &amp; Tailwind.
        </p>
        <div className="flex items-center gap-3">
          {links.map(({ label, href, Icon, external }) => (
            <a
              key={label}
              href={href}
              aria-label={label}
              {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              className="rounded-lg border border-line p-2.5 text-muted transition hover:border-neon hover:text-neon hover:shadow-neon-sm"
            >
              <Icon className="size-5" />
            </a>
          ))}
          <a href="#home" aria-label="Back to top" className="ml-2 rounded-lg bg-neon/10 p-2.5 text-neon transition hover:bg-neon hover:text-white">
            <ArrowUp className="size-5" />
          </a>
        </div>
      </div>
    </footer>
  )
}
