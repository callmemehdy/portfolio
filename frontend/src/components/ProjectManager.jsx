import { useState, useEffect } from 'react';
import { Plus, Trash2, Eye, EyeOff, ChevronUp, ChevronDown, Save, X, Github } from 'lucide-react';

export default function ProjectManager() {
  const [projects, setProjects] = useState([]);
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showRepoModal, setShowRepoModal] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [customDescription, setCustomDescription] = useState('');

  useEffect(() => {
    fetchProjects();
    fetchRepos();
  }, []);

  const fetchProjects = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await fetch('http://localhost:8000/api/projects/all', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();
      setProjects(data);
    } catch (error) {
      console.error('Error fetching projects:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchRepos = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/github/repos');
      const data = await response.json();
      setRepos(data);
    } catch (error) {
      console.error('Error fetching repos:', error);
    }
  };

  const addProject = async (repoName) => {
    const token = localStorage.getItem('token');
    try {
      const response = await fetch('http://localhost:8000/api/projects', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ repo_name: repoName })
      });

      if (response.ok) {
        fetchProjects();
        setShowRepoModal(false);
      }
    } catch (error) {
      console.error('Error adding project:', error);
    }
  };

  const deleteProject = async (id) => {
    const token = localStorage.getItem('token');
    try {
      const response = await fetch(`http://localhost:8000/api/projects/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        fetchProjects();
      }
    } catch (error) {
      console.error('Error deleting project:', error);
    }
  };

  const toggleVisibility = async (id, currentVisibility) => {
    const token = localStorage.getItem('token');
    try {
      const response = await fetch(`http://localhost:8000/api/projects/${id}/visibility`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ is_visible: !currentVisibility })
      });

      if (response.ok) {
        fetchProjects();
      }
    } catch (error) {
      console.error('Error toggling visibility:', error);
    }
  };

  const updateDescription = async (id) => {
    const token = localStorage.getItem('token');
    try {
      const response = await fetch(`http://localhost:8000/api/projects/${id}/description`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ custom_description: customDescription })
      });

      if (response.ok) {
        fetchProjects();
        setEditingProject(null);
        setCustomDescription('');
      }
    } catch (error) {
      console.error('Error updating description:', error);
    }
  };

  const moveProject = async (id, direction) => {
    const token = localStorage.getItem('token');
    const currentIndex = projects.findIndex(p => p.id === id);
    const newOrder = direction === 'up' ? currentIndex - 1 : currentIndex + 1;

    if (newOrder < 0 || newOrder >= projects.length) return;

    try {
      const response = await fetch(`http://localhost:8000/api/projects/${id}/order`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ display_order: newOrder })
      });

      if (response.ok) {
        fetchProjects();
      }
    } catch (error) {
      console.error('Error moving project:', error);
    }
  };

  const startEditing = (project) => {
    setEditingProject(project.id);
    setCustomDescription(project.custom_description || project.description || '');
  };

  const cancelEditing = () => {
    setEditingProject(null);
    setCustomDescription('');
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="text-vintage-ink dark:text-dark-text">Loading projects...</div>
      </div>
    );
  }

  const availableRepos = repos.filter(
    repo => !projects.some(project => project.repo_name === repo.name)
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-vintage-ink dark:text-dark-text font-mono">
          Manage Projects
        </h2>
        <button
          onClick={() => setShowRepoModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-vintage-ink dark:bg-dark-accent text-vintage-paper dark:text-dark-bg border-2 border-vintage-ink dark:border-dark-accent hover:bg-vintage-paper hover:text-vintage-ink dark:hover:bg-dark-bg dark:hover:text-dark-accent transition-colors font-mono"
        >
          <Plus size={20} />
          Add Project
        </button>
      </div>

      <div className="space-y-4">
        {projects.length === 0 ? (
          <div className="text-center py-12 text-vintage-ink/60 dark:text-dark-text/60 font-mono">
            No projects added yet. Click "Add Project" to get started.
          </div>
        ) : (
          projects.map((project, index) => (
            <div
              key={project.id}
              className={`border-2 border-vintage-ink dark:border-dark-border p-6 ${
                project.is_visible ? 'bg-vintage-paper dark:bg-dark-card' : 'bg-gray-100 dark:bg-gray-800 opacity-60'
              } transition-all`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-xl font-bold text-vintage-ink dark:text-dark-text font-mono">
                      {project.repo_name}
                    </h3>
                    <span className={`px-2 py-1 text-xs font-mono border ${
                      project.is_visible 
                        ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 border-green-800 dark:border-green-200'
                        : 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 border-red-800 dark:border-red-200'
                    }`}>
                      {project.is_visible ? 'VISIBLE' : 'HIDDEN'}
                    </span>
                  </div>

                  {editingProject === project.id ? (
                    <div className="space-y-3">
                      <textarea
                        value={customDescription}
                        onChange={(e) => setCustomDescription(e.target.value)}
                        placeholder="Enter custom description..."
                        className="w-full px-4 py-2 border-2 border-vintage-ink dark:border-dark-border bg-vintage-paper dark:bg-dark-bg text-vintage-ink dark:text-dark-text font-mono focus:outline-none focus:ring-2 focus:ring-vintage-accent dark:focus:ring-dark-accent"
                        rows="4"
                      />
                      <div className="flex gap-2">
                        <button
                          onClick={() => updateDescription(project.id)}
                          className="flex items-center gap-2 px-3 py-1 bg-vintage-ink dark:bg-dark-accent text-vintage-paper dark:text-dark-bg border-2 border-vintage-ink dark:border-dark-accent hover:bg-vintage-paper hover:text-vintage-ink dark:hover:bg-dark-bg dark:hover:text-dark-accent transition-colors font-mono text-sm"
                        >
                          <Save size={16} />
                          Save
                        </button>
                        <button
                          onClick={cancelEditing}
                          className="flex items-center gap-2 px-3 py-1 border-2 border-vintage-ink dark:border-dark-border text-vintage-ink dark:text-dark-text hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors font-mono text-sm"
                        >
                          <X size={16} />
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <p className="text-vintage-ink/80 dark:text-dark-text/80 mb-3 font-mono">
                        {project.custom_description || project.description || 'No description'}
                      </p>
                      <button
                        onClick={() => startEditing(project)}
                        className="text-sm text-vintage-accent dark:text-dark-accent hover:underline font-mono"
                      >
                        Edit Description
                      </button>
                    </div>
                  )}

                  <div className="flex gap-4 mt-3 text-sm font-mono text-vintage-ink/60 dark:text-dark-text/60">
                    <span>Language: {project.language || 'N/A'}</span>
                    <span>Stars: {project.stars || 0}</span>
                    <span>Forks: {project.forks || 0}</span>
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <button
                    onClick={() => toggleVisibility(project.id, project.is_visible)}
                    className="p-2 border-2 border-vintage-ink dark:border-dark-border hover:bg-vintage-ink hover:text-vintage-paper dark:hover:bg-dark-accent dark:hover:text-dark-bg transition-colors"
                    title={project.is_visible ? 'Hide from portfolio' : 'Show in portfolio'}
                  >
                    {project.is_visible ? <Eye size={20} /> : <EyeOff size={20} />}
                  </button>

                  <button
                    onClick={() => moveProject(project.id, 'up')}
                    disabled={index === 0}
                    className="p-2 border-2 border-vintage-ink dark:border-dark-border hover:bg-vintage-ink hover:text-vintage-paper dark:hover:bg-dark-accent dark:hover:text-dark-bg transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                    title="Move up"
                  >
                    <ChevronUp size={20} />
                  </button>

                  <button
                    onClick={() => moveProject(project.id, 'down')}
                    disabled={index === projects.length - 1}
                    className="p-2 border-2 border-vintage-ink dark:border-dark-border hover:bg-vintage-ink hover:text-vintage-paper dark:hover:bg-dark-accent dark:hover:text-dark-bg transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                    title="Move down"
                  >
                    <ChevronDown size={20} />
                  </button>

                  <button
                    onClick={() => deleteProject(project.id)}
                    className="p-2 border-2 border-red-600 dark:border-red-500 text-red-600 dark:text-red-500 hover:bg-red-600 hover:text-white dark:hover:bg-red-500 transition-colors"
                    title="Delete project"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {showRepoModal && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50">
          <div className="bg-vintage-paper dark:bg-dark-card border-4 border-vintage-ink dark:border-dark-border max-w-2xl w-full max-h-[80vh] overflow-y-auto p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-vintage-ink dark:text-dark-text font-mono">
                Add Repository
              </h3>
              <button
                onClick={() => setShowRepoModal(false)}
                className="text-vintage-ink dark:text-dark-text hover:text-vintage-accent dark:hover:text-dark-accent"
              >
                <X size={24} />
              </button>
            </div>

            <div className="space-y-3">
              {availableRepos.length === 0 ? (
                <p className="text-center py-8 text-vintage-ink/60 dark:text-dark-text/60 font-mono">
                  All repositories have been added to your portfolio.
                </p>
              ) : (
                availableRepos.map((repo) => (
                  <div
                    key={repo.name}
                    className="border-2 border-vintage-ink dark:border-dark-border p-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                  >
                    <div className="flex justify-between items-start gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Github size={20} className="text-vintage-ink dark:text-dark-text" />
                          <h4 className="font-bold text-vintage-ink dark:text-dark-text font-mono">
                            {repo.name}
                          </h4>
                        </div>
                        <p className="text-sm text-vintage-ink/70 dark:text-dark-text/70 font-mono mb-2">
                          {repo.description || 'No description'}
                        </p>
                        <div className="flex gap-3 text-xs font-mono text-vintage-ink/60 dark:text-dark-text/60">
                          <span>Language: {repo.language || 'N/A'}</span>
                          <span>Stars: {repo.stargazers_count || 0}</span>
                          <span>Forks: {repo.forks_count || 0}</span>
                        </div>
                      </div>
                      <button
                        onClick={() => addProject(repo.name)}
                        className="px-4 py-2 bg-vintage-ink dark:bg-dark-accent text-vintage-paper dark:text-dark-bg border-2 border-vintage-ink dark:border-dark-accent hover:bg-vintage-paper hover:text-vintage-ink dark:hover:bg-dark-bg dark:hover:text-dark-accent transition-colors font-mono text-sm whitespace-nowrap"
                      >
                        Add
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
