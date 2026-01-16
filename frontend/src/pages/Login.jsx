import { useState } from 'react';
import { authService } from '../services/api';

export default function Login({ onLoginSuccess }) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    try {
      await authService.login(password);
      onLoginSuccess();
    } catch (err) {
      setError('Authentication failed. Please check your password.');
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="min-h-screen bg-vintage-terminalBg flex items-center justify-center p-6">
      <div className="terminal-theme p-8 max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="font-retro text-4xl mb-4">
            ADMIN LOGIN
          </h1>
          <p className="font-mono text-sm">
            ═══════════════════════════════
          </p>
          <p className="font-mono text-sm mt-2">
            RESTRICTED AREA • AUTH REQUIRED
          </p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block font-mono font-bold mb-2 text-sm uppercase tracking-wider">
              &gt; PASSWORD:
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-3 bg-vintage-terminalBg border-4 border-vintage-terminal 
                       font-mono text-vintage-terminal focus:outline-none focus:border-yellow-500"
              placeholder="Enter admin password"
              disabled={loading}
            />
          </div>
          
          {error && (
            <div className="border-2 border-red-500 bg-red-900 bg-opacity-30 p-3">
              <p className="font-mono text-sm text-red-400">
                ERROR: {error}
              </p>
            </div>
          )}
          
          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 bg-vintage-terminal text-vintage-terminalBg border-4 border-vintage-terminal 
                     font-bold text-lg uppercase tracking-wider hover:bg-transparent hover:text-vintage-terminal 
                     transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? '[AUTHENTICATING...]' : '[ACCESS SYSTEM]'}
          </button>
          
          <div className="text-center">
            <a
              href="/"
              className="font-mono text-sm hover:text-yellow-500 transition-colors"
            >
              &lt; Return to Portfolio
            </a>
          </div>
        </form>
        
        <div className="mt-8 text-center font-retro text-sm opacity-75">
          <p>╔════════════════════════╗</p>
          <p>║ SECURITY LEVEL: HIGH  ║</p>
          <p>╚════════════════════════╝</p>
        </div>
      </div>
    </div>
  );
}
