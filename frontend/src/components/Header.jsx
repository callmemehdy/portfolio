import { useState, useEffect } from 'react';
import { Menu, X, Code2 } from 'lucide-react';
import githubService from '../services/github';
import ThemeToggle from './ThemeToggle';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    
    // Load user info from GitHub
    const githubUsername = import.meta.env.VITE_GITHUB_USERNAME || 'callmemehdy';
    githubService.getUser(githubUsername)
      .then(setUserInfo)
      .catch(console.error);
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/95 dark:bg-dark-surface/95 backdrop-blur-md shadow-lg border-b-2' 
          : 'bg-white dark:bg-dark-surface border-b-4'
      } border-vintage-ink dark:border-dark-border`}
    >
      <div className="container mx-auto px-6">
        <div className="flex justify-between items-center h-20">
          <a href="#" className="flex items-center gap-3 group">
            <div className="relative">
              <div className="absolute inset-0 bg-vintage-accent dark:bg-dark-accent opacity-20 blur-lg group-hover:opacity-40 transition-opacity"></div>
              <Code2 className="w-10 h-10 text-vintage-ink dark:text-dark-accent relative z-10 group-hover:rotate-12 transition-transform" />
            </div>
            <div>
              <h1 className="text-2xl font-typewriter font-bold text-vintage-ink dark:text-dark-text">
                {userInfo?.name || 'Portfolio'}
              </h1>
              <p className="text-xs font-mono text-vintage-brown dark:text-dark-textSecondary -mt-1">
                {userInfo?.bio || 'Developer'}
              </p>
            </div>
          </a>
          
          <nav className="hidden md:flex items-center gap-1">
            {['About', 'Projects', 'Contact'].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="relative px-4 py-2 font-mono font-bold text-sm text-vintage-ink dark:text-dark-text hover:text-vintage-accent dark:hover:text-dark-accent transition-colors group"
              >
                <span className="relative z-10">{item}</span>
                <span className="absolute inset-0 bg-vintage-tan dark:bg-dark-card scale-0 group-hover:scale-100 transition-transform origin-center rounded"></span>
              </a>
            ))}
            
            <div className="w-px h-6 bg-vintage-brown dark:bg-dark-border mx-2"></div>
            
            <ThemeToggle />
          </nav>
          
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-vintage-ink dark:text-dark-text"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
        
        {isMobileMenuOpen && (
          <div className="md:hidden border-t-2 border-vintage-ink dark:border-dark-border py-4 space-y-2">
            {['About', 'Projects', 'Contact'].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                onClick={() => setIsMobileMenuOpen(false)}
                className="block px-4 py-2 font-mono font-bold text-vintage-ink dark:text-dark-text hover:bg-vintage-tan dark:hover:bg-dark-card transition-colors"
              >
                {item}
              </a>
            ))}
            <div className="flex items-center justify-between px-4 py-2">
              <span className="font-mono text-sm text-vintage-brown dark:text-dark-textSecondary">Theme</span>
              <ThemeToggle />
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
