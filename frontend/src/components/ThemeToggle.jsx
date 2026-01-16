import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export default function ThemeToggle() {
  const { isDark, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded border-2 border-vintage-ink dark:border-dark-border 
                 hover:bg-vintage-tan dark:hover:bg-dark-surface transition-colors"
      aria-label="Toggle theme"
      title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {isDark ? (
        <Sun className="w-5 h-5 text-vintage-accent" />
      ) : (
        <Moon className="w-5 h-5 text-vintage-ink" />
      )}
    </button>
  );
}
