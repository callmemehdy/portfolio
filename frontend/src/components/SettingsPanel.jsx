import { useState, useEffect } from 'react';
import { Save, RefreshCw, User, Mail, Phone, MapPin, Github, Linkedin } from 'lucide-react';
import { settingsService } from '../services/settings';

export default function SettingsPanel() {
  const [settings, setSettings] = useState({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      const data = await settingsService.getSettings();
      setSettings(data);
    } catch (error) {
      console.error('Failed to load settings:', error);
      setMessage('Failed to load settings');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (key, value) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const handleSave = async () => {
    setSaving(true);
    setMessage('');
    try {
      await settingsService.updateSettingsBatch(settings);
      setMessage('Settings saved successfully!');
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      console.error('Failed to save settings:', error);
      const errorMsg = error.response?.data?.detail || error.message || 'Failed to save settings';
      setMessage(`Error: ${errorMsg}`);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="text-center py-12">
        <RefreshCw className="w-8 h-8 animate-spin mx-auto text-vintage-accent" />
        <p className="mt-4 font-mono text-vintage-brown">Loading settings...</p>
      </div>
    );
  }

  const fields = [
    { key: 'full_name', label: 'Full Name', icon: User, type: 'text' },
    { key: 'title', label: 'Job Title', icon: User, type: 'text' },
    { key: 'subtitle', label: 'Subtitle', icon: User, type: 'text' },
    { key: 'email', label: 'Email', icon: Mail, type: 'email' },
    { key: 'phone', label: 'Phone', icon: Phone, type: 'tel' },
    { key: 'location', label: 'Location', icon: MapPin, type: 'text' },
    { key: 'github', label: 'GitHub URL', icon: Github, type: 'url' },
    { key: 'linkedin', label: 'LinkedIn URL', icon: Linkedin, type: 'url' },
    { key: 'bio', label: 'Bio', icon: User, type: 'textarea' },
  ];

  return (
    <div className="vintage-card max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-typewriter font-bold text-vintage-ink dark:text-dark-text">
          Personal Settings
        </h2>
        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2 px-6 py-3 bg-vintage-accent dark:bg-dark-accent text-white font-bold rounded hover:shadow-lg disabled:opacity-50 transition-all"
        >
          <Save className="w-5 h-5" />
          {saving ? 'Saving...' : 'Save Changes'}
        </button>
      </div>

      {message && (
        <div className={`p-4 mb-6 border-2 ${
          message.includes('success')
            ? 'bg-green-100 border-green-500 text-green-800'
            : 'bg-red-100 border-red-500 text-red-800'
        } font-mono`}>
          {message}
        </div>
      )}

      <div className="space-y-6">
        {fields.map(({ key, label, icon: Icon, type }) => (
          <div key={key}>
            <label className="flex items-center gap-2 font-mono font-bold text-vintage-ink dark:text-dark-text mb-2">
              <Icon className="w-5 h-5 text-vintage-accent dark:text-dark-accent" />
              {label}
            </label>
            {type === 'textarea' ? (
              <textarea
                value={settings[key] || ''}
                onChange={(e) => handleChange(key, e.target.value)}
                rows={4}
                className="w-full px-4 py-3 border-2 border-vintage-ink dark:border-dark-border bg-white dark:bg-dark-card text-vintage-ink dark:text-dark-text font-mono focus:border-vintage-accent dark:focus:border-dark-accent outline-none transition-colors"
              />
            ) : (
              <input
                type={type}
                value={settings[key] || ''}
                onChange={(e) => handleChange(key, e.target.value)}
                className="w-full px-4 py-3 border-2 border-vintage-ink dark:border-dark-border bg-white dark:bg-dark-card text-vintage-ink dark:text-dark-text font-mono focus:border-vintage-accent dark:focus:border-dark-accent outline-none transition-colors"
              />
            )}
          </div>
        ))}
      </div>

      <div className="mt-8 p-4 bg-vintage-tan dark:bg-dark-surface border-2 border-vintage-brown dark:border-dark-border">
        <p className="font-mono text-sm text-vintage-darkBrown dark:text-dark-textSecondary">
          <strong>Note:</strong> These settings will be displayed throughout your portfolio website. 
          Changes take effect immediately after saving.
        </p>
      </div>
    </div>
  );
}
