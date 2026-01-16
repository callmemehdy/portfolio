import { useState, useEffect } from 'react';
import profileImage from '../assets/me.jpeg';
import { settingsService } from '../services/settings';

export default function Hero() {
  const [displayText, setDisplayText] = useState('');
  const [settings, setSettings] = useState({});
  const fullText = 'WELCOME TO MY DIGITAL ARCHIVE';
  
  useEffect(() => {
    // Load settings
    settingsService.getSettings().then(setSettings).catch(console.error);
    
    // Typewriter effect
    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setDisplayText(fullText.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(interval);
      }
    }, 80);
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <section className="py-20 border-b-4 border-vintage-ink dark:border-dark-border bg-white dark:bg-dark-surface transition-colors">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-8">
            <div className="inline-block border-4 border-vintage-ink dark:border-dark-border p-1 shadow-vintage bg-vintage-cream dark:bg-dark-card transition-colors">
              <div className="w-32 h-32 border-4 border-vintage-ink dark:border-dark-border overflow-hidden transition-colors">
                <img 
                  src={profileImage} 
                  alt={settings.full_name || 'Mehdi EL AKARY'}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-typewriter font-bold text-vintage-ink dark:text-dark-text mb-6 min-h-[80px] transition-colors">
            {displayText}
            <span className="animate-pulse">|</span>
          </h1>
          
          <div className="border-4 border-vintage-ink dark:border-dark-border bg-vintage-tan dark:bg-dark-card p-6 shadow-vintage max-w-2xl mx-auto transition-colors">
            <p className="text-lg md:text-xl font-mono text-vintage-darkBrown dark:text-dark-textSecondary leading-relaxed transition-colors">
              {settings.subtitle || 'AI/Software Engineer | Machine Learning Enthusiast | 1337 Coding School'}
            </p>
          </div>
          
          <div className="mt-8 flex gap-4 justify-center flex-wrap">
            <a 
              href="#projects" 
              className="vintage-button"
            >
              [View Projects]
            </a>
            <a 
              href="#contact" 
              className="vintage-button-secondary"
            >
              [Get in Touch]
            </a>
          </div>
          
          <div className="mt-12 font-retro text-vintage-brown dark:text-dark-textSecondary text-sm transition-colors">
            <p>════════════════════════════════════</p>
            <p className="my-2">▼ SCROLL DOWN TO EXPLORE ▼</p>
            <p>════════════════════════════════════</p>
          </div>
        </div>
      </div>
    </section>
  );
}
