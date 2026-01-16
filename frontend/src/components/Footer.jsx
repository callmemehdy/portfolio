import { useState, useEffect } from 'react';
import { Github, Linkedin, Mail, Phone, MapPin, ArrowUp } from 'lucide-react';
import { settingsService } from '../services/settings';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const [settings, setSettings] = useState({});
  
  useEffect(() => {
    settingsService.getSettings().then(setSettings).catch(console.error);
  }, []);
  
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const socialLinks = [
    { icon: Github, href: settings.github || 'https://github.com/callmemehdy', label: 'GitHub' },
    { icon: Linkedin, href: settings.linkedin || 'https://linkedin.com/in/elakarymehdi', label: 'LinkedIn' },
    { icon: Mail, href: `mailto:${settings.email || 'mehdyakr@gmail.com'}`, label: 'Email' },
  ];

  const quickLinks = [
    { name: 'About', href: '#about' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <footer className="relative bg-gradient-to-b from-vintage-cream to-vintage-tan dark:from-dark-surface dark:to-dark-bg border-t-4 border-vintage-ink dark:border-dark-border transition-colors mt-20">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-2xl font-typewriter font-bold text-vintage-ink dark:text-dark-text mb-4">
              {settings.full_name || 'Mehdi EL AKARY'}
            </h3>
            <p className="font-mono text-sm text-vintage-darkBrown dark:text-dark-textSecondary leading-relaxed mb-4">
              {settings.bio || 'AI/Software Engineer passionate about machine learning, building scalable systems, and creating elegant solutions to complex problems.'}
            </p>
            <div className="flex gap-4">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-vintage-ink dark:bg-dark-card border-2 border-vintage-ink dark:border-dark-border text-vintage-cream dark:text-dark-text hover:bg-vintage-accent dark:hover:bg-dark-accent hover:scale-110 transition-all"
                  aria-label={label}
                >
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-xl font-typewriter font-bold text-vintage-ink dark:text-dark-text mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2">
              {quickLinks.map(({ name, href }) => (
                <li key={name}>
                  <a
                    href={href}
                    className="font-mono text-vintage-darkBrown dark:text-dark-textSecondary hover:text-vintage-accent dark:hover:text-dark-accent transition-colors inline-flex items-center gap-2"
                  >
                    <span className="text-vintage-accent dark:text-dark-accent">→</span>
                    {name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-typewriter font-bold text-vintage-ink dark:text-dark-text mb-4">
              Get in Touch
            </h3>
            <ul className="space-y-3 font-mono text-sm">
              <li className="flex items-start gap-2 text-vintage-darkBrown dark:text-dark-textSecondary">
                <Mail className="w-5 h-5 text-vintage-accent dark:text-dark-accent mt-0.5 flex-shrink-0" />
                <a href={`mailto:${settings.email || 'mehdyakr@gmail.com'}`} className="hover:text-vintage-accent dark:hover:text-dark-accent transition-colors break-all">
                  {settings.email || 'mehdyakr@gmail.com'}
                </a>
              </li>
              <li className="flex items-start gap-2 text-vintage-darkBrown dark:text-dark-textSecondary">
                <Phone className="w-5 h-5 text-vintage-accent dark:text-dark-accent mt-0.5 flex-shrink-0" />
                <span>{settings.phone || '+212 610-959642'}</span>
              </li>
              <li className="flex items-start gap-2 text-vintage-darkBrown dark:text-dark-textSecondary">
                <MapPin className="w-5 h-5 text-vintage-accent dark:text-dark-accent mt-0.5 flex-shrink-0" />
                <span>{settings.location || 'Casablanca, Morocco'}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t-2 border-vintage-ink dark:border-dark-border my-8"></div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="font-mono text-sm text-vintage-darkBrown dark:text-dark-textSecondary text-center md:text-left">
            <p className="mb-2">
              © {currentYear} {settings.full_name || 'Mehdi EL AKARY'}
            </p>
            <p className="text-xs italic text-vintage-brown dark:text-dark-textSecondary">
              "What I cannot create, I do not understand" - Richard Feynman
            </p>
          </div>

          <button
            onClick={scrollToTop}
            className="p-3 bg-vintage-ink dark:bg-dark-accent border-2 border-vintage-ink dark:border-dark-accent text-vintage-cream dark:text-dark-bg hover:bg-vintage-accent dark:hover:bg-opacity-80 hover:-translate-y-1 transition-all shadow-lg group"
            aria-label="Scroll to top"
          >
            <ArrowUp className="w-5 h-5 group-hover:animate-bounce" />
          </button>
        </div>
      </div>

      <div className="h-2 bg-gradient-to-r from-vintage-accent via-vintage-brown to-vintage-accent dark:from-dark-accent dark:via-dark-border dark:to-dark-accent"></div>
    </footer>
  );
}
