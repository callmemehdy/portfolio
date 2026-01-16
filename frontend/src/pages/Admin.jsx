import { useState } from 'react';
import { LogOut, FolderGit2, Settings } from 'lucide-react';
import ProjectManager from '../components/ProjectManager';
import SettingsPanel from '../components/SettingsPanel';

export default function Admin({ onLogout }) {
  const [activeTab, setActiveTab] = useState('projects');

  return (
    <div className="min-h-screen bg-vintage-cream dark:bg-dark-bg transition-colors">
      <header className="border-b-4 border-vintage-ink dark:border-dark-border bg-white dark:bg-dark-surface shadow-lg">
        <div className="container mx-auto px-6 py-6">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-typewriter font-bold text-vintage-ink dark:text-dark-text">
              Admin Panel
            </h1>
            <button
              onClick={onLogout}
              className="flex items-center gap-2 px-6 py-3 bg-vintage-accent dark:bg-dark-accent text-white font-bold rounded hover:shadow-lg transition-all"
            >
              <LogOut className="w-5 h-5" />
              Logout
            </button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        {/* Tabs */}
        <div className="flex gap-4 mb-8 border-b-2 border-vintage-ink dark:border-dark-border">
          <button
            onClick={() => setActiveTab('projects')}
            className={`flex items-center gap-2 px-6 py-3 font-mono font-bold transition-all ${
              activeTab === 'projects'
                ? 'border-b-4 border-vintage-accent dark:border-dark-accent text-vintage-accent dark:text-dark-accent -mb-0.5'
                : 'text-vintage-brown dark:text-dark-textSecondary hover:text-vintage-ink dark:hover:text-dark-text'
            }`}
          >
            <FolderGit2 className="w-5 h-5" />
            Projects
          </button>
          <button
            onClick={() => setActiveTab('settings')}
            className={`flex items-center gap-2 px-6 py-3 font-mono font-bold transition-all ${
              activeTab === 'settings'
                ? 'border-b-4 border-vintage-accent dark:border-dark-accent text-vintage-accent dark:text-dark-accent -mb-0.5'
                : 'text-vintage-brown dark:text-dark-textSecondary hover:text-vintage-ink dark:hover:text-dark-text'
            }`}
          >
            <Settings className="w-5 h-5" />
            Settings
          </button>
        </div>

        {/* Content */}
        {activeTab === 'projects' && <ProjectManager />}
        {activeTab === 'settings' && <SettingsPanel />}
      </div>
    </div>
  );
}
